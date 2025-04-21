import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

/**
 * Simple public endpoint to add a test admin for debugging purposes
 * Use at your own risk and remove in production
 */
export async function GET(request: NextRequest) {
  try {
    const defaultEmail = "admin@test.com";
    const defaultPassword = "password123";

    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get('email') || defaultEmail;
    const password = searchParams.get('password') || defaultPassword;

    console.log(`Attempting to add admin: ${email}`);

    // First try direct database insertion
    try {
      const { data: insertResult, error: insertError } = await supabaseAdmin
        .from('admins')
        .insert({
          email: email,
          password: password  // This is not secure but for testing only
        })
        .select('id');

      if (!insertError) {
        return NextResponse.json({
          success: true,
          message: `Admin created successfully: ${email}`,
          adminId: insertResult?.[0]?.id
        });
      }

      console.log('Insert error:', insertError.message);
    } catch (err) {
      console.error('Direct insertion failed:', err);
    }

    // If direct insertion failed, try the RPC function
    const { data, error } = await supabaseAdmin.rpc('add_admin', {
      _email: email,
      _password: password
    });

    if (error) {
      console.error('Error adding admin via RPC:', error.message);
      return NextResponse.json({
        success: false,
        error: error.message
      });
    }

    return NextResponse.json({
      success: true,
      message: `Admin created successfully via RPC: ${email}`,
      adminId: data
    });
  } catch (error) {
    console.error('Admin creation error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
