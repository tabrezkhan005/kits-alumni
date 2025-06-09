import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: 'Missing post id' }, { status: 400 });
  }
  try {
    const { data: post, error: postError } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();
    if (postError || !post) {
      return NextResponse.json({ error: postError?.message || 'Post not found' }, { status: 404 });
    }
    const { data: comments, error: commentsError } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', id)
      .order('created_at', { ascending: true });
    if (commentsError) {
      return NextResponse.json({ error: commentsError.message }, { status: 500 });
    }
    return NextResponse.json({ post, comments: comments || [] });
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
