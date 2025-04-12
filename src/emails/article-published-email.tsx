import { Tailwind } from "@react-email/tailwind"
import { Html, Head, Body, Container, Section, Text, Button, Img, Hr, Link } from "@react-email/components"

interface ArticlePublishedEmailProps {
  articleTitle: string
  articleUrl: string
}

export function ArticlePublishedEmail({ articleTitle, articleUrl }: ArticlePublishedEmailProps) {
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
              <Text className="text-3xl font-bold text-green-600 mt-4">Your Article Has Been Published!</Text>
            </Section>

            <Section>
              <Text className="text-gray-700 text-lg mb-4">Hello,</Text>
              <Text className="text-gray-700 mb-4">
                Great news! Your article <strong>"{articleTitle}"</strong> has been published on NewsHub.
              </Text>
              <Text className="text-gray-700 mb-4">
                Your insights and perspective are now available for our readers to enjoy. Thank you for your valuable
                contribution to our platform.
              </Text>
            </Section>

            <Section className="text-center mb-8">
              <Button href={articleUrl} className="bg-green-600 text-white font-bold px-6 py-3 rounded-md no-underline">
                View Your Article
              </Button>
            </Section>

            <Section className="mb-8">
              <Text className="text-gray-700 mb-4">
                We encourage you to share your article with your network to increase its reach and engagement. The more
                readers who see your work, the greater the impact it can have.
              </Text>
              <Text className="text-gray-700 mb-4">
                If you have any questions or need assistance, please don't hesitate to contact our editorial team.
              </Text>
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
