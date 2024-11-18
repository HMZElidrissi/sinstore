import { ResetPasswordForm } from '@/components/auth/reset-password';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

export const metadata = {
    title: 'Softwareinstore | Reset password',
};

interface PageProps {
    params: {
        token: string;
    };
}

export default async function ResetPasswordPage({
    params: { token },
}: PageProps) {
    const resetRequest = await prisma.passwordReset.findFirst({
        where: {
            token,
            used: false,
            expiresAt: {
                gt: new Date(),
            },
        },
    });

    if (!resetRequest) {
        notFound();
    }

    return <ResetPasswordForm token={token} />;
}
