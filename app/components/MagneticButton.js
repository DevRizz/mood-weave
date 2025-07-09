"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"

export default function MagneticButton({ children, className = "", onClick, ...props }) {
  const buttonRef = useRef(null)
  const magnetRef = useRef(null)

  useEffect(() => {
    const button = buttonRef.current
    if (!button) return

    const handleMouseMove = (e) => {
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      const distance = Math.sqrt(x * x + y * y)
      const maxDistance = 100

      if (distance < maxDistance) {
        const strength = (maxDistance - distance) / maxDistance
        const moveX = (x / distance) * strength * 20
        const moveY = (y / distance) * strength * 20

        gsap.to(button, {
          x: moveX,
          y: moveY,
          duration: 0.3,
          ease: "power2.out",
        })
      }
    }

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      })
    }

    const handleClick = (e) => {
      // Spring animation on click
      gsap.to(button, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.to(button, {
            scale: 1,
            duration: 0.3,
            ease: "elastic.out(1, 0.3)",
          })
        },
      })

      if (onClick) onClick(e)
    }

    button.addEventListener("mousemove", handleMouseMove)
    button.addEventListener("mouseleave", handleMouseLeave)
    button.addEventListener("click", handleClick)

    return () => {
      button.removeEventListener("mousemove", handleMouseMove)
      button.removeEventListener("mouseleave", handleMouseLeave)
      button.removeEventListener("click", handleClick)
    }
  }, [onClick])

  return (
    <button ref={buttonRef} className={`magnetic-button ${className}`} {...props}>
      {children}
    </button>
  )
}