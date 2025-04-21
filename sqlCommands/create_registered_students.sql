-- Create the registered_students table
CREATE TABLE IF NOT EXISTS "public"."registered_students" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "first_name" TEXT NOT NULL,
  "last_name" TEXT NOT NULL,
  "reg_number" TEXT NOT NULL UNIQUE,
  "batch_year" TEXT NOT NULL,
  "branch" TEXT NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "password_hash" TEXT NOT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  "updated_at" TIMESTAMP WITH TIME ZONE
);

-- Enable Row Level Security
ALTER TABLE "public"."registered_students" ENABLE ROW LEVEL SECURITY;

-- Create policy to allow only authenticated users to view the registered students
CREATE POLICY "Authenticated users can view registered students"
ON "public"."registered_students"
FOR SELECT
TO authenticated
USING (true);

-- Create policy to allow only admins to modify the table (if needed)
CREATE POLICY "Only admins can insert/update/delete registered students"
ON "public"."registered_students"
FOR ALL
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin');

-- Create a function to handle moving approved students to the registered_students table
CREATE OR REPLACE FUNCTION admin_approve_student(request_id UUID)
RETURNS JSON
LANGUAGE plpgsql SECURITY DEFINER
AS $$
DECLARE
  student_record RECORD;
  result_id UUID;
BEGIN
  -- First, check if the request exists and is pending
  SELECT * INTO student_record
  FROM "public"."register_requests"
  WHERE id = request_id AND status = 'pending';

  IF student_record IS NULL THEN
    RETURN json_build_object(
      'success', FALSE,
      'message', 'Request not found or already processed',
      'error', 'NOT_FOUND'
    );
  END IF;

  -- Check if student with this email or reg_number already exists in registered_students
  IF EXISTS (SELECT 1 FROM "public"."registered_students" WHERE email = student_record.email) THEN
    -- Update the register_request status but return error
    UPDATE "public"."register_requests"
    SET status = 'denied', updated_at = NOW()
    WHERE id = request_id;

    RETURN json_build_object(
      'success', FALSE,
      'message', 'A student with this email already exists',
      'error', 'DUPLICATE_EMAIL'
    );
  END IF;

  IF EXISTS (SELECT 1 FROM "public"."registered_students" WHERE reg_number = student_record.reg_number) THEN
    -- Update the register_request status but return error
    UPDATE "public"."register_requests"
    SET status = 'denied', updated_at = NOW()
    WHERE id = request_id;

    RETURN json_build_object(
      'success', FALSE,
      'message', 'A student with this registration number already exists',
      'error', 'DUPLICATE_REG_NUMBER'
    );
  END IF;

  -- Insert the student into registered_students table
  INSERT INTO "public"."registered_students" (
    first_name,
    last_name,
    reg_number,
    batch_year,
    branch,
    email,
    password_hash
  ) VALUES (
    student_record.first_name,
    student_record.last_name,
    student_record.reg_number,
    student_record.batch_year,
    student_record.branch,
    student_record.email,
    student_record.password_hash
  )
  RETURNING id INTO result_id;

  -- Update the register_request status to approved
  UPDATE "public"."register_requests"
  SET status = 'approved', updated_at = NOW()
  WHERE id = request_id;

  -- Return success response with student ID
  RETURN json_build_object(
    'success', TRUE,
    'message', 'Student approved and registered successfully',
    'student_id', result_id
  );

EXCEPTION
  WHEN OTHERS THEN
    -- Rollback register_request status if there was an error
    RETURN json_build_object(
      'success', FALSE,
      'message', 'Error registering student: ' || SQLERRM,
      'error', SQLSTATE
    );
END;
$$;

-- Grant execute permission on the function to authenticated users
GRANT EXECUTE ON FUNCTION admin_approve_student(UUID) TO authenticated;

-- Update admin_update_request_status function to call admin_approve_student when approving
CREATE OR REPLACE FUNCTION admin_update_request_status(request_id UUID, new_status TEXT)
RETURNS JSON
LANGUAGE plpgsql SECURITY DEFINER
AS $$
DECLARE
  result_count INTEGER;
  result_record RECORD;
  approve_result JSON;
BEGIN
  -- If the new status is 'approved', use the approve_student function
  IF new_status = 'approved' THEN
    approve_result := admin_approve_student(request_id);
    RETURN approve_result;
  END IF;

  -- For any other status (like 'denied'), proceed with normal status update
  -- First, check if the record exists
  SELECT COUNT(*) INTO result_count
  FROM "public"."register_requests"
  WHERE id = request_id;

  IF result_count = 0 THEN
    RAISE EXCEPTION 'Record with ID % not found', request_id;
  END IF;

  -- Update the record
  UPDATE "public"."register_requests"
  SET
    status = new_status,
    updated_at = NOW()
  WHERE id = request_id;

  -- Check if the update was successful by getting affected row count
  GET DIAGNOSTICS result_count = ROW_COUNT;

  IF result_count = 0 THEN
    RAISE EXCEPTION 'Update failed, no rows affected';
  END IF;

  -- Verify the update by reading the record back
  SELECT * INTO result_record
  FROM "public"."register_requests"
  WHERE id = request_id;

  -- Return success info with the updated record
  RETURN json_build_object(
    'success', TRUE,
    'message', 'Status updated successfully',
    'record', row_to_json(result_record)
  );
EXCEPTION
  WHEN OTHERS THEN
    RETURN json_build_object(
      'success', FALSE,
      'message', SQLERRM,
      'error', SQLSTATE
    );
END;
$$;

-- Grant execute permission on the updated function
GRANT EXECUTE ON FUNCTION admin_update_request_status(UUID, TEXT) TO authenticated;
