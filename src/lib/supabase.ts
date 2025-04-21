import { createClient } from '@supabase/supabase-js';

// Environment variables will need to be set in .env.local
// NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
// NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

// For debugging purposes, log the environment variables
console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL || 'not set');
console.log('Supabase Key exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

/**
 * Creates and exports a Supabase client with the public URL and anonymous key.
 * This client is used for browser-based requests with limited permissions.
 */
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

/**
 * Checks if the Supabase connection is properly configured.
 * This is useful for verifying that environment variables are set correctly.
 * @returns {Promise<boolean>} True if connection is successful, false otherwise
 */
export const checkSupabaseConnection = async (): Promise<boolean> => {
  try {
    // A simple query to check if connection works
    const { data, error } = await supabase.from('health_check').select('*').limit(1);

    if (error) {
      console.error('Supabase connection error:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Supabase connection check failed:', err);
    return false;
  }
};
