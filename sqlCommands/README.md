# SQL Commands for KITS College Alumni Portal

This directory contains SQL migration scripts for setting up and maintaining the Supabase database for the KITS College Alumni Portal.

## How to Apply Migrations

The migrations should be applied in numerical order (prefix numbers). There are two ways to apply these migrations:

### Option 1: Using Supabase Migration API

Use the `supabase` CLI or our application's migration utility:

```bash
# Using our migration utility in the application
# (Requires admin access to Supabase)
npm run db:migrate

# OR using Supabase CLI directly
supabase db push
```

### Option 2: Manual Execution

1. Log in to your Supabase dashboard
2. Go to the SQL Editor
3. Copy and paste the contents of each migration file
4. Execute the SQL commands in order

## Migration Files

- `00001_create_register_requests.sql` - Creates the RegisterRequests table for handling alumni registration
- `create_profiles_bucket.sql` - Creates and configures the profiles storage bucket for storing profile pictures
- `00002_connect_profiles_to_register_requests.sql` - Connects the profiles storage bucket to RegisterRequests table
- `test_profiles_bucket.sql` - Test script to verify the profiles bucket configuration

## Troubleshooting

If you encounter issues with profile picture uploads, follow these steps:

1. Run the `create_profiles_bucket.sql` script to ensure the storage bucket is properly configured
2. Run the `test_profiles_bucket.sql` script to verify the configuration works properly
3. Check the browser console for detailed error messages
4. Ensure that Storage is enabled in your Supabase project
5. Verify that the RLS policies are correctly allowing authenticated users to upload files

Common errors:
- Empty error object (`{}`) usually indicates a policy issue - ensure users have proper permissions to upload to the bucket
- "Bucket not found" indicates the bucket wasn't created properly - run the `create_profiles_bucket.sql` script
- MIME type errors could mean the file format isn't in the allowed_mime_types - update the bucket configuration

## Database Schema

### RegisterRequests Table

This table stores registration requests from alumni before approval by administrators.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key, linked to auth.users |
| first_name | TEXT | First name of the alumni |
| last_name | TEXT | Last name of the alumni |
| reg_number | TEXT | Unique registration number |
| batch_year | TEXT | Graduation batch year |
| branch | TEXT | Branch/department of study |
| email | TEXT | Email address (unique) |
| password_hash | TEXT | Hashed password (stored in auth) |
| linkedin_url | TEXT | Optional LinkedIn profile URL |
| profile_picture_url | TEXT | URL to profile picture |
| status | TEXT | Status of request (pending/approved/rejected) |
| requested_at | TIMESTAMP | When the request was submitted |
| updated_at | TIMESTAMP | When the request was last updated |

### Storage Integration

The `profiles` bucket in Supabase Storage is connected to the RegisterRequests table through a foreign key relationship:

- Storage objects in the `profiles` bucket can be linked to a RegisterRequest record
- A trigger automatically connects uploaded profile pictures to the corresponding user based on the path
- Path format uses registration number as folder: `{reg_number}/{filename}`
- Security policies ensure users can only upload their own profile pictures, but all profiles are publicly viewable

#### Profiles Bucket Configuration

The profiles bucket has the following configuration:

- **File Size Limit**: 50MB (52428800 bytes)
- **Allowed MIME Types**: image/jpeg, image/png, image/gif, image/webp, image/svg+xml
- **Public Access**: Enabled for viewing images

#### Profiles Bucket Security Policies

The profiles bucket has the following security policies:

1. Authenticated users can upload profile pictures
2. Public access for viewing profile pictures
3. Users can only update their own profile pictures
4. Users can only delete their own profile pictures

## Security Policies

The RegisterRequests table uses Row Level Security (RLS) with the following policies:

1. Users can insert their own registration requests
2. Users can view only their own registration requests
3. Admins can view all registration requests
4. Only admins can update registration requests (for approval/rejection)
