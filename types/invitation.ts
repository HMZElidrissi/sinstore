import { Role } from '@/types/enums';

export interface Invitation {
    id: number;
    email: string;
    role: Role;
    status: string;
    invitedAt: Date;
    expiresAt: Date;
    inviter: {
        name: string | null;
        email: string;
    };
}
