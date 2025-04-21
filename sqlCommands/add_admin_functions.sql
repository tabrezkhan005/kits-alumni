-- Create or replace the function for admins to get all registration requests
CREATE OR REPLACE FUNCTION admin_get_all_register_requests()
RETURNS SETOF "public"."register_requests"
LANGUAGE sql SECURITY DEFINER
AS $$
  SELECT * FROM "public"."register_requests";
$$;

-- Grant execute permission on the function to authenticated users
GRANT EXECUTE ON FUNCTION admin_get_all_register_requests() TO authenticated;

-- Drop the existing function first since we're changing the return type
DROP FUNCTION IF EXISTS admin_update_request_status(UUID, TEXT);

-- Create or update the admin function for updating status
-- Add more robust error handling and debugging
CREATE OR REPLACE FUNCTION admin_update_request_status(request_id UUID, new_status TEXT)
RETURNS JSON
LANGUAGE plpgsql SECURITY DEFINER
AS $$
DECLARE
  result_count INTEGER;
  result_record RECORD;
BEGIN
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

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION admin_update_request_status(UUID, TEXT) TO authenticated;
