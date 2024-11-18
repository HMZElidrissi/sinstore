import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession, verifyToken } from '@/auth/session';

const guestRoutes = [
    '/sign-in',
    '/accept-invitation',
    '/forgot-password',
    '/reset-password',
];

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    const sessionCookie = request.cookies.get('session')?.value;
    const session = sessionCookie ? await verifyToken(sessionCookie) : null;
    const isAuthenticated = !!session && new Date(session.expires) > new Date();

    if (isAuthenticated && guestRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    if (!isAuthenticated && pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all routes except:
         * 1. /api (API routes)
         * 2. /_next (Next.js internals)
         * 3. /static (static files)
         * 4. /_vercel (Vercel internals)
         * 5. /favicon.ico, /robots.txt (static files)
         */
        '/((?!api|_next|static|_vercel|favicon.ico|robots.txt).*)',
    ],
};
