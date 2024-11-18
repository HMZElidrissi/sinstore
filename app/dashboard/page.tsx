'use client';

import { DashboardShell } from '@/components/dashboard/shell';
import { DashboardStats } from '@/components/dashboard/stats';
import { DashboardSearch } from '@/components/dashboard/search';
import { RecentSales } from '@/components/dashboard/recent-sales';
import { Overview } from '@/components/dashboard/overview';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

export default function DashboardPage() {
    return (
        <DashboardShell header="Dashboard" toolbar={<DashboardSearch />}>
            <DashboardStats />

            <div className="w-full grid gap-4 md:grid-cols-2 lg:grid-cols-12">
                <Card className="md:col-span-1 lg:col-span-8">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <Overview />
                    </CardContent>
                </Card>

                <Card className="md:col-span-1 lg:col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Sales</CardTitle>
                        <CardDescription className="text-indigo-500">
                            You made 265 sales this month.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RecentSales />
                    </CardContent>
                </Card>
            </div>
        </DashboardShell>
    );
}
