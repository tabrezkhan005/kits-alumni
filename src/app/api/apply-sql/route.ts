import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

/**
 * This API route executes SQL commands against the database.
 * It is for administrative purposes only and should be protected.
 */
export async function POST(request: Request) {
  try {
    // In a real application, you would validate authorization here
    // This could include checking for admin credentials or specific roles

    // Get the SQL to execute from the request
    const { sql } = await request.json();

    if (!sql) {
      return NextResponse.json(
        { error: 'SQL statement is required' },
        { status: 400 }
      );
    }

    // Execute the SQL using the admin client
    const { data, error } = await supabaseAdmin.rpc('exec_sql', { sql });

    if (error) {
      console.error('Error executing SQL:', error);
      return NextResponse.json(
        { error: `Failed to execute SQL: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in SQL execution API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
