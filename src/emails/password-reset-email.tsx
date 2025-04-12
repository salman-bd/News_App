import { Tailwind } from "@react-email/tailwind"
import { Html, Head, Body, Container, Section, Text, Button, Img, Hr, Link } from "@react-email/components"

interface PasswordResetEmailProps {
  resetLink: string
}

export function PasswordResetEmail({ resetLink }: PasswordResetEmailProps) {
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
              <Text className="text-3xl font-bold text-green-600 mt-4">Reset Your Password</Text>
            </Section>

            <Section>
              <Text className="text-gray-700 text-lg mb-4">Hello,</Text>
              <Text className="text-gray-700 mb-4">
                We received a request to reset your password for your NewsHub account. If you didn't make this request,
                you can safely ignore this email.
              </Text>
              <Text className="text-gray-700 mb-4">To reset your password, click the button below:</Text>
            </Section>

            <Section className="text-center mb-8">
              <Button href={resetLink} className="bg-green-600 text-white font-bold px-6 py-3 rounded-md no-underline">
                Reset Password
              </Button>
              <Text className="text-sm text-gray-500 mt-4">This link will expire in 1 hour.</Text>
            </Section>

            <Section className="mb-8">
              <Text className="text-gray-700 mb-4">
                If the button above doesn't work, you can also copy and paste the following link into your browser:
              </Text>
              <Text className="bg-gray-100 p-3 rounded text-sm text-gray-600 break-all">{resetLink}</Text>
            </Section>

            <Hr className="border-gray-200 my-8" />

            <Section>
              <Text className="text-gray-700 mb-4">
                If you didn't request a password reset, please contact our support team immediately at{" "}
                <Link href="mailto:support@newshub.com" className="text-green-600">
                  support@newshub.com
                </Link>
              </Text>
            </Section>

            <Section className="text-center mt-8">
              <Text className="text-sm text-gray-500">© {new Date().getFullYear()} NewsHub. All rights reserved.</Text>
              <Text className="text-xs text-gray-500 mt-2">123 News Street, Media City, NY 10001</Text>
              <Text className="text-xs text-gray-500 mt-2">
                <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/privacy`} className="text-gray-500 underline">
                  Privacy Policy
                </Link>{" "}
                •{" "}
                <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/terms`} className="text-gray-500 underline">
                  Terms of Service
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  )
}
