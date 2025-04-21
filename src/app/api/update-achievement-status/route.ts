import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Create a Supabase client with the service role key for admin access
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function GET(req: NextRequest) {
  try {
    // Get id and status from query parameters
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    const status = url.searchParams.get('status');

    console.log(`API: Updating achievement ${id} to ${status}`);

    // Validate parameters
    if (!id || !status) {
      return NextResponse.json({ error: 'Missing id or status parameter' }, { status: 400 });
    }

    if (!['approved', 'pending', 'denied'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status value' }, { status: 400 });
    }

    // First check if achievement exists
    const { data: achievement, error: fetchError } = await supabaseAdmin
      .from('achievements')
      .select('id, status')
      .eq('id', id)
      .single();

    if (fetchError) {
      console.error('Error fetching achievement:', fetchError);
      return NextResponse.json({ error: 'Achievement not found' }, { status: 404 });
    }

    // No need to update if already at the desired status
    if (achievement.status === status) {
      return NextResponse.json({
        message: `Achievement already has status ${status}`,
        success: true,
        achievement
      });
    }

    // Update the achievement status
    const { data, error } = await supabaseAdmin
      .from('achievements')
      .update({
        status: status,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error updating achievement status:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: `Achievement updated to ${status} successfully`,
      data
    });

  } catch (error) {
    console.error('Error in update-achievement-status:', error);
    return NextResponse.json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
