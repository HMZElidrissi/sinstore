'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button2 } from '@/components/ui/button';
import { Input, InputError } from '@/components/ui/input';
import { Label2 } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { signIn } from '@/actions/sign-in';
import { acceptInvitation } from '@/actions/invitation';
import { ActionState } from '@/auth/middleware';

type LoginProps = {
    mode?: 'signin' | 'accept-invitation';
};

export function Login({ mode = 'signin' }: LoginProps) {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const email = searchParams.get('email');
    const [state, formAction, pending] = useActionState<ActionState, FormData>(
        mode === 'signin' ? signIn : acceptInvitation,
        { error: '' },
    );

    // Redirect to sign-in if trying to accept invitation without token
    if (mode === 'accept-invitation' && !token) {
        return (
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Invalid Invitation
                </h2>
                <p className="text-gray-600 mb-6">
                    This invitation link is invalid or has expired.
                </p>
                <Link
                    href="/sign-in"
                    className="text-gray-600 hover:text-gray-900 underline rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Return to sign in
                </Link>
            </div>
        );
    }

    return (
        <>
            <h2 className="text-2xl font-medium text-center text-gray-900">
                {mode === 'signin'
                    ? 'Sign in to your account'
                    : 'Complete your registration'}
            </h2>

            {mode === 'accept-invitation' && (
                <p className="mt-2 text-sm text-gray-600">
                    You've been invited to join. Please set up your account.
                </p>
            )}

            <form className="mt-6" action={formAction}>
                {mode === 'accept-invitation' && (
                    <input type="hidden" name="token" value={token || ''} />
                )}

                <div>
                    <Label2 htmlFor="email">Email</Label2>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        maxLength={50}
                        defaultValue={email || ''}
                        readOnly={mode === 'accept-invitation' && !!email}
                        className="block mt-1 w-full"
                        placeholder="Enter your email"
                    />
                </div>

                <div className="mt-4">
                    <Label2 htmlFor="password">
                        {mode === 'signin' ? 'Password' : 'Create password'}
                    </Label2>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete={
                            mode === 'signin'
                                ? 'current-password'
                                : 'new-password'
                        }
                        required
                        minLength={8}
                        maxLength={100}
                        className="block mt-1 w-full"
                        placeholder={
                            mode === 'signin'
                                ? 'Enter your password'
                                : 'Create a secure password'
                        }
                    />
                    {mode === 'accept-invitation' && (
                        <p className="mt-1 text-sm text-gray-500">
                            Password must be at least 8 characters long
                        </p>
                    )}
                </div>

                {state?.error && (
                    <InputError messages={[state.error]} className="mt-2" />
                )}

                {mode === 'signin' && (
                    <div className="block mt-4">
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="remember_me"
                                className="inline-flex items-center">
                                <input
                                    id="remember_me"
                                    type="checkbox"
                                    name="remember"
                                    className="rounded border-gray-300 text-indigo-600 shadow-sm  focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                                <span className="ml-2 text-sm text-gray-600">
                                    Remember me
                                </span>
                            </label>

                            <Link
                                href="/forgot-password"
                                className="text-sm text-gray-600 hover:text-gray-900 underline rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Forgot your password?
                            </Link>
                        </div>
                    </div>
                )}

                <div className="flex items-center justify-end mt-4">
                    <Button2
                        className="w-full justify-center"
                        disabled={pending}>
                        {pending ? (
                            <>
                                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                                Loading...
                            </>
                        ) : mode === 'signin' ? (
                            'Sign in'
                        ) : (
                            'Create account'
                        )}
                    </Button2>
                </div>
            </form>

            {mode === 'signin' && (
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">
                                Need an account?
                            </span>
                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Contact your administrator to request an invitation.
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
