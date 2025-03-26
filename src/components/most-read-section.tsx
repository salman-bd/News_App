import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp } from "lucide-react"

export function MostReadSection() {
  const mostReadArticles = [
    {
      title: "Global Summit Reaches Historic Climate Agreement as Nations Pledge Radical Action",
      category: "Environment",
      views: "2.4M",
    },
    {
      title: "Tech Giants Face New Antitrust Regulations in European Union",
      category: "Technology",
      views: "1.8M",
    },
    {
      title: "Healthcare Revolution: AI Diagnostics Outperform Human Doctors in New Study",
      category: "Health",
      views: "1.5M",
    },
    {
      title: "Space Tourism Takes Flight: First Commercial Station Welcomes Civilian Visitors",
      category: "Science",
      views: "1.2M",
    },
    {
      title: "Global Markets Rally as Central Banks Signal Policy Shift",
      category: "Business",
      views: "980K",
    },
  ]

  return (
    <section className="py-10 border-b border-gray-200">
      <div className="container">
        <div className="flex items-center mb-6">
          <TrendingUp className="h-5 w-5 text-orange-500 mr-2" />
          <h2 className="text-2xl font-serif font-bold">Most Read</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {mostReadArticles.map((article, i) => (
            <Card key={i} className="border-0 shadow-none">
              <CardContent className="p-0">
                <div className="flex items-start gap-3">
                  <div className="text-3xl font-serif font-bold text-gray-200 leading-none">{i + 1}</div>
                  <div>
                    <Badge className="mb-2 bg-green-600 hover:bg-green-700">{article.category}</Badge>
                    <h3 className="font-medium line-clamp-3 hover:text-green-700 transition-colors">
                      <Link href={`/article/most-read-${i}`}>{article.title}</Link>
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">{article.views} readers</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

