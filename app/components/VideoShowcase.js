"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function VideoShowcase({ onClose, darkMode }) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={`w-full max-w-4xl p-4 rounded-2xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow-2xl`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>
            The Art of Emotional Weaving
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="relative aspect-video w-full overflow-hidden rounded-xl">
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
              <motion.div
                className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
            </div>
          )}

          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0"
            title="Mood Weave: The Art of Emotional Weaving"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => setIsLoaded(true)}
          ></iframe>
        </div>

        <div className="mt-4 text-center">
          <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            Discover how Mood Weave combines ancient weaving traditions with modern emotional intelligence to create a
            unique journaling experience.
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}