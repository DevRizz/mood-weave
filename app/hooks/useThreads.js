"use client"

import { useState, useEffect } from "react"

export function useThreads() {
  const [threads, setThreads] = useState([])
  const [todayThread, setTodayThread] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch threads on component mount
  useEffect(() => {
    fetchThreads()
  }, [])

  const fetchThreads = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/threads?userId=anonymous")

      if (!response.ok) {
        throw new Error("Failed to fetch threads")
      }

      const data = await response.json()
      setThreads(data)

      // Check if today's thread exists
      const today = new Date().toDateString()
      const existingThread = data.find((thread) => new Date(thread.date).toDateString() === today)
      setTodayThread(existingThread)
    } catch (err) {
      console.error("Error fetching threads:", err)
      setError(err.message)

      // Fallback to localStorage if API fails
      const savedThreads = localStorage.getItem("moodWeaveThreads")
      if (savedThreads) {
        const parsedThreads = JSON.parse(savedThreads)
        setThreads(parsedThreads)

        // Check if today's thread exists
        const today = new Date().toDateString()
        const existingThread = parsedThreads.find((thread) => new Date(thread.date).toDateString() === today)
        setTodayThread(existingThread)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const saveThread = async (threadData) => {
    const newThread = {
      ...threadData,
      date: new Date().toISOString(),
      userId: "anonymous",
    }

    try {
      // If today's thread exists, update it
      if (todayThread) {
        const response = await fetch(`/api/threads/${todayThread._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newThread),
        })

        if (!response.ok) {
          throw new Error("Failed to update thread")
        }

        const updatedThread = await response.json()

        // Update threads array
        setThreads(threads.map((thread) => (thread._id === todayThread._id ? updatedThread : thread)))
        setTodayThread(updatedThread)
      }
      // Otherwise create a new thread
      else {
        const response = await fetch("/api/threads", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newThread),
        })

        if (!response.ok) {
          throw new Error("Failed to create thread")
        }

        const createdThread = await response.json()

        // Add new thread to threads array
        setThreads([createdThread, ...threads])
        setTodayThread(createdThread)
      }

      // Also save to localStorage as backup
      localStorage.setItem("moodWeaveThreads", JSON.stringify(threads))
    } catch (err) {
      console.error("Error saving thread:", err)
      setError(err.message)

      // Fallback to localStorage if API fails
      let updatedThreads
      if (todayThread) {
        // Update existing thread
        updatedThreads = threads.map((thread) =>
          thread._id === todayThread._id ? { ...newThread, _id: todayThread._id } : thread,
        )
      } else {
        // Add new thread
        updatedThreads = [{ ...newThread, _id: Date.now() }, ...threads]
      }

      setThreads(updatedThreads)
      setTodayThread(todayThread ? { ...newThread, _id: todayThread._id } : { ...newThread, _id: Date.now() })
      localStorage.setItem("moodWeaveThreads", JSON.stringify(updatedThreads))
    }
  }

  return {
    threads,
    todayThread,
    saveThread,
    isLoading,
    error,
    refreshThreads: fetchThreads,
  }
}