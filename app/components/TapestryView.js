"use client"

import { useState, useEffect } from "react"
import {
  Calendar,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  BarChart,
  Sparkles,
  TrendingUp,
  Eye,
  EyeOff,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Tapestry from "./Tapestry"

export default function TapestryView({ threads, darkMode }) {
  const [selectedThread, setSelectedThread] = useState(null)
  const [viewMode, setViewMode] = useState("all") // 'all', 'month', 'week'
  const [animateIn, setAnimateIn] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [showInsights, setShowInsights] = useState(true)

  useEffect(() => {
    setTimeout(() => setAnimateIn(true), 100)
  }, [])

  const getFilteredThreads = () => {
    if (viewMode === "all") return threads

    const now = new Date()
    const filtered = threads.filter((thread) => {
      const threadDate = new Date(thread.date)

      if (viewMode === "week") {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        return threadDate >= weekAgo
      }

      if (viewMode === "month") {
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        return threadDate >= monthAgo
      }

      return true
    })

    return filtered
  }

  const getStats = () => {
    const filteredThreads = getFilteredThreads()
    if (filteredThreads.length === 0) return null

    const colorCounts = {}
    const patternCounts = {}
    let totalIntensity = 0

    filteredThreads.forEach((thread) => {
      colorCounts[thread.color] = (colorCounts[thread.color] || 0) + 1
      patternCounts[thread.pattern] = (patternCounts[thread.pattern] || 0) + 1
      totalIntensity += thread.intensity || 5
    })

    const mostCommonColor = Object.entries(colorCounts).reduce((a, b) =>
      colorCounts[a[0]] > colorCounts[b[0]] ? a : b,
    )[0]

    const mostCommonPattern = Object.entries(patternCounts).reduce((a, b) =>
      patternCounts[a[0]] > patternCounts[b[0]] ? a : b,
    )[0]

    const avgIntensity = (totalIntensity / filteredThreads.length).toFixed(1)

    // Calculate mood trends - get last 7 days with data
    const moodTrend = []
    const sortedThreads = [...filteredThreads].sort((a, b) => new Date(a.date) - new Date(b.date))
    const recentThreads = sortedThreads.slice(-7)

    recentThreads.forEach((thread) => {
      const date = new Date(thread.date)
      const dayName = date.toLocaleDateString("en-US", { weekday: "short" })
      moodTrend.push({
        day: dayName,
        intensity: thread.intensity || 5,
        color: thread.color,
        date: date.toLocaleDateString(),
      })
    })

    return {
      mostCommonColor,
      mostCommonPattern,
      avgIntensity,
      totalThreads: filteredThreads.length,
      moodTrend,
      colorCounts,
      patternCounts,
    }
  }

  const getInsights = () => {
    const stats = getStats()
    if (!stats) return []

    const insights = []

    // Pattern insights
    if (stats.mostCommonPattern === "smooth") {
      insights.push("Your days have been mostly smooth and steady lately. This suggests emotional stability.")
    } else if (stats.mostCommonPattern === "wavy") {
      insights.push("You've been experiencing ups and downs in your emotional journey. This is completely normal.")
    } else if (stats.mostCommonPattern === "jagged") {
      insights.push("Your recent emotional state shows signs of stress or turbulence. Consider self-care practices.")
    } else if (stats.mostCommonPattern === "gradient") {
      insights.push("You're experiencing transitional emotions, showing growth and change.")
    }

    // Intensity insights
    if (stats.avgIntensity > 7) {
      insights.push(
        "Your emotions have been quite intense recently. High emotional engagement can be both energizing and draining.",
      )
    } else if (stats.avgIntensity < 4) {
      insights.push(
        "You've been experiencing more subdued emotions lately. This could indicate calm or potential emotional numbness.",
      )
    } else {
      insights.push("Your emotional intensity is well-balanced, showing healthy emotional regulation.")
    }

    // Trend insights
    if (stats.moodTrend.length >= 3) {
      const recent = stats.moodTrend.slice(-3)
      const isImproving = recent.every((day, i) => i === 0 || day.intensity >= recent[i - 1].intensity)
      const isDeclining = recent.every((day, i) => i === 0 || day.intensity <= recent[i - 1].intensity)

      if (isImproving) {
        insights.push("Your mood has been trending upward recently. Keep up the positive momentum!")
      } else if (isDeclining) {
        insights.push("Your mood intensity has been declining. Consider what might be contributing to this pattern.")
      }
    }

    return insights
  }

  const stats = getStats()
  const filteredThreads = getFilteredThreads()
  const insights = getInsights()

  // Pagination for reflections
  const itemsPerPage = 5
  const totalPages = Math.ceil(filteredThreads.length / itemsPerPage)
  const paginatedThreads = filteredThreads
    .slice()
    .reverse()
    .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

  if (threads.length === 0) {
    return (
      <Card
        className={`border-0 shadow-2xl transition-all duration-500 backdrop-blur-xl ${
          darkMode ? "bg-gray-900/80 text-white" : "bg-white/90"
        }`}
      >
        <CardContent className="p-16 text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center transform hover:rotate-12 transition-transform duration-300 shadow-lg">
            <Calendar className="w-12 h-12 text-white" />
          </div>
          <h2 className={`text-3xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>
            Your Tapestry Awaits
          </h2>
          <p className={`text-lg mb-8 ${darkMode ? "text-gray-300" : "text-gray-600"} max-w-md mx-auto`}>
            Start weaving your emotional journey by creating your first thread. Each day adds a new layer to your
            personal story.
          </p>
          <div className="flex justify-center">
            <Badge variant="outline" className="text-sm px-4 py-2">
              Begin your journey today
            </Badge>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className={`space-y-8 transition-opacity duration-700 ${animateIn ? "opacity-100" : "opacity-0"}`}>
      {/* Enhanced Header with View Controls */}
      <Card
        className={`border-0 shadow-2xl transition-all duration-500 backdrop-blur-xl ${
          darkMode ? "bg-gray-900/80 text-white" : "bg-white/90"
        }`}
      >
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className={`flex items-center gap-3 text-2xl ${darkMode ? "text-white" : "text-gray-800"}`}>
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                Your Emotional Tapestry
              </CardTitle>
              <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Visualize your emotional journey through time
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "week" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("week")}
                className={`rounded-full transition-all duration-300 ${
                  darkMode && viewMode !== "week" ? "text-white border-gray-600 hover:bg-gray-700" : ""
                }`}
              >
                Week
              </Button>
              <Button
                variant={viewMode === "month" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("month")}
                className={`rounded-full transition-all duration-300 ${
                  darkMode && viewMode !== "month" ? "text-white border-gray-600 hover:bg-gray-700" : ""
                }`}
              >
                Month
              </Button>
              <Button
                variant={viewMode === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("all")}
                className={`rounded-full transition-all duration-300 ${
                  darkMode && viewMode !== "all" ? "text-white border-gray-600 hover:bg-gray-700" : ""
                }`}
              >
                All Time
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Enhanced Stats Grid */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <Card
            className={`border-0 shadow-xl transition-all duration-500 transform hover:scale-105 backdrop-blur-xl ${
              darkMode ? "bg-gray-900/80 text-white" : "bg-white/90"
            }`}
          >
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                {stats.totalThreads}
              </div>
              <div className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Threads Woven</div>
              <div className="mt-2">
                <Badge variant="secondary" className="text-xs">
                  {viewMode === "all" ? "All time" : `Past ${viewMode}`}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card
            className={`border-0 shadow-xl transition-all duration-500 transform hover:scale-105 backdrop-blur-xl ${
              darkMode ? "bg-gray-900/80 text-white" : "bg-white/90"
            }`}
          >
            <CardContent className="p-6 text-center">
              <div
                className="w-12 h-12 rounded-full mx-auto mb-3 shadow-lg transform hover:rotate-12 transition-transform duration-300 border-4 border-white/20"
                style={{ backgroundColor: stats.mostCommonColor }}
              />
              <div className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Dominant Mood</div>
              <div className="mt-2">
                <Badge variant="outline" className="text-xs">
                  {Object.values(stats.colorCounts).reduce((a, b) => Math.max(a, b), 0)} days
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card
            className={`border-0 shadow-xl transition-all duration-500 transform hover:scale-105 backdrop-blur-xl ${
              darkMode ? "bg-gray-900/80 text-white" : "bg-white/90"
            }`}
          >
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-2 capitalize">
                {stats.mostCommonPattern}
              </div>
              <div className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Common Pattern
              </div>
              <div className="mt-2">
                <Badge variant="outline" className="text-xs">
                  {Object.values(stats.patternCounts).reduce((a, b) => Math.max(a, b), 0)} times
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card
            className={`border-0 shadow-xl transition-all duration-500 transform hover:scale-105 backdrop-blur-xl ${
              darkMode ? "bg-gray-900/80 text-white" : "bg-white/90"
            }`}
          >
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent mb-2">
                {stats.avgIntensity}
              </div>
              <div className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Avg Intensity</div>
              <div className="mt-2">
                <Badge
                  variant={stats.avgIntensity > 7 ? "destructive" : stats.avgIntensity < 4 ? "secondary" : "default"}
                  className="text-xs"
                >
                  {stats.avgIntensity > 7 ? "High" : stats.avgIntensity < 4 ? "Low" : "Balanced"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Enhanced Mood Trend Chart */}
      {stats && stats.moodTrend && stats.moodTrend.length > 0 && (
        <Card
          className={`border-0 shadow-2xl transition-all duration-500 backdrop-blur-xl ${
            darkMode ? "bg-gray-900/80 text-white" : "bg-white/90"
          }`}
        >
          <CardHeader>
            <CardTitle className={`flex items-center gap-3 ${darkMode ? "text-white" : "text-gray-800"}`}>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              Mood Intensity Trend
              <Badge variant="outline" className="ml-auto">
                Last {stats.moodTrend.length} days
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-64 flex items-end justify-between gap-3 bg-gradient-to-t from-gray-50/50 to-transparent rounded-lg p-4">
              {stats.moodTrend.map((day, index) => (
                <div key={`trend-${index}-${day.day}`} className="flex flex-col items-center gap-3 flex-1 group">
                  <div className="relative">
                    <div
                      className="w-full rounded-t-xl transition-all duration-700 hover:opacity-90 shadow-lg group-hover:shadow-xl transform group-hover:scale-105 min-w-[40px] max-w-[60px]"
                      style={{
                        height: `${Math.max(day.intensity * 20, 20)}px`,
                        backgroundColor: day.color,
                        background: `linear-gradient(to top, ${day.color}, ${day.color}dd)`,
                      }}
                    />
                    <div
                      className={`absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
                      } px-2 py-1 rounded text-xs shadow-lg whitespace-nowrap`}
                    >
                      Intensity: {day.intensity}/10
                      <br />
                      {day.date}
                    </div>
                  </div>
                  <div className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{day.day}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between text-xs text-gray-500">
              <span>Intensity Scale: 1-10</span>
              <span>Hover for details</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Enhanced Insights */}
      {insights.length > 0 && (
        <Card
          className={`border-0 shadow-2xl transition-all duration-500 backdrop-blur-xl ${
            darkMode ? "bg-gray-900/80 text-white" : "bg-white/90"
          }`}
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className={`flex items-center gap-3 ${darkMode ? "text-white" : "text-gray-800"}`}>
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                Mood Insights
                <Badge variant="secondary" className="ml-2">
                  AI Generated
                </Badge>
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowInsights(!showInsights)}
                className={`gap-2 ${darkMode ? "text-gray-300 hover:text-white hover:bg-gray-700" : ""}`}
              >
                {showInsights ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showInsights ? "Hide" : "Show"}
              </Button>
            </div>
          </CardHeader>
          {showInsights && (
            <CardContent className="p-6">
              <div className="space-y-4">
                {insights.map((insight, index) => (
                  <div
                    key={`insight-${index}`}
                    className={`flex items-start gap-4 p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
                      darkMode ? "bg-gray-800/60" : "bg-gray-50/80"
                    }`}
                  >
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mt-2 flex-shrink-0"></div>
                    <p className={`${darkMode ? "text-gray-300" : "text-gray-700"} leading-relaxed`}>{insight}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          )}
        </Card>
      )}

      {/* Enhanced Main Tapestry */}
      <Card
        className={`border-0 shadow-2xl transition-all duration-500 backdrop-blur-xl ${
          darkMode ? "bg-gray-900/80 text-white" : "bg-white/90"
        }`}
      >
        <CardHeader>
          <CardTitle className={`flex items-center gap-3 ${darkMode ? "text-white" : "text-gray-800"}`}>
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
              <BarChart className="w-5 h-5 text-white" />
            </div>
            Your Emotional Tapestry
            <Badge variant="outline" className="ml-auto">
              {filteredThreads.length} threads
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Tapestry threads={filteredThreads} darkMode={darkMode} />
        </CardContent>
      </Card>

      {/* Enhanced Thread Details */}
      {filteredThreads.length > 0 && (
        <Card
          className={`border-0 shadow-2xl transition-all duration-500 backdrop-blur-xl ${
            darkMode ? "bg-gray-900/80 text-white" : "bg-white/90"
          }`}
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className={`flex items-center gap-3 ${darkMode ? "text-white" : "text-gray-800"}`}>
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                Recent Reflections
                <Badge variant="secondary" className="ml-2">
                  {filteredThreads.length} total
                </Badge>
              </CardTitle>
              {totalPages > 1 && (
                <div className="flex items-center gap-3">
                  <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Page {currentPage + 1} of {totalPages}
                  </span>
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                      disabled={currentPage === 0}
                      className={`w-8 h-8 rounded-full ${darkMode ? "text-white border-gray-600 hover:bg-gray-700" : ""}`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                      disabled={currentPage === totalPages - 1}
                      className={`w-8 h-8 rounded-full ${darkMode ? "text-white border-gray-600 hover:bg-gray-700" : ""}`}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {paginatedThreads.map((thread) => (
                <div
                  key={`reflection-${thread._id || thread.id}`}
                  className={`flex items-start gap-6 p-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg ${
                    darkMode ? "bg-gray-800/60 hover:bg-gray-800/80" : "bg-gray-50/80 hover:bg-white/90"
                  }`}
                >
                  <div
                    className="w-6 h-20 rounded-full shadow-lg flex-shrink-0 border-2 border-white/20"
                    style={{ backgroundColor: thread.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                      <span className={`font-semibold text-lg ${darkMode ? "text-white" : "text-gray-800"}`}>
                        {new Date(thread.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-xs capitalize">
                          {thread.pattern}
                        </Badge>
                        <Badge
                          variant={
                            thread.intensity > 7 ? "destructive" : thread.intensity < 4 ? "secondary" : "default"
                          }
                          className="text-xs"
                        >
                          Intensity {thread.intensity}/10
                        </Badge>
                      </div>
                    </div>
                    {thread.note && (
                      <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} leading-relaxed`}>{thread.note}</p>
                    )}
                    {!thread.note && (
                      <p className={`${darkMode ? "text-gray-500" : "text-gray-400"} italic`}>
                        No note added for this day
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}