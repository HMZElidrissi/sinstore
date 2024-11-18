import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
} from '@/components/ui/breadcrumb';
import { ChevronRight, Home } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface DashboardShellProps {
    children: React.ReactNode;
    header?: string;
    description?: string;
    toolbar?: React.ReactNode;
}

export function DashboardShell({
    children,
    header,
    description,
    toolbar,
}: DashboardShellProps) {
    const pathname = usePathname();
    const paths = pathname
        .split('/')
        .filter(path => path !== 'dashboard' && Boolean(path));

    return (
        <div className="w-full flex-1 space-y-4 p-8 pt-6">
            <Breadcrumb className="flex items-center">
                <BreadcrumbItem>
                    <BreadcrumbLink
                        className="text-gray-400 hover:text-gray-500 mr-3"
                        href="/dashboard">
                        <Home className="h-4 w-4" />
                    </BreadcrumbLink>
                </BreadcrumbItem>
                {paths.map((path, index) => {
                    const href = `/${['dashboard', ...paths.slice(0, index + 1)].join('/')}`;
                    const isLast = index === paths.length - 1;
                    const label = path.charAt(0).toUpperCase() + path.slice(1);

                    return (
                        <BreadcrumbItem key={path}>
                            <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
                            <BreadcrumbLink
                                href={href}
                                className={`text-gray-500 hover:text-gray-700 ${isLast ? 'font-semibold' : ''}`}>
                                {label !== 'Dashboard' ? label : 'Home'}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    );
                })}
            </Breadcrumb>

            <div className="flex items-center justify-between space-y-2">
                <div>
                    {header && (
                        <h2 className="text-3xl font-bold tracking-tight">
                            {header}
                        </h2>
                    )}
                    {description && (
                        <p className="text-muted-foreground">{description}</p>
                    )}
                </div>
                {toolbar}
            </div>
            {children}
        </div>
    );
}
