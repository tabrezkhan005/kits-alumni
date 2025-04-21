import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

// SQL to recreate the blogs table from scratch
const RECREATE_TABLE_SQL = `
-- Drop the existing blogs table if it exists
DROP TABLE IF EXISTS public.blogs CASCADE;

-- Create a fresh blogs table
CREATE TABLE public.blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  blog TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Disable RLS initially
ALTER TABLE public.blogs DISABLE ROW LEVEL SECURITY;

-- Add table comment
COMMENT ON TABLE public.blogs IS 'Stores blog posts created by students which can be approved or denied by admin.';

-- Create permissive RLS policies
-- Re-enable RLS with very permissive policies
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- Allow all operations for authenticated users
CREATE POLICY "blogs_all_policy"
ON public.blogs
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Allow service role full access
CREATE POLICY "blogs_service_role_policy"
ON public.blogs
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Allow public to view approved blogs
CREATE POLICY "blogs_public_policy"
ON public.blogs
FOR SELECT
TO anon
USING (status = 'approved');

-- Add RPC helper functions
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

-- Grant permissions
GRANT SELECT ON public.blogs TO anon;
GRANT ALL ON public.blogs TO authenticated;
GRANT ALL ON public.blogs TO service_role;
GRANT EXECUTE ON FUNCTION add_student_blog TO authenticated;
GRANT EXECUTE ON FUNCTION get_student_blogs TO authenticated;
`;

export async function POST() {
  try {
    // Execute the SQL to recreate the blogs table
    const { error } = await supabaseAdmin.rpc('exec_sql', { sql: RECREATE_TABLE_SQL });

    if (error) {
      console.error('Error recreating blogs table:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Add a test blog post to verify everything works
    const testBlogSQL = `
      INSERT INTO blogs (name, title, blog, status)
      VALUES ('Test Student', 'Test Blog', 'This is a test blog post to verify the table works correctly.', 'pending')
      RETURNING *;
    `;

    const { data: testBlog, error: testError } = await supabaseAdmin.rpc('exec_sql', { sql: testBlogSQL });

    if (testError) {
      console.error('Error creating test blog:', testError);
      return NextResponse.json({
        success: true,
        message: 'Blogs table recreated but test blog failed',
        error: testError.message
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Blogs table completely reset and recreated successfully',
      testBlog: testBlog && testBlog.length > 0 ? testBlog[0] : null
    });
  } catch (error) {
    console.error('Error in reset-blogs-table API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
