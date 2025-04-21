-- This SQL file connects the profiles storage bucket with the RegisterRequests table
-- It creates a foreign key relationship and a trigger to automatically link uploaded profile pictures
-- to the corresponding user's registration request

-- Add foreign key relationship between RegisterRequests and profiles bucket
ALTER TABLE storage.objects
ADD COLUMN IF NOT EXISTS register_request_id UUID REFERENCES public."RegisterRequests"(id);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS objects_register_request_id_idx ON storage.objects(register_request_id)
WHERE bucket_id = 'profiles';

-- Create function to link profile pictures to register requests based on path
CREATE OR REPLACE FUNCTION link_profile_to_register_request()
RETURNS TRIGGER AS $$
BEGIN
  -- Extract registration number from path (assuming format: reg_number/filename)
  DECLARE
    reg_number TEXT;
  BEGIN
    reg_number := split_part(NEW.name, '/', 1);

    -- Find the corresponding register request
    UPDATE storage.objects
    SET register_request_id = (
      SELECT id FROM public."RegisterRequests"
      WHERE reg_number = reg_number
      LIMIT 1
    )
    WHERE id = NEW.id AND bucket_id = 'profiles';

    RETURN NEW;
  END;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to link uploaded profiles to register requests
DROP TRIGGER IF EXISTS link_profile_trigger ON storage.objects;
CREATE TRIGGER link_profile_trigger
AFTER INSERT ON storage.objects
FOR EACH ROW
WHEN (NEW.bucket_id = 'profiles')
EXECUTE FUNCTION link_profile_to_register_request();

-- Add necessary storage bucket policies to allow public access to profile pictures
-- This allows displaying profile pictures on the public website

-- Allow public read access to all objects in the profiles bucket
CREATE POLICY "Public profiles are viewable by everyone."
ON storage.objects FOR SELECT
USING (bucket_id = 'profiles');

-- Allow authenticated users to insert objects into the profiles bucket
CREATE POLICY "Users can upload their own profile pictures."
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'profiles');

-- Add comment explaining the connection
COMMENT ON COLUMN storage.objects.register_request_id IS
'Links profile pictures in the profiles bucket to their corresponding RegisterRequests record';
