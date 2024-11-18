'use server';

import { z } from 'zod';
import { validatedAction } from '@/auth/middleware';
import { prisma } from '@/lib/prisma';
import { comparePasswords, setSession } from '@/auth/session';
import { getClientIpAddress } from '@/lib/ip';
import { logActivity } from '@/lib/utils';
import { ActivityType } from '@/types/enums';
import { redirect } from 'next/navigation';

const signInSchema = z.object({
    email: z.string().email().min(3).max(255),
    password: z.string().min(8).max(100),
});

export const signIn = validatedAction(signInSchema, async data => {
    const { email, password } = data;

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        return { error: 'Invalid email or password. Please try again.' };
    }

    const isPasswordValid = await comparePasswords(password, user.passwordHash);

    if (!isPasswordValid) {
        return { error: 'Invalid email or password. Please try again.' };
    }

    const ipAddress = await getClientIpAddress();

    await Promise.all([
        setSession(user),
        logActivity(user.id, ActivityType.SIGN_IN, ipAddress),
    ]);

    redirect('/dashboard');
});