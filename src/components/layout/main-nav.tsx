"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

interface NavSection {
  title: string
  href: string
  subsections: { title: string; href: string }[]
}

export function MainNav() {
  const pathname = usePathname()
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const sections: NavSection[] = [
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

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleMouseEnter = (title: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setActiveSection(title)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveSection(null)
    }, 300)
  }

  return (
    <div className="relative bg-white border-b border-gray-200">
      <nav className="container flex h-12 items-center">
        <ul className="flex space-x-1">
          {sections.map((section) => {
            const isActive = activeSection === section.title || pathname.startsWith(section.href)

            return (
              <li key={section.title} className="relative">
                <div onMouseEnter={() => handleMouseEnter(section.title)} onMouseLeave={handleMouseLeave}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "h-12 rounded-none text-base font-medium border-b-2 border-transparent transition-colors",
                      isActive && "border-green-600 text-green-600",
                    )}
                    onClick={() => setActiveSection(activeSection === section.title ? null : section.title)}
                  >
                    {section.title}
                    <ChevronDown
                      className={cn("ml-1 h-4 w-4 transition-transform duration-200", isActive && "rotate-180")}
                    />
                  </Button>

                  {isActive && (
                    <div
                      className="absolute left-0 top-full w-48 bg-white shadow-lg rounded-b-md border border-gray-200 py-2 z-50"
                      onMouseEnter={() => handleMouseEnter(section.title)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {section.subsections.map((subsection) => (
                        <Link
                          key={subsection.title}
                          href={subsection.href}
                          className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-green-600 transition-colors"
                          onClick={() => setActiveSection(null)}
                        >
                          {subsection.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            )
          })}
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
