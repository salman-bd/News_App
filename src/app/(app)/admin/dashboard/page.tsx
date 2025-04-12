import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart3, Users, FileText, Tag, CheckCircle, XCircle, Edit, Trash2 } from "lucide-react"
import AdminLayout from "@/components/layout/admin-layout"

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "admin") {
    redirect("/admin/signin")
  }

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,324</div>
                  <p className="text-xs text-muted-foreground">+12.5% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,845</div>
                  <p className="text-xs text-muted-foreground">+7.2% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Articles</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">Awaiting review</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Categories</CardTitle>
                  <Tag className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">Active categories</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Traffic Overview</CardTitle>
                  <CardDescription>Website traffic over the past 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                    <BarChart3 className="h-8 w-8 text-muted-foreground" />
                    <span className="ml-2 text-sm text-muted-foreground">Chart visualization would appear here</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest actions on the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { action: "New user registered", time: "2h ago" },
                      { action: "Article submitted for review", time: "4h ago" },
                      { action: "Category added: 'Climate Change'", time: "1d ago" },
                      { action: "User role updated to Editor", time: "2d ago" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="rounded-full bg-green-100 p-2">
                          <FileText className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">{item.action}</p>
                        </div>
                        <div className="text-sm text-muted-foreground">{item.time}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="articles" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Manage Articles</CardTitle>
                <CardDescription>Review, approve, or delete articles</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      {
                        title: "Breaking News: Major Political Development",
                        author: "Jane Smith",
                        category: "Politics",
                        status: "published",
                        date: "2023-03-15",
                      },
                      {
                        title: "New Technology Breakthrough Announced",
                        author: "John Doe",
                        category: "Technology",
                        status: "pending",
                        date: "2023-03-14",
                      },
                      {
                        title: "Sports Team Wins Championship",
                        author: "Mike Johnson",
                        category: "Sports",
                        status: "published",
                        date: "2023-03-13",
                      },
                      {
                        title: "Entertainment Industry Changes",
                        author: "Sarah Williams",
                        category: "Entertainment",
                        status: "draft",
                        date: "2023-03-12",
                      },
                    ].map((article, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">{article.title}</TableCell>
                        <TableCell>{article.author}</TableCell>
                        <TableCell>{article.category}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {article.status === "published" ? (
                              <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                            ) : article.status === "pending" ? (
                              <div className="mr-2 h-4 w-4 rounded-full bg-orange-500" />
                            ) : (
                              <XCircle className="mr-2 h-4 w-4 text-muted-foreground" />
                            )}
                            {article.status}
                          </div>
                        </TableCell>
                        <TableCell>{article.date}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-500">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
