import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { z } from "zod"
import { hash } from "bcrypt"
import { db } from "@/lib/db"

// Define the request schema with Zod
const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
})

export async function POST(request: NextRequest) {
  try {
    // Parse and validate the request body
    const body = await request.json()
    const result = signupSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { message: "Invalid input data", errors: result.error.flatten().fieldErrors },
        { status: 400 },
      )
    }

    const { name, email, password } = result.data

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ message: "User with this email already exists" }, { status: 409 })
    }

    // Hash the password
    const hashedPassword = await hash(password, 10)

    // Create the user
    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    })

    // Set authentication cookie
    const token = crypto.randomUUID()

    // In a real app, you would store this token in the database
    // and associate it with the user

    cookies().set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

