// "use client"

// import { useState, useEffect, useRef } from "react"
// import { motion, AnimatePresence } from "framer-motion"

// export default function Tapestry({ threads, preview = false, darkMode = false }) {
//   const [hoveredThread, setHoveredThread] = useState(null)
//   const [animatedThreads, setAnimatedThreads] = useState(new Set())
//   const containerRef = useRef(null)

//   useEffect(() => {
//     // Animate threads in sequence when component mounts
//     if (threads && threads.length > 0) {
//       threads.forEach((_, index) => {
//         setTimeout(() => {
//           setAnimatedThreads((prev) => new Set([...prev, index]))
//         }, index * 150)
//       })
//     }
//   }, [threads])

//   if (!threads || threads.length === 0) {
//     return (
//       <motion.div
//         className={`text-center py-16 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <motion.div
//           className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 flex items-center justify-center"
//           animate={{
//             scale: [1, 1.1, 1],
//             rotate: [0, 5, -5, 0],
//           }}
//           transition={{
//             duration: 4,
//             repeat: Number.POSITIVE_INFINITY,
//             ease: "easeInOut",
//           }}
//         >
//           <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 animate-pulse-glow" />
//         </motion.div>
//         <motion.p
//           className="text-lg font-medium mb-2"
//           animate={{ opacity: [0.7, 1, 0.7] }}
//           transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
//         >
//           Your tapestry will appear here as you weave your daily threads...
//         </motion.p>
//         <motion.div
//           className="mt-6 w-full h-1 bg-gradient-to-r from-transparent via-purple-300 to-transparent opacity-30 rounded-full"
//           animate={{
//             background: [
//               "linear-gradient(90deg, transparent, rgba(147, 51, 234, 0.3), transparent)",
//               "linear-gradient(90deg, transparent, rgba(236, 72, 153, 0.3), transparent)",
//               "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent)",
//               "linear-gradient(90deg, transparent, rgba(147, 51, 234, 0.3), transparent)",
//             ],
//           }}
//           transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
//         />
//       </motion.div>
//     )
//   }

//   const getPatternStyle = (thread, index) => {
//     const baseStyle = {
//       background: thread.color,
//       height: `${(thread.intensity || 5) * 2 + 8}px`,
//       minHeight: "12px",
//       "--thread-color": thread.color,
//       "--thread-secondary-color": thread.secondaryColor || "#ffffff",
//     }

//     const patternClasses = {
//       smooth: "thread-smooth",
//       wavy: "thread-wavy",
//       gradient: "thread-gradient",
//       jagged: "thread-base",
//       dotted: "thread-base",
//       thick: "thread-base",
//     }

//     return {
//       ...baseStyle,
//       className: `thread-base ${patternClasses[thread.pattern] || "thread-smooth"}`,
//     }
//   }

//   const getThreadVariants = (index) => ({
//     hidden: {
//       scaleX: 0,
//       opacity: 0,
//       filter: "blur(10px)",
//     },
//     visible: {
//       scaleX: 1,
//       opacity: 1,
//       filter: "blur(0px)",
//       transition: {
//         duration: 1.2,
//         delay: index * 0.1,
//         ease: [0.4, 0, 0.2, 1],
//       },
//     },
//     hover: {
//       scaleY: 1.3,
//       scaleX: 1.02,
//       filter: "brightness(1.2) saturate(1.3)",
//       transition: {
//         duration: 0.3,
//         ease: "easeOut",
//       },
//     },
//   })

//   return (
//     <motion.div
//       ref={containerRef}
//       className="space-y-3"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.8 }}
//     >
//       {preview && (
//         <motion.p
//           className={`text-sm mb-6 ${darkMode ? "text-gray-400" : "text-gray-600"} text-center font-medium`}
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3 }}
//         >
//           ✨ Your emotional journey, woven thread by thread ✨
//         </motion.p>
//       )}

//       <div
//         className={`thread-container relative p-8 rounded-2xl shadow-2xl backdrop-blur-xl border transition-all duration-500 ${
//           darkMode ? "bg-gray-900/40 border-gray-700/50" : "bg-white/60 border-white/30"
//         }`}
//       >
//         <div className="space-y-4">
//           <AnimatePresence>
//             {threads.map((thread, index) => {
//               const style = getPatternStyle(thread, index)

//               return (
//                 <motion.div
//                   key={thread.id || `thread-${index}`}
//                   className="group relative cursor-sparkle"
//                   variants={getThreadVariants(index)}
//                   initial="hidden"
//                   animate="visible"
//                   whileHover="hover"
//                   onMouseEnter={() => setHoveredThread(thread.id || index)}
//                   onMouseLeave={() => setHoveredThread(null)}
//                   layout
//                 >
//                   {/* Thread with enhanced styling */}
//                   <motion.div
//                     className={`w-full rounded-full shadow-lg transition-all duration-500 transform-gpu ${style.className}`}
//                     style={style}
//                     whileHover={{
//                       y: -3,
//                       boxShadow: `0 12px 30px ${thread.color}40`,
//                     }}
//                   >
//                     {/* Shimmer effect overlay */}
//                     <div className="absolute inset-0 rounded-full overflow-hidden">
//                       <div
//                         className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"
//                         style={{ width: "30%" }}
//                       />
//                     </div>

//                     {/* Intensity indicator dots */}
//                     <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                       {Array.from({ length: Math.min(thread.intensity || 5, 5) }).map((_, i) => (
//                         <motion.div
//                           key={i}
//                           className="w-1.5 h-1.5 bg-white/80 rounded-full"
//                           initial={{ scale: 0 }}
//                           animate={{ scale: 1 }}
//                           transition={{ delay: i * 0.1 }}
//                         />
//                       ))}
//                     </div>
//                   </motion.div>

//                   {/* Enhanced tooltip */}
//                   <AnimatePresence>
//                     {hoveredThread === (thread.id || index) && (
//                       <motion.div
//                         className={`absolute left-0 top-full mt-3 z-20 ${
//                           darkMode ? "text-gray-200 bg-gray-800/95" : "text-gray-700 bg-white/95"
//                         } px-4 py-3 rounded-xl shadow-2xl backdrop-blur-md border max-w-xs`}
//                         initial={{ opacity: 0, y: -10, scale: 0.9 }}
//                         animate={{ opacity: 1, y: 0, scale: 1 }}
//                         exit={{ opacity: 0, y: -10, scale: 0.9 }}
//                         transition={{ duration: 0.2 }}
//                       >
//                         <div className="flex items-center gap-2 mb-2">
//                           <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: thread.color }} />
//                           <span className="font-semibold text-sm">
//                             {new Date(thread.date).toLocaleDateString("en-US", {
//                               month: "short",
//                               day: "numeric",
//                               year: "numeric",
//                             })}
//                           </span>
//                         </div>

//                         <div className="space-y-1 text-xs">
//                           <div className="flex justify-between">
//                             <span className="opacity-75">Pattern:</span>
//                             <span className="capitalize font-medium">{thread.pattern}</span>
//                           </div>
//                           <div className="flex justify-between">
//                             <span className="opacity-75">Intensity:</span>
//                             <span className="font-medium">{thread.intensity || 5}/10</span>
//                           </div>
//                         </div>

//                         {thread.note && (
//                           <div
//                             className={`mt-2 pt-2 border-t text-xs ${
//                               darkMode ? "border-gray-700 text-gray-300" : "border-gray-200 text-gray-600"
//                             }`}
//                           >
//                             <p className="line-clamp-2">{thread.note}</p>
//                           </div>
//                         )}

//                         {/* Tooltip arrow */}
//                         <div
//                           className={`absolute -top-1 left-4 w-2 h-2 transform rotate-45 ${
//                             darkMode ? "bg-gray-800" : "bg-white"
//                           }`}
//                         />
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </motion.div>
//               )
//             })}
//           </AnimatePresence>
//         </div>

//         {/* Floating particles effect */}
//         <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
//           {Array.from({ length: 6 }).map((_, i) => (
//             <motion.div
//               key={i}
//               className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-30"
//               animate={{
//                 x: [0, 100, 0],
//                 y: [0, -50, 0],
//                 opacity: [0.3, 0.7, 0.3],
//                 scale: [1, 1.5, 1],
//               }}
//               transition={{
//                 duration: 8 + i * 2,
//                 repeat: Number.POSITIVE_INFINITY,
//                 delay: i * 1.5,
//                 ease: "easeInOut",
//               }}
//               style={{
//                 left: `${10 + i * 15}%`,
//                 top: `${20 + i * 10}%`,
//               }}
//             />
//           ))}
//         </div>
//       </div>

//       {!preview && (
//         <motion.div
//           className="text-center mt-6"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.8 }}
//         >
//           <motion.p
//             className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}
//             animate={{
//               background: [
//                 "linear-gradient(45deg, #667eea, #764ba2)",
//                 "linear-gradient(45deg, #f093fb, #f5576c)",
//                 "linear-gradient(45deg, #4facfe, #00f2fe)",
//                 "linear-gradient(45deg, #667eea, #764ba2)",
//               ],
//             }}
//             transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
//           >
//             <span className="sparkle-container">
//               {threads.length} thread{threads.length !== 1 ? "s" : ""} woven into your emotional tapestry
//             </span>
//           </motion.p>
//         </motion.div>
//       )}
//     </motion.div>
//   )
// }

"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function Tapestry({ threads, preview = false, darkMode = false }) {
  const [hoveredThread, setHoveredThread] = useState(null)
  const [animatedThreads, setAnimatedThreads] = useState(new Set())
  const containerRef = useRef(null)

  useEffect(() => {
    // Animate threads in sequence when component mounts
    if (threads && threads.length > 0) {
      threads.forEach((_, index) => {
        setTimeout(() => {
          setAnimatedThreads((prev) => new Set([...prev, index]))
        }, index * 150)
      })
    }
  }, [threads])

  if (!threads || threads.length === 0) {
    return (
      <motion.div
        className={`text-center py-16 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 flex items-center justify-center"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 animate-pulse-glow" />
        </motion.div>
        <motion.p
          className="text-lg font-medium mb-2"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          Your tapestry will appear here as you weave your daily threads...
        </motion.p>
        <motion.div
          className="mt-6 w-full h-1 bg-gradient-to-r from-transparent via-purple-300 to-transparent opacity-30 rounded-full"
          animate={{
            background: [
              "linear-gradient(90deg, transparent, rgba(147, 51, 234, 0.3), transparent)",
              "linear-gradient(90deg, transparent, rgba(236, 72, 153, 0.3), transparent)",
              "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent)",
              "linear-gradient(90deg, transparent, rgba(147, 51, 234, 0.3), transparent)",
            ],
          }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        />
      </motion.div>
    )
  }

  const getPatternStyle = (thread, index) => {
    const baseStyle = {
      backgroundColor: thread.color,
      height: `${(thread.intensity || 5) * 2 + 8}px`,
      minHeight: "12px",
      "--thread-color": thread.color,
      "--thread-secondary-color": thread.secondaryColor || "#ffffff",
    }

    const patternClasses = {
      smooth: "thread-smooth",
      wavy: "thread-wavy",
      gradient: "thread-gradient",
      jagged: "thread-base",
      dotted: "thread-base",
      thick: "thread-base",
    }

    // For gradient pattern, override backgroundColor
    if (thread.pattern === "gradient") {
      return {
        ...baseStyle,
        backgroundColor: "transparent",
        backgroundImage: `linear-gradient(90deg, ${thread.color}, ${thread.secondaryColor || "#ffffff"})`,
        className: `thread-base ${patternClasses[thread.pattern] || "thread-smooth"}`,
      }
    }

    return {
      ...baseStyle,
      className: `thread-base ${patternClasses[thread.pattern] || "thread-smooth"}`,
    }
  }

  const getThreadVariants = (index) => ({
    hidden: {
      scaleX: 0,
      opacity: 0,
      filter: "blur(10px)",
    },
    visible: {
      scaleX: 1,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1.2,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    hover: {
      scaleY: 1.3,
      scaleX: 1.02,
      filter: "brightness(1.2) saturate(1.3)",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  })

  return (
    <motion.div
      ref={containerRef}
      className="space-y-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {preview && (
        <motion.p
          className={`text-sm mb-6 ${darkMode ? "text-gray-400" : "text-gray-600"} text-center font-medium`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          ✨ Your emotional journey, woven thread by thread ✨
        </motion.p>
      )}

      <div
        className={`thread-container relative p-8 rounded-2xl shadow-2xl backdrop-blur-xl border transition-all duration-500 ${
          darkMode ? "bg-gray-900/40 border-gray-700/50" : "bg-white/60 border-white/30"
        }`}
      >
        <div className="space-y-4">
          <AnimatePresence>
            {threads.map((thread, index) => {
              const style = getPatternStyle(thread, index)

              return (
                <motion.div
                  key={thread.id || `thread-${index}`}
                  className="group relative cursor-sparkle"
                  variants={getThreadVariants(index)}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  onMouseEnter={() => setHoveredThread(thread.id || index)}
                  onMouseLeave={() => setHoveredThread(null)}
                  layout
                >
                  {/* Thread with enhanced styling */}
                  <motion.div
                    className={`w-full rounded-full shadow-lg transition-all duration-500 transform-gpu ${style.className}`}
                    style={style}
                    whileHover={{
                      y: -3,
                      boxShadow: `0 12px 30px ${thread.color}40`,
                    }}
                  >
                    {/* Shimmer effect overlay */}
                    <div className="absolute inset-0 rounded-full overflow-hidden">
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"
                        style={{ width: "30%" }}
                      />
                    </div>

                    {/* Intensity indicator dots */}
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {Array.from({ length: Math.min(thread.intensity || 5, 5) }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 bg-white/80 rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                        />
                      ))}
                    </div>
                  </motion.div>

                  {/* Enhanced tooltip */}
                  <AnimatePresence>
                    {hoveredThread === (thread.id || index) && (
                      <motion.div
                        className={`absolute left-0 top-full mt-3 z-20 ${
                          darkMode ? "text-gray-200 bg-gray-800/95" : "text-gray-700 bg-white/95"
                        } px-4 py-3 rounded-xl shadow-2xl backdrop-blur-md border max-w-xs`}
                        initial={{ opacity: 0, y: -10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: thread.color }} />
                          <span className="font-semibold text-sm">
                            {new Date(thread.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>

                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span className="opacity-75">Pattern:</span>
                            <span className="capitalize font-medium">{thread.pattern}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="opacity-75">Intensity:</span>
                            <span className="font-medium">{thread.intensity || 5}/10</span>
                          </div>
                        </div>

                        {thread.note && (
                          <div
                            className={`mt-2 pt-2 border-t text-xs ${
                              darkMode ? "border-gray-700 text-gray-300" : "border-gray-200 text-gray-600"
                            }`}
                          >
                            <p className="line-clamp-2">{thread.note}</p>
                          </div>
                        )}

                        {/* Tooltip arrow */}
                        <div
                          className={`absolute -top-1 left-4 w-2 h-2 transform rotate-45 ${
                            darkMode ? "bg-gray-800" : "bg-white"
                          }`}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-30"
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 1.5,
                ease: "easeInOut",
              }}
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + i * 10}%`,
              }}
            />
          ))}
        </div>
      </div>

      {!preview && (
        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.p
            className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}
            animate={{
              background: [
                "linear-gradient(45deg, #667eea, #764ba2)",
                "linear-gradient(45deg, #f093fb, #f5576c)",
                "linear-gradient(45deg, #4facfe, #00f2fe)",
                "linear-gradient(45deg, #667eea, #764ba2)",
              ],
            }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
          >
            <span className="sparkle-container">
              {threads.length} thread{threads.length !== 1 ? "s" : ""} woven into your emotional tapestry
            </span>
          </motion.p>
        </motion.div>
      )}
    </motion.div>
  )
}