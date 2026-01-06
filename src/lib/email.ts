import nodemailer from 'nodemailer';

interface SendOtpEmailParams {
  to: string;
  otp: string;
}

export async function sendOtpEmail({ to, otp }: SendOtpEmailParams) {
  try {
    // Create transporter (you'll need to configure this with your email service)
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.SMTP_FROM || 'noreply@kits.edu.in',
      to,
      subject: 'Your OTP for KITS Alumni Verification',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2A2E5C;">KITS Alumni Verification</h2>
          <p>Hello,</p>
          <p>Your One-Time Password (OTP) for verification is:</p>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <span style="font-size: 24px; font-weight: bold; color: #D4A72E; letter-spacing: 4px;">${otp}</span>
          </div>
          <p>This OTP will expire in 10 minutes.</p>
          <p>If you didn't request this OTP, please ignore this email.</p>
          <p>Best regards,<br>KITS Alumni Team</p>
        </div>
      `,
      text: `
        KITS Alumni Verification

        Your One-Time Password (OTP) is: ${otp}

        This OTP will expire in 10 minutes.

        If you didn't request this OTP, please ignore this email.

        Best regards,
        KITS Alumni Team
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('OTP email sent:', info.messageId);
    return { success: true };
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw error;
  }
}
