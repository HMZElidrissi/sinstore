import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { DashboardHeader } from '@/components/dashboard/header';
import { ThemeProvider } from 'next-themes';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            storageKey="theme">
            <SidebarProvider>
                <div className="w-full flex h-screen overflow-x-auto">
                    <DashboardSidebar />
                    <SidebarInset className="flex flex-col w-full">
                        <DashboardHeader />
                        <div className="w-full flex-1 p-4 overflow-x-auto">
                            {children}
                        </div>
                    </SidebarInset>
                </div>
            </SidebarProvider>
        </ThemeProvider>
    );
}
