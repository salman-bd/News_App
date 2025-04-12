import { Tailwind } from "@react-email/tailwind"
import { Html, Head, Body, Container, Section, Text, Button, Img, Hr, Link } from "@react-email/components"

interface CommentNotificationEmailProps {
  articleTitle: string
  commenterName: string
  commentContent: string
  articleUrl: string
}

export function CommentNotificationEmail({
  articleTitle,
  commenterName,
  commentContent,
  articleUrl,
}: CommentNotificationEmailProps) {
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
              <Text className="text-3xl font-bold text-green-600 mt-4">New Comment on Your Article</Text>
            </Section>

            <Section>
              <Text className="text-gray-700 text-lg mb-4">Hello,</Text>
              <Text className="text-gray-700 mb-4">
                You have received a new comment on your article <strong>"{articleTitle}"</strong>.
              </Text>
            </Section>

            <Section className="mb-8">
              <Text className="text-gray-700 font-semibold mb-2">{commenterName} wrote:</Text>
              <Text className="bg-gray-100 p-4 rounded text-gray-700 italic">"{commentContent}"</Text>
            </Section>

            <Section className="text-center mb-8">
              <Button href={articleUrl} className="bg-green-600 text-white font-bold px-6 py-3 rounded-md no-underline">
                View Comment
              </Button>
            </Section>

            <Hr className="border-gray-200 my-8" />

            <Section className="text-center mt-8">
              <Text className="text-sm text-gray-500">© {new Date().getFullYear()} NewsHub. All rights reserved.</Text>
              <Text className="text-xs text-gray-500 mt-2">123 News Street, Media City, NY 10001</Text>
              <Text className="text-xs text-gray-500 mt-2">
                <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/email-preferences`} className="text-gray-500 underline">
                  Manage Email Preferences
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  )
}
