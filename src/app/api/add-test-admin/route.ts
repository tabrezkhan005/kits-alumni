import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

/**
 * Test endpoint to add an admin user to the database
 * IMPORTANT: This should be removed or secured in production
 */
export async function POST(request: NextRequest) {
  try {
    // Only allow in development
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json({ error: 'Not available in production' }, { status: 403 });
    }

    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Call the add_admin function to create a new admin
    const { data, error } = await supabaseAdmin.rpc('add_admin', {
      _email: email,
      _password: password
    });

    if (error) {
      console.error('Failed to add test admin:', error.message);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // Also try to directly insert an admin as fallback
    let directInsertResult = null;
    if (!data) {
      try {
        const { data: insertData, error: insertError } = await supabaseAdmin
          .from('admins')
          .insert({
            email: email,
            password: password // Note: This is unsafe as it's not hashed, but it's just for testing
          })
          .select('id');

        directInsertResult = {
          success: !insertError,
          data: insertData,
          error: insertError ? insertError.message : null
        };
      } catch (err) {
        console.error('Direct insert error:', err);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Test admin added successfully',
      adminId: data || null,
      directInsertResult
    });
  } catch (error) {
    console.error('Add test admin error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
