import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ success: false, message: 'Email is required.' }, { status: 400 });
    }
    // Fetch admin by email and check is_verified
    const { data: admin, error } = await supabaseAdmin
      .from('admins')
      .select('id, email, is_verified')
      .eq('email', email)
      .maybeSingle();
    if (error || !admin) {
      return NextResponse.json({ success: false, message: 'Admin not found.' }, { status: 404 });
    }
    if (!admin.is_verified) {
      return NextResponse.json({ success: false, message: 'Admin not verified.' }, { status: 403 });
    }
    // Set session cookie
    const cookieStore = cookies();
    cookieStore.set({
      name: 'admin_session',
      value: JSON.stringify({ id: admin.id, email: admin.email }),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/'
    });
    return NextResponse.json({ success: true, message: 'Session created.' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Server error.', error }, { status: 500 });
  }
}
