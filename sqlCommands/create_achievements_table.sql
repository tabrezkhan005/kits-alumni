-- Create achievements table with proper structure
CREATE TABLE IF NOT EXISTS public.achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add table comment
COMMENT ON TABLE public.achievements IS 'Stores achievements data for students and faculty. This table has public access for fetching data.';

-- Add RLS (Row Level Security)
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;

-- Create policies for different access patterns

-- 1. Allow all authenticated users to view achievements (regardless of status)
DROP POLICY IF EXISTS "Allow authenticated users to view achievements" ON public.achievements;
CREATE POLICY "Allow authenticated users to view achievements"
ON public.achievements
FOR SELECT
TO authenticated
USING (true);

-- 2. Allow anonymous users to view all achievements (regardless of status)
-- This ensures complete public access for fetching data
DROP POLICY IF EXISTS "Allow public to view achievements" ON public.achievements;
CREATE POLICY "Allow public to view achievements"
ON public.achievements
FOR SELECT
TO anon
USING (true);

-- 3. Allow service role full access
DROP POLICY IF EXISTS "Allow service role full access to achievements" ON public.achievements;
CREATE POLICY "Allow service role full access to achievements"
ON public.achievements
TO service_role
USING (true)
WITH CHECK (true);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS achievements_type_idx ON public.achievements (type);
CREATE INDEX IF NOT EXISTS achievements_date_idx ON public.achievements (date);
CREATE INDEX IF NOT EXISTS achievements_status_idx ON public.achievements (status);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = now();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_timestamp ON public.achievements;
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON public.achievements
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

-- Function to get achievements with pagination and filtering
-- Updated to include status filter
CREATE OR REPLACE FUNCTION get_achievements(
  _type TEXT DEFAULT NULL,
  _status TEXT DEFAULT NULL,
  _limit INTEGER DEFAULT 10,
  _offset INTEGER DEFAULT 0
)
RETURNS SETOF public.achievements
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT *
  FROM public.achievements
  WHERE
    (_type IS NULL OR type = _type) AND
    (_status IS NULL OR status = _status)
  ORDER BY date DESC
  LIMIT _limit
  OFFSET _offset;
$$;

-- Grant appropriate permissions on the function
-- Ensure public access for fetching data
GRANT EXECUTE ON FUNCTION get_achievements TO authenticated;
GRANT EXECUTE ON FUNCTION get_achievements TO anon;
GRANT EXECUTE ON FUNCTION get_achievements TO service_role;

-- Grant permissions on count function
-- Ensure public access for fetching counts
GRANT EXECUTE ON FUNCTION count_achievements TO authenticated;
GRANT EXECUTE ON FUNCTION count_achievements TO anon;
GRANT EXECUTE ON FUNCTION count_achievements TO service_role;

-- Grant direct table access to ensure complete public access
GRANT SELECT ON public.achievements TO anon;
GRANT SELECT ON public.achievements TO authenticated;
