import { Tailwind } from "@react-email/tailwind"
import { Html, Head, Body, Container, Section, Text, Button, Img, Hr, Link } from "@react-email/components"

interface VerificationEmailProps {
  verificationLink: string
}

export function VerificationEmail({ verificationLink }: VerificationEmailProps) {
  return (
    <Tailwind>
      <Html>
        <Head />
        <Body className="bg-gray-100 font-sans">
          <Container className="bg-white p-8 rounded-lg shadow-sm my-8 mx-auto max-w-[600px]">
            <Section className="text-center mb-8">
              <Img
                src={`${process.env.NEXT_PUBLIC_APP_URL}/logo.png`}
                alt="NewsHub Logo"
                width="80"
                height="80"
                className="mx-auto"
              />
              <Text className="text-3xl font-bold text-green-600 mt-4">Verify Your Email</Text>
            </Section>

            <Section>
              <Text className="text-gray-700 text-lg mb-4">Hello,</Text>
              <Text className="text-gray-700 mb-4">
                Thank you for signing up for NewsHub! To complete your registration and access all features, please
                verify your email address by clicking the button below.
              </Text>
            </Section>

            <Section className="text-center mb-8">
              <Button
                href={verificationLink}
                className="bg-green-600 text-white font-bold px-6 py-3 rounded-md no-underline"
              >
                Verify Email Address
              </Button>
              <Text className="text-sm text-gray-500 mt-4">This link will expire in 24 hours.</Text>
            </Section>

            <Section className="mb-8">
              <Text className="text-gray-700 mb-4">
                If the button above doesn't work, you can also copy and paste the following link into your browser:
              </Text>
              <Text className="bg-gray-100 p-3 rounded text-sm text-gray-600 break-all">{verificationLink}</Text>
            </Section>

            <Hr className="border-gray-200 my-8" />

            <Section>
              <Text className="text-gray-700 mb-4">
                If you didn't sign up for NewsHub, you can safely ignore this email.
              </Text>
              <Text className="text-gray-700">
                If you have any questions or need assistance, please contact our support team at{" "}
                <Link href="mailto:support@newshub.com" className="text-green-600">
                  support@newshub.com
                </Link>
              </Text>
            </Section>

            <Section className="text-center mt-8">
              <Text className="text-sm text-gray-500">© {new Date().getFullYear()} NewsHub. All rights reserved.</Text>
              <Text className="text-xs text-gray-500 mt-2">123 News Street, Media City, NY 10001</Text>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  )
}
