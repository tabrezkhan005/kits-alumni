import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

/**
 * Function to check if the current user is logged in as an admin
 * This checks for the admin_session cookie which is set during admin login
 *
 * @returns Object with admin status and admin information
 */
export async function getAdminSession() {
  try {
    const cookieStore = await cookies();
    const adminSessionCookie = cookieStore.get('admin_session');

    if (!adminSessionCookie) {
      return { isAdmin: false, admin: null };
    }

    // Parse the admin session
    const adminSession = JSON.parse(adminSessionCookie.value);

    if (!adminSession || !adminSession.id || !adminSession.email) {
      return { isAdmin: false, admin: null };
    }

    return {
      isAdmin: true,
      admin: {
        id: adminSession.id,
        email: adminSession.email
      }
    };
  } catch (error) {
    console.error('Error checking admin session:', error);
    return { isAdmin: false, admin: null };
  }
}

/**
 * Function to check if the current user is an admin from a request object
 * Useful in middleware or API routes
 *
 * @param request - The Next.js request object
 * @returns Object with admin status and admin information
 */
export function getAdminSessionFromRequest(request: NextRequest) {
  try {
    const adminSessionCookie = request.cookies.get('admin_session');

    if (!adminSessionCookie) {
      return { isAdmin: false, admin: null };
    }

    // Parse the admin session
    const adminSession = JSON.parse(adminSessionCookie.value);

    if (!adminSession || !adminSession.id || !adminSession.email) {
      return { isAdmin: false, admin: null };
    }

    return {
      isAdmin: true,
      admin: {
        id: adminSession.id,
        email: adminSession.email
      }
    };
  } catch (error) {
    console.error('Error checking admin session:', error);
    return { isAdmin: false, admin: null };
  }
}

/**
 * Function to clear the admin session (for logout)
 */
export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set({
    name: 'admin_session',
    value: '',
    expires: new Date(0),
    path: '/'
  });
}

/**
 * Function to validate admin auth for server components or API routes
 * Will throw an error if the user is not an admin
 */
export async function requireAdmin() {
  const { isAdmin, admin } = await getAdminSession();

  if (!isAdmin) {
    throw new Error('Admin authentication required');
  }

  return admin;
}
