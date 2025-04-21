import { NextResponse, type NextRequest } from 'next/server';

/**
 * Middleware to protect admin routes
 * Checks for admin session cookie and redirects to login if not present
 */
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Only apply middleware to admin routes
  if (pathname.startsWith('/admin')) {
    // Check for admin session cookie
    const adminSessionCookie = request.cookies.get('admin_session');
    const isAdminLoggedIn = !!adminSessionCookie?.value;

    // If accessing admin routes without admin session, redirect to login
    if (!isAdminLoggedIn) {
      const url = new URL('/login', request.url);
      url.searchParams.set('redirect', encodeURIComponent(pathname));
      return NextResponse.redirect(url);
    }
  }

  // Continue normal request processing
  return NextResponse.next();
}

/**
 * Match only admin routes
 * This ensures middleware only runs for admin routes
 */
export const config = {
  matcher: ['/admin/:path*']
};
