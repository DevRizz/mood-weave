"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react"

const TOAST_TYPES = {
  success: {
    icon: CheckCircle,
    className: "toast-success",
    color: "text-green-600",
  },
  error: {
    icon: XCircle,
    className: "toast-error",
    color: "text-red-600",
  },
  warning: {
    icon: AlertCircle,
    className: "toast-warning",
    color: "text-yellow-600",
  },
  info: {
    icon: Info,
    className: "toast-info",
    color: "text-blue-600",
  },
}

export function useToast() {
  const [toasts, setToasts] = useState([])

  const addToast = (message, type = "info", duration = 5000) => {
    const id = Date.now()
    const toast = { id, message, type, duration }

    setToasts((prev) => [...prev, toast])

    setTimeout(() => {
      removeToast(id)
    }, duration)

    return id
  }

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return { toasts, addToast, removeToast }
}

export default function ToastContainer({ toasts, removeToast, darkMode }) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => {
          const ToastIcon = TOAST_TYPES[toast.type].icon
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 100, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`toast ${TOAST_TYPES[toast.type].className} ${
                darkMode ? "bg-gray-800/95 text-white" : "bg-white/95 text-gray-800"
              } flex items-center gap-3 min-w-[300px] max-w-[400px]`}
            >
              <ToastIcon className={`w-5 h-5 ${TOAST_TYPES[toast.type].color} flex-shrink-0`} />
              <p className="flex-1 text-sm font-medium">{toast.message}</p>
              <button
                onClick={() => removeToast(toast.id)}
                className={`p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  darkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}