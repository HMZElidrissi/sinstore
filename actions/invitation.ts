'use server';

import { z } from 'zod';
import { validatedAction, validatedActionWithUser } from '@/auth/middleware';
import { prisma } from '@/lib/prisma';
import { hashPassword, setSession } from '@/auth/session';
import { getClientIpAddress } from '@/lib/ip';
import { logActivity } from '@/lib/utils';
import { ActivityType, Role } from '@/types/enums';
import { redirect } from 'next/navigation';
import { nanoid } from 'nanoid';
import { sendInvitationEmail } from '@/lib/mail';

const acceptInvitationSchema = z.object({
    token: z.string(),
    password: z.string().min(8),
});

const inviteUserSchema = z.object({
    email: z.string().email('Invalid email address'),
    role: z.enum([Role.ADMIN, Role.USER]),
});

export const acceptInvitation = validatedAction(
    acceptInvitationSchema,
    async data => {
        const { token, password } = data;

        // Find and validate invitation
        const invitation = await prisma.invitation.findUnique({
            where: { token },
        });

        if (!invitation) {
            return { error: 'Invalid invitation token.' };
        }

        if (invitation.status !== 'pending') {
            return { error: 'This invitation has already been used.' };
        }

        if (invitation.expiresAt < new Date()) {
            return { error: 'This invitation has expired.' };
        }

        // Check if email is already registered
        const existingUser = await prisma.user.findUnique({
            where: { email: invitation.email },
        });

        if (existingUser) {
            return { error: 'This email is already registered.' };
        }

        const passwordHash = await hashPassword(password);

        // Create new user and mark invitation as accepted in a transaction
        const createdUser = await prisma.$transaction(async tx => {
            const user = await tx.user.create({
                data: {
                    email: invitation.email,
                    passwordHash,
                    role: invitation.role,
                },
            });

            await tx.invitation.update({
                where: { id: invitation.id },
                data: { status: 'accepted' },
            });

            return user;
        });

        const ipAddress = await getClientIpAddress();

        await Promise.all([
            logActivity(
                createdUser.id,
                ActivityType.ACCEPT_INVITATION,
                ipAddress,
            ),
            setSession(createdUser),
        ]);

        redirect('/dashboard');
    },
);

export const inviteUser = validatedActionWithUser(
    inviteUserSchema,
    async (data, _, user) => {
        const { email, role } = data;

        // Check if user is admin
        if (user.role !== Role.ADMIN) {
            return { error: 'Only administrators can invite new users' };
        }

        // Check if email already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return { error: 'User with this email already exists' };
        }

        // Check if there's an existing pending invitation
        const existingInvitation = await prisma.invitation.findFirst({
            where: {
                email,
                status: 'pending',
                expiresAt: {
                    gt: new Date(),
                },
            },
        });

        if (existingInvitation) {
            return {
                error: 'An active invitation already exists for this email',
            };
        }

        // Create new invitation
        const token = nanoid(32); // Generate secure token for invitation link
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7); // Invitation expires in 7 days

        const invitation = await prisma.invitation.create({
            data: {
                email,
                role,
                invitedBy: user.id,
                status: 'pending',
                token,
                expiresAt,
            },
        });

        await sendInvitationEmail(email, token);

        return {
            success: 'Invitation sent successfully',
            invitationId: invitation.id,
        };
    },
);
