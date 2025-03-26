import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Newspaper, Clock, ChevronRight, Globe } from "lucide-react"
import { SearchInput } from "@/components/search-input"

export default function WorldNewsPage() {
  // Mock world news data
  const worldNews = [
    {
      id: "world-1",
      title: "UN Climate Conference Reaches Historic Agreement on Emissions",
      excerpt:
        "After two weeks of intense negotiations, world leaders have reached a landmark agreement to reduce carbon emissions by 50% by 2030, marking a significant step forward in the fight against climate change.",
      category: "Environment",
      region: "Global",
      publishedAt: new Date(Date.now() - 2 * 3600000).toISOString(),
      image: "/placeholder.svg?height=300&width=600&text=UN+Climate+Conference",
    },
    {
      id: "world-2",
      title: "European Union Announces Major Economic Stimulus Package",
      excerpt:
        "The European Union has unveiled a €750 billion economic recovery plan aimed at helping member states rebuild their economies following the recent global economic downturn.",
      category: "Economy",
      region: "Europe",
      publishedAt: new Date(Date.now() - 5 * 3600000).toISOString(),
      image: "/placeholder.svg?height=300&width=600&text=EU+Stimulus",
    },
    {
      id: "world-3",
      title: "Tensions Rise in South China Sea as Naval Exercises Expand",
      excerpt:
        "Military activities in the South China Sea have intensified as several nations conduct naval exercises in disputed waters, raising concerns about regional stability.",
      category: "Politics",
      region: "Asia",
      publishedAt: new Date(Date.now() - 8 * 3600000).toISOString(),
      image: "/placeholder.svg?height=300&width=600&text=South+China+Sea",
    },
    {
      id: "world-4",
      title: "African Union Launches Continental Free Trade Area",
      excerpt:
        "The African Union has officially implemented the African Continental Free Trade Area (AfCFTA), creating one of the world's largest free trade zones and potentially transforming economies across the continent.",
      category: "Trade",
      region: "Africa",
      publishedAt: new Date(Date.now() - 12 * 3600000).toISOString(),
      image: "/placeholder.svg?height=300&width=600&text=African+Free+Trade",
    },
    {
      id: "world-5",
      title: "Middle East Peace Summit Yields Breakthrough in Negotiations",
      excerpt:
        "A high-level diplomatic summit has resulted in significant progress toward resolving long-standing conflicts in the Middle East, with key parties agreeing to a framework for continued dialogue.",
      category: "Diplomacy",
      region: "Middle East",
      publishedAt: new Date(Date.now() - 18 * 3600000).toISOString(),
      image: "/placeholder.svg?height=300&width=600&text=Peace+Summit",
    },
    {
      id: "world-6",
      title: "Latin American Nations Form New Economic Alliance",
      excerpt:
        "Several Latin American countries have signed an agreement to form a new economic bloc aimed at increasing regional trade and reducing dependency on external markets.",
      category: "Economy",
      region: "Americas",
      publishedAt: new Date(Date.now() - 24 * 3600000).toISOString(),
      image: "/placeholder.svg?height=300&width=600&text=Latin+American+Alliance",
    },
  ]

  // Group news by region
  const regions = ["Global", "Europe", "Asia", "Africa", "Middle East", "Americas"]

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
            <Link href="/world" className="text-sm font-medium text-green-600">
              World
            </Link>
            <Link href="/trending" className="text-sm font-medium transition-colors hover:text-green-600">
              Trending
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
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-600">
                <Globe className="mr-1 inline-block h-4 w-4" />
                International News
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">World News</h1>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed">
                Stay informed about events shaping our world with our comprehensive international coverage.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold tracking-tight">Featured Global Stories</h2>
              <Link href="/search?category=world">
                <Button variant="outline" className="hidden sm:flex">
                  View All
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {worldNews.slice(0, 3).map((article) => (
                <Card key={article.id} className="overflow-hidden">
                  <CardHeader className="p-0">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      width={600}
                      height={300}
                      className="w-full object-cover h-48"
                    />
                  </CardHeader>
                  <CardContent className="p-4 pt-6">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-green-600 hover:bg-green-700">{article.category}</Badge>
                      <Badge variant="outline">{article.region}</Badge>
                    </div>
                    <CardTitle className="line-clamp-2 mb-2 text-xl">{article.title}</CardTitle>
                    <CardDescription className="line-clamp-3">{article.excerpt}</CardDescription>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between p-4 pt-0">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="mr-1 h-4 w-4" />
                      <span>
                        {new Date(article.publishedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                    <Link href={`/article/${article.id}`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-green-600 hover:text-green-700 hover:bg-green-50"
                      >
                        Read More
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {regions.map((region) => {
          const regionNews = worldNews.filter((article) => article.region === region)
          if (regionNews.length === 0) return null

          return (
            <section key={region} className="w-full py-12 border-t">
              <div className="container px-4 md:px-6">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold tracking-tight">{region} News</h2>
                  <Link href={`/region/${region.toLowerCase()}`}>
                    <Button variant="outline" size="sm">
                      More from {region}
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {regionNews.map((article) => (
                    <Card key={article.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3">
                          <Image
                            src={article.image || "/placeholder.svg"}
                            alt={article.title}
                            width={300}
                            height={200}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="md:w-2/3 p-4">
                          <Badge className="mb-2 bg-green-600 hover:bg-green-700">{article.category}</Badge>
                          <h3 className="font-bold mb-2 line-clamp-2">{article.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{article.excerpt}</p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center text-xs text-gray-500">
                              <Clock className="mr-1 h-3 w-3" />
                              <span>
                                {new Date(article.publishedAt).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>
                            <Link href={`/article/${article.id}`}>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-xs text-green-600 hover:text-green-700 hover:bg-green-50"
                              >
                                Read More
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          )
        })}

        <section className="w-full py-12 md:py-24 bg-green-600 text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Subscribe to Our Global Newsletter
                </h2>
                <p className="md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Get the latest international news delivered directly to your inbox. Stay informed with our curated
                  global content.
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-2">
                <form className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-black ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <Button className="bg-orange-500 hover:bg-orange-600">Subscribe</Button>
                </form>
                <p className="text-xs text-green-100">
                  By subscribing, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row px-4 md:px-6">
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

