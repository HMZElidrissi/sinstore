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

interface PasswordResetEmailProps {
    resetLink: string;
}

export const PasswordResetEmail = ({ resetLink }: PasswordResetEmailProps) => (
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
                        Password Reset Request
                    </Text>

                    <Text className="text-gray-600 text-base mb-4">
                        Hi there,
                    </Text>

                    <Text className="text-gray-600 text-base mb-4">
                        We received a request to reset your password. Click the
                        button below to choose a new one:
                    </Text>

                    <Section className="text-center my-8">
                        <Button
                            href={resetLink}
                            className="bg-primary text-primary-foreground shadow hover:bg-primary/90 px-6 py-3 rounded-md font-medium text-base inline-block  transition-colors">
                            Reset Password
                        </Button>
                    </Section>

                    <Text className="text-gray-600 text-base mb-4">
                        For security, this request will expire in 60 minutes.
                        After that, you'll need to submit a new request.
                    </Text>

                    <Text className="text-gray-600 text-base mb-4">
                        If you didn't request this change, you can safely ignore
                        this email.
                    </Text>

                    <Text className="text-gray-500 text-sm mt-6 mb-2">
                        Having trouble with the button? Copy and paste this URL
                        into your browser:
                    </Text>
                    <Link
                        href={resetLink}
                        className="text-blue-600 text-sm break-all no-underline hover:underline">
                        {resetLink}
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
