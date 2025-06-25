import { NextRequest, NextResponse } from 'next/server';
import { getAllStudentEmails } from '@/lib/registration.server';
import { sendEmail } from '@/lib/email.server';
import { getAdminSessionFromRequest } from '@/lib/auth/adminAuth';

export async function POST(req: NextRequest) {
  // Authenticate admin
  const { isAdmin } = getAdminSessionFromRequest(req);
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { subject, message } = await req.json();
  if (!subject || !message) {
    return NextResponse.json({ error: 'Subject and message are required.' }, { status: 400 });
  }

  // Get all student emails
  let emails: string[] = [];
  try {
    emails = await getAllStudentEmails();
    if (!emails.length) {
      return NextResponse.json({ error: 'No student emails found.' }, { status: 404 });
    }
  } catch (e: any) {
    return NextResponse.json({ error: 'Failed to fetch student emails: ' + (e?.message || e) }, { status: 500 });
  }

  // Send email as BCC
  try {
    await sendEmail({
      to: '', // No direct recipient
      bcc: emails,
      subject,
      text: message,
      html: `<p>${message.replace(/\n/g, '<br/>')}</p>`
    });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to send broadcast email.' }, { status: 500 });
  }
}
