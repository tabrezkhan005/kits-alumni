import { supabase } from './supabase';
import { supabaseAdmin } from './supabaseAdmin';
import { generateOtp, hashOtp } from './otp';
import { sendOtpEmail } from './email.server';

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

export const submitRegistrationServer = async (
  formData: RegistrationFormData
): Promise<{ success: boolean; message: string; error?: any }> => {
  try {
    // ...existing registration logic up to OTP...
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
      return {
        success: false,
        message: rpcError.message || 'Registration failed. Please try again later.',
        error: rpcError
      };
    }
    // --- OTP Logic for Admin Registration ---
    const isAdminRegistration = true; // <-- Replace with real check if needed
    if (isAdminRegistration) {
      const otp = generateOtp();
      const otpHash = hashOtp(otp);
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();
      const { error: otpError } = await supabase.from('admin_otps').insert([
        {
          email: formData.email,
          otp_hash: otpHash,
          expires_at: expiresAt
        }
      ]);
      if (otpError) {
        return {
          success: false,
          message: 'Failed to send OTP. Please try again later.',
          error: otpError
        };
      }
      try {
        await sendOtpEmail({ to: formData.email, otp });
      } catch (emailError) {
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
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again later.',
      error
    };
  }
};

export async function getAllStudentEmails(): Promise<string[]> {
  const { data, error } = await supabaseAdmin
    .from('registered_students')
    .select('email');
  if (error) throw error;
  return (data || []).map((row: { email: string }) => row.email).filter(Boolean);
}
