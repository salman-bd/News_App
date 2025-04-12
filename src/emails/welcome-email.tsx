import { Tailwind } from "@react-email/tailwind"
import { Html, Head, Body, Container, Section, Text, Button, Img, Hr, Link } from "@react-email/components"

interface WelcomeEmailProps {
  name: string
}

export function WelcomeEmail({ name = "Valued Reader" }: WelcomeEmailProps) {
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
              <Text className="text-3xl font-bold text-green-600 mt-4">Welcome to NewsHub!</Text>
            </Section>

            <Section>
              <Text className="text-gray-700 text-lg mb-4">Hello {name},</Text>
              <Text className="text-gray-700 mb-4">
                Thank you for joining NewsHub! We're thrilled to have you as part of our community of informed readers.
              </Text>
              <Text className="text-gray-700 mb-4">
                At NewsHub, we're committed to delivering accurate, timely, and relevant news from around the world.
                Your account is now active, and you can start exploring our content right away.
              </Text>
            </Section>

            <Section className="mb-8">
              <Text className="text-gray-700 font-semibold mb-4">Here's what you can do with your account:</Text>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li className="mb-2">Access exclusive content and in-depth analysis</li>
                <li className="mb-2">Save articles to read later</li>
                <li className="mb-2">Comment on stories and join the conversation</li>
                <li className="mb-2">Customize your news feed based on your interests</li>
                <li className="mb-2">Receive newsletters on topics that matter to you</li>
              </ul>
            </Section>

            <Section className="text-center mb-8">
              <Button
                href={`${process.env.NEXT_PUBLIC_APP_URL}/auth/signin`}
                className="bg-green-600 text-white font-bold px-6 py-3 rounded-md no-underline"
              >
                Sign In to Your Account
              </Button>
            </Section>

            <Hr className="border-gray-200 my-8" />

            <Section>
              <Text className="text-gray-700 mb-4">
                If you have any questions or need assistance, please don't hesitate to contact our support team at{" "}
                <Link href="mailto:support@newshub.com" className="text-green-600">
                  support@newshub.com
                </Link>
              </Text>
              <Text className="text-gray-700">
                Thank you for choosing NewsHub as your trusted source for news and information.
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
                </Link>{" "}
                •{" "}
                <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/unsubscribe`} className="text-gray-500 underline">
                  Unsubscribe
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  )
}
