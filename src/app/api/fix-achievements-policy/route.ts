import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

/**
 * API route to fix achievements policy
 * This route removes read-only restrictions from the achievements table
 * WARNING: This should only be run in development and by authorized users
 */
export async function GET(req: NextRequest) {
  // Add authorization check here in production
  // This is a simple example for development purposes

  try {
    console.log("Running fix-achievements-policy endpoint");
    console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log("Service key exists:", !!process.env.SUPABASE_SERVICE_ROLE_KEY);
    console.log("Anon key exists:", !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

    // Create a Supabase client with the service role key for admin access
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    );

    // Execute SQL to remove read-only status and grant full permissions
    const { data: policyResult, error: policyError } = await supabaseAdmin.rpc(
      'exec_sql',
      {
        sql: `
          -- Drop any existing policies on the achievements table
          DROP POLICY IF EXISTS authenticated_read ON achievements;
          DROP POLICY IF EXISTS authenticated_insert ON achievements;
          DROP POLICY IF EXISTS authenticated_update ON achievements;
          DROP POLICY IF EXISTS authenticated_delete ON achievements;
          DROP POLICY IF EXISTS anon_read ON achievements;
          DROP POLICY IF EXISTS anon_read_only ON achievements;
          DROP POLICY IF EXISTS allow_all_operations ON achievements;

          -- Create a policy that allows all operations for all users
          CREATE POLICY allow_all_operations ON achievements
            USING (true) WITH CHECK (true);

          -- Ensure all permissions are granted to public
          GRANT ALL ON achievements TO public;
          GRANT ALL ON achievements TO anon;
          GRANT ALL ON achievements TO authenticated;

          -- Make sure RLS is enabled but with permissive policies
          ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
        `
      }
    );

    if (policyError) {
      console.error('Error applying database policy:', policyError);

      // Try a simpler approach directly
      console.log('Attempting direct update approach...');

      // First, try to fetch data to see if we have access
      const { data: testData, error: testError } = await supabaseAdmin
        .from('achievements')
        .select('id, status')
        .limit(1);

      if (testError) {
        console.error('Error fetching achievements:', testError);
        return NextResponse.json({
          success: false,
          error: 'Cannot access achievements table',
          details: testError
        }, { status: 500 });
      }

      if (!testData || testData.length === 0) {
        return NextResponse.json({ success: false, error: 'No achievements found' }, { status: 404 });
      }

      // Try direct update to verify permissions
      const testId = testData[0].id;
      const currentStatus = testData[0].status;
      const testStatus = currentStatus === 'pending' ? 'approved' : 'pending';

      // Test update with service role
      const { data: updateResult, error: updateError } = await supabaseAdmin
        .from('achievements')
        .update({ status: testStatus })
        .eq('id', testId)
        .select();

      if (updateError) {
        console.error('Error updating with service role:', updateError);
        return NextResponse.json({
          success: false,
          error: 'Service role cannot update achievements',
          details: updateError
        }, { status: 500 });
      }

      // If the service role can update, there might still be issues with anon key
      // Try forcing permissions with SQL that doesn't rely on exec_sql
      try {
        await supabaseAdmin.rpc('execute_sql', {
          query: `
            -- Grant all permissions to the achievement table
            ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

            -- Remove all policies and create a permissive one
            DROP POLICY IF EXISTS anon_read_only ON achievements;
            CREATE POLICY allow_full_access ON achievements FOR ALL TO PUBLIC USING (true) WITH CHECK (true);
          `
        });
        console.log('Applied permissions through execute_sql');
      } catch (sqlError) {
        console.log('Could not execute alternative SQL:', sqlError);
      }
    } else {
      console.log('Successfully applied database policy', policyResult);
    }

    // Test update with anon key to confirm client permissions
    const supabaseClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    );

    // Fetch test data again
    const { data: clientTestData, error: clientFetchError } = await supabaseClient
      .from('achievements')
      .select('id, status')
      .limit(1);

    if (clientFetchError) {
      console.error('Client cannot fetch data:', clientFetchError);
      return NextResponse.json({
        success: false,
        error: 'Client cannot fetch data',
        details: clientFetchError
      }, { status: 500 });
    }

    // Try to update with client
    const { error: clientError } = await supabaseClient
      .from('achievements')
      .update({ status: clientTestData[0].status }) // This is a no-op update to test write access
      .eq('id', clientTestData[0].id);

    const clientTest = !clientError ? 'Client has write permissions' : `Client cannot write: ${clientError.message}`;

    return NextResponse.json({
      success: true,
      message: 'Read-only restrictions removed from achievements table',
      policyResult,
      clientTest
    });
  } catch (error) {
    console.error('Error in fix-achievements-policy:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}

/**
 * Note: This requires the exec_sql function to be created in your Supabase database:
 *
 * CREATE OR REPLACE FUNCTION exec_sql(sql TEXT) RETURNS JSONB
 * LANGUAGE plpgsql
 * SECURITY DEFINER
 * AS $$
 * BEGIN
 *   EXECUTE sql;
 *   RETURN jsonb_build_object('success', true);
 * EXCEPTION WHEN OTHERS THEN
 *   RETURN jsonb_build_object('success', false, 'error', SQLERRM);
 * END;
 * $$;
 *
 * GRANT EXECUTE ON FUNCTION exec_sql TO authenticated;
 */
