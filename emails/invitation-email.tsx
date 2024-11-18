import {
    Body,
    Button,
    Container,
    Head,
    Html,
    Section,
    Text,
    Link,
    Img,
    Hr,
    Tailwind,
} from '@react-email/components';
import * as React from 'react';

interface InvitationEmailProps {
    inviteLink: string;
    inviterName?: string;
}

export const InvitationEmail = ({
    inviteLink,
    inviterName,
}: InvitationEmailProps) => (
    <Html>
        <Head />
        <Tailwind
            config={{
                theme: {
                    extend: {
                        colors: {
                            primary: '#1E1E1E',
                            'primary-foreground': '#FAFAFA',
                        },
                    },
                },
            }}>
            <Body className="bg-gray-50 py-10">
                <Container className="bg-white rounded-lg shadow-lg mx-auto p-8 max-w-[580px]">
                    <Section className="text-center mb-8">
                        <Img
                            src={`${process.env.BASE_URL}/logo.webp`}
                            width="180"
                            height="auto"
                            alt="Software in Store"
                            className="mx-auto"
                        />
                    </Section>

                    <Text className="text-2xl font-bold text-gray-900 text-center mb-6">
                        You're invited to join Software in Store
                    </Text>

                    <Text className="text-gray-600 text-base mb-4">
                        Hi there,
                    </Text>

                    <Text className="text-gray-600 text-base mb-4">
                        {inviterName ? `${inviterName} has` : "You've been"}{' '}
                        invited you to join Software in Store. Click the button
                        below to create your account:
                    </Text>

                    <Section className="text-center my-8">
                        <Button
                            href={inviteLink}
                            className="bg-primary text-primary-foreground shadow hover:bg-primary/90 px-6 py-3 rounded-md font-medium text-base inline-block transition-colors">
                            Accept Invitation
                        </Button>
                    </Section>

                    <Text className="text-gray-600 text-base mb-4">
                        For security, this invitation will expire in 7 days.
                        After that, you'll need to request a new invitation from
                        your administrator.
                    </Text>

                    <Text className="text-gray-600 text-base mb-4">
                        If you weren't expecting this invitation, you can safely
                        ignore this email.
                    </Text>

                    <Text className="text-gray-500 text-sm mt-6 mb-2">
                        Having trouble with the button? Copy and paste this URL
                        into your browser:
                    </Text>
                    <Link
                        href={inviteLink}
                        className="text-blue-600 text-sm break-all no-underline hover:underline">
                        {inviteLink}
                    </Link>

                    <Hr className="border-gray-200 my-8" />

                    <Text className="text-gray-500 text-sm text-center">
                        © {new Date().getFullYear()} Software in Store. All
                        rights reserved.
                    </Text>
                </Container>
            </Body>
        </Tailwind>
    </Html>
);
