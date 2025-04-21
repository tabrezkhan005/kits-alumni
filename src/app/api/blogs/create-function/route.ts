import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

/**
 * API endpoint to create a database function for updating blog status
 * This only needs to be called once to set up the function
 */
export async function POST() {
  try {
    console.log('Creating update_blog_status function');

    // Create RPC function to update blog status
    const createFunctionSQL = `
      -- Create or replace the function to update blog status
      CREATE OR REPLACE FUNCTION update_blog_status(blog_id uuid, new_status text)
      RETURNS SETOF blogs
      LANGUAGE sql
      SECURITY DEFINER
      AS $$
        UPDATE blogs
        SET
          status = new_status,
          updated_at = now()
        WHERE id = blog_id
        RETURNING *;
      $$;

      -- Grant execute permission to authenticated users
      GRANT EXECUTE ON FUNCTION update_blog_status(uuid, text) TO authenticated;
      GRANT EXECUTE ON FUNCTION update_blog_status(uuid, text) TO anon;
    `;

    const { data, error } = await supabaseAdmin.rpc('exec_sql', { sql: createFunctionSQL });

    if (error) {
      console.error('Error creating function:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    console.log('Function created successfully:', data);
    return NextResponse.json({
      success: true,
      message: 'update_blog_status function created successfully',
      data
    });
  } catch (error: any) {
    console.error('Error in create-function API:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create function' },
      { status: 500 }
    );
  }
}
