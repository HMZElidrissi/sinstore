'use client';

import { useActionState } from 'react';
import { DashboardShell } from '@/components/dashboard/shell';
import { InviteMemberDialog } from '@/components/team/invite-member-dialog';
import { MembersTable } from '@/components/team/members-table';
import { InvitationsTable } from '@/components/team/invitations-table';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Role } from '@/types/enums';
import { Invitation } from '@/types/invitation';
import { Member } from '@/types/user';
import {
    getTeamMembers,
    getPendingInvitations,
    updateMemberRole,
    removeMember,
} from '@/actions/team';
import { useEffect, useState, useTransition, startTransition } from 'react';
import { ActionState } from '@/auth/middleware';

export default function TeamPage() {
    const [members, setMembers] = useState<Member[]>([]);
    const [invitations, setInvitations] = useState<Invitation[]>([]);
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();

    // Form states using useActionState
    const [updateRoleState, updateRoleAction, updateRolePending] =
        useActionState<ActionState, FormData>(updateMemberRole, { error: '' });

    const [removeMemberState, removeMemberAction, removeMemberPending] =
        useActionState<ActionState, FormData>(removeMember, { error: '' });

    // Load initial data
    useEffect(() => {
        const loadData = () => {
            startTransition(async () => {
                try {
                    const [membersResult, invitationsResult] =
                        await Promise.all([
                            getTeamMembers({}, new FormData()),
                            getPendingInvitations({}, new FormData()),
                        ]);

                    if ('members' in membersResult) {
                        setMembers(membersResult.members as Member[]);
                    }

                    if (membersResult.members) {
                        setMembers(membersResult.members as Member[]);
                    }

                    if (invitationsResult.invitations) {
                        setInvitations(
                            invitationsResult.invitations as Invitation[],
                        );
                    }
                } catch (error) {
                    console.error('Error loading data:', error);
                    toast({
                        title: 'Error',
                        description: 'Failed to load team data',
                        variant: 'destructive',
                    });
                }
            });
        };

        loadData();
    }, [updateRoleState, removeMemberState, toast]);

    // Action handlers
    const handleUpdateRole = async (userId: number, role: Role) => {
        startTransition(async () => {
            const formData = new FormData();
            formData.append('userId', userId.toString());
            formData.append('role', role);
            await updateRoleAction(formData);
        });
    };

    const handleRemoveMember = async (userId: number) => {
        startTransition(async () => {
            const formData = new FormData();
            formData.append('userId', userId.toString());
            await removeMemberAction(formData);
        });
    };

    // Toast notifications for different states
    useEffect(() => {
        if (updateRoleState.error) {
            toast({
                title: 'Error',
                description: updateRoleState.error,
                variant: 'destructive',
            });
        } else if (updateRoleState.success) {
            toast({
                title: 'Success',
                description: updateRoleState.success,
            });
        }
    }, [updateRoleState, toast]);

    useEffect(() => {
        if (removeMemberState.error) {
            toast({
                title: 'Error',
                description: removeMemberState.error,
                variant: 'destructive',
            });
        } else if (removeMemberState.success) {
            toast({
                title: 'Success',
                description: removeMemberState.success,
            });
        }
    }, [removeMemberState, toast]);

    return (
        <DashboardShell
            header="Team"
            description="Manage your team members and their roles."
            toolbar={<InviteMemberDialog />}>
            <Tabs defaultValue="members" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="members">Members</TabsTrigger>
                    <TabsTrigger value="pending">
                        Pending Invitations
                        {invitations.length > 0 && (
                            <Badge variant="secondary" className="ml-2">
                                {invitations.length}
                            </Badge>
                        )}
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="members">
                    <Card>
                        <CardHeader>
                            <CardTitle>Team Members</CardTitle>
                            <CardDescription>
                                View and manage your team members.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <MembersTable
                                members={members}
                                onUpdateRole={handleUpdateRole}
                                onRemoveMember={handleRemoveMember}
                                isLoading={
                                    isPending ||
                                    updateRolePending ||
                                    removeMemberPending
                                }
                            />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="pending">
                    <Card>
                        <CardHeader>
                            <CardTitle>Pending Invitations</CardTitle>
                            <CardDescription>
                                View and manage pending team invitations.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <InvitationsTable invitations={invitations} />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </DashboardShell>
    );
}
