import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Newspaper, Home, FileText, BarChart2, Settings, Bell, Search, User, LogOut, Users, Tag } from "lucide-react"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Newspaper className="h-6 w-6 text-orange-500" />
          <span className="hidden md:inline">NewsHub Admin</span>
        </Link>
        <div className="w-full flex-1">
          <form className="hidden md:block">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search..."
                className="w-full rounded-md border border-input bg-background pl-8 pr-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
          </form>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-orange-500" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-background md:block">
          <div className="flex h-full flex-col gap-2 p-4">
            <div className="py-2">
              <h2 className="text-lg font-semibold tracking-tight">Admin Dashboard</h2>
            </div>
            <div className="flex-1 py-2">
              <nav className="grid gap-1">
                <Link
                  href="/admin/dashboard"
                  className="flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-accent-foreground"
                >
                  <Home className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  href="/admin/articles"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent hover:text-accent-foreground"
                >
                  <FileText className="h-4 w-4" />
                  Articles
                </Link>
                <Link
                  href="/admin/users"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent hover:text-accent-foreground"
                >
                  <Users className="h-4 w-4" />
                  Users
                </Link>
                <Link
                  href="/admin/categories"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent hover:text-accent-foreground"
                >
                  <Tag className="h-4 w-4" />
                  Categories
                </Link>
                <Link
                  href="/admin/analytics"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent hover:text-accent-foreground"
                >
                  <BarChart2 className="h-4 w-4" />
                  Analytics
                </Link>
                <Link
                  href="/admin/settings"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent hover:text-accent-foreground"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
              </nav>
            </div>
            <div className="py-2">
              <Link href="/">
                <Button variant="outline" className="w-full">
                  <Newspaper className="mr-2 h-4 w-4" />
                  Back to Site
                </Button>
              </Link>
            </div>
          </div>
        </aside>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
