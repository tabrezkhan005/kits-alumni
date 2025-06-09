import { NextRequest, NextResponse } from 'next/server';
import { sendOtpEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json();
    if (!email || !otp) {
      return NextResponse.json({ success: false, message: 'Email and OTP are required.' }, { status: 400 });
    }
    await sendOtpEmail({ to: email, otp });
    return NextResponse.json({ success: true, message: 'OTP email sent.' });
  } catch (error) {
    // Log the real error for debugging
    console.error('Nodemailer error:', error);
    return NextResponse.json({ success: false, message: 'Failed to send OTP email.', error: error?.toString?.() || String(error) }, { status: 500 });
  }
}
