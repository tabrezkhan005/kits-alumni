require('dotenv').config({ path: '.env.local' });
const nodemailer = require('nodemailer');

async function test() {
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
    console.log("Attempting to verify connection...");
    await transporter.verify();
    console.log("Connection verified successfully!");

    console.log("Attempting to send email...");
    let info = await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: "equinoxlab.co@gmail.com",
      subject: "Test Email",
      text: "This is a test email.",
    });
    console.log("Email sent: " + info.messageId);
  } catch (err) {
    console.error("Error occurred:", err);
  }
}

test();
