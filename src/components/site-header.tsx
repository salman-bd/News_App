import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SearchInput } from "@/components/search-input"
import { MainNav } from "@/components/main-nav"
import { Newspaper, Bell, User, Menu } from "lucide-react"

export function SiteHeader() {
  // Get current date in format like "Monday, March 26, 2025"
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      {/* Top Bar */}
      <div className="container flex h-10 items-center justify-between text-xs border-b border-gray-100">
        <div className="flex items-center gap-4">
          <span className="text-muted-foreground hidden sm:inline-block">{currentDate}</span>
          <Link href="/today" className="text-green-600 hover:underline hidden sm:inline-block">
            Today's Paper
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/subscribe" className="text-green-600 hover:underline">
            Subscribe
          </Link>
          <span className="text-muted-foreground">|</span>
          <Link href="/login" className="hover:underline">
            Sign In
          </Link>
        </div>
      </div>

      {/* Masthead */}
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
          <Link href="/" className="flex items-center gap-2">
            <Newspaper className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-serif font-bold tracking-tight">NewsHub</span>
          </Link>
        </div>

        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <SearchInput />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Bell className="h-5 w-5" />
          </Button>
          <Link href="/login">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/subscribe">
            <Button className="bg-green-600 hover:bg-green-700">Subscribe</Button>
          </Link>
        </div>
      </div>

      {/* Main Navigation */}
      <MainNav />
    </header>
  )
}

