import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Loader2 } from 'lucide-react';
import { Role } from '@/types/enums';
import { Member } from '@/types/user';

interface MembersTableProps {
    members: Member[];
    onRemoveMember: (id: number) => void;
    onUpdateRole: (id: number, role: Role) => void;
    isLoading?: boolean;
}

export function MembersTable({
    members,
    onRemoveMember,
    onUpdateRole,
    isLoading = false,
}: MembersTableProps) {
    return (
        <div className="relative">
            {isLoading && (
                <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
            )}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {members.map(member => (
                        <TableRow key={member.id}>
                            <TableCell>{member.name || '—'}</TableCell>
                            <TableCell>{member.email}</TableCell>
                            <TableCell>
                                <Badge
                                    variant={
                                        member.role === 'ADMIN'
                                            ? 'default'
                                            : 'secondary'
                                    }>
                                    {member.role}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                {format(
                                    new Date(member.createdAt),
                                    'MMM d, yyyy',
                                )}
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            disabled={isLoading}>
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem
                                            onClick={() =>
                                                onUpdateRole(
                                                    member.id as number,
                                                    member.role === Role.ADMIN
                                                        ? Role.USER
                                                        : Role.ADMIN,
                                                )
                                            }>
                                            Change Role
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() =>
                                                onRemoveMember(member.id)
                                            }
                                            className="text-red-600">
                                            Remove
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                    {members.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={5} className="h-24 text-center">
                                No members found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
