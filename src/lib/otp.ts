import crypto from 'crypto';

/**
 * Generates a 6-digit numeric OTP as a string
 */
export function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Hashes the OTP using SHA256 for secure storage
 */
export function hashOtp(otp: string): string {
  return crypto.createHash('sha256').update(otp).digest('hex');
}
