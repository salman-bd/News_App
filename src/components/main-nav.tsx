"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export function MainNav() {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const sections = [
    {
      title: "News",
      href: "/news",
      subsections: [
        { title: "World", href: "/world" },
        { title: "U.S.", href: "/us" },
        { title: "Politics", href: "/politics" },
        { title: "Business", href: "/business" },
        { title: "Tech", href: "/technology" },
        { title: "Science", href: "/science" },
        { title: "Health", href: "/health" },
        { title: "Sports", href: "/sports" },
      ],
    },
    {
      title: "Opinion",
      href: "/opinion",
      subsections: [
        { title: "Editorials", href: "/editorials" },
        { title: "Op-Ed Contributors", href: "/contributors" },
        { title: "Letters", href: "/letters" },
        { title: "Sunday Review", href: "/sunday-review" },
      ],
    },
    {
      title: "Arts",
      href: "/arts",
      subsections: [
        { title: "Movies", href: "/movies" },
        { title: "Television", href: "/television" },
        { title: "Books", href: "/books" },
        { title: "Music", href: "/music" },
        { title: "Art & Design", href: "/art-design" },
      ],
    },
    {
      title: "Living",
      href: "/living",
      subsections: [
        { title: "Travel", href: "/travel" },
        { title: "Food", href: "/food" },
        { title: "Style", href: "/style" },
        { title: "Health", href: "/health" },
      ],
    },
    {
      title: "More",
      href: "#",
      subsections: [
        { title: "Video", href: "/video" },
        { title: "Photos", href: "/photos" },
        { title: "Podcasts", href: "/podcasts" },
        { title: "Graphics", href: "/graphics" },
        { title: "Newsletters", href: "/newsletters" },
      ],
    },
  ]

  return (
    <div className="relative bg-white border-b border-gray-200">
      <nav className="container flex h-12 items-center">
        <ul className="flex space-x-1">
          {sections.map((section) => (
            <li key={section.title} className="relative">
              <Button
                variant="ghost"
                className={cn(
                  "h-12 rounded-none text-base font-medium border-b-2 border-transparent",
                  activeSection === section.title && "border-green-600 text-green-600",
                )}
                onMouseEnter={() => setActiveSection(section.title)}
                onClick={() => setActiveSection(activeSection === section.title ? null : section.title)}
              >
                {section.title}
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>

              {activeSection === section.title && (
                <div
                  className="absolute left-0 top-full w-48 bg-white shadow-lg rounded-b-md border border-gray-200 py-2 z-50"
                  onMouseLeave={() => setActiveSection(null)}
                >
                  {section.subsections.map((subsection) => (
                    <Link
                      key={subsection.title}
                      href={subsection.href}
                      className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-green-600"
                    >
                      {subsection.title}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="ml-auto">
          <Link href="/trending">
            <Button variant="ghost" className="text-sm font-medium">
              Trending
            </Button>
          </Link>
        </div>
      </nav>

      {/* Backdrop for dropdown menus */}
      {activeSection && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setActiveSection(null)}
          style={{ top: "132px" }}
        />
      )}
    </div>
  )
}

