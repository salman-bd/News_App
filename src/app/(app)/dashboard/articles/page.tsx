"use client"

import Link from "next/link"
import Image from "next/image"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Eye, Edit, Trash2, MoreVertical, Plus, FileText } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { getCurrentUser } from "@/lib/auth"
import { getUserArticles } from "@/lib/data"
import { deleteArticle } from "@/lib/actions"

export default async function ArticlesPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const articles = await getUserArticles(user.id)

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">My Articles</h2>
          <Link href="/dashboard/articles/new">
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="mr-2 h-4 w-4" />
              Create New Article
            </Button>
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Card key={article.id} className="overflow-hidden">
              <div className="relative">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <Badge
                  className={`absolute top-2 right-2 ${
                    article.status === "published"
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-orange-500 hover:bg-orange-600"
                  }`}
                >
                  {article.status === "published" ? "Published" : "Draft"}
                </Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg line-clamp-1">{article.title}</h3>
                <div className="flex items-center justify-between mt-2">
                  <Badge variant="outline">{article.category}</Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Eye className="mr-1 h-4 w-4" />
                    {article.views} views
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{article.excerpt}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/articles/${article.id}`}>
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Link>
                </Button>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/articles/edit/${article.id}`}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Link>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        className="text-red-500 focus:text-red-500"
                        onClick={async () => {
                          if (confirm("Are you sure you want to delete this article?")) {
                            await deleteArticle(article.id)
                          }
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {articles.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-green-100 p-3 text-green-600 mx-auto mb-4">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium">No articles yet</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">
              You haven't created any articles yet. Start writing your first article.
            </p>
            <Link href="/dashboard/articles/new">
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="mr-2 h-4 w-4" />
                Create New Article
              </Button>
            </Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

