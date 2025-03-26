"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle, X } from "lucide-react"

export function BreakingNewsBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-orange-500 text-white py-2">
      <div className="container flex items-center justify-between">
        <div className="flex items-center">
          <AlertCircle className="h-4 w-4 mr-2" />
          <span className="font-medium">Breaking News:</span>
          <span className="ml-2 truncate">
            Global Summit Reaches Historic Climate Agreement as Nations Pledge Radical Action
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-orange-600"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </div>
    </div>
  )
}

