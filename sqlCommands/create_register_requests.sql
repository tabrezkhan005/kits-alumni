-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create register_requests table based on registration form fields
CREATE TABLE IF NOT EXISTS "public"."register_requests" (
  "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
  "first_name" TEXT NOT NULL,
  "last_name" TEXT NOT NULL,
  "reg_number" TEXT NOT NULL,
  "batch_year" TEXT NOT NULL,
  "branch" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "password_hash" TEXT NOT NULL, -- Store only hashed passwords, never plain text
  "linkedin_url" TEXT,
  "status" TEXT NOT NULL DEFAULT 'pending', -- pending, approved, rejected
  "requested_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id"),
  UNIQUE ("email"),
  UNIQUE ("reg_number")
);

-- Add comment to table
COMMENT ON TABLE "public"."register_requests" IS 'Stores registration requests from alumni before approval';

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS register_requests_email_idx ON "public"."register_requests" ("email");

-- Create index on reg_number for faster lookups
CREATE INDEX IF NOT EXISTS register_requests_reg_number_idx ON "public"."register_requests" ("reg_number");

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS register_requests_status_idx ON "public"."register_requests" ("status");

-- Enable Row Level Security
ALTER TABLE "public"."register_requests" ENABLE ROW LEVEL SECURITY;

-- Create security policies
-- 1. Only authenticated users can insert their own registration requests
CREATE POLICY "Users can insert their own registration requests"
ON "public"."register_requests"
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

-- 2. Users can only view their own registration requests
CREATE POLICY "Users can view only their own registration requests"
ON "public"."register_requests"
FOR SELECT
TO authenticated
USING (auth.uid()::text = id::text);

-- 3. Only admins can view all registration requests
CREATE POLICY "Admins can view all registration requests"
ON "public"."register_requests"
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.uid() = id AND auth.users.is_super_admin = true
  )
);

-- 4. Only admins can update registration requests (for approval/rejection)
CREATE POLICY "Only admins can update registration requests"
ON "public"."register_requests"
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.uid() = id AND auth.users.is_super_admin = true
  )
);

-- Create trigger function to update the updated_at column
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = now();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic updated_at timestamp
CREATE TRIGGER update_register_requests_updated_at
BEFORE UPDATE ON "public"."register_requests"
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();
