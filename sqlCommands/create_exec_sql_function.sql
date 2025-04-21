-- Create a function to execute SQL statements dynamically
-- This is a powerful function and should be used with caution
-- Only grant execute permissions to trusted roles

CREATE OR REPLACE FUNCTION exec_sql(sql TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSONB;
  affected_rows INTEGER;
BEGIN
  -- For SELECT statements and other queries that return rows
  IF sql ~* '^(SELECT|INSERT.*RETURNING|UPDATE.*RETURNING|DELETE.*RETURNING)' THEN
    EXECUTE sql INTO result;
    RETURN result;
  ELSE
    -- For statements that don't return rows (e.g., INSERT without RETURNING)
    EXECUTE sql;
    GET DIAGNOSTICS affected_rows = ROW_COUNT;
    RETURN jsonb_build_object('success', true, 'affected_rows', affected_rows);
  END IF;
EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object('success', false, 'error', SQLERRM);
END;
$$;

-- Grant execute permission to authenticated users
-- In production, consider restricting this to admin roles only
GRANT EXECUTE ON FUNCTION exec_sql TO authenticated;
