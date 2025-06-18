import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get('email');
  if (!email) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  // Fetch admin by email and check is_verified
  const { data: admin, error } = await supabaseAdmin
    .from('admins')
    .select('id, email, is_verified')
    .eq('email', email)
    .maybeSingle();
  if (error || !admin || !admin.is_verified) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  // Set session cookie and redirect to /admin
  const response = NextResponse.redirect(new URL('/admin', request.url));
  response.cookies.set('admin_session', JSON.stringify({ id: admin.id, email: admin.email }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // 1 day
    path: '/'
  });
  return response;
}
