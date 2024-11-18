import Link from 'next/link';
import AuthCard from '@/components/auth/auth-card';
import ApplicationLogo from '@/components/ui/application-logo';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <div className="text-gray-900 antialiased">
                <AuthCard
                    logo={
                        <Link href="/">
                            <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                        </Link>
                    }>
                    {children}
                </AuthCard>
            </div>
        </div>
    );
};

export default Layout;
