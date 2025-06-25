import { supabaseAdmin } from './supabaseAdmin';

/**
 * Fetch all registered student emails (server-only)
 */
export async function getAllStudentEmails(): Promise<string[]> {
  const { data, error } = await supabaseAdmin
    .from('registered_students')
    .select('email');
  if (error) throw error;
  return (data || []).map((row: { email: string }) => row.email).filter(Boolean);
}
