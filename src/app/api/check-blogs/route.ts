import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const studentName = url.searchParams.get('name');

    // Build query
    let query = supabaseAdmin.from('blogs').select('*');
    if (studentName) {
      query = query.eq('name', studentName);
    }
    query = query.order('created_at', { ascending: false });

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching blogs:', error);
      return NextResponse.json({
        success: false,
        error: error.message,
        blogs: [],
        total_blogs: 0,
        table_exists: true
      }, { status: 500 });
    }

    const blogs = (data || []).map(blog => ({
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
      table_exists: true,
      total_blogs: blogs.length,
      blogs,
      fetch_method: 'supabase_admin'
    });
  } catch (error: any) {
    console.error('Error in check-blogs API:', error);
    return NextResponse.json({
      error: `Internal server error: ${error.message || 'Unknown error'}`,
      success: false,
      blogs: [],
      total_blogs: 0
    }, { status: 500 });
  }
}
