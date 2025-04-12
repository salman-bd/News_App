import { Tailwind } from "@react-email/tailwind"
import { Html, Head, Body, Container, Section, Text, Button, Img, Hr, Link } from "@react-email/components"

interface NewsletterEmailProps {
  content: string
}

export function NewsletterEmail({ content }: NewsletterEmailProps) {
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
              <Text className="text-3xl font-bold text-green-600 mt-4">NewsHub Newsletter</Text>
              <Text className="text-gray-500">Your weekly digest of top stories</Text>
            </Section>

            <Section>
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </Section>

            <Section className="text-center mb-8 mt-8">
              <Button
                href={`${process.env.NEXT_PUBLIC_APP_URL}`}
                className="bg-green-600 text-white font-bold px-6 py-3 rounded-md no-underline"
              >
                Read More on NewsHub
              </Button>
            </Section>

            <Hr className="border-gray-200 my-8" />

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
