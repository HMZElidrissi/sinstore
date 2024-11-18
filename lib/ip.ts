'use server';

import { headers } from 'next/headers';

export async function getClientIpAddress(): Promise<string> {
    const headersList = await headers();

    /**
     * Check various headers in order of reliability
     */
    const ip =
        headersList.get('x-forwarded-for')?.split(',')[0] ||
        headersList.get('x-real-ip') ||
        headersList.get('cf-connecting-ip') ||
        headersList.get('x-client-ip') ||
        '0.0.0.0';

    return ip.trim();
}
