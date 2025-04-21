-- Fix Row Level Security policies for achievements table
-- Allow authenticated users to insert, update, and delete achievements

-- First, ensure the table has RLS enabled
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;

-- More permissive policy for authenticated users to insert achievements
DROP POLICY IF EXISTS "Allow users to insert own achievements" ON public.achievements;
CREATE POLICY "Allow users to insert own achievements"
ON public.achievements
FOR INSERT
TO authenticated
WITH CHECK (true);

-- More permissive policy for authenticated users to update achievements
-- This policy doesn't use the jwt claim which might not be available
DROP POLICY IF EXISTS "Allow users to update own achievements" ON public.achievements;
CREATE POLICY "Allow users to update own achievements"
ON public.achievements
FOR UPDATE
TO authenticated
USING (true);

-- More permissive policy for authenticated users to delete achievements
DROP POLICY IF EXISTS "Allow users to delete own achievements" ON public.achievements;
CREATE POLICY "Allow users to delete own achievements"
ON public.achievements
FOR DELETE
TO authenticated
USING (true);

-- Grant all permissions to authenticated users
GRANT SELECT, INSERT, UPDATE, DELETE ON public.achievements TO authenticated;

-- Create a function to add student achievement with security definer
-- This function bypasses RLS
CREATE OR REPLACE FUNCTION add_student_achievement(
  _name TEXT,
  _subject TEXT,
  _description TEXT,
  _date DATE,
  _type TEXT
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  _id UUID;
BEGIN
  INSERT INTO public.achievements (
    name,
    subject,
    description,
    date,
    type,
    status
  ) VALUES (
    _name,
    _subject,
    _description,
    _date,
    _type,
    'pending'
  ) RETURNING id INTO _id;

  RETURN _id;
END;
$$;

-- Grant execute permission on the function to authenticated users
GRANT EXECUTE ON FUNCTION add_student_achievement TO authenticated;

-- Create a helper function to get achievements for a student
CREATE OR REPLACE FUNCTION get_student_achievements(_student_name TEXT)
RETURNS SETOF public.achievements
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT *
  FROM public.achievements
  WHERE name = _student_name
  ORDER BY created_at DESC;
$$;

-- Grant execute permission on the helper function
GRANT EXECUTE ON FUNCTION get_student_achievements TO authenticated;
