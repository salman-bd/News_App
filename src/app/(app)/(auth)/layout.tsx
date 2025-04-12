import type React from "react"
import Link from "next/link"
import { Newspaper } from "lucide-react"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-gray-200 py-4">
        <div className="container flex justify-center">
          <Link href="/" className="flex items-center gap-2">
            <Newspaper className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-serif font-bold tracking-tight">NewsHub</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center py-12">{children}</main>

      <footer className="border-t border-gray-200 py-6 text-center text-sm text-gray-500">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} NewsHub. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-2">
            <Link href="/terms" className="hover:text-green-600">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-green-600">
              Privacy
            </Link>
            <Link href="/contact" className="hover:text-green-600">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
