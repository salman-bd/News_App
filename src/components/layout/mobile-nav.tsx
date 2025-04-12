"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { SearchInput } from "@/components/search-input"
import { ChevronRight } from "lucide-react"

interface MobileNavProps {
  onClose: () => void
}

export function MobileNav({ onClose }: MobileNavProps) {
  const pathname = usePathname()
  const [openSection, setOpenSection] = useState<string | null>(null)

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
  ]

  const handleLinkClick = () => {
    onClose()
  }

  return (
    <div className="fixed inset-0 top-[120px] z-50 bg-white overflow-y-auto pb-20">
      <div className="container py-4">
        <div className="mb-6">
          <SearchInput />
        </div>

        <div className="space-y-1">
          {sections.map((section) => (
            <Accordion
              key={section.title}
              type="single"
              collapsible
              value={openSection === section.title ? section.title : undefined}
              onValueChange={(value) => setOpenSection(value)}
            >
              <AccordionItem value={section.title} className="border-b">
                <AccordionTrigger className="py-3 text-base font-medium hover:text-green-600">
                  {section.title}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-4 py-2 space-y-2">
                    {section.subsections.map((subsection) => (
                      <Link
                        key={subsection.title}
                        href={subsection.href}
                        className="block py-2 text-sm hover:text-green-600"
                        onClick={handleLinkClick}
                      >
                        {subsection.title}
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>

        <div className="mt-6 space-y-4">
          <Link href="/trending" onClick={handleLinkClick}>
            <Button variant="ghost" className="w-full justify-between text-base">
              Trending
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/today" onClick={handleLinkClick}>
            <Button variant="ghost" className="w-full justify-between text-base">
              Today's Paper
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <Link href="/auth/signin" onClick={handleLinkClick}>
            <Button className="w-full bg-green-600 hover:bg-green-700 mb-3">Sign In</Button>
          </Link>
          <Link href="/subscribe" onClick={handleLinkClick}>
            <Button variant="outline" className="w-full">
              Subscribe
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
