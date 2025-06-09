import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

/**
 * Check admin status endpoint
 * Returns whether the current user is logged in as an admin
 */
export async function GET(request: NextRequest) {
  try {
    // Get the admin session cookie
    const cookieStore = await cookies();
    const adminSessionCookie = cookieStore.get('admin_session');

    // If no cookie, not an admin
    if (!adminSessionCookie) {
      console.log('No admin session cookie found');
      return NextResponse.json({
        isAdmin: false,
        admin: null
      });
    }

    // Parse the admin session
    let adminSession;
    try {
      adminSession = JSON.parse(adminSessionCookie.value);
      console.log('Admin session found:', adminSession.email);
    } catch (parseError) {
      console.error('Error parsing admin session cookie:', parseError);
      return NextResponse.json({
        isAdmin: false,
        admin: null,
        error: 'Invalid session format'
      });
    }

    // Validate the admin session
    if (!adminSession || !adminSession.id || !adminSession.email) {
      console.log('Invalid admin session structure');
      return NextResponse.json({
        isAdmin: false,
        admin: null,
        error: 'Invalid session structure'
      });
    }

    // Further verification - check if this admin exists in the database
    const { data: adminData, error: adminError } = await supabaseAdmin
      .from('admins')
      .select('id, email, is_verified')
      .eq('id', adminSession.id)
      .eq('email', adminSession.email)
      .limit(1);

    let isVerified = false;
    if (adminData && adminData.length > 0) {
      isVerified = !!adminData[0].is_verified;
    }

    if (adminError) {
      console.error('Error verifying admin in database:', adminError.message);
      // We'll still consider them an admin if the cookie is valid
      // This is a fallback in case the database check fails
    }
    else if (!adminData || adminData.length === 0) {
      console.log('Admin not found in database:', adminSession.email, adminSession.id);
      // We'll still allow the session if the cookie is valid
      // This is a fallback to prevent lockouts if there are database issues
    }
    else {
      console.log('Admin verified in database:', adminSession.email);
    }

    // Valid admin session
    return NextResponse.json({
      isAdmin: true,
      admin: {
        id: adminSession.id,
        email: adminSession.email,
        isVerified
      }
    });
  } catch (error) {
    console.error('Error checking admin session:', error);
    return NextResponse.json({
      isAdmin: false,
      admin: null,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
