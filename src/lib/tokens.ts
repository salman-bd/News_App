import crypto from "crypto"
import { db } from "@/lib/prisma"

export async function generateVerificationToken(email?: string) {
  const token = crypto.randomBytes(32).toString("hex")
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

  if (email) {
    const existingToken = await db.verificationToken.findFirst({
      where: { identifier: email },
    })

    if (existingToken) {
      await db.verificationToken.delete({
        where: { id: existingToken.id },
      })
    }

    await db.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires,
      },
    })
  }

  return token
}

export async function generatePasswordResetToken(email: string) {
  const token = crypto.randomBytes(32).toString("hex")
  const expires = new Date(Date.now() + 1 * 60 * 60 * 1000) // 1 hour

  const existingToken = await db.user.findUnique({
    where: { email },
  })

  if (existingToken) {
    await db.user.update({
      where: { email },
      data: {
        passwordResetToken: token,
        passwordResetExpires: expires,
      },
    })
  }

  return token
}
