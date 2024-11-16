import { BarChart, CreditCard, Home, Settings } from 'lucide-react';

export interface NavigationItem {
    title: string;
    icon: React.ElementType;
    href: string;
    isActive?: boolean;
    badge?: string;
}

export const mainNavigation: NavigationItem[] = [
    { title: 'Home', icon: Home, href: '/', isActive: true },
    { title: 'Analytics', icon: BarChart, href: '/analytics', badge: 'New' },
    { title: 'Billing', icon: CreditCard, href: '/billing' },
];

export const secondaryNavigation: NavigationItem[] = [
    { title: 'Settings', icon: Settings, href: '/settings' },
];
