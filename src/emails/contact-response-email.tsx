import { Tailwind } from "@react-email/tailwind"
import { Html, Head, Body, Container, Section, Text, Button, Img, Hr, Link } from "@react-email/components"

interface ContactResponseEmailProps {
  customerName: string
  message: string
}

export function ContactResponseEmail({ customerName, message }: ContactResponseEmailProps) {
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
              <Text className="text-3xl font-bold text-green-600 mt-4">We've Received Your Message</Text>
            </Section>

            <Section>
              <Text className="text-gray-700 text-lg mb-4">Hello {customerName},</Text>
              <Text className="text-gray-700 mb-4">
                Thank you for contacting NewsHub. We've received your message and our team will get back to you as soon
                as possible, usually within 24-48 hours.
              </Text>
            </Section>

            <Section className="mb-6 rounded bg-gray-50 p-4">
              <Text className="mb-2 font-bold text-gray-800">Your Message:</Text>
              <Text className="italic text-gray-700">"{message}"</Text>
            </Section>

            <Section>
              <Text className="text-gray-700 mb-4">
                If you have any urgent inquiries, please don't hesitate to call us at +1 (123) 456-7890.
              </Text>
              <Text className="text-gray-700 mb-4">
                In the meantime, you might want to explore our latest news and articles on our website.
              </Text>
            </Section>

            <Section className="text-center mb-8">
              <Button
                href={`${process.env.NEXT_PUBLIC_APP_URL}`}
                className="bg-green-600 text-white font-bold px-6 py-3 rounded-md no-underline"
              >
                Visit NewsHub
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
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  )
}
