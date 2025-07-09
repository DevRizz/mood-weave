"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function ThreadSkeleton({ darkMode, count = 5 }) {
  const [skeletonData, setSkeletonData] = useState([])

  useEffect(() => {
    // Generate skeleton data on client side only to avoid hydration mismatch
    const data = Array.from({ length: count }).map((_, index) => ({
      id: index,
      width: Math.random() * 40 + 60,
      height: Math.random() * 8 + 12,
    }))
    setSkeletonData(data)
  }, [count])

  if (skeletonData.length === 0) {
    // Return static skeleton during SSR
    return (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className={`skeleton-thread ${darkMode ? "skeleton-dark" : "skeleton"}`}
            style={{
              width: "70%",
              height: "14px",
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {skeletonData.map((item, index) => (
        <motion.div
          key={item.id}
          className={`skeleton-thread ${darkMode ? "skeleton-dark" : "skeleton"}`}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          style={{
            width: `${item.width}%`,
            height: `${item.height}px`,
          }}
        />
      ))}
    </div>
  )
}

export function CardSkeleton({ darkMode }) {
  return (
    <motion.div
      className={`skeleton-card ${darkMode ? "skeleton-dark" : "skeleton"} rounded-2xl`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    />
  )
}

export function TextSkeleton({ darkMode, lines = 3 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: lines }).map((_, index) => (
        <motion.div
          key={index}
          className={`skeleton-text ${darkMode ? "skeleton-dark" : "skeleton"}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
          style={{
            width: index === lines - 1 ? "70%" : "100%",
          }}
        />
      ))}
    </div>
  )
}

export function TitleSkeleton({ darkMode }) {
  return (
    <motion.div
      className={`skeleton-title ${darkMode ? "skeleton-dark" : "skeleton"}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    />
  )
}