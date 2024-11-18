import { BarChart, CreditCard, Home, Settings, Users } from 'lucide-react';

export interface NavigationItem {
    title: string;
    icon: React.ElementType;
    href: string;
    isActive?: boolean;
    badge?: string;
    pattern?: string;
}

export const mainNavigation: NavigationItem[] = [
    { title: 'Home', icon: Home, href: '/dashboard', pattern: '^/dashboard$' },
    {
        title: 'Analytics',
        icon: BarChart,
        href: '/analytics',
        badge: 'New',
        pattern: '^/dashboard/analytics',
    },
    {
        title: 'Billing',
        icon: CreditCard,
        href: '/billing',
        pattern: '^/dashboard/billing',
    },
];

export const secondaryNavigation: NavigationItem[] = [
    {
        title: 'Settings',
        icon: Settings,
        href: '/dashboard/settings',
        pattern: '^/dashboard/settings',
    },
    {
        title: 'Team',
        icon: Users,
        href: '/dashboard/team',
        pattern: '^/dashboard/team',
    },
];
