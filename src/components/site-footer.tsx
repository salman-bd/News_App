import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Newspaper, Facebook, Twitter, Instagram, Youtube, Linkedin, Rss } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="w-full bg-gray-900 text-gray-200 py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and About */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Newspaper className="h-8 w-8 text-green-500" />
              <span className="text-2xl font-serif font-bold tracking-tight text-white">NewsHub</span>
            </Link>
            <p className="text-gray-400 mb-4 max-w-md">
              Delivering trusted journalism and essential information to readers worldwide. Our mission is to empower
              people with the highest quality reporting and analysis.
            </p>
            <div className="flex space-x-4 mb-6">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Rss className="h-5 w-5" />
                <span className="sr-only">RSS</span>
              </Button>
            </div>
          </div>

          {/* Navigation Columns */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-lg">News</h3>
            <ul className="space-y-2">
              {["World", "U.S.", "Politics", "Business", "Technology", "Science", "Health", "Sports"].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase()}`} className="text-gray-400 hover:text-white">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4 text-lg">Opinion & Arts</h3>
            <ul className="space-y-2">
              {[
                "Today's Opinion",
                "Editorials",
                "Op-Ed Contributors",
                "Letters",
                "Arts",
                "Books",
                "Movies",
                "Music",
                "Television",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(/['\s]/g, "-")}`}
                    className="text-gray-400 hover:text-white"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4 text-lg">More</h3>
            <ul className="space-y-2">
              {[
                "Newsletters",
                "Video",
                "Photography",
                "Podcasts",
                "Graphics",
                "TimesMachine",
                "NYT Store",
                "Manage Account",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(/['\s]/g, "-")}`}
                    className="text-gray-400 hover:text-white"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="font-semibold text-white mt-6 mb-4 text-lg">Subscribe</h3>
            <ul className="space-y-2">
              {[
                "Home Delivery",
                "Digital Subscriptions",
                "Games",
                "Cooking",
                "Email Newsletters",
                "Corporate Subscriptions",
                "Education Rate",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={`/subscribe/${item.toLowerCase().replace(/['\s]/g, "-")}`}
                    className="text-gray-400 hover:text-white"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-sm text-gray-400">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} NewsHub Media. All rights reserved.</p>
            <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
              <Link href="/terms" className="hover:text-white">
                Terms of Service
              </Link>
              <Link href="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/cookies" className="hover:text-white">
                Cookie Policy
              </Link>
              <Link href="/accessibility" className="hover:text-white">
                Accessibility
              </Link>
              <Link href="/contact" className="hover:text-white">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

