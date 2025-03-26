import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { z } from "zod"
import { compare } from "bcrypt"
import { db } from "@/lib/db"

// Define the request schema with Zod
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  remember: z.boolean().optional(),
})

export async function POST(request: NextRequest) {
  try {
    // Parse and validate the request body
    const body = await request.json()
    const result = loginSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { message: "Invalid input data", errors: result.error.flatten().fieldErrors },
        { status: 400 },
      )
    }

    const { email, password, remember } = result.data

    // Find the user
    const user = await db.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    })

    if (!user) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 })
    }

    // Compare passwords
    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 })
    }

    // Set authentication cookie
    const token = crypto.randomUUID()

    // In a real app, you would store this token in the database
    // and associate it with the user

    cookies().set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: remember ? 60 * 60 * 24 * 30 : 60 * 60 * 24, // 30 days if remember, else 1 day
      path: "/",
    })

    return NextResponse.json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    console.error("Error logging in:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

