"use client"

import { motion } from "framer-motion"

export function SkeletonCard({ darkMode }) {
  return (
    <div className={`card-premium p-6 ${darkMode ? "bg-gray-800/40" : "bg-white/40"}`}>
      <div className="animate-pulse space-y-4">
        <div className={`skeleton-title ${darkMode ? "skeleton-dark" : "skeleton"}`} />
        <div className="space-y-2">
          <div className={`skeleton-text ${darkMode ? "skeleton-dark" : "skeleton"}`} />
          <div className={`skeleton-text ${darkMode ? "skeleton-dark" : "skeleton"} w-3/4`} />
        </div>
        <div className={`skeleton-button ${darkMode ? "skeleton-dark" : "skeleton"}`} />
      </div>
    </div>
  )
}

export function SkeletonThread({ darkMode, count = 5 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          className={`skeleton-thread ${darkMode ? "skeleton-dark" : "skeleton"}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          style={{
            width: `${Math.random() * 40 + 60}%`,
            height: `${Math.random() * 8 + 12}px`,
          }}
        />
      ))}
    </div>
  )
}

export function LoadingSpinner({ size = "medium", color = "primary" }) {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-12 h-12",
  }

  const colorClasses = {
    primary: "border-purple-500",
    secondary: "border-pink-500",
    white: "border-white",
  }

  return (
    <motion.div
      className={`${sizeClasses[size]} border-2 border-transparent ${colorClasses[color]} border-t-current rounded-full`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
    />
  )
}

export function ProgressBar({ progress, darkMode, animated = true }) {
  return (
    <div className={`w-full h-2 rounded-full overflow-hidden ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}>
      <motion.div
        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: animated ? 0.5 : 0, ease: "easeOut" }}
      />
    </div>
  )
}

export function PulsingDot({ delay = 0 }) {
  return (
    <motion.div
      className="w-2 h-2 bg-purple-500 rounded-full"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 1.5,
        repeat: Number.POSITIVE_INFINITY,
        delay,
        ease: "easeInOut",
      }}
    />
  )
}

export function LoadingDots() {
  return (
    <div className="flex items-center space-x-1">
      <PulsingDot delay={0} />
      <PulsingDot delay={0.2} />
      <PulsingDot delay={0.4} />
    </div>
  )
}