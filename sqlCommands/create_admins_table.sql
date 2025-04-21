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
  -- Ensure pgcrypto extension is available for password hashing
  CREATE EXTENSION IF NOT EXISTS pgcrypto;

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

-- Grant permissions on functions
GRANT EXECUTE ON FUNCTION check_admin_login TO authenticated;
GRANT EXECUTE ON FUNCTION check_admin_login TO anon;
GRANT EXECUTE ON FUNCTION admin_email_exists TO authenticated;
GRANT EXECUTE ON FUNCTION admin_email_exists TO anon;

-- Only grant execute on add_admin to service_role (used by backend)
GRANT EXECUTE ON FUNCTION add_admin TO service_role;

-- Grant permissions on admins table (only to service_role)
GRANT ALL ON public.admins TO service_role;

-- Initialize with a default admin account (Please change this email and password in production!)
SELECT add_admin('admin@kitscollege.com', 'adminPass123');
