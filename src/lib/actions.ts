"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/lib/prisma"
import { hash, compare } from "bcryptjs"
import crypto from "crypto"
import {
  sendWelcomeEmail,
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendArticlePublishedEmail,
  sendCommentNotificationEmail,
  sendContactResponseEmail,
} from "@/lib/sendEmails"
import { getCurrentUser } from "@/lib/auth"

import type {
  SignUpFormValues,
  ArticleFormValues,
  CommentFormValues,
  ContactFormValues,
  NewsletterFormValues,
  ProfileFormValues,
  PasswordUpdateFormValues,
} from "@/lib/validations"
import type { UserRole } from "@prisma/client"

// User Actions
export async function createUser(data: SignUpFormValues, role: UserRole = "USER") {
  try {
    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email: data.email },
    })

    if (existingUser) {
      if (existingUser.isVerified) {
        return { error: { email: ["User with this email already exists"] } }
      }
    }

    // Hash password
    const hashedPassword = await hash(data.password, 10)

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString("hex")
    const verificationExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    if (existingUser) {
      // Update existing unverified user
      await db.user.update({
        where: { id: existingUser.id },
        data: {
          name: data.name,
          password: hashedPassword,
          verificationToken,
          verificationTokenExpires: verificationExpiry,
          role,
        },
      })
    } else {
      // Create user
      await db.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: hashedPassword,
          verificationToken,
          verificationTokenExpires: verificationExpiry,
          role,
        },
      })
    }

    // Send verification email
    await sendVerificationEmail(data.email, verificationToken)

    return { success: true, message: "Please check your email to verify your account" }
  } catch (error) {
    console.error("Error creating user:", error)
    return { error: { server: ["Failed to create user. Please try again."] } }
  }
}

export async function verifyEmail(token: string) {
  try {
    // Find user with this verification token
    const user = await db.user.findFirst({
      where: {
        verificationToken: token,
        verificationTokenExpires: {
          gt: new Date(),
        },
      },
    })

    if (!user) {
      return { error: "Invalid or expired verification token" }
    }

    // Update user as verified
    await db.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        emailVerified: new Date(),
        verificationToken: null,
        verificationTokenExpires: null,
      },
    })

    // Send welcome email
    await sendWelcomeEmail(user.email, user.name || "User")

    return { success: true }
  } catch (error) {
    console.error("Error verifying email:", error)
    return { error: "Failed to verify email. Please try again." }
  }
}

export async function requestPasswordReset(email: string) {
  try {
    // Find user by email
    const user = await db.user.findUnique({
      where: { email },
    })

    if (!user) {
      // Don't reveal that the user doesn't exist
      return { success: true }
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex")
    const resetTokenExpiry = new Date(Date.now() + 1 * 60 * 60 * 1000) // 1 hour

    // Update user with reset token
    await db.user.update({
      where: { id: user.id },
      data: {
        passwordResetToken: resetToken,
        passwordResetExpires: resetTokenExpiry,
      },
    })

    // Send password reset email
    await sendPasswordResetEmail(email, resetToken)

    return { success: true }
  } catch (error) {
    console.error("Error requesting password reset:", error)
    return { error: "Failed to request password reset. Please try again." }
  }
}

export async function resetPassword(token: string, password: string) {
  try {
    // Find user with this reset token
    const user = await db.user.findFirst({
      where: {
        passwordResetToken: token,
        passwordResetExpires: {
          gt: new Date(),
        },
      },
    })

    if (!user) {
      return { error: "Invalid or expired reset token" }
    }

    // Hash new password
    const hashedPassword = await hash(password, 10)

    // Update user password and clear reset token
    await db.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetExpires: null,
      },
    })

    return { success: true }
  } catch (error) {
    console.error("Error resetting password:", error)
    return { error: "Failed to reset password. Please try again." }
  }
}

export async function updateUserProfile(userId: string, data: ProfileFormValues) {
  try {
    await db.user.update({
      where: { id: userId },
      data: {
        name: data.name,
        // Handle image upload in a real app
      },
    })

    revalidatePath("/dashboard/profile")
    return { success: true }
  } catch (error) {
    console.error("Error updating profile:", error)
    return { error: "Failed to update profile. Please try again." }
  }
}

export async function updateUserPassword(userId: string, data: PasswordUpdateFormValues) {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { password: true },
    })

    if (!user || !user.password) {
      return { error: "User not found" }
    }

    // Verify current password
    const isValid = await compare(data.currentPassword, user.password)
    if (!isValid) {
      return { error: "Current password is incorrect" }
    }

    // Hash new password
    const hashedPassword = await hash(data.newPassword, 10)

    // Update password
    await db.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    })

    return { success: true }
  } catch (error) {
    console.error("Error updating password:", error)
    return { error: "Failed to update password. Please try again." }
  }
}

export async function deleteUserAccount(userId: string) {
  try {
    // Delete user's data
    await db.comment.deleteMany({ where: { authorId: userId } })
    await db.savedArticle.deleteMany({ where: { userId } })
    await db.notification.deleteMany({ where: { userId } })

    // Update articles to anonymous or delete them
    await db.article.updateMany({
      where: { authorId: userId },
      data: { authorId: "anonymous" }, // You would need an anonymous user in a real app
    })

    // Delete sessions and accounts
    await db.session.deleteMany({ where: { userId } })
    await db.account.deleteMany({ where: { userId } })

    // Finally delete the user
    await db.user.delete({ where: { id: userId } })

    return { success: true }
  } catch (error) {
    console.error("Error deleting account:", error)
    return { error: "Failed to delete account. Please try again." }
  }
}

// Article Actions
export async function createArticle(data: ArticleFormValues) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return { error: "Unauthorized" }
    }

    // Create slug from title
    const slug = data.title
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-")

    // Create article
    const article = await db.article.create({
      data: {
        title: data.title,
        content: data.content,
        excerpt: data.excerpt || data.content.substring(0, 150) + "...",
        slug,
        category: data.category,
        status: data.status,
        featured: data.featured || false,
        authorId: user.id,
        publishedAt: data.status === "published" ? new Date() : null,
      },
    })

    // Handle tags if provided
    if (data.tags) {
      const tagNames = data.tags.split(",").map((tag) => tag.trim())

      for (const tagName of tagNames) {
        // Find or create tag
        const tag = await db.tag.upsert({
          where: { name: tagName },
          update: {},
          create: { name: tagName },
        })

        // Connect tag to article
        await db.article.update({
          where: { id: article.id },
          data: {
            tags: {
              connect: { id: tag.id },
            },
          },
        })
      }
    }

    // If article is published, send notification to author
    if (data.status === "published") {
      await sendArticlePublishedEmail(
        user.email || "",
        data.title,
        `${process.env.NEXT_PUBLIC_APP_URL}/articles/${article.slug}`,
      )
    }

    revalidatePath("/dashboard/articles")
    revalidatePath("/articles")

    return { success: true, articleId: article.id }
  } catch (error) {
    console.error("Error creating article:", error)
    return { error: "Failed to create article. Please try again." }
  }
}

export async function updateArticle(articleId: string, data: ArticleFormValues) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return { error: "Unauthorized" }
    }

    // Get current article
    const currentArticle = await db.article.findUnique({
      where: { id: articleId },
      include: { tags: true },
    })

    if (!currentArticle) {
      return { error: "Article not found" }
    }

    // Check if user is author or admin
    if (currentArticle.authorId !== user.id && user.role !== "ADMIN") {
      return { error: "Unauthorized" }
    }

    // Update slug if title changed
    let slug = currentArticle.slug
    if (data.title !== currentArticle.title) {
      slug = data.title
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-")
    }

    // Check if status changed to published
    const wasPublished = currentArticle.status === "published"
    const isNowPublished = data.status === "published"
    const publishedAt = !wasPublished && isNowPublished ? new Date() : currentArticle.publishedAt

    // Update article
    const article = await db.article.update({
      where: { id: articleId },
      data: {
        title: data.title,
        content: data.content,
        excerpt: data.excerpt || data.content.substring(0, 150) + "...",
        slug,
        category: data.category,
        status: data.status,
        featured: data.featured || false,
        publishedAt,
      },
    })

    // Handle tags if provided
    if (data.tags) {
      // Disconnect all existing tags
      await db.article.update({
        where: { id: articleId },
        data: {
          tags: {
            disconnect: currentArticle.tags.map((tag) => ({ id: tag.id })),
          },
        },
      })

      // Connect new tags
      const tagNames = data.tags.split(",").map((tag) => tag.trim())

      for (const tagName of tagNames) {
        // Find or create tag
        const tag = await db.tag.upsert({
          where: { name: tagName },
          update: {},
          create: { name: tagName },
        })

        // Connect tag to article
        await db.article.update({
          where: { id: article.id },
          data: {
            tags: {
              connect: { id: tag.id },
            },
          },
        })
      }
    }

    // If article was just published, send notification to author
    if (!wasPublished && isNowPublished) {
      const author = await db.user.findUnique({
        where: { id: currentArticle.authorId },
        select: { email: true },
      })

      if (author && author.email) {
        await sendArticlePublishedEmail(
          author.email,
          data.title,
          `${process.env.NEXT_PUBLIC_APP_URL}/articles/${article.slug}`,
        )
      }
    }

    revalidatePath(`/dashboard/articles/${articleId}`)
    revalidatePath(`/articles/${article.slug}`)
    revalidatePath("/dashboard/articles")
    revalidatePath("/articles")

    return { success: true }
  } catch (error) {
    console.error("Error updating article:", error)
    return { error: "Failed to update article. Please try again." }
  }
}

export async function deleteArticle(articleId: string) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return { error: "Unauthorized" }
    }

    // Get article
    const article = await db.article.findUnique({
      where: { id: articleId },
    })

    if (!article) {
      return { error: "Article not found" }
    }

    // Check if user is author or admin
    if (article.authorId !== user.id && user.role !== "ADMIN") {
      return { error: "Unauthorized" }
    }

    // Delete article
    await db.article.delete({
      where: { id: articleId },
    })

    revalidatePath("/dashboard/articles")
    revalidatePath("/articles")

    return { success: true }
  } catch (error) {
    console.error("Error deleting article:", error)
    return { error: "Failed to delete article. Please try again." }
  }
}

export async function getArticleById(id: string) {
  try {
    const article = await db.article.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        tags: true,
        comments: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    })

    return article
  } catch (error) {
    console.error("Error fetching article:", error)
    return null
  }
}

export async function getArticleBySlug(slug: string) {
  try {
    const article = await db.article.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        tags: true,
        comments: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    })

    return article
  } catch (error) {
    console.error("Error fetching article by slug:", error)
    return null
  }
}

export async function getArticles({
  limit = 10,
  offset = 0,
  category = null,
  status = "published",
  authorId = null,
  searchQuery = null,
}) {
  try {
    // Build where clause
    const where: any = {}

    if (category) {
      where.category = category
    }

    if (status) {
      where.status = status
    }

    if (authorId) {
      where.authorId = authorId
    }

    if (searchQuery) {
      where.OR = [
        { title: { contains: searchQuery, mode: "insensitive" } },
        { content: { contains: searchQuery, mode: "insensitive" } },
        { category: { contains: searchQuery, mode: "insensitive" } },
      ]
    }

    // Get articles
    const articles = await db.article.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      take: limit,
      skip: offset,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        tags: true,
        _count: {
          select: {
            comments: true,
          },
        },
      },
    })

    // Get total count
    const total = await db.article.count({ where })

    return {
      articles,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    }
  } catch (error) {
    console.error("Error fetching articles:", error)
    return {
      articles: [],
      pagination: {
        total: 0,
        limit,
        offset,
        hasMore: false,
      },
    }
  }
}

// Comment Actions
export async function createComment(data: CommentFormValues) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return { error: "Unauthorized" }
    }

    // Create comment
    const comment = await db.comment.create({
      data: {
        content: data.content,
        articleId: data.articleId,
        authorId: user.id,
      },
    })

    // Get article and author info for notification
    const article = await db.article.findUnique({
      where: { id: data.articleId },
      include: {
        author: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    })

    // Notify article author of new comment (if not self-commenting)
    if (article && article.author.id !== user.id && article.author.email) {
      await sendCommentNotificationEmail(
        article.author.email,
        article.title,
        user.name || "A user",
        data.content,
        `${process.env.NEXT_PUBLIC_APP_URL}/articles/${article.slug}`,
      )
    }

    revalidatePath(`/articles/${data.articleId}`)

    return { success: true, commentId: comment.id }
  } catch (error) {
    console.error("Error creating comment:", error)
    return { error: "Failed to create comment. Please try again." }
  }
}

export async function deleteComment(commentId: string, articleId: string) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return { error: "Unauthorized" }
    }

    // Get comment
    const comment = await db.comment.findUnique({
      where: { id: commentId },
    })

    if (!comment) {
      return { error: "Comment not found" }
    }

    // Check if user is comment author or admin
    if (comment.authorId !== user.id && user.role !== "ADMIN") {
      return { error: "Unauthorized" }
    }

    // Delete comment
    await db.comment.delete({
      where: { id: commentId },
    })

    revalidatePath(`/articles/${articleId}`)

    return { success: true }
  } catch (error) {
    console.error("Error deleting comment:", error)
    return { error: "Failed to delete comment. Please try again." }
  }
}

// Contact Actions
export async function submitContactForm(data: ContactFormValues) {
  try {
    // Save contact message to database
    await db.contact.create({
      data: {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      },
    })

    // Send auto-response email
    await sendContactResponseEmail(data.email, data.name, data.message)

    return { success: true }
  } catch (error) {
    console.error("Error submitting contact form:", error)
    return { error: "Failed to submit contact form. Please try again." }
  }
}

// Newsletter Actions
export async function subscribeToNewsletter(data: NewsletterFormValues) {
  try {
    // Check if already subscribed
    const existingSubscriber = await db.subscriber.findUnique({
      where: { email: data.email },
    })

    if (existingSubscriber) {
      return { error: "Email already subscribed" }
    }

    // Add subscriber
    await db.subscriber.create({
      data: { email: data.email },
    })

    return { success: true }
  } catch (error) {
    console.error("Error subscribing to newsletter:", error)
    return { error: "Failed to subscribe. Please try again." }
  }
}

// Admin Actions
export async function createCategory(name: string, description?: string) {
  try {
    const user = await getCurrentUser()

    if (!user || user.role !== "ADMIN") {
      return { error: "Unauthorized" }
    }

    // Create slug from name
    const slug = name
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-")

    // Check if category already exists
    const existingCategory = await db.category.findFirst({
      where: {
        OR: [{ name }, { slug }],
      },
    })

    if (existingCategory) {
      return { error: "Category already exists" }
    }

    // Create category
    await db.category.create({
      data: {
        name,
        description,
      },
    })

    revalidatePath("/admin/categories")

    return { success: true }
  } catch (error) {
    console.error("Error creating category:", error)
    return { error: "Failed to create category. Please try again." }
  }
}

export async function updateCategory(id: string, name: string, description?: string) {
  try {
    const user = await getCurrentUser()

    if (!user || user.role !== "ADMIN") {
      return { error: "Unauthorized" }
    }

    // Create slug from name
    const slug = name
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-")

    // Check if another category with the same name exists
    const existingCategory = await db.category.findFirst({
      where: {
        OR: [{ name }, { slug }],
        NOT: {
          id,
        },
      },
    })

    if (existingCategory) {
      return { error: "Another category with this name already exists" }
    }

    // Update category
    await db.category.update({
      where: { id },
      data: {
        name,
        description,
      },
    })

    revalidatePath("/admin/categories")

    return { success: true }
  } catch (error) {
    console.error("Error updating category:", error)
    return { error: "Failed to update category. Please try again." }
  }
}

export async function deleteCategory(id: string) {
  try {
    const user = await getCurrentUser()

    if (!user || user.role !== "ADMIN") {
      return { error: "Unauthorized" }
    }

    // Delete category
    await db.category.delete({
      where: { id },
    })

    revalidatePath("/admin/categories")

    return { success: true }
  } catch (error) {
    console.error("Error deleting category:", error)
    return { error: "Failed to delete category. Please try again." }
  }
}

export async function updateUserRole(userId: string, role: UserRole) {
  try {
    const user = await getCurrentUser()

    if (!user || user.role !== "ADMIN") {
      return { error: "Unauthorized" }
    }

    // Update user role
    await db.user.update({
      where: { id: userId },
      data: { role },
    })

    revalidatePath("/admin/users")

    return { success: true }
  } catch (error) {
    console.error("Error updating user role:", error)
    return { error: "Failed to update user role. Please try again." }
  }
}

// Notification Actions
export async function getNotifications() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return []
    }

    const notifications = await db.notification.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 20,
    })

    return notifications
  } catch (error) {
    console.error("Error fetching notifications:", error)
    return []
  }
}

export async function markNotificationAsRead(id: string) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return { error: "Unauthorized" }
    }

    await db.notification.update({
      where: {
        id,
        userId: user.id,
      },
      data: { read: true },
    })

    return { success: true }
  } catch (error) {
    console.error("Error marking notification as read:", error)
    return { error: "Failed to mark notification as read" }
  }
}

export async function markAllNotificationsAsRead() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return { error: "Unauthorized" }
    }

    await db.notification.updateMany({
      where: {
        userId: user.id,
        read: false,
      },
      data: { read: true },
    })

    return { success: true }
  } catch (error) {
    console.error("Error marking all notifications as read:", error)
    return { error: "Failed to mark all notifications as read" }
  }
}

// Helper function to create notifications
export async function createNotification({
  userId,
  type,
  message,
  relatedId,
  link,
}: {
  userId: string
  type: string
  message: string
  relatedId?: string
  link?: string
}) {
  try {
    await db.notification.create({
      data: {
        userId,
        type,
        message,
        relatedId,
        link,
      },
    })

    return { success: true }
  } catch (error) {
    console.error("Error creating notification:", error)
    return { error: "Failed to create notification" }
  }
}
