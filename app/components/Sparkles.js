"use client"

import { useEffect, useState } from "react"

export default function Sparkles() {
  const [sparkles, setSparkles] = useState([])

  useEffect(() => {
    const interval = setInterval(() => {
      // Create a new sparkle
      const sparkle = {
        id: Date.now(),
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 10 + 5,
        duration: Math.random() * 1 + 0.5,
      }

      setSparkles((prev) => [...prev, sparkle])

      // Remove sparkle after animation
      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== sparkle.id))
      }, sparkle.duration * 1000)
    }, 300)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-5 h-5 relative">
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute rounded-full bg-yellow-300 opacity-0 animate-sparkle"
          style={{
            left: `${sparkle.left}%`,
            top: `${sparkle.top}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            animationDuration: `${sparkle.duration}s`,
          }}
        />
      ))}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      </svg>
    </div>
  )
}