"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Save, X } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { updateArticle } from "@/lib/actions"

interface EditArticlePageProps {
  params: {
    id: string
  }
}

export default function EditArticlePage({ params }: EditArticlePageProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [article, setArticle] = useState({
    title: "",
    content: "",
    category: "",
  })

  useEffect(() => {
    // In a real app, you would fetch the article data
    // For demo purposes, we'll use mock data
    setArticle({
      title: "Breaking News: Major Political Development Unfolds",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      category: "politics",
    })
  }, [params.id])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(event.currentTarget)
    const title = formData.get("title") as string
    const content = formData.get("content") as string
    const category = formData.get("category") as string
    const image = formData.get("image") as File

    try {
      await updateArticle(params.id, { title, content, category, image })
      router.push(`/dashboard/articles`)
    } catch (error) {
      console.error("Error updating article:", error)
      setError("An error occurred while updating the article. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Edit Article</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => router.back()}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button form="article-form" type="submit" className="bg-green-600 hover:bg-green-700" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Article Details</CardTitle>
            <CardDescription>Edit the details of your article</CardDescription>
          </CardHeader>
          <CardContent>
            <form id="article-form" onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={article.title}
                  placeholder="Enter article title"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select name="category" defaultValue={article.category} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="politics">Politics</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Featured Image</Label>
                <Input id="image" name="image" type="file" accept="image/*" />
                <p className="text-sm text-muted-foreground">Leave empty to keep the current image</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  name="content"
                  defaultValue={article.content}
                  placeholder="Write your article content here..."
                  className="min-h-[300px]"
                  required
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
            </form>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <p className="text-sm text-muted-foreground">Your article will be reviewed before being published.</p>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  )
}

