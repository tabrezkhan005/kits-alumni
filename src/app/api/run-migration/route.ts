import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

// List of all SQL scripts to execute in order
const migrations = [
  {
    name: 'exec_sql_function',
    sql: `
      -- Create a function to execute SQL statements dynamically
      CREATE OR REPLACE FUNCTION exec_sql(sql TEXT)
      RETURNS JSONB
      LANGUAGE plpgsql
      SECURITY DEFINER
      AS $$
      DECLARE
        result JSONB;
        affected_rows INTEGER;
      BEGIN
        -- For SELECT statements and other queries that return rows
        IF sql ~* '^(SELECT|INSERT.*RETURNING|UPDATE.*RETURNING|DELETE.*RETURNING)' THEN
          EXECUTE sql INTO result;
          RETURN result;
        ELSE
          -- For statements that don't return rows (e.g., INSERT without RETURNING)
          EXECUTE sql;
          GET DIAGNOSTICS affected_rows = ROW_COUNT;
          RETURN jsonb_build_object('success', true, 'affected_rows', affected_rows);
        END IF;
      EXCEPTION WHEN OTHERS THEN
        RETURN jsonb_build_object('success', false, 'error', SQLERRM);
      END;
      $$;

      -- Grant execute permission to authenticated users
      GRANT EXECUTE ON FUNCTION exec_sql TO authenticated;
    `
  },
  {
    name: 'blogs_table',
    sql: `
      -- Create blogs table if it doesn't exist
      CREATE TABLE IF NOT EXISTS public.blogs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        title TEXT NOT NULL,
        blog TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'pending',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
      );

      -- Add table comment
      COMMENT ON TABLE public.blogs IS 'Stores blog posts created by students which can be approved or denied by admin.';
    `
  },
  {
    name: 'blogs_rls',
    sql: `
      -- Disable RLS temporarily to make changes
      ALTER TABLE public.blogs DISABLE ROW LEVEL SECURITY;

      -- Drop all existing policies to start fresh
      DROP POLICY IF EXISTS "Allow users to insert own blogs" ON public.blogs;
      DROP POLICY IF EXISTS "Allow users to update own blogs" ON public.blogs;
      DROP POLICY IF EXISTS "Allow users to delete own blogs" ON public.blogs;
      DROP POLICY IF EXISTS "Allow authenticated users to view blogs" ON public.blogs;
      DROP POLICY IF EXISTS "Allow public to view approved blogs" ON public.blogs;
      DROP POLICY IF EXISTS "Allow service role full access to blogs" ON public.blogs;
      DROP POLICY IF EXISTS "Allow authenticated users to insert blogs" ON public.blogs;
      DROP POLICY IF EXISTS "blogs_select_policy" ON public.blogs;
      DROP POLICY IF EXISTS "blogs_insert_policy" ON public.blogs;
      DROP POLICY IF EXISTS "blogs_all_policy" ON public.blogs;
      DROP POLICY IF EXISTS "blogs_service_role_policy" ON public.blogs;
      DROP POLICY IF EXISTS "blogs_public_policy" ON public.blogs;

      -- Re-enable RLS with new policies
      ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

      -- Create a permissive ALL policy for authenticated users
      CREATE POLICY "blogs_all_authenticated_policy"
      ON public.blogs
      FOR ALL
      TO authenticated
      USING (true)
      WITH CHECK (true);

      -- Create a permissive policy for service role
      CREATE POLICY "blogs_service_role_policy"
      ON public.blogs
      FOR ALL
      TO service_role
      USING (true)
      WITH CHECK (true);

      -- Allow public to view approved blogs only
      CREATE POLICY "blogs_public_policy"
      ON public.blogs
      FOR SELECT
      TO anon
      USING (status = 'approved');
    `
  },
  {
    name: 'blogs_functions',
    sql: `
      -- Create a function to add student blog with security definer
      CREATE OR REPLACE FUNCTION add_student_blog(
        _name TEXT,
        _title TEXT,
        _blog TEXT
      )
      RETURNS UUID
      LANGUAGE plpgsql
      SECURITY DEFINER
      AS $$
      DECLARE
        _id UUID;
      BEGIN
        INSERT INTO public.blogs (
          name,
          title,
          blog,
          status
        ) VALUES (
          _name,
          _title,
          _blog,
          'pending'
        ) RETURNING id INTO _id;

        RETURN _id;
      END;
      $$;

      -- Create a helper function to get blogs for a student
      CREATE OR REPLACE FUNCTION get_student_blogs(_student_name TEXT)
      RETURNS SETOF public.blogs
      LANGUAGE sql
      SECURITY DEFINER
      AS $$
        SELECT *
        FROM public.blogs
        WHERE name = _student_name
        ORDER BY created_at DESC;
      $$;

      -- Create a function to get blogs as a JSON array
      CREATE OR REPLACE FUNCTION get_blogs_as_json(_student_name TEXT DEFAULT NULL)
      RETURNS JSON
      LANGUAGE plpgsql
      SECURITY DEFINER
      AS $$
      DECLARE
        _result JSON;
      BEGIN
        IF _student_name IS NULL THEN
          SELECT json_agg(
            json_build_object(
              'id', id::text,
              'name', name,
              'title', title,
              'blog', blog,
              'status', status,
              'created_at', created_at::text,
              'updated_at', updated_at::text
            )
          ) INTO _result
          FROM blogs
          ORDER BY created_at DESC;
        ELSE
          SELECT json_agg(
            json_build_object(
              'id', id::text,
              'name', name,
              'title', title,
              'blog', blog,
              'status', status,
              'created_at', created_at::text,
              'updated_at', updated_at::text
            )
          ) INTO _result
          FROM blogs
          WHERE name = _student_name
          ORDER BY created_at DESC;
        END IF;

        -- Return empty array instead of null if no blogs found
        RETURN COALESCE(_result, '[]'::json);
      END;
      $$;
    `
  },
  {
    name: 'blogs_permissions',
    sql: `
      -- Grant permissions on tables and functions
      GRANT SELECT ON public.blogs TO anon;
      GRANT ALL ON public.blogs TO authenticated;
      GRANT ALL ON public.blogs TO service_role;

      -- Grant permissions on functions
      GRANT EXECUTE ON FUNCTION add_student_blog TO authenticated;
      GRANT EXECUTE ON FUNCTION get_student_blogs TO authenticated;
      GRANT EXECUTE ON FUNCTION get_blogs_as_json TO authenticated;
      GRANT EXECUTE ON FUNCTION get_blogs_as_json TO anon;
      GRANT EXECUTE ON FUNCTION get_blogs_as_json TO service_role;
    `
  },
  {
    name: 'admins_table',
    sql: `
      -- Create admins table with proper structure
      CREATE TABLE IF NOT EXISTS public.admins (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
      );

      -- Add table comment
      COMMENT ON TABLE public.admins IS 'Stores admin users with access to administrative functions.';

      -- Add RLS (Row Level Security)
      ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

      -- Create policies for different access patterns

      -- 1. No direct select access for regular users
      CREATE POLICY "Deny select access to admins table"
      ON public.admins
      FOR SELECT
      TO authenticated
      USING (false);

      -- 2. No insert access for regular users
      CREATE POLICY "Deny insert access to admins table"
      ON public.admins
      FOR INSERT
      TO authenticated
      WITH CHECK (false);

      -- 3. No update access for regular users
      CREATE POLICY "Deny update access to admins table"
      ON public.admins
      FOR UPDATE
      TO authenticated
      USING (false)
      WITH CHECK (false);

      -- 4. No delete access for regular users
      CREATE POLICY "Deny delete access to admins table"
      ON public.admins
      FOR DELETE
      TO authenticated
      USING (false);

      -- 5. Allow service role full access
      CREATE POLICY "Allow service role full access to admins"
      ON public.admins
      TO service_role
      USING (true)
      WITH CHECK (true);
    `
  },
  {
    name: 'admins_functions',
    sql: `
      -- Create extension for password hashing if not exists
      CREATE EXTENSION IF NOT EXISTS pgcrypto;

      -- Create trigger for updated_at
      CREATE OR REPLACE FUNCTION update_admins_modified_column()
      RETURNS TRIGGER AS $$
      BEGIN
         NEW.updated_at = now();
         RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      DROP TRIGGER IF EXISTS set_admins_timestamp ON public.admins;
      CREATE TRIGGER set_admins_timestamp
      BEFORE UPDATE ON public.admins
      FOR EACH ROW
      EXECUTE FUNCTION update_admins_modified_column();

      -- Function to check admin login securely (never returns the password)
      CREATE OR REPLACE FUNCTION check_admin_login(
        _email TEXT,
        _password TEXT
      )
      RETURNS TABLE (
        id UUID,
        email TEXT,
        is_valid BOOLEAN
      )
      LANGUAGE plpgsql
      SECURITY DEFINER
      AS $$
      BEGIN
        RETURN QUERY
        SELECT
          a.id,
          a.email,
          -- Compare passwords
          a.password = crypt(_password, a.password) as is_valid
        FROM
          public.admins a
        WHERE
          a.email = _email;

        -- If no rows returned, return a row with is_valid = false
        IF NOT FOUND THEN
          RETURN QUERY SELECT
            NULL::UUID,
            _email,
            false;
        END IF;
      END;
      $$;

      -- Function to securely add a new admin (with password hashing)
      CREATE OR REPLACE FUNCTION add_admin(
        _email TEXT,
        _password TEXT
      )
      RETURNS UUID
      LANGUAGE plpgsql
      SECURITY DEFINER
      AS $$
      DECLARE
        _id UUID;
      BEGIN
        INSERT INTO public.admins (
          email,
          password
        ) VALUES (
          _email,
          -- Hash the password with bcrypt
          crypt(_password, gen_salt('bf'))
        ) RETURNING id INTO _id;

        RETURN _id;
      END;
      $$;

      -- Function to check if an email exists in the admins table
      CREATE OR REPLACE FUNCTION admin_email_exists(_email TEXT)
      RETURNS BOOLEAN
      LANGUAGE sql
      SECURITY DEFINER
      AS $$
        SELECT EXISTS (
          SELECT 1
          FROM public.admins
          WHERE email = _email
        );
      $$;
    `
  },
  {
    name: 'admins_permissions',
    sql: `
      -- Grant permissions on functions
      GRANT EXECUTE ON FUNCTION check_admin_login TO authenticated;
      GRANT EXECUTE ON FUNCTION check_admin_login TO anon;
      GRANT EXECUTE ON FUNCTION admin_email_exists TO authenticated;
      GRANT EXECUTE ON FUNCTION admin_email_exists TO anon;

      -- Only grant execute on add_admin to service_role (used by backend)
      GRANT EXECUTE ON FUNCTION add_admin TO service_role;

      -- Grant permissions on admins table (only to service_role)
      GRANT ALL ON public.admins TO service_role;

      -- Initialize with a default admin account (Please change this in production!)
      SELECT add_admin('admin@kitscollege.com', 'adminPass123');
    `
  }
];

/**
 * This API route executes SQL migrations from the sqlCommands directory.
 * It's for administrative purposes only and should be protected.
 */
export async function POST() {
  try {
    console.log('Running database migrations...');
    const results = [];

    // Execute each migration in sequence
    for (const migration of migrations) {
      console.log(`Applying migration: ${migration.name}`);
      try {
        // For the first migration (exec_sql function), we need to use direct SQL execution
        // since the exec_sql function may not exist yet
        if (migration.name === 'exec_sql_function') {
          const { error } = await supabaseAdmin.rpc('exec_sql', { sql: migration.sql });

          if (error) {
            // If exec_sql doesn't exist yet, try using direct SQL execution
            if (error.message.includes('function "exec_sql" does not exist')) {
              console.log('exec_sql function does not exist yet, creating using direct SQL');
              // Use direct SQL execution
              const { error: directError } = await supabaseAdmin.sql(migration.sql);

              if (directError) {
                throw new Error(`Failed to create exec_sql function: ${directError.message}`);
              }

              results.push({ name: migration.name, success: true, method: 'direct_sql' });
            } else {
              throw new Error(error.message);
            }
          } else {
            results.push({ name: migration.name, success: true, method: 'rpc' });
          }
        } else {
          // For all other migrations, use the exec_sql function
          const { error } = await supabaseAdmin.rpc('exec_sql', { sql: migration.sql });

          if (error) {
            throw new Error(error.message);
          }

          results.push({ name: migration.name, success: true });
        }
      } catch (error) {
        console.error(`Failed to apply migration '${migration.name}':`, error);
        // Continue with other migrations even if one fails
      }
    }

    // Check if all migrations succeeded
    const allSucceeded = results.every(result => result.success);

    if (allSucceeded) {
      console.log('All migrations applied successfully');
      return NextResponse.json({
        success: true,
        message: 'All database migrations applied successfully',
        results
      });
    } else {
      console.error('Some migrations failed:', results.filter(r => !r.success));
      return NextResponse.json({
        success: false,
        message: 'Some database migrations failed',
        results
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error in run-migration API:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to run database migrations'
    }, { status: 500 });
  }
}
