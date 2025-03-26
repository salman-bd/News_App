import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    // Delete the authentication cookie
    cookies().delete("auth-token")

    return NextResponse.json({
      message: "Logged out successfully",
    })
  } catch (error) {
    console.error("Error logging out:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

