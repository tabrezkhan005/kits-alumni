import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { createClient } from '@supabase/supabase-js';
import { generateOtp, hashOtp } from '@/lib/otp';
import { sendOtpEmail } from '@/lib/email.server';

/**
 * Admin login endpoint
 * Directly checks admin credentials against the admins table
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

    console.log(`Admin login attempt for: ${email}`);

    // DIRECT DATABASE APPROACH:
    // First, check if the admin exists in the database
    const { data: adminData, error: adminError } = await supabaseAdmin
      .from('admins')
      .select('id, email, password_hash')
      .eq('email', email)
      .single();

    if (adminError) {
      console.error('Error querying admin:', adminError.message);
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    if (!adminData || adminData.password_hash !== password) {
      console.log('Admin not found or invalid password:', email);
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    console.log('Admin found in database:', adminData.email);

    // Provide generic bypass for OTP: Directly set session cookie
    const sessionCookie = JSON.stringify({ id: adminData.id, email: adminData.email });

    // We create the response object so we can set the cookie
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      email: adminData.email
    });

    response.cookies.set('admin_session', sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/'
    });

    return response;
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
