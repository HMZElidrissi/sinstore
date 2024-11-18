'use client';

import { DashboardShell } from '@/components/dashboard/shell';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUser } from '@/auth';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { useActionState } from 'react';
import { updateAccount, deleteAccount } from '@/actions/account';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';
import { ActionState } from '@/auth/middleware';

export default function SettingsPage() {
    const { user } = useUser();
    const { toast } = useToast();
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

    const [updateState, updateAction, updatePending] = useActionState<
        ActionState,
        FormData
    >(updateAccount, { error: '', success: '' });

    const [deleteState, deleteAction, deletePending] = useActionState<
        ActionState,
        FormData
    >(deleteAccount, { error: '', success: '' });

    // Form submit handlers
    const handleUpdateAccount = async (formData: FormData) => {
        await updateAction(formData);
        if (updateState.success) {
            toast({
                title: 'Success',
                description: updateState.success,
            });
        } else if (updateState.error) {
            toast({
                title: 'Error',
                description: updateState.error,
                variant: 'destructive',
            });
        }
    };

    const handleDeleteAccount = async (formData: FormData) => {
        await deleteAction(formData);
        if (deleteState.success) {
            toast({
                title: 'Error',
                description: deleteState.success,
                variant: 'destructive',
            });
        }
        // No need to handle success as the action redirects on success
    };

    if (!user) {
        return null;
    }

    return (
        <DashboardShell
            header="Settings"
            description="Manage your account settings and preferences.">
            <div className="space-y-6">
                {/* Profile Settings */}
                <Card>
                    <form action={handleUpdateAccount}>
                        <CardHeader>
                            <CardTitle>Profile Settings</CardTitle>
                            <CardDescription>
                                Update your personal information.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    defaultValue={user.name || ''}
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    defaultValue={user.email}
                                    placeholder="Enter your email"
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" disabled={updatePending}>
                                {updatePending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    'Save Changes'
                                )}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>

                {/* Danger Zone */}
                <Card className="border-red-200">
                    <CardHeader>
                        <CardTitle className="text-red-600">
                            Danger Zone
                        </CardTitle>
                        <CardDescription>
                            Permanently delete your account and all associated
                            data.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Dialog
                            open={confirmDeleteOpen}
                            onOpenChange={setConfirmDeleteOpen}>
                            <DialogTrigger asChild>
                                <Button variant="destructive">
                                    Delete Account
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <form action={handleDeleteAccount}>
                                    <DialogHeader>
                                        <DialogTitle>
                                            Delete Account
                                        </DialogTitle>
                                        <DialogDescription>
                                            This action cannot be undone. Please
                                            enter your password to confirm
                                            deletion.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="my-6">
                                        <Label htmlFor="password">
                                            Password
                                        </Label>
                                        <Input
                                            id="password"
                                            name="password"
                                            type="password"
                                            required
                                            placeholder="Enter your password"
                                            className="mt-2"
                                        />
                                    </div>
                                    <DialogFooter>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() =>
                                                setConfirmDeleteOpen(false)
                                            }>
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            variant="destructive"
                                            disabled={deletePending}>
                                            {deletePending ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Deleting...
                                                </>
                                            ) : (
                                                'Delete Account'
                                            )}
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </CardContent>
                </Card>
            </div>
        </DashboardShell>
    );
}
