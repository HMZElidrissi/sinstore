import { Role } from '@/types/enums';

export interface Member {
    id: number;
    name: string | null;
    email: string;
    role: Role;
    createdAt: Date;
}
