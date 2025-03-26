"use client"

import { useState } from "react"
import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning, Wind } from "lucide-react"

export function WeatherWidget() {
  const [weather, setWeather] = useState({
    location: "New York, NY",
    temperature: 72,
    condition: "Partly Cloudy",
    icon: "cloud-sun",
  })

  // In a real app, you would fetch weather data from an API

  const getWeatherIcon = (icon: string) => {
    switch (icon) {
      case "cloud":
        return <Cloud className="h-6 w-6" />
      case "cloud-rain":
        return <CloudRain className="h-6 w-6" />
      case "cloud-snow":
        return <CloudSnow className="h-6 w-6" />
      case "cloud-lightning":
        return <CloudLightning className="h-6 w-6" />
      case "wind":
        return <Wind className="h-6 w-6" />
      default:
        return <Sun className="h-6 w-6" />
    }
  }

  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="font-semibold">{weather.location}</h3>
        <p className="text-sm text-muted-foreground">{weather.condition}</p>
      </div>
      <div className="flex items-center">
        {getWeatherIcon(weather.icon)}
        <span className="text-2xl font-semibold ml-2">{weather.temperature}°F</span>
      </div>
    </div>
  )
}

