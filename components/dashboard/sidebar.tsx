'use client';

import { ChevronDown, LogOut, Settings, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarSeparator,
} from '@/components/ui/sidebar';
import NavItem from '@/components/dashboard/nav-item';
import Image from 'next/image';
import { mainNavigation, secondaryNavigation } from '@/config/dashboard';

export function DashboardSidebar() {
    return (
        <Sidebar className="border-r border-gray-200 dark:border-gray-800">
            <SidebarHeader className="px-2 py-12 flex items-center justify-center">
                <Image src="/next.svg" alt="Logo" width={120} height={40} />
            </SidebarHeader>

            <SidebarContent className="px-2">
                <SidebarMenu>
                    <div className="space-y-3">
                        {mainNavigation.map(item => (
                            <NavItem key={item.title} item={item} />
                        ))}
                    </div>

                    <SidebarSeparator className="my-4" />

                    <div className="space-y-13">
                        {secondaryNavigation.map(item => (
                            <NavItem key={item.title} item={item} />
                        ))}
                    </div>
                </SidebarMenu>
            </SidebarContent>

            <SidebarFooter className="px-2 py-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="w-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                    <Avatar className="h-8 w-8 border-2 border-white ring-2 ring-gray-100 dark:border-gray-900 dark:ring-gray-800">
                                        <AvatarImage
                                            src="/placeholder-user.jpg"
                                            alt="John Doe"
                                        />
                                        <AvatarFallback className="bg-primary text-primary-foreground">
                                            JD
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col items-start ml-3">
                                        <span className="font-medium text-gray-700 dark:text-gray-300">
                                            John Doe
                                        </span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                            john@example.com
                                        </span>
                                    </div>
                                    <ChevronDown className="ml-auto h-4 w-4 text-gray-500" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-56"
                                align="end"
                                forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium">
                                            John Doe
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            john@example.com
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="flex items-center">
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center">
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Settings</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="flex items-center text-red-600 dark:text-red-400">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
