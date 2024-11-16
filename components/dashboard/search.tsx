'use client';

import * as React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Download } from 'lucide-react';

export function DashboardSearch() {
    return (
        <div className="flex items-center gap-4">
            <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search..." className="w-[200px] pl-8" />
            </div>
            <Button>
                <Download className="mr-2 h-4 w-4" />
                Download
            </Button>
        </div>
    );
}
