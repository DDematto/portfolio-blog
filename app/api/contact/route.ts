import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { render } from '@react-email/components';
import { NotificationEmail } from '../../../components/Email/NotificationEmail';
import { AutoReplyEmail } from '../../../components/Email/AutoReplyEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const notificationHtml = await render(
            NotificationEmail({ name, email, message })
        );

        const autoReplyHtml = await render(
            AutoReplyEmail({ name, message })
        );

        // Send the email to Devin
        const data = await resend.emails.send({
            from: 'Portfolio Contact <contact@devindematto.dev>', // Replace with custom domain verified in Resend
            to: ['devin.dematto@gmail.com'], // Or destination email
            subject: `[Portfolio] Message from ${name}`,
            html: notificationHtml,
            replyTo: email,
        });

        // Send auto-reply to the user
        await resend.emails.send({
            from: 'Devin DeMatto <contact@devindematto.dev>',
            to: [email],
            subject: 'Thank you for your message',
            html: autoReplyHtml,
        });

        if (data.error) {
            console.error("Resend API logic error:", data.error);
            return NextResponse.json({ error: data.error.message }, { status: 400 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Contact API error:', error);
        return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
    }
}
