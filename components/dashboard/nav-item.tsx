import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { NavigationItem } from '@/config/dashboard';

export default function NavItem({ item }: { item: NavigationItem }) {
    return (
        <SidebarMenuItem>
            <SidebarMenuButton
                asChild
                className={cn(
                    'p-5 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors relative',
                    item.isActive &&
                        'bg-gray-100 dark:bg-gray-800 text-primary',
                )}>
                <a href={item.href} className="flex items-center gap-3">
                    <item.icon
                        className={cn(
                            'h-4 w-4',
                            item.isActive
                                ? 'text-primary'
                                : 'text-gray-500 dark:text-gray-400',
                        )}
                    />
                    <span
                        className={cn(
                            'font-medium',
                            item.isActive
                                ? 'text-primary'
                                : 'text-gray-700 dark:text-gray-300',
                        )}>
                        {item.title}
                    </span>
                    {item.badge && (
                        <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                            {item.badge}
                        </span>
                    )}
                </a>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
}
