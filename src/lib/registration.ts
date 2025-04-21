import { supabase } from './supabase';

/**
 * Interface for the registration form data
 */
export interface RegistrationFormData {
  firstName: string;
  lastName: string;
  regNumber: string;
  batchYear: string;
  branch: string;
  email: string;
  password: string;
  confirmPassword?: string;
  linkedinUrl?: string;
}

/**
 * Submit registration data to Supabase
 * This function handles creating a record in the register_requests table directly using Supabase client
 */
export const submitRegistration = async (
  formData: RegistrationFormData
): Promise<{ success: boolean; message: string; error?: any }> => {
  try {
    console.log('Starting registration process for:', formData.email);

    // First check if a user with this email or registration number already exists
    // Check for existing email
    const { data: existingEmail } = await supabase
      .from('register_requests')
      .select('email')
      .eq('email', formData.email)
      .maybeSingle();

    if (existingEmail) {
      return {
        success: false,
        message: 'You are already an existing user'
      };
    }

    // Check for existing registration number
    const { data: existingRegNumber } = await supabase
      .from('register_requests')
      .select('reg_number')
      .eq('reg_number', formData.regNumber)
      .maybeSingle();

    if (existingRegNumber) {
      return {
        success: false,
        message: 'This registration number is already registered'
      };
    }

    // Call the stored procedure for registration which bypasses RLS
    console.log('Calling create_register_request stored procedure');
    const { data, error: rpcError } = await supabase.rpc('create_register_request', {
      first_name_param: formData.firstName,
      last_name_param: formData.lastName,
      reg_number_param: formData.regNumber,
      batch_year_param: formData.batchYear,
      branch_param: formData.branch,
      email_param: formData.email,
      password_param: formData.password,
      linkedin_url_param: formData.linkedinUrl || null
    });

    if (rpcError) {
      console.error('RPC call failed:', rpcError);
      return {
        success: false,
        message: rpcError.message || 'Registration failed. Please try again later.',
        error: rpcError
      };
    }

    return {
      success: true,
      message: 'Your registration request has successfully been registered. Please wait for approval'
    };
  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again later.',
      error
    };
  }
};
