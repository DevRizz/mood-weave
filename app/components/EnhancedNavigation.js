"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Home, Calendar, BarChart, Settings, User, ChevronDown } from "lucide-react"

const NAV_ITEMS = [
  { id: "today", label: "Today", icon: Home },
  { id: "tapestry", label: "Tapestry", icon: Calendar },
  { id: "analytics", label: "Analytics", icon: BarChart },
  { id: "settings", label: "Settings", icon: Settings },
]

export default function EnhancedNavigation({ activeView, onViewChange, darkMode }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <nav className={`nav-primary sticky top-0 z-40 transition-all duration-300`}>
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <motion.div className="flex items-center gap-4" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gradient text-display-2">Mood Weave</h1>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon
              const isActive = activeView === item.id

              return (
                <motion.button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`nav-item flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                      : darkMode
                        ? "text-gray-300 hover:text-white hover:bg-gray-700/50"
                        : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20"
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              )
            })}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden relative">
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`nav-item flex items-center gap-2 px-4 py-2 rounded-xl ${
                darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <User className="w-4 h-4" />
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
            </motion.button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={`absolute top-full right-0 mt-2 w-48 rounded-xl shadow-lg border ${
                    darkMode ? "bg-gray-800/95 border-gray-700 text-white" : "bg-white/95 border-gray-200 text-gray-800"
                  } backdrop-blur-md`}
                >
                  {NAV_ITEMS.map((item) => {
                    const Icon = item.icon
                    const isActive = activeView === item.id

                    return (
                      <motion.button
                        key={item.id}
                        onClick={() => {
                          onViewChange(item.id)
                          setIsExpanded(false)
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl ${
                          isActive
                            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                            : darkMode
                              ? "hover:bg-gray-700/50"
                              : "hover:bg-gray-50"
                        }`}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="font-medium">{item.label}</span>
                      </motion.button>
                    )
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="border-t border-gray-200/20 px-6 py-2">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center space-x-2 text-sm">
            <span className={darkMode ? "text-gray-400" : "text-gray-500"}>Home</span>
            <span className={darkMode ? "text-gray-600" : "text-gray-400"}>/</span>
            <span className={darkMode ? "text-white" : "text-gray-900"}>
              {NAV_ITEMS.find((item) => item.id === activeView)?.label || "Today"}
            </span>
          </div>
        </div>
      </div>
    </nav>
  )
}