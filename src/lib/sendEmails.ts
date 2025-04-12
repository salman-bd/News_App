"use server"

import { Resend } from "resend"
import { WelcomeEmail } from "@/emails/welcome-email"
import { VerificationEmail } from "@/emails/verification-email"
import { PasswordResetEmail } from "@/emails/password-reset-email"
import { ArticlePublishedEmail } from "@/emails/article-published-email"
import { CommentNotificationEmail } from "@/emails/comment-notification-email"
import { NewsletterEmail } from "@/emails/newsletter-email"
import { ContactResponseEmail } from "@/emails/contact-response-email"

const resend = new Resend(process.env.RESEND_API_KEY || "")

export async function sendWelcomeEmail(email: string, name: string) {
  try {
    await resend.emails.send({
      from: "welcome@newshub.com",
      to: email,
      subject: "Welcome to NewsHub",
      react: WelcomeEmail({ name }),
    })
    return { success: true }
  } catch (error) {
    console.error("Failed to send welcome email:", error)
    return { success: false, error: "Failed to send welcome email" }
  }
}

export async function sendVerificationEmail(email: string, token: string) {
  try {
    const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify?token=${token}`
    await resend.emails.send({
      from: "verification@newshub.com",
      to: email,
      subject: "Verify your email address",
      react: VerificationEmail({ verificationLink }),
    })
    return { success: true }
  } catch (error) {
    console.error("Failed to send verification email:", error)
    return { success: false, error: "Failed to send email verification email" }
  }
}

export async function sendPasswordResetEmail(email: string, token: string) {
  try {
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${token}`
    await resend.emails.send({
      from: "password-reset@newshub.com",
      to: email,
      subject: "Reset your password",
      react: PasswordResetEmail({ resetLink }),
    })

    return { success: true }
  } catch (error) {
    console.error("Failed to send password reset email:", error)
    return { success: false, error: "Failed to send password reset email" }
  }
}

export async function sendArticlePublishedEmail(email: string, articleTitle: string, articleUrl: string) {
  try {
    await resend.emails.send({
      from: "notifications@newshub.com",
      to: email,
      subject: `Your article "${articleTitle}" has been published`,
      react: ArticlePublishedEmail({ articleTitle, articleUrl }),
    })
    return { success: true }
  } catch (error) {
    console.error("Failed to send article published email:", error)
    return { success: false, error: "Failed to send article published notification" }
  }
}

export async function sendCommentNotificationEmail(
  email: string,
  articleTitle: string,
  commenterName: string,
  commentContent: string,
  articleUrl: string,
) {
  try {
    await resend.emails.send({
      from: "notifications@newshub.com",
      to: email,
      subject: `New comment on your article "${articleTitle}"`,
      react: CommentNotificationEmail({
        articleTitle,
        commenterName,
        commentContent,
        articleUrl,
      }),
    })
    return { success: true }
  } catch (error) {
    console.error("Failed to send comment notification email:", error)
    return { success: false, error: "Failed to send comment notification" }
  }
}

export async function sendNewsletterEmail(emails: string[], subject: string, content: string) {
  try {
    // Split emails into batches of 50 to avoid rate limits
    const batchSize = 50
    const batches = []

    for (let i = 0; i < emails.length; i += batchSize) {
      batches.push(emails.slice(i, i + batchSize))
    }

    for (const batch of batches) {
      await resend.emails.send({
        from: "newsletter@newshub.com",
        to: batch,
        subject: subject,
        react: NewsletterEmail({ content }),
      })
    }

    return { success: true }
  } catch (error) {
    console.error("Failed to send newsletter email:", error)
    return { success: false, error: "Failed to send newsletter" }
  }
}

export async function sendContactResponseEmail(email: string, name: string, message: string) {
  try {
    await resend.emails.send({
      from: "contact@newshub.com",
      to: email,
      subject: "We've received your message",
      react: ContactResponseEmail({
        customerName: name,
        message,
      }),
    })
    return { success: true }
  } catch (error) {
    console.error("Failed to send contact response email:", error)
    return { success: false, error: "Failed to send contact response" }
  }
}
