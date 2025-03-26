import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, ChevronRight } from "lucide-react"
import { BreakingNewsBanner } from "@/components/breaking-news-banner"
import { WeatherWidget } from "@/components/weather-widget"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { MostReadSection } from "@/components/most-read-section"
import { OpinionSection } from "@/components/opinion-section"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function Home() {
  // Get current date in format like "MONDAY, MARCH 26, 2025"
  const currentDate = new Date()
    .toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    .toUpperCase()

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1">
        {/* Breaking News Banner */}
        <BreakingNewsBanner />

        {/* Main Hero Section */}
        <section className="border-b border-gray-200 py-6">
          <div className="container grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Lead Story */}
            <div className="lg:col-span-8 space-y-1">
              <div className="flex items-center justify-between mb-2">
                <Badge className="bg-green-600 hover:bg-green-700">BREAKING</Badge>
                <span className="text-sm text-muted-foreground">{currentDate}</span>
              </div>
              <Link href="/article/lead-story">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight hover:text-green-700 transition-colors">
                  Global Summit Reaches Historic Climate Agreement as Nations Pledge Radical Action
                </h1>
              </Link>
              <p className="text-lg text-muted-foreground mt-2 mb-4">
                World leaders have committed to unprecedented measures to combat climate change, including binding
                targets for carbon neutrality and a $100 billion annual fund for developing nations.
              </p>
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=600&width=1200&text=Global+Climate+Summit"
                  alt="Global Climate Summit"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center text-sm">
                  <span className="font-semibold">By Sarah Johnson</span>
                  <span className="mx-2">|</span>
                  <Clock className="h-4 w-4 mr-1" />
                  <span>2 hours ago</span>
                </div>
                <Link href="/article/lead-story">
                  <Button variant="link" className="text-green-600 p-0 h-auto font-semibold">
                    Continue reading <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Secondary Stories */}
            <div className="lg:col-span-4 space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <WeatherWidget />
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: "Tech Giants Face New Antitrust Regulations in European Union",
                    category: "Technology",
                    time: "3 hours ago",
                    image: "/placeholder.svg?height=120&width=200&text=Tech+Antitrust",
                  },
                  {
                    title: "Global Markets Rally as Central Banks Signal Policy Shift",
                    category: "Business",
                    time: "5 hours ago",
                    image: "/placeholder.svg?height=120&width=200&text=Markets",
                  },
                  {
                    title: "Diplomatic Breakthrough in Middle East Peace Negotiations",
                    category: "World",
                    time: "6 hours ago",
                    image: "/placeholder.svg?height=120&width=200&text=Diplomacy",
                  },
                ].map((story, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="relative flex-shrink-0 w-24 h-24 overflow-hidden rounded-md">
                      <Image src={story.image || "/placeholder.svg"} alt={story.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Badge variant="outline" className="mb-1">
                        {story.category}
                      </Badge>
                      <h3 className="font-semibold line-clamp-2 hover:text-green-700 transition-colors">
                        <Link href={`/article/${i}`}>{story.title}</Link>
                      </h3>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{story.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured News Grid */}
        <section className="py-10 border-b border-gray-200">
          <div className="container">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-serif font-bold">Featured Stories</h2>
              <Link href="/featured" className="text-green-600 font-semibold text-sm hover:underline">
                View all featured
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Healthcare Revolution: AI Diagnostics Outperform Human Doctors in New Study",
                  excerpt:
                    "Artificial intelligence systems have demonstrated superior accuracy in diagnosing common conditions, potentially transforming medical practice worldwide.",
                  category: "Health",
                  image: "/placeholder.svg?height=200&width=400&text=AI+Healthcare",
                },
                {
                  title: "Ocean Cleanup Initiative Removes 100,000 Tons of Plastic from Pacific Garbage Patch",
                  excerpt:
                    "Innovative technology has successfully extracted a significant portion of ocean plastic, marking a milestone in environmental restoration efforts.",
                  category: "Environment",
                  image: "/placeholder.svg?height=200&width=400&text=Ocean+Cleanup",
                },
                {
                  title: "Global Education Gap Widens: UNESCO Report Highlights Digital Divide",
                  excerpt:
                    "New data reveals growing disparities in educational access and outcomes between developed and developing nations, exacerbated by technology inequalities.",
                  category: "Education",
                  image: "/placeholder.svg?height=200&width=400&text=Education+Gap",
                },
                {
                  title: "Space Tourism Takes Flight: First Commercial Station Welcomes Civilian Visitors",
                  excerpt:
                    "The era of routine civilian space travel has begun with the inaugural group of non-astronaut visitors arriving at the first commercial space station.",
                  category: "Science",
                  image: "/placeholder.svg?height=200&width=400&text=Space+Tourism",
                },
              ].map((article, i) => (
                <Card key={i} className="overflow-hidden border-0 shadow-none">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg mb-3">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardContent className="px-0">
                    <Badge className="mb-2 bg-green-600 hover:bg-green-700">{article.category}</Badge>
                    <h3 className="font-serif font-semibold text-lg mb-2 line-clamp-2 hover:text-green-700 transition-colors">
                      <Link href={`/article/${i}`}>{article.title}</Link>
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{article.excerpt}</p>
                    <Link href={`/article/${i}`} className="text-green-600 text-sm font-semibold hover:underline">
                      Read more
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Opinion and Analysis */}
        <OpinionSection />

        {/* World News Section */}
        <section className="py-10 border-b border-gray-200 bg-slate-50">
          <div className="container">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-serif font-bold">Around the World</h2>
              <Link href="/world" className="text-green-600 font-semibold text-sm hover:underline">
                More world news
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    title: "European Parliament Passes Landmark Digital Rights Legislation",
                    excerpt:
                      "New laws establish unprecedented protections for online privacy and data ownership across the European Union.",
                    region: "Europe",
                    image: "/placeholder.svg?height=200&width=400&text=EU+Digital+Rights",
                  },
                  {
                    title: "Southeast Asian Nations Form New Security Alliance Amid Regional Tensions",
                    excerpt:
                      "ASEAN members have established a mutual defense framework in response to growing geopolitical pressures in the South China Sea.",
                    region: "Asia",
                    image: "/placeholder.svg?height=200&width=400&text=ASEAN+Alliance",
                  },
                  {
                    title: "African Renewable Energy Initiative Secures $50 Billion in Funding",
                    excerpt:
                      "Consortium of African nations and international partners announces major investment in solar, wind, and hydroelectric infrastructure.",
                    region: "Africa",
                    image: "/placeholder.svg?height=200&width=400&text=Africa+Renewable",
                  },
                  {
                    title: "Latin American Trade Bloc Expands with New Member Nations",
                    excerpt:
                      "Economic integration deepens across the Americas as three additional countries join regional free trade agreement.",
                    region: "Americas",
                    image: "/placeholder.svg?height=200&width=400&text=Latin+America+Trade",
                  },
                ].map((article, i) => (
                  <div key={i} className="group">
                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg mb-3">
                      <Image
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <Badge className="absolute top-2 left-2 bg-orange-500 hover:bg-orange-600">
                        {article.region}
                      </Badge>
                    </div>
                    <h3 className="font-serif font-semibold text-lg mb-2 group-hover:text-green-700 transition-colors">
                      <Link href={`/article/${i}`}>{article.title}</Link>
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-serif font-bold text-lg mb-4 pb-2 border-b border-gray-200">Global Headlines</h3>
                <div className="space-y-4">
                  {[
                    {
                      title: "Middle East Peace Process Gains Momentum with New Diplomatic Initiative",
                      source: "The Guardian",
                      region: "Middle East",
                    },
                    {
                      title: "Australia Announces Ambitious Climate Targets Ahead of UN Summit",
                      source: "BBC News",
                      region: "Oceania",
                    },
                    {
                      title: "Canadian Parliament Approves Universal Pharmacare Program",
                      source: "Reuters",
                      region: "North America",
                    },
                    {
                      title: "Russian and Ukrainian Officials Meet for Talks in Geneva",
                      source: "The New York Times",
                      region: "Europe",
                    },
                    {
                      title: "India Launches World's Largest Solar Power Project in Rajasthan",
                      source: "Al Jazeera",
                      region: "Asia",
                    },
                    {
                      title: "Brazil Announces New Measures to Protect Amazon Rainforest",
                      source: "CNN",
                      region: "South America",
                    },
                  ].map((headline, i) => (
                    <div key={i} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start mb-1">
                        <Badge variant="outline" className="text-xs">
                          {headline.region}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{headline.source}</span>
                      </div>
                      <h4 className="font-medium text-sm hover:text-green-700 transition-colors">
                        <Link href={`/article/headline-${i}`}>{headline.title}</Link>
                      </h4>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Link
                    href="/world"
                    className="text-green-600 text-sm font-semibold hover:underline flex items-center"
                  >
                    View all world news <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Most Read Section */}
        <MostReadSection />

        {/* Newsletter Section */}
        <section className="py-12 bg-green-600 text-white">
          <div className="container">
            <NewsletterSignup />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

