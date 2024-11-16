import React from 'react';
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
    Zap,
    MessageSquare,
    User,
    Image,
    AudioLines,
    Users,
    Settings,
    History,
    Lock,
} from 'lucide-react';

const navigationItems = [
    { title: 'Main Dashboard', icon: Zap, url: '#', active: true },
    { title: 'AI Chat UI', icon: MessageSquare, url: '#' },
    { title: 'AI Assistant', icon: User, url: '#' },
    { title: 'AI Text Generator', icon: AudioLines, url: '#' },
    { title: 'AI Image Generator', icon: Image, url: '#' },
    { title: 'AI Text to Speech', icon: AudioLines, url: '#' },
    { title: 'Users List', icon: Users, url: '#' },
    { title: 'Profile Settings', icon: Settings, url: '#' },
    { title: 'Subscription', icon: Zap, url: '#' },
    { title: 'History', icon: History, url: '#' },
    { title: 'Authentication', icon: Lock, url: '#' },
];

const NavItem = ({ item }) => (
    <SidebarMenuItem>
        <SidebarMenuButton
            asChild
            className={`flex items-center gap-3 py-2 px-3 rounded-lg transition-colors ${
                item.active
                    ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
            }`}>
            <a href={item.url}>
                <item.icon className="h-4 w-4" />
                <span className="font-medium">{item.title}</span>
            </a>
        </SidebarMenuButton>
    </SidebarMenuItem>
);

export function AppSidebar() {
    return (
        <Sidebar className="border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
            <SidebarHeader className="p-4">
                <div className="flex items-center gap-2">
                    <Zap className="h-6 w-6" />
                    <span className="font-bold text-xl">Horizon AI</span>
                    <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        FREE
                    </span>
                </div>
            </SidebarHeader>

            <SidebarContent className="px-3">
                <SidebarMenu>
                    {navigationItems.map(item => (
                        <NavItem key={item.title} item={item} />
                    ))}
                </SidebarMenu>
            </SidebarContent>

            <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-8 w-8 rounded bg-gray-100 dark:bg-gray-800">
                        <span className="text-sm font-medium">AP</span>
                    </div>
                    <div>
                        <div className="font-medium">Adela Parkson</div>
                    </div>
                </div>
            </div>
        </Sidebar>
    );
}

export default AppSidebar;
