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
