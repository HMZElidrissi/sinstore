import { Resend } from 'resend';
import { PasswordResetEmail } from '@/emails/password-reset';
import { PasswordChangedEmail } from '@/emails/password-changed';
import { InvitationEmail } from '@/emails/invitation-email';
import { prisma } from '@/lib/prisma';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPasswordResetEmail(email: string, token: string) {
    const resetLink = `${process.env.BASE_URL}/reset-password/${token}`;

    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Reset your password',
        react: PasswordResetEmail({ resetLink }),
    });
}

export async function sendPasswordChangedEmail(email: string) {
    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Your password has been changed',
        react: PasswordChangedEmail(),
    });
}

export async function sendInvitationEmail(email: string, token: string) {
    try {
        // Get the invitation details to include the inviter's name
        const invitation = await prisma.invitation.findFirst({
            where: { token },
            include: {
                inviter: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        const inviteLink = `${process.env.BASE_URL}/accept-invitation?token=${token}&email=${encodeURIComponent(email)}`;

        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: "You've been invited to join Software in Store",
            react: InvitationEmail({
                inviteLink,
                inviterName: invitation?.inviter?.name || undefined,
            }),
        });
    } catch (error) {
        console.error('Error sending invitation email:', error);
        throw error;
    }
}
