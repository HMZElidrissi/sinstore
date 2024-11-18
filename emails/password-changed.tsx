import {
    Body,
    Button,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Section,
    Tailwind,
    Text,
} from '@react-email/components';
import * as React from 'react';

export const PasswordChangedEmail = () => (
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
                        Password Changed Successfully
                    </Text>

                    <Text className="text-gray-600 text-base mb-4">
                        Hi there,
                    </Text>

                    <Text className="text-gray-600 text-base mb-4">
                        This email confirms that your password has been changed
                        successfully.
                    </Text>

                    <Text className="text-gray-600 text-base mb-4">
                        If you did not make this change, please contact our
                        support team immediately:
                    </Text>

                    <Section className="text-center my-8">
                        <Button
                            href="mailto:support@softwarein.store"
                            className="bg-primary text-primary-foreground shadow hover:bg-primary/90 px-6 py-3 rounded-md font-medium text-base inline-block transition-colors">
                            Contact Support
                        </Button>
                    </Section>

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
