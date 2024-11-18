import { Login } from '@/components/auth/login';

export const metadata = {
    title: 'Softwareinstore | Accept Invitation',
};

export default function AcceptInvitationPage() {
    return <Login mode="accept-invitation" />;
}
