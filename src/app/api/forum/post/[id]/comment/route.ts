import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest, context: { params: { id: string } }) {
  const { id: post_id } = context.params;
  if (!post_id) {
    return NextResponse.json({ error: 'Missing post id' }, { status: 400 });
  }
  try {
    const { content, author_id } = await req.json();
    if (!content || !author_id) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const { error: insertError } = await supabase
      .from('comments')
      .insert([{ post_id, content, author_id }]);
    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }
    // Fetch updated comments
    const { data: comments, error: commentsError } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', post_id)
      .order('created_at', { ascending: true });
    if (commentsError) {
      return NextResponse.json({ error: commentsError.message }, { status: 500 });
    }
    return NextResponse.json({ comments: comments || [] }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
