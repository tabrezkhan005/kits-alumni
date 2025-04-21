import { NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';

// Create a Supabase client with the service role key for admin access
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function GET() {
  try {
    // Check the RLS policies on the achievements table
    const { data: policies, error: policiesError } = await supabaseAdmin
      .rpc('get_policies')
      .contains('table_name', 'achievements');

    if (policiesError) {
      console.error('Error fetching policies:', policiesError);
      return NextResponse.json({ error: 'Failed to fetch policies' }, { status: 500 });
    }

    // Try to fetch the achievements
    const { data: achievements, error: achievementsError } = await supabaseAdmin
      .from('achievements')
      .select('*')
      .limit(5);

    // Try to update an achievement using the service role
    const { data: updateResult, error: updateError } = await supabaseAdmin
      .from('achievements')
      .update({ status: 'pending' })
      .eq('status', 'pending') // This is a no-op update to test write access
      .select()
      .limit(1);

    return NextResponse.json({
      success: true,
      policies,
      achievements: achievements ? achievements.slice(0, 2) : null, // Just return first 2 for brevity
      achievementsError,
      updateResult,
      updateError,
      env: {
        hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY
      }
    });
  } catch (error) {
    console.error('Error in check-achievements-policy:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
