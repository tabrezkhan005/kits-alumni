import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function GET(request: Request) {
  console.log('check-blogs API called');
  try {
    // Get URL params if any
    const url = new URL(request.url);
    const studentName = url.searchParams.get('name');
    console.log('Request for student name:', studentName);

    // Check if any blogs exist at all
    console.log('Checking if blogs table exists...');
    const checkSQL = `
      SELECT EXISTS (SELECT 1 FROM pg_catalog.pg_tables WHERE tablename = 'blogs') as table_exists;
    `;
    const { data: tableCheckData, error: tableCheckError } = await supabaseAdmin.rpc('exec_sql', { sql: checkSQL });

    if (tableCheckError) {
      console.error('Error checking if blogs table exists:', tableCheckError);
      return NextResponse.json({ error: tableCheckError.message }, { status: 500 });
    }

    console.log('Table check result:', tableCheckData);
    // Fix the logic to properly extract the table_exists value
    let tableExistsFlag = false;
    if (tableCheckData) {
      if (Array.isArray(tableCheckData) && tableCheckData.length > 0 && tableCheckData[0]?.table_exists === true) {
        tableExistsFlag = true;
      } else if (tableCheckData.success && tableCheckData.affected_rows > 0) {
        // When exec_sql returns { success: true, affected_rows: 1 }, it means the query was successful
        tableExistsFlag = true;
      }
    }

    console.log('Table exists:', tableExistsFlag);

    // If table doesn't exist, create it
    if (!tableExistsFlag) {
      console.log('Blogs table does not exist, creating it');
      const createTableSQL = `
        CREATE TABLE IF NOT EXISTS public.blogs (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          name TEXT NOT NULL,
          title TEXT NOT NULL,
          blog TEXT NOT NULL,
          status TEXT NOT NULL DEFAULT 'pending',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
        );
      `;

      console.log('Executing create table SQL...');
      const { error: createError } = await supabaseAdmin.rpc('exec_sql', { sql: createTableSQL });
      if (createError) {
        console.error('Error creating blogs table:', createError);
        return NextResponse.json({ error: createError.message }, { status: 500 });
      }
      console.log('Table created successfully');
    }

    // Fix RLS policies completely
    console.log('Fixing RLS policies...');
    const fixPoliciesSQL = `
      -- Disable RLS temporarily to make changes
      ALTER TABLE public.blogs DISABLE ROW LEVEL SECURITY;

      -- Drop all existing policies to start fresh
      DROP POLICY IF EXISTS "Allow users to insert own blogs" ON public.blogs;
      DROP POLICY IF EXISTS "Allow users to update own blogs" ON public.blogs;
      DROP POLICY IF EXISTS "Allow users to delete own blogs" ON public.blogs;
      DROP POLICY IF EXISTS "Allow authenticated users to view blogs" ON public.blogs;
      DROP POLICY IF EXISTS "Allow public to view approved blogs" ON public.blogs;
      DROP POLICY IF EXISTS "Allow service role full access to blogs" ON public.blogs;
      DROP POLICY IF EXISTS "Allow authenticated users to insert blogs" ON public.blogs;
      DROP POLICY IF EXISTS "blogs_select_policy" ON public.blogs;
      DROP POLICY IF EXISTS "blogs_insert_policy" ON public.blogs;
      DROP POLICY IF EXISTS "blogs_all_policy" ON public.blogs;
      DROP POLICY IF EXISTS "blogs_service_role_policy" ON public.blogs;
      DROP POLICY IF EXISTS "blogs_public_policy" ON public.blogs;

      -- Re-enable RLS with new policies
      ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

      -- Create a permissive SELECT policy (everyone can view all blogs)
      CREATE POLICY "blogs_select_policy"
      ON public.blogs
      FOR SELECT
      USING (true);

      -- Create a permissive INSERT policy
      CREATE POLICY "blogs_insert_policy"
      ON public.blogs
      FOR INSERT
      WITH CHECK (true);

      -- Create a permissive UPDATE policy
      CREATE POLICY "blogs_update_policy"
      ON public.blogs
      FOR UPDATE
      USING (true)
      WITH CHECK (true);

      -- Create a permissive DELETE policy
      CREATE POLICY "blogs_delete_policy"
      ON public.blogs
      FOR DELETE
      USING (true);

      -- Grant permissions
      GRANT ALL ON public.blogs TO authenticated;
      GRANT ALL ON public.blogs TO anon;
      GRANT ALL ON public.blogs TO service_role;
    `;

    console.log('Executing fix policies SQL...');
    const { error: fixPoliciesError } = await supabaseAdmin.rpc('exec_sql', { sql: fixPoliciesSQL });
    if (fixPoliciesError) {
      console.error('Error fixing policies:', fixPoliciesError);
      // Continue anyway to try to fetch data
    } else {
      console.log('Policies fixed successfully');
    }

    // Try to get blogs either way
    console.log('Fetching all blogs...');
    try {
      // First try to use our new optimized function for fetching blogs as JSON
      const studentParam = studentName ? `'${studentName.replace(/'/g, "''")}'` : 'NULL';
      const jsonFunctionSQL = `SELECT get_blogs_as_json(${studentParam}) as blogs;`;

      console.log('Trying to fetch blogs using get_blogs_as_json function...');
      const { data: jsonResult, error: jsonError } = await supabaseAdmin.rpc('exec_sql', { sql: jsonFunctionSQL });

      if (!jsonError && jsonResult && Array.isArray(jsonResult) && jsonResult.length > 0 && jsonResult[0].blogs) {
        console.log('Successfully fetched blogs using get_blogs_as_json function');
        const blogsArray = jsonResult[0].blogs;
        console.log('Fetched blogs count:', Array.isArray(blogsArray) ? blogsArray.length : 'not an array');

        return NextResponse.json({
          success: true,
          table_exists: tableExistsFlag,
          total_blogs: Array.isArray(blogsArray) ? blogsArray.length : 0,
          blogs: blogsArray,
          policiesFixed: !fixPoliciesError,
          fetch_method: 'json_function'
        });
      } else {
        console.log('get_blogs_as_json function failed or returned no data, falling back to direct query...');

        if (jsonError) {
          console.error('Error using get_blogs_as_json function:', jsonError);
        } else if (jsonResult) {
          console.log('get_blogs_as_json result:', jsonResult);
        }
      }

      // Try using the Supabase client directly as a new approach
      console.log('Trying Supabase client direct query...');
      try {
        const query = supabaseAdmin.from('blogs').select('*');

        if (studentName) {
          query.eq('name', studentName);
        }

        const { data: supabaseData, error: supabaseError } = await query.order('created_at', { ascending: false });

        if (supabaseError) {
          console.error('Error querying with Supabase client:', supabaseError);
        } else if (supabaseData) {
          console.log('Supabase client returned data:', supabaseData.length);

          // Transform the data to ensure proper formatting
          const formattedBlogs = supabaseData.map(blog => ({
            id: blog.id.toString(),
            name: blog.name,
            title: blog.title,
            blog: blog.blog,
            status: blog.status,
            created_at: blog.created_at ? new Date(blog.created_at).toISOString() : null,
            updated_at: blog.updated_at ? new Date(blog.updated_at).toISOString() : null
          }));

          return NextResponse.json({
            success: true,
            table_exists: tableExistsFlag,
            total_blogs: formattedBlogs.length,
            blogs: formattedBlogs,
            policiesFixed: !fixPoliciesError,
            fetch_method: 'supabase_client'
          });
        }
      } catch (supabaseClientError) {
        console.error('Error using Supabase client:', supabaseClientError);
      }

      // Try a different approach with a simpler query that just gets the raw data
      const rawCountSQL = `SELECT COUNT(*) as count FROM blogs;`;
      const { data: countResult, error: countError } = await supabaseAdmin.rpc('exec_sql', { sql: rawCountSQL });

      if (!countError && countResult && Array.isArray(countResult) && countResult.length > 0) {
        console.log('Blog count result:', countResult[0]);
      }

      // Try a simpler fetch query that explicitly selects each column with proper casting
      const directFetchSQL = `
        SELECT
          CAST(id AS text) as id,
          name,
          title,
          blog,
          status,
          CAST(created_at AS text) as created_at,
          CAST(updated_at AS text) as updated_at
        FROM blogs
        ${studentName ? `WHERE name = '${studentName.replace(/'/g, "''")}'` : ''}
        ORDER BY created_at DESC;
      `;

      console.log('Executing direct fetch query with explicit casting...');
      const { data: directResult, error: directError } = await supabaseAdmin.rpc('exec_sql', { sql: directFetchSQL });

      if (directError) {
        console.error('Error with direct fetch query:', directError);
      } else {
        console.log('Direct fetch result type:', directResult ? typeof directResult : 'null');
        if (directResult) {
          console.log('Direct fetch keys:', Object.keys(directResult));

          if (Array.isArray(directResult)) {
            console.log('Direct fetch blogs count:', directResult.length);
            return NextResponse.json({
              success: true,
              table_exists: tableExistsFlag,
              total_blogs: directResult.length,
              blogs: directResult,
              policiesFixed: !fixPoliciesError,
              fetch_method: 'direct_cast_query'
            });
          } else if (directResult.success) {
            console.log('Direct fetch returned success object:', directResult);
          }
        }
      }

      // Fall back to direct SQL query if the function doesn't exist yet
      // Get all blogs without using RLS - use a simpler query format to avoid JSON parsing issues
      const allBlogsSQL = `
        SELECT
          id::text as id,
          name,
          title,
          blog,
          status,
          created_at::text as created_at,
          updated_at::text as updated_at
        FROM blogs
        ORDER BY created_at DESC;
      `;

      const { data: allBlogsResult, error: getBlogsError } = await supabaseAdmin.rpc('exec_sql', { sql: allBlogsSQL });

      if (getBlogsError) {
        console.error('Error getting all blogs:', getBlogsError);
        return NextResponse.json({
          error: getBlogsError.message,
          success: false,
          table_exists: tableExistsFlag,
          policiesFixed: !fixPoliciesError
        }, { status: 500 });
      }

      console.log('All blogs result:', allBlogsResult);

      // Handle different response formats from exec_sql
      let allBlogs = [];

      if (allBlogsResult && allBlogsResult.error) {
        console.error('Error in exec_sql result:', allBlogsResult.error);

        // If we get here, the table might exist but our query is failing
        // Return what we know but with an empty blogs array
        return NextResponse.json({
          success: true,
          table_exists: tableExistsFlag,
          total_blogs: 0,
          blogs: [],
          policiesFixed: !fixPoliciesError,
          query_error: allBlogsResult.error
        });
      } else if (Array.isArray(allBlogsResult)) {
        allBlogs = allBlogsResult;
      } else if (allBlogsResult && allBlogsResult.success) {
        // If we got a success but no data, table might be empty
        console.log('Table exists but may be empty');
      }

      console.log('Fetched blogs count:', allBlogs.length);

      // Filter by student name if provided
      let filteredBlogs = allBlogs;
      if (studentName && allBlogs.length > 0) {
        console.log('Filtering for student name:', studentName);
        filteredBlogs = allBlogs.filter((blog: any) =>
          blog && blog.name && typeof blog.name === 'string' &&
          blog.name.toLowerCase() === studentName.toLowerCase()
        );
        console.log('Filtered blogs count:', filteredBlogs.length);
      }

      return NextResponse.json({
        success: true,
        table_exists: tableExistsFlag,
        total_blogs: allBlogs.length,
        blogs: filteredBlogs,
        policiesFixed: !fixPoliciesError,
        fetch_method: 'direct_query'
      });
    } catch (fetchError: any) {
      console.error('Error in fetch blogs section:', fetchError);
      return NextResponse.json({
        error: `Error fetching blogs: ${fetchError.message || 'Unknown error'}`,
        success: false,
        table_exists: tableExistsFlag,
        policiesFixed: !fixPoliciesError
      }, { status: 500 });
    }
  } catch (error: any) {
    console.error('Error in check-blogs API:', error);
    return NextResponse.json({
      error: `Internal server error: ${error.message || 'Unknown error'}`,
      success: false
    }, { status: 500 });
  }
}
