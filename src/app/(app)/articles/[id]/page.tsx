import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Newspaper, Calendar, Clock, ThumbsUp, MessageSquare, Share2, Bookmark } from "lucide-react"
import { getArticleById } from "@/lib/data"

interface ArticlePageProps {
  params: {
    id: string
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticleById(params.id)

  // Fallback content if article not found
  const fallbackArticle = {
    id: params.id,
    title: "Breaking News: Major Political Development Unfolds",
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <h2>The Situation Develops</h2>
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
      <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
      <h2>Expert Analysis</h2>
      <p>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
    `,
    category: "Politics",
    author: {
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    publishedAt: new Date().toISOString(),
    readTime: "5 min read",
    image: "/placeholder.svg?height=500&width=1000",
  }

  const displayArticle = article || fallbackArticle

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Newspaper className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold">NewsHub</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-green-600">
              Home
            </Link>
            <Link href="/categories" className="text-sm font-medium transition-colors hover:text-green-600">
              Categories
            </Link>
            <Link href="/trending" className="text-sm font-medium transition-colors hover:text-green-600">
              Trending
            </Link>
            <Link href="/about" className="text-sm font-medium transition-colors hover:text-green-600">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="outline" className="hidden sm:flex">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-green-600 hover:bg-green-700">Sign up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <article className="container max-w-4xl py-10">
          <div className="space-y-4">
            <Badge className="bg-green-600 hover:bg-green-700">{displayArticle.category}</Badge>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              {displayArticle.title}
            </h1>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <div className="flex items-center gap-2">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={displayArticle.author.avatar} alt={displayArticle.author.name} />
                  <AvatarFallback>{displayArticle.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{displayArticle.author.name}</div>
                  <div className="text-sm text-muted-foreground">Author</div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(displayArticle.publishedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{displayArticle.readTime}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="my-8">
            <Image
              src={displayArticle.image || "/placeholder.svg"}
              alt={displayArticle.title}
              width={1000}
              height={500}
              className="rounded-lg object-cover"
            />
          </div>
          <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: displayArticle.content }} />
          <div className="mt-8 flex items-center justify-between border-t border-b py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4" />
                <span>Like</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>Comment</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </Button>
            </div>
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <Bookmark className="h-4 w-4" />
              <span>Save</span>
            </Button>
          </div>
        </article>
      </main>
      <footer className="w-full border-t bg-background py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Newspaper className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold">NewsHub</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} NewsHub. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

