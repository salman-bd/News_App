import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { db } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"
import { revalidatePath } from "next/cache"

// Define the request schema with Zod
const articleSchema = z.object({
  title: z.string().min(5).max(100),
  content: z.string().min(50),
  category: z.string(),
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    // Build the query
    const where = category ? { category } : {}

    // Get articles from database
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
      },
    })

    const total = await db.article.count({ where })

    return NextResponse.json({
      articles,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    })
  } catch (error) {
    console.error("Error fetching articles:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Parse form data
    const formData = await request.formData()
    const title = formData.get("title") as string
    const content = formData.get("content") as string
    const category = formData.get("category") as string
    const image = formData.get("image") as File | null

    // Validate data
    const result = articleSchema.safeParse({ title, content, category })

    if (!result.success) {
      return NextResponse.json(
        { message: "Invalid input data", errors: result.error.flatten().fieldErrors },
        { status: 400 },
      )
    }

    // Handle image upload (in a real app)
    let imageUrl = null
    if (image) {
      // In a real app, you would upload the image to a storage service
      // and get back a URL
      imageUrl = "/placeholder.svg?height=500&width=1000"
    }

    // Create article in database
    const article = await db.article.create({
      data: {
        title,
        content,
        category,
        imageUrl,
        authorId: user.id,
        status: "draft", // New articles start as drafts
      },
    })

    // Revalidate relevant paths
    revalidatePath("/dashboard")
    revalidatePath("/articles")

    return NextResponse.json(
      {
        message: "Article created successfully",
        id: article.id,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating article:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

