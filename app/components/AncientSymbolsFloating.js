"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

const SYMBOLS = ["✦", "❋", "✧", "❈", "✿", "❀", "✾", "❁", "✽", "❃"]

export default function AncientSymbolsFloating({ darkMode }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Create floating symbols
    const symbols = []
    for (let i = 0; i < 15; i++) {
      const symbol = document.createElement("div")
      symbol.textContent = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
      symbol.className = `absolute text-2xl pointer-events-none select-none ${
        darkMode ? "text-purple-300/20" : "text-purple-400/20"
      }`

      // Random position
      symbol.style.left = Math.random() * 100 + "%"
      symbol.style.top = Math.random() * 100 + "%"

      container.appendChild(symbol)
      symbols.push(symbol)

      // Animate each symbol
      gsap.to(symbol, {
        y: -100,
        rotation: 360,
        duration: 10 + Math.random() * 10,
        repeat: -1,
        ease: "none",
        delay: Math.random() * 5,
      })

      gsap.to(symbol, {
        opacity: 0.1,
        duration: 2 + Math.random() * 3,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: Math.random() * 2,
      })
    }

    return () => {
      symbols.forEach((symbol) => {
        if (symbol.parentNode) {
          symbol.parentNode.removeChild(symbol)
        }
      })
    }
  }, [darkMode])

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden z-0" />
}