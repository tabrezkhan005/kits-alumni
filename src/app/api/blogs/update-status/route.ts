import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

/**
 * API endpoint to update blog status
 * Uses the admin client to bypass RLS policies
 */
export async function POST(request: Request) {
  try {
    console.log('Update blog status API called');

    // Parse request body
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json(
        { error: 'Blog ID and status are required' },
        { status: 400 }
      );
    }

    console.log(`Updating blog ${id} to status: ${status}`);

    // Method 1: Direct update with the admin client
    try {
      const { data, error } = await supabaseAdmin
        .from('blogs')
        .update({
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select();

      if (error) {
        console.error('Error updating blog status with admin client:', error);
        throw error;
      }

      console.log('Blog updated successfully with admin client:', data);
      return NextResponse.json({
        success: true,
        message: `Blog status updated to ${status}`,
        data
      });
    } catch (directUpdateError) {
      console.error('Direct update failed:', directUpdateError);

      // Method 2: Try using SQL through exec_sql RPC
      try {
        const updateSQL = `
          UPDATE blogs
          SET status = '${status.replace(/'/g, "''")}',
              updated_at = now()
          WHERE id = '${id.replace(/'/g, "''")}'
          RETURNING id, status;
        `;

        const { data: sqlResult, error: sqlError } = await supabaseAdmin.rpc(
          'exec_sql',
          { sql: updateSQL }
        );

        if (sqlError) {
          console.error('Error executing SQL update:', sqlError);
          throw sqlError;
        }

        console.log('Blog updated successfully with SQL:', sqlResult);
        return NextResponse.json({
          success: true,
          message: `Blog status updated to ${status} using SQL`,
          data: sqlResult
        });
      } catch (sqlError) {
        console.error('SQL update failed:', sqlError);
        throw sqlError;
      }
    }
  } catch (error: any) {
    console.error('Error in update-status API:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to update blog status'
      },
      { status: 500 }
    );
  }
}
