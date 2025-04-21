-- Create blogs table with proper structure
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

-- Add RLS (Row Level Security)
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- Create policies for different access patterns

-- 1. Allow all authenticated users to view blogs (regardless of status)
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

-- 3. Allow service role full access
CREATE POLICY "Allow service role full access to blogs"
ON public.blogs
TO service_role
USING (true)
WITH CHECK (true);

-- 4. Allow authenticated users to insert blogs
CREATE POLICY "Allow users to insert own blogs"
ON public.blogs
FOR INSERT
TO authenticated
WITH CHECK (true);

-- 5. Allow authenticated users to update their own blogs
CREATE POLICY "Allow users to update own blogs"
ON public.blogs
FOR UPDATE
TO authenticated
USING (name = auth.uid()::text);

-- 6. Allow authenticated users to delete their own blogs
CREATE POLICY "Allow users to delete own blogs"
ON public.blogs
FOR DELETE
TO authenticated
USING (name = auth.uid()::text);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS blogs_status_idx ON public.blogs (status);
CREATE INDEX IF NOT EXISTS blogs_name_idx ON public.blogs (name);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_blogs_modified_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = now();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_blogs_timestamp ON public.blogs;
CREATE TRIGGER set_blogs_timestamp
BEFORE UPDATE ON public.blogs
FOR EACH ROW
EXECUTE FUNCTION update_blogs_modified_column();

-- Function to get blogs with pagination and filtering
CREATE OR REPLACE FUNCTION get_blogs(
  _status TEXT DEFAULT NULL,
  _name TEXT DEFAULT NULL,
  _limit INTEGER DEFAULT 10,
  _offset INTEGER DEFAULT 0
)
RETURNS SETOF public.blogs
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT *
  FROM public.blogs
  WHERE
    (_status IS NULL OR status = _status) AND
    (_name IS NULL OR name = _name)
  ORDER BY created_at DESC
  LIMIT _limit
  OFFSET _offset;
$$;

-- Create a function to count blogs with filtering
CREATE OR REPLACE FUNCTION count_blogs(
  _status TEXT DEFAULT NULL,
  _name TEXT DEFAULT NULL
)
RETURNS INTEGER
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT COUNT(*)::INTEGER
  FROM public.blogs
  WHERE
    (_status IS NULL OR status = _status) AND
    (_name IS NULL OR name = _name);
$$;

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

-- Grant permissions on tables and functions
GRANT SELECT ON public.blogs TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.blogs TO authenticated;
GRANT ALL ON public.blogs TO service_role;

-- Grant permissions on functions
GRANT EXECUTE ON FUNCTION get_blogs TO authenticated;
GRANT EXECUTE ON FUNCTION get_blogs TO anon;
GRANT EXECUTE ON FUNCTION get_blogs TO service_role;

GRANT EXECUTE ON FUNCTION count_blogs TO authenticated;
GRANT EXECUTE ON FUNCTION count_blogs TO anon;
GRANT EXECUTE ON FUNCTION count_blogs TO service_role;

GRANT EXECUTE ON FUNCTION add_student_blog TO authenticated;
GRANT EXECUTE ON FUNCTION get_student_blogs TO authenticated;
