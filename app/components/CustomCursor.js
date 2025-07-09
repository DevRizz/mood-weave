// "use client"

// import { useEffect, useState, useRef } from "react"
// import { motion } from "framer-motion"

// export default function CustomCursor() {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
//   const [isHovering, setIsHovering] = useState(false)
//   const [isSparkle, setIsSparkle] = useState(false)
//   const [isMobile, setIsMobile] = useState(false)
//   const cursorRef = useRef({ x: 0, y: 0 })

//   useEffect(() => {
//     // Check if device supports hover (not mobile)
//     const checkMobile = () => {
//       setIsMobile(window.matchMedia("(hover: none) and (pointer: coarse)").matches)
//     }

//     checkMobile()
//     window.addEventListener("resize", checkMobile)

//     if (isMobile) return

//     const handleMouseMove = (e) => {
//       cursorRef.current = { x: e.clientX, y: e.clientY }
//       setMousePosition({ x: e.clientX, y: e.clientY })
//     }

//     const handleMouseOver = (e) => {
//       const target = e.target
//       if (!target) return

//       // Check for sparkle elements
//       if (target.classList?.contains("cursor-sparkle") || target.closest?.(".cursor-sparkle")) {
//         setIsSparkle(true)
//         setIsHovering(true)
//         return
//       }

//       // Check for hoverable elements
//       const hoverableSelectors = ["button", "a", ".magnetic-button", ".thread-base", ".card-premium", ".glass-button"]
//       const isHoverable = hoverableSelectors.some((selector) => {
//         try {
//           return target.matches?.(selector) || target.closest?.(selector)
//         } catch {
//           return false
//         }
//       })

//       if (isHoverable) {
//         setIsHovering(true)
//         setIsSparkle(false)
//       }
//     }

//     const handleMouseOut = (e) => {
//       const target = e.target
//       if (!target) return

//       // Reset cursor state when leaving interactive elements
//       const relatedTarget = e.relatedTarget
//       if (!relatedTarget) {
//         setIsHovering(false)
//         setIsSparkle(false)
//         return
//       }

//       const hoverableSelectors = [
//         "button",
//         "a",
//         ".magnetic-button",
//         ".thread-base",
//         ".card-premium",
//         ".glass-button",
//         ".cursor-sparkle",
//       ]
//       const isLeavingHoverable = hoverableSelectors.some((selector) => {
//         try {
//           return target.matches?.(selector) || target.closest?.(selector)
//         } catch {
//           return false
//         }
//       })

//       const isEnteringHoverable = hoverableSelectors.some((selector) => {
//         try {
//           return relatedTarget.matches?.(selector) || relatedTarget.closest?.(selector)
//         } catch {
//           return false
//         }
//       })

//       if (isLeavingHoverable && !isEnteringHoverable) {
//         setIsHovering(false)
//         setIsSparkle(false)
//       }
//     }

//     document.addEventListener("mousemove", handleMouseMove, { passive: true })
//     document.addEventListener("mouseover", handleMouseOver, { passive: true })
//     document.addEventListener("mouseout", handleMouseOut, { passive: true })

//     return () => {
//       document.removeEventListener("mousemove", handleMouseMove)
//       document.removeEventListener("mouseover", handleMouseOver)
//       document.removeEventListener("mouseout", handleMouseOut)
//       window.removeEventListener("resize", checkMobile)
//     }
//   }, [isMobile])

//   if (isMobile) return null

//   return (
//     <>
//       {/* Cursor Dot - Fast following */}
//       <motion.div
//         className="cursor-dot"
//         animate={{
//           x: mousePosition.x - 4,
//           y: mousePosition.y - 4,
//           scale: isHovering ? 1.5 : 1,
//         }}
//         transition={{
//           type: "tween",
//           duration: 0.02,
//           ease: "linear",
//         }}
//         style={{
//           background: isSparkle
//             ? "radial-gradient(circle, #ffd700, #ff6b6b)"
//             : isHovering
//               ? "linear-gradient(45deg, #f093fb, #f5576c)"
//               : "linear-gradient(45deg, #667eea, #764ba2)",
//         }}
//       />

//       {/* Cursor Outline - Slightly delayed for smooth effect */}
//       <motion.div
//         className="cursor-outline"
//         animate={{
//           x: mousePosition.x - (isSparkle ? 20 : isHovering ? 24 : 16),
//           y: mousePosition.y - (isSparkle ? 20 : isHovering ? 24 : 16),
//           width: isSparkle ? 40 : isHovering ? 48 : 32,
//           height: isSparkle ? 40 : isHovering ? 48 : 32,
//         }}
//         transition={{
//           type: "tween",
//           duration: 0.1,
//           ease: "easeOut",
//         }}
//         style={{
//           borderColor: isSparkle
//             ? "rgba(255, 215, 0, 0.8)"
//             : isHovering
//               ? "rgba(240, 147, 251, 0.8)"
//               : "rgba(102, 126, 234, 0.5)",
//           background: isSparkle ? "rgba(255, 215, 0, 0.1)" : isHovering ? "rgba(240, 147, 251, 0.1)" : "transparent",
//         }}
//       />

//       {/* Sparkle particles for special cursor state */}
//       {isSparkle && (
//         <>
//           {Array.from({ length: 4 }).map((_, i) => (
//             <motion.div
//               key={i}
//               className="fixed w-1 h-1 bg-yellow-400 rounded-full pointer-events-none z-[9997]"
//               animate={{
//                 x: mousePosition.x + Math.cos((i * Math.PI) / 2) * 20,
//                 y: mousePosition.y + Math.sin((i * Math.PI) / 2) * 20,
//                 scale: [0, 1, 0],
//                 opacity: [0, 1, 0],
//               }}
//               transition={{
//                 duration: 1,
//                 repeat: Number.POSITIVE_INFINITY,
//                 delay: i * 0.2,
//                 ease: "easeInOut",
//               }}
//             />
//           ))}
//         </>
//       )}
//     </>
//   )
// }

"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isSparkle, setIsSparkle] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const cursorRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Check if device supports hover (not mobile)
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(hover: none) and (pointer: coarse)").matches)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    if (isMobile) return

    const handleMouseMove = (e) => {
      cursorRef.current = { x: e.clientX, y: e.clientY }
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e) => {
      const target = e.target
      if (!target) return

      // Check for sparkle elements
      if (target.classList?.contains("cursor-sparkle") || target.closest?.(".cursor-sparkle")) {
        setIsSparkle(true)
        setIsHovering(true)
        return
      }

      // Check for hoverable elements
      const hoverableSelectors = ["button", "a", ".magnetic-button", ".thread-base", ".card-premium", ".glass-button"]
      const isHoverable = hoverableSelectors.some((selector) => {
        try {
          return target.matches?.(selector) || target.closest?.(selector)
        } catch {
          return false
        }
      })

      if (isHoverable) {
        setIsHovering(true)
        setIsSparkle(false)
      }
    }

    const handleMouseOut = (e) => {
      const target = e.target
      if (!target) return

      // Reset cursor state when leaving interactive elements
      const relatedTarget = e.relatedTarget
      if (!relatedTarget) {
        setIsHovering(false)
        setIsSparkle(false)
        return
      }

      const hoverableSelectors = [
        "button",
        "a",
        ".magnetic-button",
        ".thread-base",
        ".card-premium",
        ".glass-button",
        ".cursor-sparkle",
      ]
      const isLeavingHoverable = hoverableSelectors.some((selector) => {
        try {
          return target.matches?.(selector) || target.closest?.(selector)
        } catch {
          return false
        }
      })

      const isEnteringHoverable = hoverableSelectors.some((selector) => {
        try {
          return relatedTarget.matches?.(selector) || relatedTarget.closest?.(selector)
        } catch {
          return false
        }
      })

      if (isLeavingHoverable && !isEnteringHoverable) {
        setIsHovering(false)
        setIsSparkle(false)
      }
    }

    document.addEventListener("mousemove", handleMouseMove, { passive: true })
    document.addEventListener("mouseover", handleMouseOver, { passive: true })
    document.addEventListener("mouseout", handleMouseOut, { passive: true })

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mouseout", handleMouseOut)
      window.removeEventListener("resize", checkMobile)
    }
  }, [isMobile])

  if (isMobile) return null

  return (
    <>
      {/* Cursor Dot - Fast following */}
      <motion.div
        className="cursor-dot"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "tween",
          duration: 0.02,
          ease: "linear",
        }}
        style={{
          backgroundColor: "transparent",
          backgroundImage: isSparkle
            ? "radial-gradient(circle, #ffd700, #ff6b6b)"
            : isHovering
              ? "linear-gradient(45deg, #f093fb, #f5576c)"
              : "linear-gradient(45deg, #667eea, #764ba2)",
        }}
      />

      {/* Cursor Outline - Slightly delayed for smooth effect */}
      <motion.div
        className="cursor-outline"
        animate={{
          x: mousePosition.x - (isSparkle ? 20 : isHovering ? 24 : 16),
          y: mousePosition.y - (isSparkle ? 20 : isHovering ? 24 : 16),
          width: isSparkle ? 40 : isHovering ? 48 : 32,
          height: isSparkle ? 40 : isHovering ? 48 : 32,
        }}
        transition={{
          type: "tween",
          duration: 0.1,
          ease: "easeOut",
        }}
        style={{
          borderColor: isSparkle
            ? "rgba(255, 215, 0, 0.8)"
            : isHovering
              ? "rgba(240, 147, 251, 0.8)"
              : "rgba(102, 126, 234, 0.5)",
          backgroundColor: isSparkle
            ? "rgba(255, 215, 0, 0.1)"
            : isHovering
              ? "rgba(240, 147, 251, 0.1)"
              : "transparent",
        }}
      />

      {/* Sparkle particles for special cursor state */}
      {isSparkle && (
        <>
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.div
              key={i}
              className="fixed w-1 h-1 bg-yellow-400 rounded-full pointer-events-none z-[9997]"
              animate={{
                x: mousePosition.x + Math.cos((i * Math.PI) / 2) * 20,
                y: mousePosition.y + Math.sin((i * Math.PI) / 2) * 20,
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </>
      )}
    </>
  )
}