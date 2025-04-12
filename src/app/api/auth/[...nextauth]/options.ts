import { PrismaAdapter } from "@next-auth/prisma-adapter"
import type { NextAuthOptions, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import { compare } from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { sendWelcomeEmail } from "@/lib/sendEmails"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Authenticate based on role
        let user
        if (credentials.role === "USER") {
          user = await prisma.user.findUnique({
            where: { email: credentials.email, role: "USER" },
          })
        } else if (credentials.role === "DRIVER") {
          user = await prisma.user.findUnique({
            where: { email: credentials.email, role: "DRIVER" },
          })
        } else if (credentials.role === "ADMIN") {
          user = await prisma.user.findUnique({
            where: { email: credentials.email, role: "ADMIN" },
          })
        } else if (credentials.role === "RESTAURANT_OWNER") {
          user = await prisma.user.findUnique({
            where: { email: credentials.email, role: "RESTAURANT_OWNER" },
          })
        }
        if (!user) {
          throw new Error(
            `No ${credentials.role} account found! Put correct email or create ${credentials.role} account`,
          )
        }
        if (!user.password) {
          throw new Error("User password not found in database. Please reset your password.")
        }
        if (!user.isVerified) {
          throw new Error("Please verify your account before logging in")
        }
        const isPasswordValid = await compare(credentials.password, user.password)
        if (!isPasswordValid) {
          throw new Error("Invalid password. Please try with correct password")
        }
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        } as User
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // For OAuth providers
      if (account?.provider && ["google", "facebook"].includes(account.provider)) {
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! },
            include: { accounts: true },
          })

          // If user exists but doesn't have this provider linked
          if (existingUser) {
            // Check if this provider account already exists
            const existingAccount = existingUser.accounts.find(
              (acc) => acc.provider === account.provider && acc.providerAccountId === account.providerAccountId,
            )

            // Only create a new account if it doesn't exist
            if (!existingAccount) {
              // Check if there's already an account with this provider but different providerAccountId
              const existingProviderAccount = existingUser.accounts.find((acc) => acc.provider === account.provider)

              if (existingProviderAccount) {
                // Update the existing provider account
                await prisma.account.update({
                  where: {
                    id: existingProviderAccount.id,
                  },
                  data: {
                    providerAccountId: account.providerAccountId,
                    refresh_token: account.refresh_token,
                    access_token: account.access_token,
                    expires_at: account.expires_at,
                    token_type: account.token_type,
                    scope: account.scope,
                    id_token: account.id_token,
                    session_state: account.session_state,
                  },
                })
              } else {
                // Create a new account for this provider
                await prisma.account.create({
                  data: {
                    userId: existingUser.id,
                    type: account.type,
                    provider: account.provider,
                    providerAccountId: account.providerAccountId,
                    refresh_token: account.refresh_token,
                    access_token: account.access_token,
                    expires_at: account.expires_at,
                    token_type: account.token_type,
                    scope: account.scope,
                    id_token: account.id_token,
                    session_state: account.session_state,
                  },
                })
              }
            }

            // Update user to be verified if they weren't already
            if (!existingUser.isVerified) {
              await prisma.user.update({
                where: { id: existingUser.id },
                data: {
                  isVerified: true,
                  emailVerified: new Date(),
                },
              })
            }

            return true
          }
        } catch (error) {
          console.error("Error in signIn callback:", error)
          return false
        }
      }
      return true
    },

    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        // For social logins, update the user with additional data
        if (["google", "facebook"].includes(account.provider)) {
          try {
            // Find the user that was just created by the adapter
            const dbUser = await prisma.user.findUnique({
              where: { email: user.email! },
            })

            if (dbUser) {
              // Update with additional fields
              const updatedUser = await prisma.user.update({
                where: { id: dbUser.id },
                data: {
                  emailVerified: new Date(),
                  isVerified: true,
                  updatedAt: new Date(),
                },
              })

              // If this is a new user, send welcome email
              if (updatedUser.createdAt && new Date().getTime() - new Date(updatedUser.createdAt).getTime() < 60000) {
                // User was created less than a minute ago, likely new
                try {
                  await sendWelcomeEmail(user.email, user.name)
                } catch (emailError) {
                  console.error("Failed to send welcome email:", emailError)
                }
              }
              // Update token with user data
              token.id = updatedUser.id
              token.role = updatedUser.role
              token.isVerified = updatedUser.isVerified
            }
          } catch (error) {
            console.error("Error updating user in JWT callback:", error)
          }
        } else {
          // For credentials provider
          token.id = user.id
          token.role = user.role
          token.isVerified = user.isVerified
        }
      }

      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.isVerified = token.isVerified as boolean
      }
      return session
    },
  },
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/auth/error",
    verifyRequest: "/auth/verify",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
}
