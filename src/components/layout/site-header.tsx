"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SearchInput } from "@/components/search-input"
import { MainNav } from "@/components/layout/main-nav"

import { Newspaper, Bell, User, Menu, X } from "lucide-react"
import { UserNav } from "./user-nav"
import { MobileNav } from "./mobile-nav"
import { useSession } from "next-auth/react"

export function SiteHeader() {
  const { data: session } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Get current date in format like "Monday, March 26, 2025"
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white transition-shadow duration-200 ${scrolled ? "shadow-md" : "border-b border-gray-200"}`}
    >
      {/* Top Bar */}
      <div className="container flex h-10 items-center justify-between text-xs border-b border-gray-100">
        <div className="flex items-center gap-4">
          <span className="text-muted-foreground hidden sm:inline-block">{currentDate}</span>
          <Link href="/today" className="text-green-600 hover:underline hidden sm:inline-block">
            Today's Paper
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {!session ? (
            <>
              <Link href="/signin" className="hover:underline">
                Sign In
              </Link>
              <span className="text-muted-foreground">|</span>
              <Link href="/subscribe" className="text-green-600 hover:underline">
                Subscribe
              </Link>
            </>
          ) : (
            <Link href="/dashboard" className="text-green-600 hover:underline">
              My Dashboard
            </Link>
          )}
        </div>
      </div>

      {/* Masthead */}
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
          {!session ? (
            <>
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <Bell className="h-5 w-5" />
              </Button>
              <Link href="/signin">
                <Button variant="ghost" size="icon" className="hidden sm:flex">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/subscribe">
                <Button className="bg-green-600 hover:bg-green-700">Subscribe</Button>
              </Link>
            </>
          ) : (
            <UserNav user={session.user} />
          )}
        </div>
      </div>

      {/* Main Navigation */}
      <div className="hidden md:block">
        <MainNav />
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <MobileNav onClose={() => setMobileMenuOpen(false)} />
        </div>
      )}
    </header>
  )
}
