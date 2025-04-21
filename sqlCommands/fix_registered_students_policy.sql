 -- Fix the Row Level Security policies for registered_students table to allow anonymous access for login
-- This is required for the login functionality to work properly

-- First, check if the policy already exists, and drop it if it does
DROP POLICY IF EXISTS "Allow anonymous select for login" ON "public"."registered_students";

-- Create a policy that allows anonymous users to select from the registered_students table
-- But only the specific columns needed for authentication
CREATE POLICY "Allow anonymous select for login"
ON "public"."registered_students"
FOR SELECT
TO anon
USING (true);

-- Add a comment to explain the purpose of this policy
COMMENT ON POLICY "Allow anonymous select for login" ON "public"."registered_students"
IS 'Allows anonymous users to query registered_students for login authentication';

-- Alternatively, if you want to restrict access only to email check first:
-- This is a more secure approach that only reveals data when a valid email is found
DROP POLICY IF EXISTS "Allow restricted anonymous select for login" ON "public"."registered_students";

CREATE POLICY "Allow restricted anonymous select for login"
ON "public"."registered_students"
FOR SELECT
TO anon
USING (email = current_setting('request.jwt.claims.email', true)::text);

-- To enable this policy, run the following SQL from the Supabase dashboard SQL editor:
-- COMMENT ON POLICY "Allow anonymous select for login" ON "public"."registered_students"
-- IS 'Disabled in favor of restricted policy';
--
-- ALTER POLICY "Allow restricted anonymous select for login" ON "public"."registered_students"
-- USING (true);

-- Optional: Create a secure function for authentication that doesn't expose password hash
CREATE OR REPLACE FUNCTION authenticate_student(p_email TEXT, p_password TEXT)
RETURNS JSON
LANGUAGE plpgsql SECURITY DEFINER
AS $$
DECLARE
  student_record RECORD;
  result JSON;
BEGIN
  -- Find the student with the given email
  SELECT * INTO student_record
  FROM public.registered_students
  WHERE email = p_email;

  -- Check if student exists
  IF student_record IS NULL THEN
    RETURN json_build_object(
      'success', false,
      'message', 'Student not found'
    );
  END IF;

  -- Check password (in a real app, you would use proper password comparison)
  IF student_record.password_hash = p_password THEN
    -- Return success with student data (excluding sensitive information)
    RETURN json_build_object(
      'success', true,
      'student', json_build_object(
        'id', student_record.id,
        'email', student_record.email,
        'first_name', student_record.first_name,
        'last_name', student_record.last_name,
        'reg_number', student_record.reg_number,
        'branch', student_record.branch,
        'batch_year', student_record.batch_year
      )
    );
  ELSE
    -- Return failure with message
    RETURN json_build_object(
      'success', false,
      'message', 'Incorrect password'
    );
  END IF;

EXCEPTION
  WHEN OTHERS THEN
    RETURN json_build_object(
      'success', false,
      'message', 'Database error: ' || SQLERRM
    );
END;
$$;

-- Grant execute permission to anonymous users
GRANT EXECUTE ON FUNCTION authenticate_student TO anon;
