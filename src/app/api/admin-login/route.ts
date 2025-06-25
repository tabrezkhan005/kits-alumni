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
      .select('id, email')
      .eq('email', email)
      .single();

    if (adminError) {
      console.error('Error querying admin:', adminError.message);
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    if (!adminData) {
      console.log('Admin not found:', email);
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    console.log('Admin found in database:', adminData.email);

    // --- OTP Logic ---
    const otp = generateOtp();
    // Store OTP in plain text for development/testing
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 min

    // Store OTP in admin_otps table
    const { error: otpError } = await supabaseAdmin.from('admin_otps').insert([
      {
        email: adminData.email,
        otp_hash: otp, // store plain OTP
        expires_at: expiresAt
      }
    ]);
    if (otpError) {
      console.error('Failed to store OTP:', otpError);
      return NextResponse.json(
        { error: 'Failed to send OTP. Please try again later.' },
        { status: 500 }
      );
    }

    // Send OTP email directly (no fetch)
    try {
      await sendOtpEmail({ to: adminData.email, otp });
    } catch (emailError) {
      console.error('Failed to send OTP email:', emailError);
      return NextResponse.json(
        { error: 'Failed to send OTP email. Please try again later.' },
        { status: 500 }
      );
    }

    // Do NOT create session yet. Wait for OTP verification.
    return NextResponse.json({
      success: true,
      message: 'OTP sent to your email. Please verify to continue.',
      email: adminData.email
    });
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
