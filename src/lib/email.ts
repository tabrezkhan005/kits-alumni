import nodemailer from 'nodemailer';

interface SendOtpEmailParams {
  to: string;
  otp: string;
}

interface SendEmailParams {
  to?: string;
  bcc?: string[];
  subject: string;
  text: string;
  html?: string;
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

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      subject: 'Your Admin OTP Verification Code',
      text: `Your OTP code is: ${otp}\nThis code will expire in 10 minutes.`,
      html: `<p>Your OTP code is: <b>${otp}</b></p><p>This code will expire in 10 minutes.</p>`,
    });
  } catch (error) {
    console.error('Failed to send OTP email:', error);
    throw error;
  }
}

/**
 * Sends a generic email (supports BCC)
 */
export async function sendEmail({ to = '', bcc = [], subject, text, html }: SendEmailParams): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      bcc: bcc.length ? bcc : undefined,
      subject,
      text,
      html,
    });
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}
