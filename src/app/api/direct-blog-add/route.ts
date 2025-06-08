import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(request: Request) {
  try {
    // Get blog data from request
    const data = await request.json();
    const { name, title, blog } = data;

    if (!name || !title || !blog) {
      return NextResponse.json(
        { error: 'Name, title, and blog content are required' },
        { status: 400 }
      );
    }

    console.log('Direct blog add called for:', name);
    console.log('Blog title:', title);
    console.log('Blog content length:', blog.length);

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

    // Method 1: Try using add_student_blog RPC function first (most reliable)
    try {
      console.log('Trying add_student_blog RPC method...');
      const { data: rpcData, error: rpcError } = await supabaseAdmin.rpc(
        'add_student_blog',
        { _name: name, _title: title, _blog: blog }
      );

      if (!rpcError && rpcData) {
        const blogId = rpcData;
        console.log('Blog created via RPC with ID:', blogId);
        return NextResponse.json({
          success: true,
          message: 'Blog added successfully via RPC',
          id: blogId
        });
      }

      console.log('RPC method failed:', rpcError?.message);

      // If insert fails, re-query for the existing blog and return it
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
      const { data: recentBlogs } = await supabaseAdmin
        .from('blogs')
        .select('id, title, created_at')
        .eq('name', name)
        .eq('title', title)
        .gte('created_at', fiveMinutesAgo);
      if (recentBlogs && recentBlogs.length > 0) {
        return NextResponse.json({
          id: recentBlogs[0].id,
          success: true,
          message: 'Existing blog reused to prevent duplication (race condition)'
        }, { status: 200 });
      }
      throw rpcError;
    } catch (rpcError) {
      console.error('Error using RPC method:', rpcError);
      // Continue to next method if this fails
    }

    // Method 2: Try direct SQL insert bypassing all policies
    try {
      console.log('Trying direct SQL insert...');
      const sql = `
        INSERT INTO blogs (
          id,
          name,
          title,
          blog,
          status,
          created_at,
          updated_at
        ) VALUES (
          gen_random_uuid(),
          '${name.replace(/'/g, "''")}',
          '${title.replace(/'/g, "''")}',
          '${blog.replace(/'/g, "''")}',
          'pending',
          now(),
          now()
        )
        RETURNING id;
      `;

      // First check for exec_sql
      const checkFunctionSQL = `
        SELECT EXISTS (
          SELECT 1
          FROM pg_proc
          WHERE proname = 'exec_sql'
        ) as function_exists;
      `;

      const { data: functionCheck, error: functionCheckError } = await supabaseAdmin.rpc('exec_sql', {
        sql: checkFunctionSQL
      });

      if (functionCheckError) {
        console.error('Error checking exec_sql function:', functionCheckError);
        // Continue with direct insert as a fallback
      } else {
        console.log('exec_sql function check:', functionCheck);
      }

      const { data: insertResult, error: insertError } = await supabaseAdmin.rpc('exec_sql', { sql });

      if (insertError) {
        console.error('Error directly adding blog:', insertError);

        // If insert fails, re-query for the existing blog and return it
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
        const { data: recentBlogs } = await supabaseAdmin
          .from('blogs')
          .select('id, title, created_at')
          .eq('name', name)
          .eq('title', title)
          .gte('created_at', fiveMinutesAgo);
        if (recentBlogs && recentBlogs.length > 0) {
          return NextResponse.json({
            id: recentBlogs[0].id,
            success: true,
            message: 'Existing blog reused to prevent duplication (race condition)'
          }, { status: 200 });
        }
        throw new Error(`Failed to add blog: ${insertError.message}`);
      }

      console.log('Insert result:', insertResult);

      // Handle different result formats
      let blogId;
      if (Array.isArray(insertResult) && insertResult.length > 0) {
        blogId = insertResult[0].id;
      } else if (insertResult && typeof insertResult === 'object') {
        // Try to extract from different formats
        if (insertResult.rows && insertResult.rows.length > 0) {
          blogId = insertResult.rows[0].id;
        } else if (insertResult.id) {
          blogId = insertResult.id;
        }
      }

      if (!blogId) {
        console.error('Blog was not added properly - no ID returned');
        throw new Error('Blog was not added properly - no ID returned');
      }

      // Get the newly created blog to confirm it exists
      console.log('Verifying blog was added with ID:', blogId);
      const verifySQL = `SELECT * FROM blogs WHERE id = '${blogId}';`;
      const { data: verifyResult, error: verifyError } = await supabaseAdmin.rpc('exec_sql', { sql: verifySQL });

      if (verifyError) {
        console.error('Error verifying blog was added:', verifyError);
        // Return success anyway since the insert worked
        return NextResponse.json({
          success: true,
          message: 'Blog added successfully but verification failed',
          id: blogId
        });
      }

      let verifiedBlog;
      if (Array.isArray(verifyResult) && verifyResult.length > 0) {
        verifiedBlog = verifyResult[0];
      } else if (verifyResult && verifyResult.rows && verifyResult.rows.length > 0) {
        verifiedBlog = verifyResult.rows[0];
      }

      if (!verifiedBlog) {
        console.warn('Blog was created but could not be verified');
        return NextResponse.json({
          success: true,
          message: 'Blog added successfully but could not be verified',
          id: blogId
        });
      }

      return NextResponse.json({
        success: true,
        message: 'Blog added successfully',
        id: blogId,
        blog: verifiedBlog
      });
    } catch (sqlError) {
      console.error('Error with direct SQL insert:', sqlError);
      // Continue to the next method if this fails
    }

    // Method 3: Fall back to direct insert using the Supabase client
    try {
      console.log('Falling back to Supabase client direct insert...');
      const { data: directData, error: directError } = await supabaseAdmin
        .from('blogs')
        .insert([
          {
            name,
            title,
            blog,
            status: 'pending'
          }
        ])
        .select('id')
        .single();

      if (directError) {
        console.error('Error with Supabase client direct insert:', directError);

        // If insert fails, re-query for the existing blog and return it
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
        const { data: recentBlogs } = await supabaseAdmin
          .from('blogs')
          .select('id, title, created_at')
          .eq('name', name)
          .eq('title', title)
          .gte('created_at', fiveMinutesAgo);
        if (recentBlogs && recentBlogs.length > 0) {
          return NextResponse.json({
            id: recentBlogs[0].id,
            success: true,
            message: 'Existing blog reused to prevent duplication (race condition)'
          }, { status: 200 });
        }
        throw directError;
      }

      console.log('Blog added successfully via Supabase client with ID:', directData.id);
      return NextResponse.json({
        success: true,
        message: 'Blog added successfully via Supabase client',
        id: directData.id
      });
    } catch (directError) {
      console.error('All methods failed to add blog:', directError);
      return NextResponse.json(
        { error: 'All methods failed to add blog. Please try again later.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in direct-blog-add API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
