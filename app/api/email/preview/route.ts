import { NextResponse } from 'next/server';
import { PasswordResetEmail } from '@/emails/password-reset';
import { render } from '@react-email/render';
import { PasswordChangedEmail } from '@/emails/password-changed';

export async function GET() {
    // const html = await render(
    //     PasswordResetEmail({
    //         resetLink: 'http://localhost:3000/reset-password/token',
    //     }),
    // );
    const html = await render(PasswordChangedEmail());

    return new NextResponse(html, {
        headers: { 'Content-Type': 'text/html' },
    });
}
