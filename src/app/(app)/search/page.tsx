import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Newspaper, Clock, ChevronRight, SearchIcon } from "lucide-react"
import { SearchInput } from "@/components/search-input"

interface SearchPageProps {
  searchParams: { q?: string }
}

async function getSearchResults(query: string) {
  // In a real app, this would be a fetch to your API
  // For demo purposes, we'll simulate a delay and return mock data
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Mock search results
  return Array.from({ length: 6 }, (_, i) => ({
    id: `result-${i + 1}`,
    title: `${query} - Search Result ${i + 1}`,
    excerpt: `This is a search result for "${query}". Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    category: ["Politics", "Technology", "World", "Business", "Environment", "Health"][i % 6],
    publishedAt: new Date(Date.now() - i * 86400000).toISOString(), // days ago
    image: `/placeholder.svg?height=200&width=400&text=Result+${i + 1}`,
  }))
}

function SearchResults({ query }: { query: string }) {
  return (
    <Suspense fallback={<SearchResultsSkeleton />}>
      <SearchResultsContent query={query} />
    </Suspense>
  )
}

async function SearchResultsContent({ query }: { query: string }) {
  const results = await getSearchResults(query)

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
          <SearchIcon className="h-6 w-6 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold mb-2">No results found</h2>
        <p className="text-muted-foreground mb-6">We couldn't find any articles matching "{query}"</p>
        <Link href="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {results.map((result) => (
        <Card key={result.id} className="overflow-hidden">
          <CardHeader className="p-0">
            <Image
              src={result.image || "/placeholder.svg"}
              alt={result.title}
              width={400}
              height={200}
              className="w-full object-cover h-48"
            />
          </CardHeader>
          <CardContent className="p-4 pt-6">
            <Badge className="mb-2 bg-green-600 hover:bg-green-700">{result.category}</Badge>
            <CardTitle className="line-clamp-2 mb-2 text-xl">{result.title}</CardTitle>
            <CardDescription className="line-clamp-3">{result.excerpt}</CardDescription>
          </CardContent>
          <CardFooter className="flex items-center justify-between p-4 pt-0">
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="mr-1 h-4 w-4" />
              <span>{new Date(result.publishedAt).toLocaleDateString()}</span>
            </div>
            <Link href={`/article/${result.id}`}>
              <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700 hover:bg-green-50">
                Read More
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

function SearchResultsSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <CardHeader className="p-0">
            <div className="w-full h-48 bg-muted animate-pulse" />
          </CardHeader>
          <CardContent className="p-4 pt-6">
            <div className="w-20 h-6 bg-muted rounded-full animate-pulse mb-2" />
            <div className="h-6 bg-muted rounded animate-pulse mb-2" />
            <div className="h-6 bg-muted rounded animate-pulse mb-2 w-3/4" />
            <div className="space-y-2 mt-4">
              <div className="h-4 bg-muted rounded animate-pulse" />
              <div className="h-4 bg-muted rounded animate-pulse w-5/6" />
              <div className="h-4 bg-muted rounded animate-pulse w-4/6" />
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between p-4 pt-0">
            <div className="w-24 h-4 bg-muted rounded animate-pulse" />
            <div className="w-20 h-8 bg-muted rounded animate-pulse" />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Newspaper className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold">NewsHub</span>
          </Link>
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <SearchInput />
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-green-600">
              Home
            </Link>
            <Link href="/categories" className="text-sm font-medium transition-colors hover:text-green-600">
              Categories
            </Link>
            <Link href="/world" className="text-sm font-medium transition-colors hover:text-green-600">
              World
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
      <main className="flex-1 container py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-4">
            {query ? `Search results for "${query}"` : "Search"}
          </h1>
          <div className="md:hidden mb-6">
            <SearchInput />
          </div>
        </div>

        {query ? (
          <SearchResults query={query} />
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <SearchIcon className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Search for news</h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              Enter a search term above to find articles, topics, and categories
            </p>
          </div>
        )}
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

