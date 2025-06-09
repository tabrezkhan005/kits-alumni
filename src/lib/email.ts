import nodemailer from 'nodemailer';

interface SendOtpEmailParams {
  to: string;
  otp: string;
}

/**
 * Sends an OTP email using SMTP
 */
export async function sendOtpEmail({ to, otp }: SendOtpEmailParams): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to,
    subject: 'Your Admin OTP Verification Code',
    text: `Your OTP code is: ${otp}\nThis code will expire in 10 minutes.`,
    html: `<p>Your OTP code is: <b>${otp}</b></p><p>This code will expire in 10 minutes.</p>`,
  });
}
