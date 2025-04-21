import { supabase } from './supabase';
import type { AuthResponse, User } from '@supabase/supabase-js';

/**
 * Interface for login credentials
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Interface for registration data
 */
export interface RegistrationData extends LoginCredentials {
  full_name?: string;
}

/**
 * Sign in a user with email and password
 * @param credentials - Email and password for login
 * @returns AuthResponse from Supabase
 */
export const signIn = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const { email, password } = credentials;
  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return response;
};

/**
 * Sign up a new user
 * @param data - Registration data including email and password
 * @returns AuthResponse from Supabase
 */
export const signUp = async (data: RegistrationData): Promise<AuthResponse> => {
  const { email, password, full_name } = data;

  // Create the user
  const response = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name,
      },
    },
  });

  // If successful and we have a user, create a profile
  if (response.data.user) {
    await createProfile(response.data.user, { full_name });
  }

  return response;
};

/**
 * Sign out the current user
 * @returns Promise<void>
 */
export const signOut = async (): Promise<void> => {
  await supabase.auth.signOut();
};

/**
 * Create a profile for a newly registered user
 * @param user - The user object
 * @param data - Additional profile data
 */
const createProfile = async (
  user: User,
  data: { full_name?: string }
): Promise<void> => {
  const { error } = await supabase.from('profiles').insert({
    id: user.id,
    full_name: data.full_name || null,
    created_at: new Date().toISOString(),
  });

  if (error) {
    console.error('Error creating profile:', error);
  }
};

/**
 * Get the current logged-in user
 * @returns The current user or null if not logged in
 */
export const getCurrentUser = async (): Promise<User | null> => {
  const { data } = await supabase.auth.getUser();
  return data.user;
};
