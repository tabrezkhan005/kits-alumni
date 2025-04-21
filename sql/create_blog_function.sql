-- SQL function to create blog entries without RLS restrictions
CREATE OR REPLACE FUNCTION create_blog_entry(_name text, _title text, _blog text)
RETURNS uuid AS $$
DECLARE
  _blog_id uuid;
BEGIN
  -- Insert the blog entry
  INSERT INTO blogs (name, title, blog, status)
  VALUES (_name, _title, _blog, 'pending')
  RETURNING id INTO _blog_id;

  -- Return the ID of the created blog
  RETURN _blog_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
