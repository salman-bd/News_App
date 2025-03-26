import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function OpinionSection() {
  const opinions = [
    {
      title: "The Climate Crisis Demands More Than Just Agreements",
      excerpt:
        "While the recent summit represents progress, we need concrete action and accountability, not just promises.",
      author: "Dr. Emma Chen",
      role: "Environmental Policy Expert",
      image: "/placeholder.svg?height=80&width=80&text=EC",
    },
    {
      title: "Digital Privacy in the Age of AI: We're Losing Ground",
      excerpt:
        "As artificial intelligence becomes more pervasive, our concept of privacy is being fundamentally challenged.",
      author: "Michael Rodriguez",
      role: "Tech Columnist",
      image: "/placeholder.svg?height=80&width=80&text=MR",
    },
    {
      title: "The Economic Case for Universal Healthcare",
      excerpt:
        "Beyond the moral arguments, there are compelling financial reasons to adopt a universal healthcare system.",
      author: "Sarah Johnson",
      role: "Economics Editor",
      image: "/placeholder.svg?height=80&width=80&text=SJ",
    },
    {
      title: "Democracy's Digital Dilemma",
      excerpt: "Social media and misinformation are testing the resilience of democratic institutions worldwide.",
      author: "James Wilson",
      role: "Political Analyst",
      image: "/placeholder.svg?height=80&width=80&text=JW",
    },
  ]

  return (
    <section className="py-10 border-b border-gray-200">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-serif font-bold">Opinion</h2>
          <Link href="/opinion" className="text-green-600 font-semibold text-sm hover:underline">
            All opinion articles
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {opinions.map((opinion, i) => (
            <Card key={i} className="border-0 shadow-none">
              <CardContent className="p-0">
                <Badge variant="outline" className="mb-2">
                  Opinion
                </Badge>
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={opinion.image || "/placeholder.svg"}
                      alt={opinion.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{opinion.author}</h4>
                    <p className="text-xs text-muted-foreground">{opinion.role}</p>
                  </div>
                </div>
                <h3 className="font-serif font-semibold text-lg mb-2 hover:text-green-700 transition-colors">
                  <Link href={`/opinion/${i}`}>{opinion.title}</Link>
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-3">{opinion.excerpt}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

