import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json();
    if (!email || !otp) {
      return NextResponse.json({ success: false, message: 'Email and OTP are required.' }, { status: 400 });
    }

    // Fetch OTP record
    const { data: otpRecord, error: fetchError } = await supabaseAdmin
      .from('admin_otps')
      .select('*')
      .eq('email', email)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (fetchError || !otpRecord) {
      return NextResponse.json({ success: false, message: 'Invalid or expired OTP.' }, { status: 400 });
    }

    // Check expiry
    if (new Date(otpRecord.expires_at) < new Date()) {
      // Delete expired OTP
      await supabaseAdmin.from('admin_otps').delete().eq('id', otpRecord.id);
      return NextResponse.json({ success: false, message: 'OTP has expired.' }, { status: 400 });
    }

    // Check OTP directly (no hashing)
    if (otp !== otpRecord.otp_hash) {
      return NextResponse.json({ success: false, message: 'Invalid OTP.' }, { status: 400 });
    }

    // Delete OTP record
    await supabaseAdmin.from('admin_otps').delete().eq('id', otpRecord.id);

    return NextResponse.json({ success: true, message: 'OTP verified. Admin access granted.' });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ success: false, message: 'Server error.', error: error?.toString?.() || String(error) }, { status: 500 });
  }
}
