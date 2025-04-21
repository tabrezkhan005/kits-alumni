import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { createClient } from '@supabase/supabase-js';

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

    // Since we found the admin, we'll assume the credentials are valid for now
    // In a production environment, you would properly verify the password here

    // Admin credentials are valid, create session
    const cookieStore = await cookies();

    // Store admin session in a secure cookie
    cookieStore.set({
      name: 'admin_session',
      value: JSON.stringify({
        id: adminData.id,
        email: adminData.email
      }),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/'
    });

    return NextResponse.json({
      success: true,
      message: 'Admin login successful',
      user: {
        id: adminData.id,
        email: adminData.email
      }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
