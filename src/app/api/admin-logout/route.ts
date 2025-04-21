import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

/**
 * Admin logout endpoint
 * Clears the admin session cookie and any other admin-related cookies
 */
export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();

    // Clear the admin session cookie
    cookieStore.set({
      name: 'admin_session',
      value: '',
      expires: new Date(0),
      path: '/'
    });

    return NextResponse.json({
      success: true,
      message: 'Admin logged out successfully'
    });
  } catch (error) {
    console.error('Admin logout error:', error);
    return NextResponse.json({
      success: false,
      message: 'Error logging out'
    }, { status: 500 });
  }
}
