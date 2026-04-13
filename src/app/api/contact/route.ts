import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // For MVP: log the contact submission.
    // When Resend/SendGrid is configured, send email here.
    console.log('Contact form submission:', { name, email, subject, message });

    // TODO: Integrate with Resend or Formspree
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'Gallery <noreply@radhakhetan.art>',
    //   to: process.env.CONTACT_EMAIL!,
    //   subject: `[Gallery Inquiry] ${subject}`,
    //   text: `From: ${name} (${email})\n\n${message}`,
    // });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
