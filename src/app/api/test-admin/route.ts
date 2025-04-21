import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

/**
 * Test endpoint for admin database checks
 * This will help us debug the admin login issue
 */
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // First check: try the check_admin_login function
    const { data: loginCheck, error: loginError } = await supabaseAdmin.rpc('check_admin_login', {
      _email: email,
      _password: password
    });

    // Second check: directly query the admins table to see if the email exists
    const { data: adminData, error: adminError } = await supabaseAdmin
      .from('admins')
      .select('email')
      .eq('email', email)
      .limit(1);

    // Third check: try to insert a test admin if needed
    let insertResult = null;
    if (!adminData || adminData.length === 0) {
      const { data: insertData, error: insertError } = await supabaseAdmin.rpc('add_admin', {
        _email: email,
        _password: password
      });

      insertResult = {
        success: !insertError,
        data: insertData,
        error: insertError ? insertError.message : null
      };
    }

    // Return all diagnostic information
    return NextResponse.json({
      diagnostics: true,
      loginCheckResult: {
        success: !loginError,
        data: loginCheck,
        error: loginError ? loginError.message : null
      },
      adminExistsCheck: {
        exists: adminData && adminData.length > 0,
        data: adminData,
        error: adminError ? adminError.message : null
      },
      insertResult
    });
  } catch (error) {
    console.error('Test admin error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
