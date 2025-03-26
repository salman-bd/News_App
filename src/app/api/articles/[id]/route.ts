import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"
import { revalidatePath } from "next/cache"

// Define the request schema with Zod
const articleUpdateSchema = z.object({
  title: z.string().min(5).max(100).optional(),
  content: z.string().min(50).optional(),
  category: z.string().optional(),
  status: z.enum(["draft", "published", "archived"]).optional(),
})

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Get article from database
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
      },
    })

    if (!article) {
      return NextResponse.json({ message: "Article not found" }, { status: 404 })
    }

    return NextResponse.json(article)
  } catch (error) {
    console.error("Error fetching article:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check authentication
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const id = params.id

    // Get the article to check ownership
    const article = await db.article.findUnique({
      where: { id },
      select: { authorId: true },
    })

    if (!article) {
      return NextResponse.json({ message: "Article not found" }, { status: 404 })
    }

    // Check if user is the author or an admin
    if (article.authorId !== user.id && user.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    // Parse form data
    const formData = await request.formData()
    const title = formData.get("title") as string | null
    const content = formData.get("content") as string | null
    const category = formData.get("category") as string | null
    const status = formData.get("status") as string | null
    const image = formData.get("image") as File | null

    // Prepare update data
    const updateData: any = {}

    if (title) updateData.title = title
    if (content) updateData.content = content
    if (category) updateData.category = category
    if (status && ["draft", "published", "archived"].includes(status)) {
      updateData.status = status
    }

    // Validate data
    const result = articleUpdateSchema.safeParse(updateData)

    if (!result.success) {
      return NextResponse.json(
        { message: "Invalid input data", errors: result.error.flatten().fieldErrors },
        { status: 400 },
      )
    }

    // Handle image upload (in a real app)
    if (image) {
      // In a real app, you would upload the image to a storage service
      // and get back a URL
      updateData.imageUrl = "/placeholder.svg?height=500&width=1000"
    }

    // Update article in database
    const updatedArticle = await db.article.update({
      where: { id },
      data: updateData,
    })

    // Revalidate relevant paths
    revalidatePath(`/dashboard/articles/${id}`)
    revalidatePath(`/articles/${id}`)
    revalidatePath("/dashboard")

    return NextResponse.json({
      message: "Article updated successfully",
      article: updatedArticle,
    })
  } catch (error) {
    console.error("Error updating article:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check authentication
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const id = params.id

    // Get the article to check ownership
    const article = await db.article.findUnique({
      where: { id },
      select: { authorId: true },
    })

    if (!article) {
      return NextResponse.json({ message: "Article not found" }, { status: 404 })
    }

    // Check if user is the author or an admin
    if (article.authorId !== user.id && user.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    // Delete article from database
    await db.article.delete({
      where: { id },
    })

    // Revalidate relevant paths
    revalidatePath("/dashboard")
    revalidatePath("/articles")

    return NextResponse.json({
      message: "Article deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting article:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

