import { z } from "zod"

// User authentication schemas
export const signUpSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export const signInSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
  remember: z.boolean().optional(),
})

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
})

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export const verificationSchema = z.object({
  token: z.string().min(1, { message: "Verification token is required" }),
})

// Article schemas
export const articleSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  content: z.string().min(50, { message: "Content must be at least 50 characters" }),
  excerpt: z.string().min(10, { message: "Excerpt must be at least 10 characters" }).optional(),
  category: z.string().min(1, { message: "Category is required" }),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  featured: z.boolean().default(false),
  tags: z.string().optional(),
})

// Comment schemas
export const commentSchema = z.object({
  content: z.string().min(1, { message: "Comment cannot be empty" }),
  articleId: z.string(),
  authorId: z.string(),
})

// Contact form schema
export const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
})

// Newsletter subscription schema
export const newsletterSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
})

// Profile update schema
export const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  bio: z.string().optional(),
  image: z.any().optional(),
})

// Password update schema
export const passwordUpdateSchema = z
  .object({
    currentPassword: z.string().min(1, { message: "Current password is required" }),
    newPassword: z.string().min(8, { message: "New password must be at least 8 characters" }),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  })

// Export types
export type SignUpFormValues = z.infer<typeof signUpSchema>
export type SignInFormValues = z.infer<typeof signInSchema>
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>
export type ArticleFormValues = z.infer<typeof articleSchema>
export type CommentFormValues = z.infer<typeof commentSchema>
export type ContactFormValues = z.infer<typeof contactSchema>
export type NewsletterFormValues = z.infer<typeof newsletterSchema>
export type ProfileFormValues = z.infer<typeof profileSchema>
export type PasswordUpdateFormValues = z.infer<typeof passwordUpdateSchema>
