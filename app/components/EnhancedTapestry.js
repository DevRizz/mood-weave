// "use client"

// import { useState, useEffect, useRef } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { gsap } from "gsap"

// export default function EnhancedTapestry({ threads, preview = false, darkMode = false }) {
//   const [hoveredThread, setHoveredThread] = useState(null)
//   const [animatedThreads, setAnimatedThreads] = useState(new Set())
//   const containerRef = useRef(null)

//   useEffect(() => {
//     if (threads && threads.length > 0) {
//       threads.forEach((_, index) => {
//         setTimeout(() => {
//           setAnimatedThreads((prev) => new Set([...prev, index]))
//         }, index * 200)
//       })
//     }
//   }, [threads])

//   useEffect(() => {
//     // GSAP entrance animation for container
//     if (containerRef.current) {
//       gsap.fromTo(
//         containerRef.current,
//         {
//           opacity: 0,
//           y: 50,
//           scale: 0.9,
//         },
//         {
//           opacity: 1,
//           y: 0,
//           scale: 1,
//           duration: 1.2,
//           ease: "back.out(1.7)", // Changed from power4.out
//         },
//       )
//     }
//   }, [])

//   if (!threads || threads.length === 0) {
//     return (
//       <motion.div
//         className={`text-center py-20 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//       >
//         <motion.div
//           className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 flex items-center justify-center relative overflow-hidden"
//           animate={{
//             scale: [1, 1.1, 1],
//             rotate: [0, 5, -5, 0],
//           }}
//           transition={{
//             duration: 6,
//             repeat: Number.POSITIVE_INFINITY,
//             ease: "easeInOut",
//           }}
//         >
//           <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 animate-pulse-glow" />
//           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
//         </motion.div>

//         <motion.h3
//           className="text-2xl font-bold mb-4 heading-premium"
//           animate={{ opacity: [0.7, 1, 0.7] }}
//           transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
//         >
//           Your tapestry awaits...
//         </motion.h3>

//         <motion.p
//           className="text-lg font-medium mb-4"
//           animate={{ opacity: [0.5, 1, 0.5] }}
//           transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
//         >
//           ✨ Weave your first emotional thread ✨
//         </motion.p>

//         <motion.div
//           className="mt-8 w-full h-2 bg-gradient-to-r from-transparent via-purple-300 to-transparent opacity-30 rounded-full"
//           animate={{
//             background: [
//               "linear-gradient(90deg, transparent, rgba(147, 51, 234, 0.3), transparent)",
//               "linear-gradient(90deg, transparent, rgba(236, 72, 153, 0.3), transparent)",
//               "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent)",
//               "linear-gradient(90deg, transparent, rgba(147, 51, 234, 0.3), transparent)",
//             ],
//           }}
//           transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
//         />
//       </motion.div>
//     )
//   }

//   const getPatternStyle = (thread, index) => {
//     const baseStyle = {
//       background: thread.color,
//       height: `${(thread.intensity || 5) * 2 + 10}px`,
//       minHeight: "14px",
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
//       rotateY: -90,
//     },
//     visible: {
//       scaleX: 1,
//       opacity: 1,
//       filter: "blur(0px)",
//       rotateY: 0,
//       transition: {
//         duration: 1.5,
//         delay: index * 0.15,
//         ease: [0.4, 0, 0.2, 1],
//       },
//     },
//     hover: {
//       scaleY: 1.4,
//       scaleX: 1.03,
//       filter: "brightness(1.3) saturate(1.4)",
//       y: -6,
//       transition: {
//         duration: 0.4,
//         ease: "easeOut",
//       },
//     },
//   })

//   return (
//     <motion.div
//       ref={containerRef}
//       className="space-y-4"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 1 }}
//     >
//       {preview && (
//         <motion.div
//           className="text-center mb-8"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3, duration: 0.8 }}
//         >
//           <motion.p
//             className={`text-lg font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} heading-premium`}
//             animate={{
//               background: [
//                 "linear-gradient(45deg, #667eea, #764ba2)",
//                 "linear-gradient(45deg, #f093fb, #f5576c)",
//                 "linear-gradient(45deg, #4facfe, #00f2fe)",
//                 "linear-gradient(45deg, #667eea, #764ba2)",
//               ],
//             }}
//             transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
//           >
//             ✨ Your emotional journey, woven thread by thread ✨
//           </motion.p>
//         </motion.div>
//       )}

//       <div
//         className={`recent-threads-container ${darkMode ? "dark" : ""} p-10 transition-all duration-700 transform hover:scale-[1.01]`}
//       >
//         <div className="space-y-5 relative z-10">
//           <AnimatePresence>
//             {threads.map((thread, index) => {
//               const style = getPatternStyle(thread, index)

//               return (
//                 <motion.div
//                   key={thread.id || `thread-${index}`}
//                   className="thread-item-enhanced p-4 cursor-pointer"
//                   variants={getThreadVariants(index)}
//                   initial="hidden"
//                   animate="visible"
//                   whileHover="hover"
//                   onMouseEnter={() => setHoveredThread(thread.id || index)}
//                   onMouseLeave={() => setHoveredThread(null)}
//                   layout
//                 >
//                   <div className="flex items-center gap-4">
//                     {/* Enhanced Thread Visualization */}
//                     <motion.div
//                       className={`flex-1 rounded-full shadow-xl transition-all duration-500 transform-gpu relative overflow-hidden ${style.className}`}
//                       style={style}
//                       whileHover={{
//                         boxShadow: `0 15px 35px ${thread.color}50`,
//                       }}
//                     >
//                       {/* Shimmer effect overlay */}
//                       <div className="absolute inset-0 rounded-full overflow-hidden">
//                         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1200 ease-out" />
//                       </div>

//                       {/* Intensity indicator dots */}
//                       <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
//                         {Array.from({ length: Math.min(thread.intensity || 5, 5) }).map((_, i) => (
//                           <motion.div
//                             key={i}
//                             className="w-2 h-2 bg-white/90 rounded-full shadow-sm"
//                             initial={{ scale: 0 }}
//                             animate={{ scale: 1 }}
//                             transition={{ delay: i * 0.1, type: "spring", stiffness: 300 }}
//                           />
//                         ))}
//                       </div>

//                       {/* Pulse effect */}
//                       <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse opacity-30" />
//                     </motion.div>

//                     {/* Thread Info */}
//                     <motion.div
//                       className="flex flex-col items-end text-right min-w-0"
//                       initial={{ opacity: 0, x: 20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: index * 0.1 + 0.5 }}
//                     >
//                       <span
//                         className={`text-sm font-semibold ${darkMode ? "text-gray-200" : "text-gray-700"} truncate`}
//                       >
//                         {new Date(thread.date).toLocaleDateString("en-US", {
//                           month: "short",
//                           day: "numeric",
//                         })}
//                       </span>
//                       <span
//                         className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"} capitalize font-medium`}
//                       >
//                         {thread.pattern}
//                       </span>
//                     </motion.div>
//                   </div>

//                   {/* Enhanced tooltip */}
//                   <AnimatePresence>
//                     {hoveredThread === (thread.id || index) && (
//                       <motion.div
//                         className={`absolute left-0 top-full mt-4 z-30 ${
//                           darkMode ? "text-gray-200 bg-gray-900/95" : "text-gray-700 bg-white/95"
//                         } px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-xl border max-w-sm`}
//                         initial={{ opacity: 0, y: -15, scale: 0.9 }}
//                         animate={{ opacity: 1, y: 0, scale: 1 }}
//                         exit={{ opacity: 0, y: -15, scale: 0.9 }}
//                         transition={{ duration: 0.3, ease: "easeOut" }}
//                       >
//                         <div className="flex items-center gap-3 mb-3">
//                           <div
//                             className="w-4 h-4 rounded-full shadow-lg border-2 border-white/20"
//                             style={{ backgroundColor: thread.color }}
//                           />
//                           <span className="font-bold text-base">
//                             {new Date(thread.date).toLocaleDateString("en-US", {
//                               weekday: "long",
//                               month: "long",
//                               day: "numeric",
//                               year: "numeric",
//                             })}
//                           </span>
//                         </div>

//                         <div className="grid grid-cols-2 gap-3 text-sm mb-3">
//                           <div className="flex justify-between">
//                             <span className="opacity-75">Pattern:</span>
//                             <span className="capitalize font-semibold">{thread.pattern}</span>
//                           </div>
//                           <div className="flex justify-between">
//                             <span className="opacity-75">Intensity:</span>
//                             <span className="font-semibold">{thread.intensity || 5}/10</span>
//                           </div>
//                         </div>

//                         {thread.note && (
//                           <div
//                             className={`pt-3 border-t text-sm ${
//                               darkMode ? "border-gray-700 text-gray-300" : "border-gray-200 text-gray-600"
//                             }`}
//                           >
//                             <p className="line-clamp-3 leading-relaxed">{thread.note}</p>
//                           </div>
//                         )}

//                         {/* Tooltip arrow */}
//                         <div
//                           className={`absolute -top-2 left-6 w-4 h-4 transform rotate-45 ${
//                             darkMode ? "bg-gray-900" : "bg-white"
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

//         {/* Enhanced floating particles effect */}
//         <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
//           {Array.from({ length: 8 }).map((_, i) => (
//             <motion.div
//               key={i}
//               className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20"
//               animate={{
//                 x: [0, 150, 0],
//                 y: [0, -80, 0],
//                 opacity: [0.2, 0.8, 0.2],
//                 scale: [1, 2, 1],
//               }}
//               transition={{
//                 duration: 12 + i * 3,
//                 repeat: Number.POSITIVE_INFINITY,
//                 delay: i * 2,
//                 ease: "easeInOut",
//               }}
//               style={{
//                 left: `${15 + i * 12}%`,
//                 top: `${30 + i * 8}%`,
//               }}
//             />
//           ))}
//         </div>
//       </div>

//       {!preview && (
//         <motion.div
//           className="text-center mt-8"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1.2 }}
//         >
//           <motion.p
//             className={`text-base font-semibold ${darkMode ? "text-gray-300" : "text-gray-700"} heading-premium`}
//             animate={{
//               textShadow: [
//                 "0 0 10px rgba(102, 126, 234, 0.3)",
//                 "0 0 20px rgba(240, 147, 251, 0.4)",
//                 "0 0 10px rgba(102, 126, 234, 0.3)",
//               ],
//             }}
//             transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
//           >
//             <span className="inline-flex items-center gap-2">
//               ✨ {threads.length} thread{threads.length !== 1 ? "s" : ""} woven into your emotional tapestry ✨
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
import { gsap } from "gsap"

export default function EnhancedTapestry({ threads, preview = false, darkMode = false }) {
  const [hoveredThread, setHoveredThread] = useState(null)
  const [animatedThreads, setAnimatedThreads] = useState(new Set())
  const containerRef = useRef(null)

  useEffect(() => {
    if (threads && threads.length > 0) {
      threads.forEach((_, index) => {
        setTimeout(() => {
          setAnimatedThreads((prev) => new Set([...prev, index]))
        }, index * 100)
      })
    }
  }, [threads])

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })
    }
  }, [])

  if (!threads || threads.length === 0) {
    return (
      <motion.div
        className={`text-center py-12 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 flex items-center justify-center"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
        </motion.div>

        <h3 className="text-lg font-medium mb-2">Your tapestry awaits...</h3>
        <p className="text-sm">✨ Weave your first emotional thread ✨</p>
      </motion.div>
    )
  }

  const getPatternStyle = (thread, index) => {
    const baseStyle = {
      background: thread.color,
      height: `${Math.max((thread.intensity || 5) * 1.5 + 6, 8)}px`,
      minHeight: "8px",
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

    return {
      ...baseStyle,
      className: `thread-base ${patternClasses[thread.pattern] || "thread-smooth"}`,
    }
  }

  return (
    <motion.div ref={containerRef} className="space-y-3">
      {preview && (
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            ✨ Your emotional journey, woven thread by thread ✨
          </p>
        </motion.div>
      )}

      <div className={`recent-threads-container ${darkMode ? "dark" : ""} p-6`}>
        <div className="space-y-3 relative z-10">
          <AnimatePresence>
            {threads.map((thread, index) => {
              const style = getPatternStyle(thread, index)

              return (
                <motion.div
                  key={thread.id || `thread-${index}`}
                  className="thread-item-enhanced p-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  onMouseEnter={() => setHoveredThread(thread.id || index)}
                  onMouseLeave={() => setHoveredThread(null)}
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      className={`flex-1 rounded-full shadow-sm transition-all duration-300 ${style.className}`}
                      style={style}
                      whileHover={{ scale: 1.02, y: -1 }}
                    />

                    <motion.div className="flex flex-col items-end text-right text-xs">
                      <span className={`font-medium ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                        {new Date(thread.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span className={`${darkMode ? "text-gray-500" : "text-gray-400"} capitalize`}>
                        {thread.pattern}
                      </span>
                    </motion.div>
                  </div>

                  {/* Clean tooltip */}
                  <AnimatePresence>
                    {hoveredThread === (thread.id || index) && (
                      <motion.div
                        className={`absolute left-0 top-full mt-2 z-30 ${
                          darkMode ? "text-gray-200 bg-gray-800/95" : "text-gray-700 bg-white/95"
                        } px-4 py-3 rounded-lg shadow-lg backdrop-blur-sm border max-w-xs`}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: thread.color }} />
                          <span className="font-medium text-sm">
                            {new Date(thread.date).toLocaleDateString("en-US", {
                              weekday: "long",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>

                        <div className="text-xs space-y-1">
                          <div className="flex justify-between">
                            <span>Pattern:</span>
                            <span className="capitalize font-medium">{thread.pattern}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Intensity:</span>
                            <span className="font-medium">{thread.intensity || 5}/10</span>
                          </div>
                        </div>

                        {thread.note && (
                          <div
                            className={`mt-2 pt-2 border-t text-xs ${darkMode ? "border-gray-700" : "border-gray-200"}`}
                          >
                            <p className="line-clamp-2">{thread.note}</p>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>

      {!preview && (
        <motion.div
          className="text-center mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            {threads.length} thread{threads.length !== 1 ? "s" : ""} woven into your emotional tapestry
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}