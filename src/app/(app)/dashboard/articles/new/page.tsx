"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Save, X } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

// Define the form schema with Zod
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

const articleSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters" })
    .max(100, { message: "Title must be less than 100 characters" }),
  content: z.string().min(50, { message: "Content must be at least 50 characters" }),
  category: z.string({ required_error: "Please select a category" }),
  image: z
    .any()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported.",
    )
    .optional(),
})

type ArticleFormValues = z.infer<typeof articleSchema>

export default function NewArticlePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // Initialize react-hook-form
  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: "",
      content: "",
      category: "",
    },
  })

  async function onSubmit(data: ArticleFormValues) {
    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append("title", data.title)
      formData.append("content", data.content)
      formData.append("category", data.category)

      if (data.image && data.image instanceof File) {
        formData.append("image", data.image)
      }

      const response = await fetch("/api/articles", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong")
      }

      toast.success("Article created successfully!")
      router.push(`/dashboard/articles/${result.id}`)
    } catch (error) {
      console.error("Error creating article:", error)
      toast.error(error instanceof Error ? error.message : "Failed to create article")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Create New Article</h2>
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
                  Save Article
                </>
              )}
            </Button>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Article Details</CardTitle>
            <CardDescription>Fill in the details of your new article</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form id="article-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter article title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="politics">Politics</SelectItem>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="sports">Sports</SelectItem>
                          <SelectItem value="entertainment">Entertainment</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="health">Health</SelectItem>
                          <SelectItem value="science">Science</SelectItem>
                          <SelectItem value="environment">Environment</SelectItem>
                          <SelectItem value="world">World News</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field: { value, onChange, ...fieldProps } }) => (
                    <FormItem>
                      <FormLabel>Featured Image</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            onChange(file || null)
                          }}
                          {...fieldProps}
                        />
                      </FormControl>
                      <FormDescription>Upload an image for your article (max 5MB, JPG, PNG or WebP)</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write your article content here..."
                          className="min-h-[300px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <p className="text-sm text-muted-foreground">Your article will be reviewed before being published.</p>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  )
}

