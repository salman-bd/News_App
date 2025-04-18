import type React from "react"
import { Toaster } from "sonner"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { SessionProvider } from "@/components/session-provider"

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "NewsHub - Your Trusted Source for News",
  description: "Stay informed with the latest news, in-depth analysis, and the stories that matter most to you.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            {children}
            <Toaster position="top-right" />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
