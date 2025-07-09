"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function EnhancedBackgroundEffects({ darkMode }) {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    const particles = []

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Enhanced particle system
    class EnhancedParticle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.opacity = Math.random() * 0.5 + 0.1
        this.color = this.getRandomColor()
        this.life = Math.random() * 200 + 100
        this.maxLife = this.life
      }

      getRandomColor() {
        const colors = darkMode
          ? [
              "rgba(102, 126, 234, 0.3)",
              "rgba(240, 147, 251, 0.3)",
              "rgba(79, 172, 254, 0.3)",
              "rgba(67, 233, 123, 0.3)",
            ]
          : [
              "rgba(102, 126, 234, 0.2)",
              "rgba(240, 147, 251, 0.2)",
              "rgba(79, 172, 254, 0.2)",
              "rgba(67, 233, 123, 0.2)",
            ]
        return colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        this.life--

        // Fade out as life decreases
        this.opacity = (this.life / this.maxLife) * 0.5

        // Wrap around edges
        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height

        // Respawn when life ends
        if (this.life <= 0) {
          this.life = this.maxLife
          this.x = Math.random() * canvas.width
          this.y = Math.random() * canvas.height
        }
      }

      draw() {
        ctx.save()
        ctx.globalAlpha = this.opacity
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    // Initialize particles
    for (let i = 0; i < 80; i++) {
      particles.push(new EnhancedParticle())
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections between nearby particles
      ctx.strokeStyle = darkMode ? "rgba(255, 255, 255, 0.02)" : "rgba(100, 50, 255, 0.02)"
      ctx.lineWidth = 1

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            ctx.save()
            ctx.globalAlpha = ((120 - distance) / 120) * 0.1
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
            ctx.restore()
          }
        }
      }

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [darkMode])

  return (
    <>
      {/* Enhanced Canvas Background */}
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 opacity-60" />

      {/* Floating Geometric Shapes */}
      <div className="fixed inset-0 -z-5 overflow-hidden pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-32 h-32 rounded-full ${
              darkMode
                ? "bg-gradient-to-br from-purple-500/5 to-pink-500/5"
                : "bg-gradient-to-br from-purple-300/10 to-pink-300/10"
            }`}
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 2,
              ease: "easeInOut",
            }}
            style={{
              left: `${(i * 8) % 100}%`,
              top: `${(i * 12) % 100}%`,
            }}
          />
        ))}
      </div>

      {/* Gradient Mesh Overlay */}
      <div className="fixed inset-0 -z-8 bg-mesh opacity-40" />

      {/* Dynamic Color Overlay */}
      <motion.div
        className="fixed inset-0 -z-7 bg-gradient-animated opacity-20"
        animate={{
          background: [
            "linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c)",
            "linear-gradient(-45deg, #4facfe, #00f2fe, #43e97b, #38f9d7)",
            "linear-gradient(-45deg, #fa709a, #fee140, #667eea, #764ba2)",
            "linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c)",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </>
  )
}