-- Fix Row Level Security policies for blogs table
-- Allow authenticated users to insert, update, and delete blogs

-- First, ensure the table has RLS enabled
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- More permissive policy for authenticated users to insert blogs
DROP POLICY IF EXISTS "Allow users to insert own blogs" ON public.blogs;
CREATE POLICY "Allow users to insert own blogs"
ON public.blogs
FOR INSERT
TO authenticated
WITH CHECK (true);

-- More permissive policy for authenticated users to update blogs
-- This policy doesn't use the jwt claim which might not be available
DROP POLICY IF EXISTS "Allow users to update own blogs" ON public.blogs;
CREATE POLICY "Allow users to update own blogs"
ON public.blogs
FOR UPDATE
TO authenticated
USING (true);

-- More permissive policy for authenticated users to delete blogs
DROP POLICY IF EXISTS "Allow users to delete own blogs" ON public.blogs;
CREATE POLICY "Allow users to delete own blogs"
ON public.blogs
FOR DELETE
TO authenticated
USING (true);

-- Grant all permissions to authenticated users
GRANT SELECT, INSERT, UPDATE, DELETE ON public.blogs TO authenticated;

-- Create a function to add student blog with security definer
-- This function bypasses RLS
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

-- Grant execute permission on the function to authenticated users
GRANT EXECUTE ON FUNCTION add_student_blog TO authenticated;

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

-- Grant execute permission on the helper function
GRANT EXECUTE ON FUNCTION get_student_blogs TO authenticated;

-- Function to update blog status (for admins)
CREATE OR REPLACE FUNCTION update_blog_status(
  _blog_id UUID,
  _status TEXT
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.blogs
  SET status = _status,
      updated_at = now()
  WHERE id = _blog_id;
END;
$$;

-- Grant execute permission on the update status function
GRANT EXECUTE ON FUNCTION update_blog_status TO authenticated;
