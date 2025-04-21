import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { supabaseAdmin, checkSupabaseAdminConfig } from '@/lib/supabaseAdmin';

// SQL to directly insert a blog bypassing RLS
const createBlogSql = (name: string, title: string, blog: string) => `
  INSERT INTO blogs (name, title, blog, status, created_at, updated_at)
  VALUES ('${name.replace(/'/g, "''")}', '${title.replace(/'/g, "''")}', '${blog.replace(/'/g, "''")}', 'pending', now(), now())
  RETURNING id::text;
`;

export async function POST(request: Request) {
  try {
    // Log admin client configuration
    const adminConfig = checkSupabaseAdminConfig();
    console.log('Processing blog submission with admin config:', adminConfig);

    let name: string | null = null;
    let title: string | null = null;
    let blog: string | null = null;

    // Check content type and parse data accordingly
    const contentType = request.headers.get('content-type') || '';

    if (contentType.includes('multipart/form-data')) {
      // Handle form data
      const formData = await request.formData();
      name = formData.get('name') as string;
      title = formData.get('title') as string;
      blog = formData.get('blog') as string;
    } else {
      // Handle JSON
      try {
        const json = await request.json();
        name = json.name || null;
        title = json.title || null;
        blog = json.blog || null;
      } catch (error) {
        console.error('Failed to parse JSON:', error);
      }
    }

    if (!name || !title || !blog) {
      return NextResponse.json(
        { error: 'Name, title, and blog content are required' },
        { status: 400 }
      );
    }

    console.log(`Attempting to create blog for ${name}`);

    // Check for duplicate blogs with the same title from this student in the last 5 minutes
    try {
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();

      const { data: recentBlogs, error: recentBlogsError } = await supabaseAdmin
        .from('blogs')
        .select('id, title, created_at')
        .eq('name', name)
        .eq('title', title)
        .gte('created_at', fiveMinutesAgo);

      if (!recentBlogsError && recentBlogs && recentBlogs.length > 0) {
        console.log('Duplicate blog detected, returning existing blog ID:', recentBlogs[0].id);
        return NextResponse.json({
          id: recentBlogs[0].id,
          success: true,
          message: 'Existing blog reused to prevent duplication'
        }, { status: 200 });
      }
    } catch (duplicateCheckError) {
      console.error('Error checking for duplicate blogs:', duplicateCheckError);
      // Continue with blog creation if duplicate check fails
    }

    // Method 1: Try using the exec_sql function
    console.log('Trying exec_sql method...');
    try {
      // First check if the exec_sql function exists
      const checkFunctionSQL = `
        SELECT EXISTS(
          SELECT 1 FROM pg_proc WHERE proname = 'exec_sql'
        ) as function_exists;
      `;

      const { data: functionCheckResult, error: functionCheckError } = await supabaseAdmin.rpc('exec_sql', {
        sql: checkFunctionSQL
      });

      console.log('exec_sql function check:', functionCheckResult);

      if (functionCheckError) {
        console.error('Error checking exec_sql function:', functionCheckError);
        throw new Error('exec_sql function check failed');
      }

      // Create the blog using exec_sql
      const sql = createBlogSql(name, title, blog);
      const { data: sqlResult, error: sqlError } = await supabaseAdmin.rpc('exec_sql', { sql });

      console.log('exec_sql result:', sqlResult);

      if (sqlError) {
        console.error('Error creating blog with exec_sql:', sqlError);
        throw new Error(sqlError.message);
      }

      // Extract the ID from the result - handle different response formats
      let blogId;
      if (Array.isArray(sqlResult) && sqlResult.length > 0 && sqlResult[0].id) {
        blogId = sqlResult[0].id;
      } else if (sqlResult && sqlResult.success && sqlResult.affected_rows > 0) {
        // Get the ID using a SELECT query for the most recently inserted blog by this student
        const getIdSql = `
          SELECT id::text FROM blogs
          WHERE name = '${name.replace(/'/g, "''")}'
          ORDER BY created_at DESC
          LIMIT 1;
        `;
        const { data: idResult } = await supabaseAdmin.rpc('exec_sql', { sql: getIdSql });

        if (Array.isArray(idResult) && idResult.length > 0 && idResult[0].id) {
          blogId = idResult[0].id;
        }
      }

      if (blogId) {
        console.log('Blog created successfully via exec_sql with ID:', blogId);
        return NextResponse.json({ id: blogId, success: true }, { status: 201 });
      } else {
        console.error('exec_sql method failed: No error but no ID returned');
        throw new Error('No ID returned from blog creation');
      }
    } catch (execSqlError) {
      console.error('exec_sql method failed:', execSqlError);
      // Continue to next method if this fails
    }

    // Method 2: Try using an RPC function
    console.log('Trying RPC method...');
    try {
      const { data: rpcResult, error: rpcError } = await supabase.rpc(
        'add_student_blog',
        {
          _name: name,
          _title: title,
          _blog: blog
        }
      );

      if (rpcError) {
        console.error('Error creating blog with RPC:', rpcError);
        throw new Error(rpcError.message);
      }

      console.log('Blog created successfully via RPC with ID:', rpcResult);
      return NextResponse.json({ id: rpcResult, success: true }, { status: 201 });
    } catch (rpcMethodError) {
      console.error('RPC method failed:', rpcMethodError);
      // Continue to next method if this fails
    }

    // Method 3: Try direct insertion with the admin client - last resort
    console.log('Trying direct insertion with admin client...');
    try {
      const { data: insertData, error: insertError } = await supabaseAdmin
        .from('blogs')
        .insert({
          name,
          title,
          blog,
          status: 'pending'
        })
        .select('id')
        .single();

      if (insertError) {
        console.error('Error creating blog with direct insertion:', insertError);
        return NextResponse.json(
          { error: insertError.message },
          { status: 500 }
        );
      }

      console.log('Blog created successfully via direct insertion with ID:', insertData.id);
      return NextResponse.json({ id: insertData.id, success: true }, { status: 201 });
    } catch (error: any) {
      console.error('All blog creation methods failed:', error);
      return NextResponse.json(
        { error: error.message || 'Failed to create blog post' },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Error processing blog submission:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
