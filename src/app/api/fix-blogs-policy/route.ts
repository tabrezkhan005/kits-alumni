import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

// SQL to fix the blogs table policy
const POLICY_FIX_SQL = `
-- Enable RLS on blogs table
ALTER TABLE IF EXISTS public.blogs ENABLE ROW LEVEL SECURITY;

-- Remove any existing policies to avoid conflicts
DROP POLICY IF EXISTS "Allow users to insert own blogs" ON public.blogs;
DROP POLICY IF EXISTS "Allow authenticated users to view blogs" ON public.blogs;
DROP POLICY IF EXISTS "Allow public to view approved blogs" ON public.blogs;
DROP POLICY IF EXISTS "Allow service role full access to blogs" ON public.blogs;

-- Create more permissive policies
-- 1. Allow all authenticated users to view all blogs
CREATE POLICY "Allow authenticated users to view blogs"
ON public.blogs
FOR SELECT
TO authenticated
USING (true);

-- 2. Allow anonymous users to view approved blogs only
CREATE POLICY "Allow public to view approved blogs"
ON public.blogs
FOR SELECT
TO anon
USING (status = 'approved');

-- 3. Allow authenticated users to insert blogs
CREATE POLICY "Allow authenticated users to insert blogs"
ON public.blogs
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Ensure the add_student_blog function exists and is permissive
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

-- Ensure the get_student_blogs function exists
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

-- Grant proper permissions
GRANT SELECT ON public.blogs TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.blogs TO authenticated;
GRANT EXECUTE ON FUNCTION add_student_blog TO authenticated;
GRANT EXECUTE ON FUNCTION get_student_blogs TO authenticated;
`;

export async function POST() {
  try {
    // Execute the SQL to fix policies
    const { error } = await supabaseAdmin.rpc('exec_sql', { sql: POLICY_FIX_SQL });

    if (error) {
      console.error('Error fixing blogs policy:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Try to create the blogs table if it doesn't exist
    const createTableSQL = `
    CREATE TABLE IF NOT EXISTS public.blogs (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      title TEXT NOT NULL,
      blog TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    );
    `;

    const { error: createTableError } = await supabaseAdmin.rpc('exec_sql', { sql: createTableSQL });

    if (createTableError) {
      console.error('Error creating blogs table:', createTableError);
      // Continue anyway, as the table might already exist
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error in fix-blogs-policy API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
