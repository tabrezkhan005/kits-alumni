import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST() {
  try {
    // Remove duplicate blogs (keep the earliest per (name, title, blog, day))
    const sql = `
      DELETE FROM blogs WHERE id IN (
        SELECT id FROM (
          SELECT id, ROW_NUMBER() OVER (PARTITION BY name, title, blog, DATE(created_at) ORDER BY created_at) AS rn
          FROM blogs
        ) t
        WHERE t.rn > 1
      )
    `;
    const { error } = await supabaseAdmin.rpc('exec_sql', { sql });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
