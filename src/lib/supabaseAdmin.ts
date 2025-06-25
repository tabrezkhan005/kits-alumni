import { createClient } from '@supabase/supabase-js';

// Get environment variables with proper error handling
const getSupabaseUrl = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable. Please check your .env file.');
  }
  return url;
};

const getServiceRoleKey = () => {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable. Please check your .env file.');
  }
  return key;
};

/**
 * Creates and exports a Supabase admin client with service role key.
 * This client has admin privileges and can bypass RLS policies.
 *
 * IMPORTANT: This should only be used in server-side contexts
 * and never exposed to the client.
 */
export const supabaseAdmin = createClient(
  getSupabaseUrl(),
  getServiceRoleKey()
);

/**
 * Helper function for debugging Supabase admin configuration
 */
export const checkSupabaseAdminConfig = () => {
  const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
  const hasServiceKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY;

  console.log('Supabase Admin Configuration:');
  console.log('- URL configured:', hasUrl);
  console.log('- Service Role Key configured:', hasServiceKey);

  return { hasUrl, hasServiceKey };
};
