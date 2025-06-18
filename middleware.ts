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

    console.log('Middleware - Path:', pathname);
    console.log('Middleware - Cookie found:', !!adminSessionCookie);

    // Basic validation of cookie existence and structure
    let isValidSession = false;
    if (adminSessionCookie?.value) {
      try {
        const session = JSON.parse(adminSessionCookie.value);
        isValidSession = !!(session?.id && session?.email);
        console.log('Middleware - Valid session:', isValidSession);
      } catch (error) {
        console.log('Middleware - Cookie parse error:', error);
        isValidSession = false;
      }
    }

    // If accessing admin routes without valid admin session, redirect to login
    if (!isValidSession) {
      console.log('Middleware - Redirecting to login from:', pathname);
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
