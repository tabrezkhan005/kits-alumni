import { supabase } from './supabase';
import { generateOtp, hashOtp } from './otp';
import { sendOtpEmail } from './email';

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

    // --- OTP Logic for Admin Registration ---
    // If this registration is for an admin, generate and send OTP
    // TODO: Add a real check to determine if this is an admin registration
    const isAdminRegistration = true; // <-- Replace with real check if needed
    if (isAdminRegistration) {
      const otp = generateOtp();
      const otpHash = hashOtp(otp);
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 minutes from now

      // Store OTP in admin_otps table
      const { error: otpError } = await supabase.from('admin_otps').insert([
        {
          email: formData.email,
          otp_hash: otpHash,
          expires_at: expiresAt
        }
      ]);
      if (otpError) {
        console.error('Failed to store OTP:', otpError);
        return {
          success: false,
          message: 'Failed to send OTP. Please try again later.',
          error: otpError
        };
      }

      // Send OTP email directly (no fetch)
      try {
        await sendOtpEmail({ to: formData.email, otp });
      } catch (emailError) {
        console.error('Failed to send OTP email:', emailError);
        return {
          success: false,
          message: 'Failed to send OTP email. Please try again later.',
          error: emailError
        };
      }
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
