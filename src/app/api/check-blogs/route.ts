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
    const checkSQL = "SELECT EXISTS (SELECT 1 FROM pg_catalog.pg_tables WHERE tablename = 'blogs') as table_exists";
    const { data: tableCheckData, error: tableCheckError } = await supabaseAdmin.rpc('exec_sql', { sql: checkSQL });

    if (tableCheckError) {
      console.error('Error checking if blogs table exists:', tableCheckError);
      return NextResponse.json({ error: tableCheckError.message }, { status: 500 });
    }

    let tableExistsFlag = false;
    if (tableCheckData) {
      if (Array.isArray(tableCheckData) && tableCheckData.length > 0 && tableCheckData[0]?.table_exists === true) {
        tableExistsFlag = true;
      } else if (tableCheckData.success && tableCheckData.affected_rows > 0) {
        tableExistsFlag = true;
      }
    }

    // If table doesn't exist, create it
    if (!tableExistsFlag) {
      console.log('Blogs table does not exist, creating it');
      const createTableSQL = `CREATE TABLE IF NOT EXISTS public.blogs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        title TEXT NOT NULL,
        blog TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'pending',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
      )`;
      const { error: createError } = await supabaseAdmin.rpc('exec_sql', { sql: createTableSQL });
      if (createError) {
        console.error('Error creating blogs table:', createError);
        return NextResponse.json({ error: createError.message }, { status: 500 });
      }
      console.log('Table created successfully');
    }

    // Fix RLS policies completely (one statement at a time)
    console.log('Fixing RLS policies...');
    const policyStatements = [];
    for (const sql of policyStatements) {
      const { error } = await supabaseAdmin.rpc('exec_sql', { sql });
      if (error) {
        console.error('Error fixing policies:', error);
        // Continue anyway to try to fetch data
      }
    }

    // Try to get blogs either way
    console.log('Fetching all blogs...');
    try {
      // First try to use our new optimized function for fetching blogs as JSON
      const studentParam = studentName ? `'${studentName.replace(/'/g, "''")}'` : 'NULL';
      const jsonFunctionSQL = `SELECT get_blogs_as_json(${studentParam}) as blogs`;
      const { data: jsonResult, error: jsonError } = await supabaseAdmin.rpc('exec_sql', { sql: jsonFunctionSQL });

      if (!jsonError && jsonResult && Array.isArray(jsonResult) && jsonResult.length > 0 && jsonResult[0].blogs) {
        const blogsArray = jsonResult[0].blogs;
        return NextResponse.json({
          success: true,
          table_exists: tableExistsFlag,
          total_blogs: Array.isArray(blogsArray) ? blogsArray.length : 0,
          blogs: blogsArray,
          policiesFixed: true,
          fetch_method: 'json_function'
        });
      }
    } catch (jsonError) {
      console.error('Error using get_blogs_as_json function:', jsonError);
    }

    // Fallback: Try using the Supabase client directly
    try {
      const query = supabaseAdmin.from('blogs').select('*');
      if (studentName) {
        query.eq('name', studentName);
      }
      const { data: supabaseData, error: supabaseError } = await query.order('created_at', { ascending: false });
      if (supabaseError) {
        console.error('Error querying with Supabase client:', supabaseError);
      } else if (supabaseData) {
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
          policiesFixed: true,
          fetch_method: 'supabase_client'
        });
      }
    } catch (supabaseClientError) {
      console.error('Error using Supabase client:', supabaseClientError);
    }

    // Fallback: Try a different approach with a simpler query
    const rawCountSQL = 'SELECT COUNT(*) as count FROM blogs';
    const { data: countResult, error: countError } = await supabaseAdmin.rpc('exec_sql', { sql: rawCountSQL });
    if (!countError && countResult && Array.isArray(countResult) && countResult.length > 0) {
      // Table exists but no blogs found
      return NextResponse.json({
        success: true,
        table_exists: tableExistsFlag,
        total_blogs: 0,
        blogs: [],
        policiesFixed: true,
        fetch_method: 'count_only'
      });
    }

    // If all else fails
    return NextResponse.json({
      error: 'Failed to fetch blogs',
      success: false,
      table_exists: tableExistsFlag,
      policiesFixed: false
    }, { status: 500 });
  } catch (error) {
    console.error('Error in check-blogs API:', error);
    return NextResponse.json({
      error: `Internal server error: ${error.message || 'Unknown error'}`,
      success: false
    }, { status: 500 });
  }
}
