"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Mail } from "lucide-react"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) return

    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      toast.success("Thank you for subscribing to our newsletter!")
      setEmail("")
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="max-w-3xl mx-auto text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white mb-6">
        <Mail className="h-8 w-8 text-green-600" />
      </div>
      <h2 className="text-3xl font-serif font-bold mb-4">Get the Daily Briefing</h2>
      <p className="text-lg text-green-100 mb-6 max-w-xl mx-auto">
        Start your day with the most important stories, handpicked by our editors and delivered straight to your inbox.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <Input
          type="email"
          placeholder="Your email address"
          className="bg-white text-black border-0"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white" disabled={loading}>
          {loading ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>

      <p className="text-sm text-green-100 mt-4">
        By subscribing, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  )
}

