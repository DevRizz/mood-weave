// // "use client"

// // import { useState, useEffect, useRef } from "react"
// // import { Plus, Calendar, Palette, Waves, Moon, Sun, Info, X, Sparkles, Heart } from "lucide-react"
// // import { Button } from "@/components/ui/button"
// // import { Card, CardContent } from "@/components/ui/card"
// // import ThreadCreator from "./components/ThreadCreator"
// // import Tapestry from "./components/Tapestry"
// // import TapestryView from "./components/TapestryView"
// // import BackgroundCanvas from "./components/BackgroundCanvas"
// // import VideoShowcase from "./components/VideoShowcase"
// // import { useThreads } from "./hooks/useThreads"
// // import AncientSymbolsFloating from "./components/AncientSymbolsFloating"
// // import { gsap } from "gsap"
// // import { motion, AnimatePresence } from "framer-motion"

// // export default function MoodWeave() {
// //   const { threads, todayThread, saveThread, isLoading } = useThreads()
// //   const [showCreator, setShowCreator] = useState(false)
// //   const [view, setView] = useState("today")
// //   const [darkMode, setDarkMode] = useState(false)
// //   const [animateIn, setAnimateIn] = useState(false)
// //   const [showVideo, setShowVideo] = useState(false)
// //   const [showIntro, setShowIntro] = useState(false)
// //   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

// //   const headerRef = useRef(null)
// //   const logoRef = useRef(null)
// //   const titleRef = useRef(null)
// //   const mainContentRef = useRef(null)

// //   useEffect(() => {
// //     const handleMouseMove = (e) => {
// //       setMousePosition({ x: e.clientX, y: e.clientY })
// //     }

// //     window.addEventListener("mousemove", handleMouseMove)
// //     return () => window.removeEventListener("mousemove", handleMouseMove)
// //   }, [])

// //   useEffect(() => {
// //     const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
// //     setDarkMode(prefersDark)

// //     const firstVisit = !localStorage.getItem("moodWeaveFirstVisit")
// //     if (firstVisit) {
// //       localStorage.setItem("moodWeaveFirstVisit", "false")
// //       setShowIntro(true)
// //     }

// //     const initAnimations = () => {
// //       if (!headerRef.current || !logoRef.current || !titleRef.current || !mainContentRef.current) {
// //         return
// //       }

// //       const headerButtons = headerRef.current.querySelectorAll(".header-button")

// //       gsap.set([logoRef.current, titleRef.current, mainContentRef.current], { opacity: 1 })
// //       if (headerButtons.length > 0) {
// //         gsap.set(headerButtons, { opacity: 1 })
// //       }

// //       const tl = gsap.timeline()

// //       tl.from(logoRef.current, {
// //         duration: 1.2,
// //         scale: 0,
// //         rotation: 360,
// //         ease: "back.out(2)",
// //       }).from(
// //         titleRef.current,
// //         {
// //           duration: 1,
// //           x: -100,
// //           opacity: 0,
// //           ease: "power3.out",
// //         },
// //         "-=0.6",
// //       )

// //       if (headerButtons.length > 0) {
// //         tl.from(
// //           headerButtons,
// //           {
// //             duration: 0.8,
// //             y: -50,
// //             opacity: 0,
// //             stagger: 0.15,
// //             ease: "power2.out",
// //           },
// //           "-=0.4",
// //         )
// //       }

// //       tl.from(
// //         mainContentRef.current,
// //         {
// //           duration: 1.2,
// //           y: 50,
// //           opacity: 0,
// //           ease: "power3.out",
// //         },
// //         "-=0.6",
// //       )
// //     }

// //     const animationTimeout = setTimeout(() => {
// //       initAnimations()
// //       setAnimateIn(true)
// //     }, 100)

// //     return () => {
// //       clearTimeout(animationTimeout)
// //     }
// //   }, [])

// //   useEffect(() => {
// //     if (darkMode) {
// //       document.documentElement.classList.add("dark")
// //     } else {
// //       document.documentElement.classList.remove("dark")
// //     }
// //   }, [darkMode])

// //   const getTodayStatus = () => {
// //     if (todayThread) {
// //       return "woven"
// //     }
// //     return "unwoven"
// //   }

// //   const handleViewChange = (newView) => {
// //     gsap.to(mainContentRef.current, {
// //       duration: 0.4,
// //       opacity: 0,
// //       y: 30,
// //       ease: "power2.in",
// //       onComplete: () => {
// //         setView(newView)
// //         gsap.to(mainContentRef.current, {
// //           duration: 0.6,
// //           opacity: 1,
// //           y: 0,
// //           ease: "power2.out",
// //         })
// //       },
// //     })
// //   }

// //   if (isLoading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 relative overflow-hidden">
// //         <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-orange-900/20" />

// //         <motion.div
// //           className="text-center relative z-10"
// //           initial={{ opacity: 0, scale: 0.8 }}
// //           animate={{ opacity: 1, scale: 1 }}
// //           transition={{ duration: 0.8, ease: "easeOut" }}
// //         >
// //           <motion.div
// //             className="loading-spinner mx-auto mb-8"
// //             animate={{ rotate: 360 }}
// //             transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
// //           />

// //           <motion.div
// //             className="text-gradient-rainbow text-2xl font-bold mb-4 heading-premium"
// //             animate={{
// //               backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
// //             }}
// //             transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
// //           >
// //             Weaving your tapestry...
// //           </motion.div>

// //           <motion.p
// //             className="text-purple-600 font-medium"
// //             animate={{ opacity: [0.5, 1, 0.5] }}
// //             transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
// //           >
// //             Preparing your emotional journey
// //           </motion.p>
// //         </motion.div>

// //         {/* Floating elements */}
// //         {Array.from({ length: 12 }).map((_, i) => (
// //           <motion.div
// //             key={i}
// //             className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-30"
// //             animate={{
// //               x: [0, 100, -100, 0],
// //               y: [0, -100, 100, 0],
// //               scale: [1, 1.5, 0.5, 1],
// //               opacity: [0.3, 0.8, 0.3],
// //             }}
// //             transition={{
// //               duration: 8 + i,
// //               repeat: Number.POSITIVE_INFINITY,
// //               delay: i * 0.5,
// //               ease: "easeInOut",
// //             }}
// //             style={{
// //               left: `${10 + i * 8}%`,
// //               top: `${10 + i * 7}%`,
// //             }}
// //           />
// //         ))}
// //       </div>
// //     )
// //   }

// //   return (
// //     <div
// //       className={`min-h-screen transition-all duration-700 relative overflow-hidden ${
// //         darkMode
// //           ? "bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white"
// //           : "bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50"
// //       }`}
// //     >
// //       {/* Custom cursor follower */}
// //       <motion.div
// //         className="fixed w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full pointer-events-none z-50 mix-blend-difference opacity-50"
// //         animate={{
// //           x: mousePosition.x - 12,
// //           y: mousePosition.y - 12,
// //         }}
// //         transition={{
// //           type: "spring",
// //           stiffness: 500,
// //           damping: 28,
// //         }}
// //       />

// //       <BackgroundCanvas darkMode={darkMode} />
// //       <AncientSymbolsFloating darkMode={darkMode} />

// //       {/* Enhanced Header */}
// //       <motion.header
// //         ref={headerRef}
// //         className={`sticky top-0 z-40 backdrop-blur-2xl border-b transition-all duration-700 ${
// //           darkMode ? "bg-gray-900/60 border-purple-800/50" : "bg-white/60 border-purple-100/50"
// //         }`}
// //         initial={{ y: -100 }}
// //         animate={{ y: 0 }}
// //         transition={{ duration: 1, ease: "easeOut" }}
// //       >
// //         <div className="max-w-6xl mx-auto px-6 py-5">
// //           <div className="flex items-center justify-between">
// //             <motion.div className="flex items-center gap-4" whileHover={{ scale: 1.02 }}>
// //               <motion.div
// //                 ref={logoRef}
// //                 className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl cursor-magic premium-glow"
// //                 whileHover={{
// //                   rotate: 15,
// //                   scale: 1.1,
// //                 }}
// //                 whileTap={{ scale: 0.95 }}
// //                 transition={{ type: "spring", stiffness: 400, damping: 10 }}
// //               >
// //                 <Waves className="w-7 h-7 text-white" />
// //               </motion.div>

// //               <motion.h1
// //                 ref={titleRef}
// //                 className="text-4xl font-bold text-gradient heading-premium cursor-magic"
// //                 whileHover={{
// //                   scale: 1.05,
// //                   textShadow: "0 0 20px rgba(102, 126, 234, 0.5)",
// //                 }}
// //               >
// //                 Mood Weave
// //               </motion.h1>
// //             </motion.div>

// //             <div className="flex items-center gap-3">
// //               <Button
// //                 variant="ghost"
// //                 size="icon"
// //                 onClick={() => setShowVideo(true)}
// //                 className={`header-button rounded-2xl glass-button cursor-sparkle ${
// //                   darkMode ? "text-yellow-300 hover:text-yellow-200" : "text-purple-700 hover:text-purple-900"
// //                 }`}
// //                 aria-label="Watch introduction video"
// //               >
// //                 <Info className="w-5 h-5" />
// //               </Button>

// //               <Button
// //                 variant="ghost"
// //                 size="icon"
// //                 onClick={() => setDarkMode(!darkMode)}
// //                 className={`header-button rounded-2xl glass-button cursor-sparkle ${
// //                   darkMode ? "text-yellow-300 hover:text-yellow-200" : "text-purple-700 hover:text-purple-900"
// //                 }`}
// //                 aria-label="Toggle dark mode"
// //               >
// //                 <motion.div animate={{ rotate: darkMode ? 180 : 0 }} transition={{ duration: 0.5, ease: "easeInOut" }}>
// //                   {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
// //                 </motion.div>
// //               </Button>

// //               <Button
// //                 variant={view === "today" ? "default" : "ghost"}
// //                 size="sm"
// //                 onClick={() => handleViewChange("today")}
// //                 className={`header-button gap-2 rounded-2xl btn-magical cursor-magic transition-all duration-300 ${
// //                   view === "today" ? "btn-gradient-pink" : "glass-button"
// //                 }`}
// //               >
// //                 <Plus className="w-4 h-4" />
// //                 Today
// //               </Button>

// //               <Button
// //                 variant={view === "tapestry" ? "default" : "ghost"}
// //                 size="sm"
// //                 onClick={() => handleViewChange("tapestry")}
// //                 className={`header-button gap-2 rounded-2xl btn-magical cursor-magic transition-all duration-300 ${
// //                   view === "tapestry" ? "btn-gradient-pink" : "glass-button"
// //                 }`}
// //               >
// //                 <Calendar className="w-4 h-4" />
// //                 Tapestry
// //               </Button>
// //             </div>
// //           </div>
// //         </div>
// //       </motion.header>

// //       {/* Enhanced Main Content */}
// //       <main ref={mainContentRef} className="max-w-6xl mx-auto px-6 py-12 opacity-100">
// //         <AnimatePresence mode="wait">
// //           {view === "today" ? (
// //             <motion.div
// //               key="today"
// //               className="space-y-12"
// //               initial={{ opacity: 0, x: -100 }}
// //               animate={{ opacity: 1, x: 0 }}
// //               exit={{ opacity: 0, x: 100 }}
// //               transition={{ duration: 0.8, ease: "easeOut" }}
// //             >
// //               {/* Enhanced Today's Status */}
// //               <motion.div
// //                 initial={{ opacity: 0, y: 80 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
// //               >
// //                 <Card className="card-premium animate-card-entrance">
// //                   <CardContent className="p-12 text-center">
// //                     <motion.div className="mb-8">
// //                       <motion.div
// //                         className="w-28 h-28 mx-auto mb-6 bg-gradient-to-br from-purple-400 to-pink-400 rounded-3xl flex items-center justify-center shadow-2xl cursor-paint animate-morphing-gradient"
// //                         whileHover={{
// //                           rotate: 15,
// //                           scale: 1.15,
// //                           boxShadow: "0 25px 50px rgba(139, 92, 246, 0.4)",
// //                         }}
// //                         whileTap={{ scale: 0.9 }}
// //                         transition={{ type: "spring", stiffness: 300, damping: 15 }}
// //                       >
// //                         <Palette className="w-14 h-14 text-white" />
// //                       </motion.div>

// //                       <motion.h2
// //                         className={`text-3xl font-bold mb-4 heading-premium transition-colors duration-500 ${
// //                           darkMode ? "text-white" : "text-gray-800"
// //                         }`}
// //                         initial={{ opacity: 0 }}
// //                         animate={{ opacity: 1 }}
// //                         transition={{ delay: 0.6 }}
// //                       >
// //                         {new Date().toLocaleDateString("en-US", {
// //                           weekday: "long",
// //                           year: "numeric",
// //                           month: "long",
// //                           day: "numeric",
// //                         })}
// //                       </motion.h2>

// //                       <motion.p
// //                         className={`text-lg transition-colors duration-500 ${
// //                           darkMode ? "text-gray-300" : "text-gray-600"
// //                         }`}
// //                         initial={{ opacity: 0 }}
// //                         animate={{ opacity: 1 }}
// //                         transition={{ delay: 0.8 }}
// //                       >
// //                         {getTodayStatus() === "woven"
// //                           ? "✨ Today's thread has been beautifully woven into your tapestry"
// //                           : "🎨 Ready to weave today's emotional thread?"}
// //                       </motion.p>
// //                     </motion.div>

// //                     {todayThread && (
// //                       <motion.div
// //                         className="mb-8"
// //                         initial={{ scale: 0, rotate: -180 }}
// //                         animate={{ scale: 1, rotate: 0 }}
// //                         transition={{
// //                           type: "spring",
// //                           stiffness: 200,
// //                           delay: 1,
// //                           duration: 1.2,
// //                         }}
// //                         whileHover={{ scale: 1.08, rotate: 2 }}
// //                       >
// //                         <div
// //                           className={`inline-block p-8 rounded-3xl shadow-2xl backdrop-blur-xl ${
// //                             darkMode ? "bg-gray-800/60" : "bg-white/80"
// //                           }`}
// //                         >
// //                           <div
// //                             className="w-48 h-12 rounded-full shadow-2xl thread-base animate-thread-pulse"
// //                             style={{
// //                               background:
// //                                 todayThread.pattern === "gradient"
// //                                   ? `linear-gradient(90deg, ${todayThread.color}, ${todayThread.secondaryColor || "#ffffff"})`
// //                                   : todayThread.color,
// //                               "--thread-color": todayThread.color,
// //                               "--thread-secondary-color": todayThread.secondaryColor || "#ffffff",
// //                             }}
// //                           />
// //                         </div>
// //                       </motion.div>
// //                     )}

// //                     <motion.div
// //                       initial={{ opacity: 0, y: 30 }}
// //                       animate={{ opacity: 1, y: 0 }}
// //                       transition={{ delay: 1.2, duration: 0.8 }}
// //                     >
// //                       <Button
// //                         onClick={() => setShowCreator(true)}
// //                         size="lg"
// //                         className="btn-magical px-12 py-8 text-lg rounded-3xl shadow-2xl cursor-magic sparkle-container"
// //                       >
// //                         <motion.div
// //                           whileHover={{ scale: 1.05 }}
// //                           whileTap={{ scale: 0.95 }}
// //                           className="flex items-center gap-3"
// //                         >
// //                           <Sparkles className="w-6 h-6" />
// //                           {getTodayStatus() === "woven" ? "✨ Reweave Today" : "🎨 Weave Today's Thread"}
// //                           <Heart className="w-5 h-5" />
// //                         </motion.div>
// //                       </Button>
// //                     </motion.div>
// //                   </CardContent>
// //                 </Card>
// //               </motion.div>

// //               {/* Enhanced Recent Threads Preview */}
// //               {threads.length > 0 && (
// //                 <motion.div
// //                   initial={{ opacity: 0, y: 80 }}
// //                   animate={{ opacity: 1, y: 0 }}
// //                   transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
// //                 >
// //                   <Card className="card-premium">
// //                     <CardContent className="p-8">
// //                       <motion.h3
// //                         className={`text-2xl font-bold mb-6 text-center heading-premium transition-colors duration-500 ${
// //                           darkMode ? "text-white" : "text-gray-800"
// //                         }`}
// //                         initial={{ opacity: 0 }}
// //                         animate={{ opacity: 1 }}
// //                         transition={{ delay: 0.8 }}
// //                       >
// //                         🧵 Recent Threads
// //                       </motion.h3>
// //                       <Tapestry threads={threads.slice(-7)} preview={true} darkMode={darkMode} />
// //                     </CardContent>
// //                   </Card>
// //                 </motion.div>
// //               )}
// //             </motion.div>
// //           ) : (
// //             <motion.div
// //               key="tapestry"
// //               initial={{ opacity: 0, x: 100 }}
// //               animate={{ opacity: 1, x: 0 }}
// //               exit={{ opacity: 0, x: -100 }}
// //               transition={{ duration: 0.8, ease: "easeOut" }}
// //             >
// //               <TapestryView threads={threads} darkMode={darkMode} />
// //             </motion.div>
// //           )}
// //         </AnimatePresence>
// //       </main>

// //       {/* Enhanced Modals */}
// //       <AnimatePresence>
// //         {showCreator && (
// //           <ThreadCreator
// //             onSave={saveThread}
// //             onClose={() => setShowCreator(false)}
// //             existingThread={todayThread}
// //             darkMode={darkMode}
// //           />
// //         )}
// //       </AnimatePresence>

// //       <AnimatePresence>
// //         {showVideo && <VideoShowcase onClose={() => setShowVideo(false)} darkMode={darkMode} />}
// //       </AnimatePresence>

// //       <AnimatePresence>
// //         {showIntro && (
// //           <motion.div
// //             className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-2xl"
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             exit={{ opacity: 0 }}
// //           >
// //             <motion.div
// //               className={`max-w-2xl p-12 rounded-3xl card-premium ${darkMode ? "bg-gray-800" : "bg-white"} shadow-2xl`}
// //               initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
// //               animate={{ scale: 1, opacity: 1, rotate: 0 }}
// //               exit={{ scale: 0.8, opacity: 0, rotate: 10 }}
// //               transition={{ type: "spring", stiffness: 300, damping: 30 }}
// //             >
// //               <div className="flex justify-between items-center mb-6">
// //                 <h2
// //                   className={`text-3xl font-bold heading-premium text-gradient ${darkMode ? "text-white" : "text-gray-800"}`}
// //                 >
// //                   Welcome to Mood Weave ✨
// //                 </h2>
// //                 <Button
// //                   variant="ghost"
// //                   size="icon"
// //                   onClick={() => setShowIntro(false)}
// //                   className="cursor-magic rounded-2xl glass-button"
// //                 >
// //                   <X className="w-6 h-6" />
// //                 </Button>
// //               </div>

// //               <div className="mb-8 space-y-6">
// //                 <motion.p
// //                   className={`text-lg leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}
// //                   initial={{ opacity: 0, y: 20 }}
// //                   animate={{ opacity: 1, y: 0 }}
// //                   transition={{ delay: 0.2 }}
// //                 >
// //                   🎨 Mood Weave is a revolutionary emotional journaling app inspired by ancient weaving traditions from
// //                   around the world.
// //                 </motion.p>
// //                 <motion.p
// //                   className={`text-lg leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}
// //                   initial={{ opacity: 0, y: 20 }}
// //                   animate={{ opacity: 1, y: 0 }}
// //                   transition={{ delay: 0.4 }}
// //                 >
// //                   🧵 Express your emotions through colors, patterns, and symbols to create a beautiful tapestry of your
// //                   emotional journey.
// //                 </motion.p>
// //                 <motion.p
// //                   className={`text-lg leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}
// //                   initial={{ opacity: 0, y: 20 }}
// //                   animate={{ opacity: 1, y: 0 }}
// //                   transition={{ delay: 0.6 }}
// //                 >
// //                   ☁️ Your data is securely stored in the cloud, allowing you to access your emotional tapestry from any
// //                   device.
// //                 </motion.p>
// //               </div>

// //               <motion.div
// //                 className="flex justify-between gap-4"
// //                 initial={{ opacity: 0, y: 20 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 transition={{ delay: 0.8 }}
// //               >
// //                 <Button
// //                   variant="outline"
// //                   onClick={() => {
// //                     setShowIntro(false)
// //                     setShowVideo(true)
// //                   }}
// //                   className="glass-button cursor-sparkle rounded-2xl px-8 py-4"
// //                 >
// //                   🎥 Watch Video
// //                 </Button>
// //                 <Button onClick={() => setShowIntro(false)} className="btn-magical cursor-magic rounded-2xl px-8 py-4">
// //                   🚀 Get Started
// //                 </Button>
// //               </motion.div>
// //             </motion.div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>

// //       {/* Floating Action Elements */}
// //       <div className="fixed bottom-8 right-8 z-30">
// //         <motion.div
// //           className="flex flex-col gap-4"
// //           initial={{ opacity: 0, scale: 0 }}
// //           animate={{ opacity: 1, scale: 1 }}
// //           transition={{ delay: 2, duration: 0.8 }}
// //         >
// //           {/* Quick Add Button */}
// //           <motion.button
// //             onClick={() => setShowCreator(true)}
// //             className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-2xl flex items-center justify-center cursor-magic premium-glow"
// //             whileHover={{
// //               scale: 1.1,
// //               rotate: 15,
// //               boxShadow: "0 20px 40px rgba(139, 92, 246, 0.4)",
// //             }}
// //             whileTap={{ scale: 0.9 }}
// //             animate={{
// //               y: [0, -10, 0],
// //               rotate: [0, 5, -5, 0],
// //             }}
// //             transition={{
// //               y: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
// //               rotate: { duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
// //             }}
// //           >
// //             <Plus className="w-8 h-8 text-white" />
// //           </motion.button>
// //         </motion.div>
// //       </div>
// //     </div>
// //   )
// // }

// "use client"

// import { useState, useEffect, useRef } from "react"
// import { Plus, Calendar, Palette, Waves, Moon, Sun, Info, X, Sparkles, Heart } from "lucide-react"
// import { Card, CardContent } from "@/components/ui/card"
// import ThreadCreator from "./components/ThreadCreator"
// import EnhancedTapestry from "./components/EnhancedTapestry"
// import TapestryView from "./components/TapestryView"
// import BackgroundCanvas from "./components/BackgroundCanvas"
// import VideoShowcase from "./components/VideoShowcase"
// import MagneticButton from "./components/MagneticButton"
// import { ThreadSkeleton, CardSkeleton } from "./components/SkeletonLoader"
// import { useThreads } from "./hooks/useThreads"
// import AncientSymbolsFloating from "./components/AncientSymbolsFloating"
// import { gsap } from "gsap"
// import { motion, AnimatePresence } from "framer-motion"

// export default function MoodWeave() {
//   const { threads, todayThread, saveThread, isLoading } = useThreads()
//   const [showCreator, setShowCreator] = useState(false)
//   const [view, setView] = useState("today")
//   const [darkMode, setDarkMode] = useState(false)
//   const [animateIn, setAnimateIn] = useState(false)
//   const [showVideo, setShowVideo] = useState(false)
//   const [showIntro, setShowIntro] = useState(false)
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
//   const [isTransitioning, setIsTransitioning] = useState(false)

//   const headerRef = useRef(null)
//   const logoRef = useRef(null)
//   const titleRef = useRef(null)
//   const mainContentRef = useRef(null)
//   const heroTextRef = useRef(null)
//   const transitionOverlayRef = useRef(null)

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setMousePosition({ x: e.clientX, y: e.clientY })
//     }

//     window.addEventListener("mousemove", handleMouseMove)
//     return () => window.removeEventListener("mousemove", handleMouseMove)
//   }, [])

//   useEffect(() => {
//     const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
//     setDarkMode(prefersDark)

//     const firstVisit = !localStorage.getItem("moodWeaveFirstVisit")
//     if (firstVisit) {
//       localStorage.setItem("moodWeaveFirstVisit", "false")
//       setShowIntro(true)
//     }

//     const initAnimations = () => {
//       if (!headerRef.current || !logoRef.current || !titleRef.current || !mainContentRef.current) {
//         return
//       }

//       const headerButtons = headerRef.current.querySelectorAll(".header-button")

//       gsap.set([logoRef.current, titleRef.current, mainContentRef.current], { opacity: 1 })
//       if (headerButtons.length > 0) {
//         gsap.set(headerButtons, { opacity: 1 })
//       }

//       const tl = gsap.timeline()

//       // Hero text animation
//       if (heroTextRef.current) {
//         gsap.from(heroTextRef.current, {
//           y: 100,
//           opacity: 0,
//           duration: 1.2,
//           ease: "back.out(1.7)", // Changed from power4.out
//           delay: 0.5,
//         })
//       }

//       tl.from(logoRef.current, {
//         duration: 1.5,
//         scale: 0,
//         rotation: 720,
//         ease: "elastic.out(1, 0.3)",
//       }).from(
//         titleRef.current,
//         {
//           duration: 1.2,
//           x: -150,
//           opacity: 0,
//           ease: "back.out(1.7)", // Changed from power4.out
//         },
//         "-=0.8",
//       )

//       if (headerButtons.length > 0) {
//         tl.from(
//           headerButtons,
//           {
//             duration: 1,
//             y: -80,
//             opacity: 0,
//             stagger: 0.2,
//             ease: "elastic.out(1, 0.3)",
//           },
//           "-=0.6",
//         )
//       }

//       tl.from(
//         mainContentRef.current,
//         {
//           duration: 1.5,
//           y: 80,
//           opacity: 0,
//           ease: "back.out(1.7)", // Changed from power4.out
//         },
//         "-=0.8",
//       )
//     }

//     const animationTimeout = setTimeout(() => {
//       initAnimations()
//       setAnimateIn(true)
//     }, 100)

//     return () => {
//       clearTimeout(animationTimeout)
//     }
//   }, [])

//   const handleDarkModeToggle = () => {
//     setIsTransitioning(true)

//     // Create transition overlay
//     const overlay = document.createElement("div")
//     overlay.className = "bg-transition-overlay active"
//     document.body.appendChild(overlay)

//     setTimeout(() => {
//       setDarkMode(!darkMode)
//     }, 600)

//     setTimeout(() => {
//       setIsTransitioning(false)
//       document.body.removeChild(overlay)
//     }, 1200)
//   }

//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add("dark")
//     } else {
//       document.documentElement.classList.remove("dark")
//     }
//   }, [darkMode])

//   const getTodayStatus = () => {
//     if (todayThread) {
//       return "woven"
//     }
//     return "unwoven"
//   }

//   const handleViewChange = (newView) => {
//     gsap.to(mainContentRef.current, {
//       duration: 0.5,
//       opacity: 0,
//       y: 50,
//       ease: "power2.in",
//       onComplete: () => {
//         setView(newView)
//         gsap.to(mainContentRef.current, {
//           duration: 0.8,
//           opacity: 1,
//           y: 0,
//           ease: "back.out(1.7)", // Changed from power4.out
//         })
//       },
//     })
//   }

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-orange-900/20" />

//         <motion.div
//           className="text-center relative z-10"
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 1, ease: "easeOut" }}
//         >
//           <motion.div
//             className="loading-spinner-enhanced mx-auto mb-12"
//             animate={{ rotate: 360 }}
//             transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//           />

//           <motion.div
//             className="text-gradient-rainbow text-4xl font-bold mb-6 heading-premium typewriter"
//             style={{ width: "20ch" }}
//           >
//             Weaving your tapestry...
//           </motion.div>

//           <motion.p
//             className="text-purple-600 font-medium text-lg"
//             animate={{ opacity: [0.5, 1, 0.5] }}
//             transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
//           >
//             ✨ Preparing your emotional journey ✨
//           </motion.p>

//           {/* Loading skeleton preview */}
//           <motion.div
//             className="mt-12 max-w-md mx-auto"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1 }}
//           >
//             <CardSkeleton darkMode={false} />
//             <div className="mt-6">
//               <ThreadSkeleton darkMode={false} count={3} />
//             </div>
//           </motion.div>
//         </motion.div>

//         {/* Floating loading particles */}
//         {Array.from({ length: 20 }).map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20"
//             animate={{
//               x: [0, 200, -200, 0],
//               y: [0, -150, 150, 0],
//               scale: [1, 2, 0.5, 1],
//               opacity: [0.2, 0.8, 0.2],
//             }}
//             transition={{
//               duration: 10 + i,
//               repeat: Number.POSITIVE_INFINITY,
//               delay: i * 0.3,
//               ease: "easeInOut",
//             }}
//             style={{
//               left: `${5 + i * 4.5}%`,
//               top: `${5 + i * 4.5}%`,
//             }}
//           />
//         ))}
//       </div>
//     )
//   }

//   return (
//     <div
//       className={`min-h-screen transition-all duration-1200 relative overflow-hidden ${
//         darkMode
//           ? "bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white"
//           : "bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50"
//       }`}
//     >
//       {/* Custom cursor follower with magnetic effect */}
//       <motion.div
//         className="fixed w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full pointer-events-none z-50 mix-blend-difference opacity-60"
//         animate={{
//           x: mousePosition.x - 16,
//           y: mousePosition.y - 16,
//         }}
//         transition={{
//           type: "spring",
//           stiffness: 800,
//           damping: 35,
//         }}
//       />

//       <BackgroundCanvas darkMode={darkMode} />
//       <AncientSymbolsFloating darkMode={darkMode} />

//       {/* Enhanced Header with GSAP nav link animations */}
//       <motion.header
//         ref={headerRef}
//         className={`sticky top-0 z-40 backdrop-blur-3xl border-b transition-all duration-1000 ${
//           darkMode ? "bg-gray-900/70 border-purple-800/50" : "bg-white/70 border-purple-100/50"
//         }`}
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 1.2, ease: "backOut" }}
//       >
//         <div className="max-w-7xl mx-auto px-8 py-6">
//           <div className="flex items-center justify-between">
//             <motion.div className="flex items-center gap-5" whileHover={{ scale: 1.02 }}>
//               <motion.div
//                 ref={logoRef}
//                 className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl cursor-none premium-glow animate-morphing-gradient"
//                 whileHover={{
//                   rotate: 20,
//                   scale: 1.15,
//                 }}
//                 whileTap={{ scale: 0.9 }}
//                 transition={{ type: "spring", stiffness: 400, damping: 15 }}
//               >
//                 <Waves className="w-8 h-8 text-white" />
//               </motion.div>

//               <motion.h1
//                 ref={titleRef}
//                 className="text-5xl font-bold text-gradient heading-premium cursor-none"
//                 whileHover={{
//                   scale: 1.05,
//                 }}
//               >
//                 Mood Weave
//               </motion.h1>
//             </motion.div>

//             <div className="flex items-center gap-4">
//               <MagneticButton
//                 onClick={() => setShowVideo(true)}
//                 className={`header-button p-3 rounded-3xl glass-button nav-link ${
//                   darkMode ? "text-yellow-300 hover:text-yellow-200" : "text-purple-700 hover:text-purple-900"
//                 }`}
//                 aria-label="Watch introduction video"
//               >
//                 <Info className="w-6 h-6" />
//               </MagneticButton>

//               <MagneticButton
//                 onClick={handleDarkModeToggle}
//                 className={`header-button p-3 rounded-3xl glass-button nav-link ${
//                   darkMode ? "text-yellow-300 hover:text-yellow-200" : "text-purple-700 hover:text-purple-900"
//                 }`}
//                 aria-label="Toggle dark mode"
//               >
//                 <motion.div animate={{ rotate: darkMode ? 180 : 0 }} transition={{ duration: 0.8, ease: "easeInOut" }}>
//                   {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
//                 </motion.div>
//               </MagneticButton>

//               <MagneticButton
//                 onClick={() => handleViewChange("today")}
//                 className={`header-button gap-3 px-6 py-3 rounded-3xl nav-link transition-all duration-500 ${
//                   view === "today" ? "btn-gradient-pink" : "glass-button"
//                 }`}
//               >
//                 <Plus className="w-5 h-5" />
//                 <span className="font-semibold">Today</span>
//               </MagneticButton>

//               <MagneticButton
//                 onClick={() => handleViewChange("tapestry")}
//                 className={`header-button gap-3 px-6 py-3 rounded-3xl nav-link transition-all duration-500 ${
//                   view === "tapestry" ? "btn-gradient-pink" : "glass-button"
//                 }`}
//               >
//                 <Calendar className="w-5 h-5" />
//                 <span className="font-semibold">Tapestry</span>
//               </MagneticButton>
//             </div>
//           </div>
//         </div>
//       </motion.header>

//       {/* Enhanced Main Content with parallax effect */}
//       <main ref={mainContentRef} className="max-w-7xl mx-auto px-8 py-16 opacity-100 relative z-10">
//         <AnimatePresence mode="wait">
//           {view === "today" ? (
//             <motion.div
//               key="today"
//               className="space-y-16"
//               initial={{ opacity: 0, x: -150 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: 150 }}
//               transition={{ duration: 1, ease: "backOut" }}
//             >
//               {/* Enhanced Hero Section */}
//               <motion.div
//                 ref={heroTextRef}
//                 initial={{ opacity: 0, y: 100 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 1.5, delay: 0.3, ease: "backOut" }}
//               >
//                 <Card className="card-premium card-tilt animate-card-entrance">
//                   <CardContent className="p-16 text-center relative overflow-hidden">
//                     {/* Animated background pattern */}
//                     <div className="absolute inset-0 opacity-10">
//                       {Array.from({ length: 12 }).map((_, i) => (
//                         <motion.div
//                           key={i}
//                           className="absolute w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
//                           animate={{
//                             x: [0, 100, -100, 0],
//                             y: [0, -100, 100, 0],
//                             scale: [1, 1.5, 0.5, 1],
//                             opacity: [0.1, 0.3, 0.1],
//                           }}
//                           transition={{
//                             duration: 15 + i * 2,
//                             repeat: Number.POSITIVE_INFINITY,
//                             delay: i * 1.5,
//                             ease: "easeInOut",
//                           }}
//                           style={{
//                             left: `${10 + i * 8}%`,
//                             top: `${10 + i * 7}%`,
//                           }}
//                         />
//                       ))}
//                     </div>

//                     <motion.div className="mb-12 relative z-10">
//                       <motion.div
//                         className="w-36 h-36 mx-auto mb-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-2xl cursor-none animate-liquid-morph"
//                         whileHover={{
//                           rotate: 20,
//                           scale: 1.2,
//                           boxShadow: "0 30px 60px rgba(139, 92, 246, 0.4)",
//                         }}
//                         whileTap={{ scale: 0.85 }}
//                         transition={{ type: "spring", stiffness: 300, damping: 20 }}
//                       >
//                         <Palette className="w-16 h-16 text-white" />
//                       </motion.div>

//                       <motion.h2
//                         className={`text-4xl font-bold mb-6 heading-premium transition-colors duration-700 ${
//                           darkMode ? "text-white" : "text-gray-800"
//                         }`}
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ delay: 0.8 }}
//                       >
//                         {new Date().toLocaleDateString("en-US", {
//                           weekday: "long",
//                           year: "numeric",
//                           month: "long",
//                           day: "numeric",
//                         })}
//                       </motion.h2>

//                       <motion.p
//                         className={`text-xl transition-colors duration-700 ${
//                           darkMode ? "text-gray-300" : "text-gray-600"
//                         }`}
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ delay: 1 }}
//                       >
//                         {getTodayStatus() === "woven"
//                           ? "✨ Today's thread has been beautifully woven into your tapestry"
//                           : "🎨 Ready to weave today's emotional thread?"}
//                       </motion.p>
//                     </motion.div>

//                     {todayThread && (
//                       <motion.div
//                         className="mb-12"
//                         initial={{ scale: 0, rotate: -360 }}
//                         animate={{ scale: 1, rotate: 0 }}
//                         transition={{
//                           type: "spring",
//                           stiffness: 200,
//                           delay: 1.2,
//                           duration: 1.5,
//                         }}
//                         whileHover={{ scale: 1.1, rotate: 3 }}
//                       >
//                         <div
//                           className={`inline-block p-10 rounded-full shadow-2xl backdrop-blur-xl ${
//                             darkMode ? "bg-gray-800/60" : "bg-white/80"
//                           }`}
//                         >
//                           <div
//                             className="w-56 h-16 rounded-full shadow-2xl thread-base animate-thread-pulse relative overflow-hidden"
//                             style={{
//                               background:
//                                 todayThread.pattern === "gradient"
//                                   ? `linear-gradient(90deg, ${todayThread.color}, ${todayThread.secondaryColor || "#ffffff"})`
//                                   : todayThread.color,
//                               "--thread-color": todayThread.color,
//                               "--thread-secondary-color": todayThread.secondaryColor || "#ffffff",
//                             }}
//                           >
//                             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
//                           </div>
//                         </div>
//                       </motion.div>
//                     )}

//                     <motion.div
//                       initial={{ opacity: 0, y: 40 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 1.5, duration: 1 }}
//                     >
//                       <MagneticButton
//                         onClick={() => setShowCreator(true)}
//                         className="btn-magical px-16 py-10 text-xl rounded-full shadow-2xl cursor-none sparkle-container font-bold"
//                       >
//                         <motion.div
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                           className="flex items-center gap-4"
//                         >
//                           <Sparkles className="w-7 h-7" />
//                           {getTodayStatus() === "woven" ? "✨ Reweave Today" : "🎨 Weave Today's Thread"}
//                           <Heart className="w-6 h-6" />
//                         </motion.div>
//                       </MagneticButton>
//                     </motion.div>
//                   </CardContent>
//                 </Card>
//               </motion.div>

//               {/* Enhanced Recent Threads Preview */}
//               {threads.length > 0 && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 100 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 1.2, delay: 0.8, ease: "backOut" }}
//                 >
//                   <Card className="card-premium card-tilt">
//                     <CardContent className="p-10">
//                       <motion.h3
//                         className={`text-3xl font-bold mb-8 text-center heading-premium transition-colors duration-700 ${
//                           darkMode ? "text-white" : "text-gray-800"
//                         }`}
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ delay: 1 }}
//                       >
//                         🧵 Recent Threads
//                       </motion.h3>
//                       <EnhancedTapestry threads={threads.slice(-7)} preview={true} darkMode={darkMode} />
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               )}
//             </motion.div>
//           ) : (
//             <motion.div
//               key="tapestry"
//               initial={{ opacity: 0, x: 150 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -150 }}
//               transition={{ duration: 1, ease: "backOut" }}
//             >
//               <TapestryView threads={threads} darkMode={darkMode} />
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </main>

//       {/* Enhanced Footer */}
//       <motion.footer
//         className={`footer-fancy py-8 mt-20 ${darkMode ? "text-white" : "text-gray-800"}`}
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 2, duration: 1 }}
//       >
//         <div className="max-w-7xl mx-auto px-8 text-center">
//           <motion.div
//             className="flex items-center justify-center gap-3 text-2xl"
//             animate={{
//               scale: [1, 1.05, 1],
//             }}
//             transition={{
//               duration: 3,
//               repeat: Number.POSITIVE_INFINITY,
//               ease: "easeInOut",
//             }}
//           >
//             <span className="footer-text">Made with</span>
//             <motion.span
//               className="heart-icon text-3xl"
//               animate={{
//                 scale: [1, 1.3, 1],
//               }}
//               transition={{
//                 duration: 1.5,
//                 repeat: Number.POSITIVE_INFINITY,
//                 ease: "easeInOut",
//               }}
//             >
//               ❤️
//             </motion.span>
//             <span className="footer-text">by</span>
//             <motion.span
//               className="footer-text heading-royal text-3xl"
//               whileHover={{
//                 scale: 1.1,
//                 textShadow: "0 0 20px rgba(102, 126, 234, 0.8)",
//               }}
//             >
//               Saharsh
//             </motion.span>
//           </motion.div>
//         </div>
//       </motion.footer>

//       {/* Enhanced Modals */}
//       <AnimatePresence>
//         {showCreator && (
//           <ThreadCreator
//             onSave={saveThread}
//             onClose={() => setShowCreator(false)}
//             existingThread={todayThread}
//             darkMode={darkMode}
//           />
//         )}
//       </AnimatePresence>

//       <AnimatePresence>
//         {showVideo && <VideoShowcase onClose={() => setShowVideo(false)} darkMode={darkMode} />}
//       </AnimatePresence>

//       <AnimatePresence>
//         {showIntro && (
//           <motion.div
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-3xl"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               className={`max-w-3xl p-16 rounded-3xl card-premium ${darkMode ? "bg-gray-800" : "bg-white"} shadow-2xl`}
//               initial={{ scale: 0.7, opacity: 0, rotate: -15 }}
//               animate={{ scale: 1, opacity: 1, rotate: 0 }}
//               exit={{ scale: 0.7, opacity: 0, rotate: 15 }}
//               transition={{ type: "spring", stiffness: 300, damping: 30 }}
//             >
//               <div className="flex justify-between items-center mb-8">
//                 <h2
//                   className={`text-4xl font-bold heading-premium text-gradient ${
//                     darkMode ? "text-white" : "text-gray-800"
//                   }`}
//                 >
//                   Welcome to Mood Weave ✨
//                 </h2>
//                 <MagneticButton
//                   onClick={() => setShowIntro(false)}
//                   className="cursor-none p-3 rounded-3xl glass-button"
//                 >
//                   <X className="w-7 h-7" />
//                 </MagneticButton>
//               </div>

//               <div className="mb-10 space-y-8">
//                 <motion.p
//                   className={`text-xl leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.2 }}
//                 >
//                   🎨 Mood Weave is a revolutionary emotional journaling app inspired by ancient weaving traditions from
//                   around the world.
//                 </motion.p>
//                 <motion.p
//                   className={`text-xl leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.4 }}
//                 >
//                   🧵 Express your emotions through colors, patterns, and symbols to create a beautiful tapestry of your
//                   emotional journey.
//                 </motion.p>
//                 <motion.p
//                   className={`text-xl leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.6 }}
//                 >
//                   ☁️ Your data is securely stored in the cloud, allowing you to access your emotional tapestry from any
//                   device.
//                 </motion.p>
//               </div>

//               <motion.div
//                 className="flex justify-between gap-6"
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.8 }}
//               >
//                 <MagneticButton
//                   onClick={() => {
//                     setShowIntro(false)
//                     setShowVideo(true)
//                   }}
//                   className="glass-button cursor-none rounded-3xl px-10 py-5 text-lg font-semibold"
//                 >
//                   🎥 Watch Video
//                 </MagneticButton>
//                 <MagneticButton
//                   onClick={() => setShowIntro(false)}
//                   className="btn-magical cursor-none rounded-3xl px-10 py-5 text-lg font-semibold"
//                 >
//                   🚀 Get Started
//                 </MagneticButton>
//               </motion.div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Floating Action Elements */}
//       <div className="fixed bottom-10 right-10 z-30">
//         <motion.div
//           className="flex flex-col gap-6"
//           initial={{ opacity: 0, scale: 0 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 2.5, duration: 1 }}
//         >
//           <MagneticButton
//             onClick={() => setShowCreator(true)}
//             className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-2xl flex items-center justify-center cursor-none premium-glow"
//           >
//             <motion.div
//               animate={{
//                 y: [0, -12, 0],
//                 rotate: [0, 8, -8, 0],
//               }}
//               transition={{
//                 y: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
//                 rotate: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
//               }}
//             >
//               <Plus className="w-10 h-10 text-white" />
//             </motion.div>
//           </MagneticButton>
//         </motion.div>
//       </div>
//     </div>
//   )
// }

// "use client"

// import { useState, useEffect, useRef } from "react"
// import { Plus, Calendar, Palette, Waves, Moon, Sun, Info, X, Sparkles, Heart } from "lucide-react"
// import { Card, CardContent } from "@/components/ui/card"
// import ThreadCreator from "./components/ThreadCreator"
// import EnhancedTapestry from "./components/EnhancedTapestry"
// import TapestryView from "./components/TapestryView"
// import BackgroundCanvas from "./components/BackgroundCanvas"
// import VideoShowcase from "./components/VideoShowcase"
// import MagneticButton from "./components/MagneticButton"
// import { ThreadSkeleton, CardSkeleton } from "./components/SkeletonLoader"
// import { useThreads } from "./hooks/useThreads"
// import AncientSymbolsFloating from "./components/AncientSymbolsFloating"
// import { gsap } from "gsap"
// import { motion, AnimatePresence } from "framer-motion"

// export default function MoodWeave() {
//   const { threads, todayThread, saveThread, isLoading } = useThreads()
//   const [showCreator, setShowCreator] = useState(false)
//   const [view, setView] = useState("today")
//   const [darkMode, setDarkMode] = useState(false)
//   const [animateIn, setAnimateIn] = useState(false)
//   const [showVideo, setShowVideo] = useState(false)
//   const [showIntro, setShowIntro] = useState(false)
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
//   const [isTransitioning, setIsTransitioning] = useState(false)

//   const headerRef = useRef(null)
//   const logoRef = useRef(null)
//   const titleRef = useRef(null)
//   const mainContentRef = useRef(null)
//   const heroTextRef = useRef(null)

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setMousePosition({ x: e.clientX, y: e.clientY })
//     }

//     window.addEventListener("mousemove", handleMouseMove)
//     return () => window.removeEventListener("mousemove", handleMouseMove)
//   }, [])

//   useEffect(() => {
//     const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
//     setDarkMode(prefersDark)

//     const firstVisit = !localStorage.getItem("moodWeaveFirstVisit")
//     if (firstVisit) {
//       localStorage.setItem("moodWeaveFirstVisit", "false")
//       setShowIntro(true)
//     }

//     const initAnimations = () => {
//       if (!headerRef.current || !logoRef.current || !titleRef.current || !mainContentRef.current) {
//         return
//       }

//       const headerButtons = headerRef.current.querySelectorAll(".header-button")

//       gsap.set([logoRef.current, titleRef.current, mainContentRef.current], { opacity: 1 })
//       if (headerButtons.length > 0) {
//         gsap.set(headerButtons, { opacity: 1 })
//       }

//       const tl = gsap.timeline()

//       // Hero text animation
//       if (heroTextRef.current) {
//         gsap.from(heroTextRef.current, {
//           y: 50,
//           opacity: 0,
//           duration: 1,
//           ease: "power2.out",
//           delay: 0.3,
//         })
//       }

//       tl.from(logoRef.current, {
//         duration: 1,
//         scale: 0,
//         rotation: 180,
//         ease: "back.out(1.7)",
//       }).from(
//         titleRef.current,
//         {
//           duration: 0.8,
//           x: -50,
//           opacity: 0,
//           ease: "power2.out",
//         },
//         "-=0.5",
//       )

//       if (headerButtons.length > 0) {
//         tl.from(
//           headerButtons,
//           {
//             duration: 0.6,
//             y: -30,
//             opacity: 0,
//             stagger: 0.1,
//             ease: "power2.out",
//           },
//           "-=0.4",
//         )
//       }

//       tl.from(
//         mainContentRef.current,
//         {
//           duration: 1,
//           y: 30,
//           opacity: 0,
//           ease: "power2.out",
//         },
//         "-=0.4",
//       )
//     }

//     const animationTimeout = setTimeout(() => {
//       initAnimations()
//       setAnimateIn(true)
//     }, 100)

//     return () => {
//       clearTimeout(animationTimeout)
//     }
//   }, [])

//   const handleDarkModeToggle = () => {
//     setIsTransitioning(true)

//     // Create transition overlay
//     const overlay = document.createElement("div")
//     overlay.className = "bg-transition-overlay active"
//     document.body.appendChild(overlay)

//     setTimeout(() => {
//       setDarkMode(!darkMode)
//     }, 600)

//     setTimeout(() => {
//       setIsTransitioning(false)
//       document.body.removeChild(overlay)
//     }, 1200)
//   }

//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add("dark")
//     } else {
//       document.documentElement.classList.remove("dark")
//     }
//   }, [darkMode])

//   const getTodayStatus = () => {
//     if (todayThread) {
//       return "woven"
//     }
//     return "unwoven"
//   }

//   const handleViewChange = (newView) => {
//     gsap.to(mainContentRef.current, {
//       duration: 0.3,
//       opacity: 0,
//       y: 20,
//       ease: "power2.in",
//       onComplete: () => {
//         setView(newView)
//         gsap.to(mainContentRef.current, {
//           duration: 0.5,
//           opacity: 1,
//           y: 0,
//           ease: "power2.out",
//         })
//       },
//     })
//   }

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-orange-900/20" />

//         <motion.div
//           className="text-center relative z-10"
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//         >
//           <motion.div
//             className="loading-spinner-enhanced mx-auto mb-8"
//             animate={{ rotate: 360 }}
//             transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//           />

//           <motion.div className="text-3xl font-bold mb-4 heading-premium text-purple-600">
//             Weaving your tapestry...
//           </motion.div>

//           <motion.p className="text-purple-600 font-medium">✨ Preparing your emotional journey ✨</motion.p>

//           {/* Loading skeleton preview */}
//           <motion.div
//             className="mt-8 max-w-md mx-auto"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.5 }}
//           >
//             <CardSkeleton darkMode={false} />
//             <div className="mt-4">
//               <ThreadSkeleton darkMode={false} count={3} />
//             </div>
//           </motion.div>
//         </motion.div>
//       </div>
//     )
//   }

//   return (
//     <div
//       className={`min-h-screen transition-all duration-1200 relative overflow-hidden ${
//         darkMode
//           ? "bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white"
//           : "bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50"
//       }`}
//     >
//       <BackgroundCanvas darkMode={darkMode} />
//       <AncientSymbolsFloating darkMode={darkMode} />

//       {/* Clean Professional Header */}
//       <motion.header
//         ref={headerRef}
//         className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-all duration-700 ${
//           darkMode ? "bg-gray-900/80 border-purple-800/30" : "bg-white/80 border-purple-100/30"
//         }`}
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//       >
//         <div className="max-w-6xl mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <motion.div className="flex items-center gap-4">
//               <motion.div
//                 ref={logoRef}
//                 className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <Waves className="w-6 h-6 text-white" />
//               </motion.div>

//               <motion.h1 ref={titleRef} className="text-2xl font-bold text-gradient heading-premium">
//                 Mood Weave
//               </motion.h1>
//             </motion.div>

//             <div className="flex items-center gap-3">
//               <MagneticButton
//                 onClick={() => setShowVideo(true)}
//                 className={`header-button p-2 rounded-xl glass-button transition-all duration-300 ${
//                   darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
//                 }`}
//                 aria-label="Watch introduction video"
//               >
//                 <Info className="w-5 h-5" />
//               </MagneticButton>

//               <MagneticButton
//                 onClick={handleDarkModeToggle}
//                 className={`header-button p-2 rounded-xl glass-button transition-all duration-300 ${
//                   darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
//                 }`}
//                 aria-label="Toggle dark mode"
//               >
//                 <motion.div animate={{ rotate: darkMode ? 180 : 0 }} transition={{ duration: 0.5 }}>
//                   {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//                 </motion.div>
//               </MagneticButton>

//               <MagneticButton
//                 onClick={() => handleViewChange("today")}
//                 className={`header-button gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
//                   view === "today" ? "btn-gradient-pink text-white" : "glass-button"
//                 }`}
//               >
//                 <Plus className="w-4 h-4" />
//                 <span className="font-medium">Today</span>
//               </MagneticButton>

//               <MagneticButton
//                 onClick={() => handleViewChange("tapestry")}
//                 className={`header-button gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
//                   view === "tapestry" ? "btn-gradient-pink text-white" : "glass-button"
//                 }`}
//               >
//                 <Calendar className="w-4 h-4" />
//                 <span className="font-medium">Tapestry</span>
//               </MagneticButton>
//             </div>
//           </div>
//         </div>
//       </motion.header>

//       {/* Clean Main Content */}
//       <main ref={mainContentRef} className="max-w-6xl mx-auto px-6 py-8 opacity-100 relative z-10">
//         <AnimatePresence mode="wait">
//           {view === "today" ? (
//             <motion.div
//               key="today"
//               className="space-y-8"
//               initial={{ opacity: 0, x: -50 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: 50 }}
//               transition={{ duration: 0.6, ease: "easeOut" }}
//             >
//               {/* Clean Hero Section */}
//               <motion.div
//                 ref={heroTextRef}
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: 0.2 }}
//               >
//                 <Card className="card-premium animate-card-entrance">
//                   <CardContent className="p-8 text-center">
//                     <motion.div className="mb-6">
//                       <motion.div
//                         className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center shadow-lg"
//                         whileHover={{ scale: 1.05, rotate: 5 }}
//                         whileTap={{ scale: 0.95 }}
//                       >
//                         <Palette className="w-10 h-10 text-white" />
//                       </motion.div>

//                       <motion.h2
//                         className={`text-2xl font-bold mb-3 heading-premium ${
//                           darkMode ? "text-white" : "text-gray-800"
//                         }`}
//                       >
//                         {new Date().toLocaleDateString("en-US", {
//                           weekday: "long",
//                           year: "numeric",
//                           month: "long",
//                           day: "numeric",
//                         })}
//                       </motion.h2>

//                       <motion.p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
//                         {getTodayStatus() === "woven"
//                           ? "✨ Today's thread has been woven into your tapestry"
//                           : "🎨 Ready to weave today's emotional thread?"}
//                       </motion.p>
//                     </motion.div>

//                     {todayThread && (
//                       <motion.div
//                         className="mb-6"
//                         initial={{ scale: 0 }}
//                         animate={{ scale: 1 }}
//                         transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
//                         whileHover={{ scale: 1.02 }}
//                       >
//                         <div className={`inline-block p-4 rounded-2xl ${darkMode ? "bg-gray-800/60" : "bg-white/80"}`}>
//                           <div
//                             className="w-32 h-8 rounded-full shadow-lg thread-base"
//                             style={{
//                               background:
//                                 todayThread.pattern === "gradient"
//                                   ? `linear-gradient(90deg, ${todayThread.color}, ${todayThread.secondaryColor || "#ffffff"})`
//                                   : todayThread.color,
//                             }}
//                           />
//                         </div>
//                       </motion.div>
//                     )}

//                     <motion.div
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 0.6 }}
//                     >
//                       <MagneticButton
//                         onClick={() => setShowCreator(true)}
//                         className="btn-magical px-8 py-3 text-lg rounded-xl shadow-lg font-medium"
//                       >
//                         <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-2">
//                           <Sparkles className="w-5 h-5" />
//                           {getTodayStatus() === "woven" ? "Reweave Today" : "Weave Today's Thread"}
//                         </motion.div>
//                       </MagneticButton>
//                     </motion.div>
//                   </CardContent>
//                 </Card>
//               </motion.div>

//               {/* Clean Recent Threads Preview */}
//               {threads.length > 0 && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.8, delay: 0.4 }}
//                 >
//                   <Card className="card-premium">
//                     <CardContent className="p-6">
//                       <motion.h3
//                         className={`text-xl font-bold mb-4 text-center heading-premium ${
//                           darkMode ? "text-white" : "text-gray-800"
//                         }`}
//                       >
//                         Recent Threads
//                       </motion.h3>
//                       <EnhancedTapestry threads={threads.slice(-5)} preview={true} darkMode={darkMode} />
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               )}
//             </motion.div>
//           ) : (
//             <motion.div
//               key="tapestry"
//               initial={{ opacity: 0, x: 50 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -50 }}
//               transition={{ duration: 0.6, ease: "easeOut" }}
//             >
//               <TapestryView threads={threads} darkMode={darkMode} />
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </main>

//       {/* Professional Footer */}
//       <motion.footer
//         className={`footer-professional py-6 mt-12 ${darkMode ? "dark text-white" : "text-gray-700"}`}
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 1, duration: 0.8 }}
//       >
//         <div className="max-w-6xl mx-auto px-6 text-center">
//           <div className="flex items-center justify-center gap-2 text-sm">
//             <span>Made with</span>
//             <Heart className="w-4 h-4 text-red-500" />
//             <span>by</span>
//             <span className="font-semibold text-purple-600">Saharsh</span>
//           </div>
//           <div className="mt-2 text-xs opacity-60">© 2024 Mood Weave. All rights reserved.</div>
//         </div>
//       </motion.footer>

//       {/* Modals */}
//       <AnimatePresence>
//         {showCreator && (
//           <ThreadCreator
//             onSave={saveThread}
//             onClose={() => setShowCreator(false)}
//             existingThread={todayThread}
//             darkMode={darkMode}
//           />
//         )}
//       </AnimatePresence>

//       <AnimatePresence>
//         {showVideo && <VideoShowcase onClose={() => setShowVideo(false)} darkMode={darkMode} />}
//       </AnimatePresence>

//       <AnimatePresence>
//         {showIntro && (
//           <motion.div
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               className={`max-w-2xl p-8 rounded-2xl card-premium ${darkMode ? "bg-gray-800" : "bg-white"} shadow-xl`}
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ duration: 0.3 }}
//             >
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className={`text-2xl font-bold heading-premium ${darkMode ? "text-white" : "text-gray-800"}`}>
//                   Welcome to Mood Weave
//                 </h2>
//                 <MagneticButton onClick={() => setShowIntro(false)} className="p-2 rounded-xl glass-button">
//                   <X className="w-5 h-5" />
//                 </MagneticButton>
//               </div>

//               <div className="mb-6 space-y-4">
//                 <p className={`leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
//                   🎨 Mood Weave is an emotional journaling app inspired by ancient weaving traditions from around the
//                   world.
//                 </p>
//                 <p className={`leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
//                   🧵 Express your emotions through colors, patterns, and symbols to create a beautiful tapestry of your
//                   emotional journey.
//                 </p>
//                 <p className={`leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
//                   ☁️ Your data is securely stored, allowing you to access your emotional tapestry from any device.
//                 </p>
//               </div>

//               <div className="flex justify-between gap-4">
//                 <MagneticButton
//                   onClick={() => {
//                     setShowIntro(false)
//                     setShowVideo(true)
//                   }}
//                   className="glass-button px-6 py-2 rounded-xl font-medium"
//                 >
//                   Watch Video
//                 </MagneticButton>
//                 <MagneticButton
//                   onClick={() => setShowIntro(false)}
//                   className="btn-magical px-6 py-2 rounded-xl font-medium"
//                 >
//                   Get Started
//                 </MagneticButton>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Clean Floating Action Button */}
//       <div className="fixed bottom-6 right-6 z-30">
//         <motion.div
//           initial={{ opacity: 0, scale: 0 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 1.5, duration: 0.5 }}
//         >
//           <MagneticButton
//             onClick={() => setShowCreator(true)}
//             className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg flex items-center justify-center"
//           >
//             <Plus className="w-6 h-6 text-white" />
//           </MagneticButton>
//         </motion.div>
//       </div>
//     </div>
//   )
// }

"use client"

import { useState, useEffect, useRef } from "react"
import { Plus, Calendar, Palette, Waves, Moon, Sun, Info, X, Sparkles, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import ThreadCreator from "./components/ThreadCreator"
import EnhancedTapestry from "./components/EnhancedTapestry"
import TapestryView from "./components/TapestryView"
import BackgroundCanvas from "./components/BackgroundCanvas"
import VideoShowcase from "./components/VideoShowcase"
import MagneticButton from "./components/MagneticButton"
import CustomCursor from "./components/CustomCursor"
import { ThreadSkeleton, CardSkeleton } from "./components/SkeletonLoader"
import { useThreads } from "./hooks/useThreads"
import AncientSymbolsFloating from "./components/AncientSymbolsFloating"
import { gsap } from "gsap"
import { motion, AnimatePresence } from "framer-motion"

export default function MoodWeave() {
  const { threads, todayThread, saveThread, isLoading } = useThreads()
  const [showCreator, setShowCreator] = useState(false)
  const [view, setView] = useState("today")
  const [darkMode, setDarkMode] = useState(false)
  const [animateIn, setAnimateIn] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const [showIntro, setShowIntro] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const headerRef = useRef(null)
  const logoRef = useRef(null)
  const titleRef = useRef(null)
  const mainContentRef = useRef(null)
  const heroTextRef = useRef(null)

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    setDarkMode(prefersDark)

    const firstVisit = !localStorage.getItem("moodWeaveFirstVisit")
    if (firstVisit) {
      localStorage.setItem("moodWeaveFirstVisit", "false")
      setShowIntro(true)
    }

    const initAnimations = () => {
      if (!headerRef.current || !logoRef.current || !titleRef.current || !mainContentRef.current) {
        return
      }

      const headerButtons = headerRef.current.querySelectorAll(".header-button")

      gsap.set([logoRef.current, titleRef.current, mainContentRef.current], { opacity: 1 })
      if (headerButtons.length > 0) {
        gsap.set(headerButtons, { opacity: 1 })
      }

      const tl = gsap.timeline()

      // Hero text animation
      if (heroTextRef.current) {
        gsap.from(heroTextRef.current, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          delay: 0.3,
        })
      }

      tl.from(logoRef.current, {
        duration: 1,
        scale: 0,
        rotation: 180,
        ease: "back.out(1.7)",
      }).from(
        titleRef.current,
        {
          duration: 0.8,
          x: -50,
          opacity: 0,
          ease: "power2.out",
        },
        "-=0.5",
      )

      if (headerButtons.length > 0) {
        tl.from(
          headerButtons,
          {
            duration: 0.6,
            y: -30,
            opacity: 0,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.4",
        )
      }

      tl.from(
        mainContentRef.current,
        {
          duration: 1,
          y: 30,
          opacity: 0,
          ease: "power2.out",
        },
        "-=0.4",
      )
    }

    const animationTimeout = setTimeout(() => {
      initAnimations()
      setAnimateIn(true)
    }, 100)

    return () => {
      clearTimeout(animationTimeout)
    }
  }, [])

  const handleDarkModeToggle = () => {
    setIsTransitioning(true)

    // Create transition overlay
    const overlay = document.createElement("div")
    overlay.className = "bg-transition-overlay active"
    document.body.appendChild(overlay)

    setTimeout(() => {
      setDarkMode(!darkMode)
    }, 600)

    setTimeout(() => {
      setIsTransitioning(false)
      document.body.removeChild(overlay)
    }, 1200)
  }

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const getTodayStatus = () => {
    if (todayThread) {
      return "woven"
    }
    return "unwoven"
  }

  const handleViewChange = (newView) => {
    gsap.to(mainContentRef.current, {
      duration: 0.3,
      opacity: 0,
      y: 20,
      ease: "power2.in",
      onComplete: () => {
        setView(newView)
        gsap.to(mainContentRef.current, {
          duration: 0.5,
          opacity: 1,
          y: 0,
          ease: "power2.out",
        })
      },
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 relative overflow-hidden">
        <CustomCursor />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-orange-900/20" />

        <motion.div
          className="text-center relative z-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="loading-spinner-enhanced mx-auto mb-8"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />

          <motion.div className="text-3xl font-bold mb-4 heading-premium text-purple-600">
            Weaving your tapestry...
          </motion.div>

          <motion.p className="text-purple-600 font-medium">✨ Preparing your emotional journey ✨</motion.p>

          {/* Loading skeleton preview */}
          <motion.div
            className="mt-8 max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <CardSkeleton darkMode={false} />
            <div className="mt-4">
              <ThreadSkeleton darkMode={false} count={3} />
            </div>
          </motion.div>
        </motion.div>
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen transition-all duration-1200 relative overflow-hidden ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white"
          : "bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50"
      }`}
    >
      <CustomCursor />
      <BackgroundCanvas darkMode={darkMode} />
      <AncientSymbolsFloating darkMode={darkMode} />

      {/* Clean Professional Header */}
      <motion.header
        ref={headerRef}
        className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-all duration-700 ${
          darkMode ? "bg-gray-900/80 border-purple-800/30" : "bg-white/80 border-purple-100/30"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div className="flex items-center gap-4">
              <motion.div
                ref={logoRef}
                className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Waves className="w-6 h-6 text-white" />
              </motion.div>

              <motion.h1 ref={titleRef} className="text-2xl font-bold text-gradient heading-premium">
                Mood Weave
              </motion.h1>
            </motion.div>

            <div className="flex items-center gap-3">
              <MagneticButton
                onClick={() => setShowVideo(true)}
                className={`header-button p-2 rounded-xl glass-button transition-all duration-300 ${
                  darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
                }`}
                aria-label="Watch introduction video"
              >
                <Info className="w-5 h-5" />
              </MagneticButton>

              <MagneticButton
                onClick={handleDarkModeToggle}
                className={`header-button p-2 rounded-xl glass-button transition-all duration-300 ${
                  darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
                }`}
                aria-label="Toggle dark mode"
              >
                <motion.div animate={{ rotate: darkMode ? 180 : 0 }} transition={{ duration: 0.5 }}>
                  {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </motion.div>
              </MagneticButton>

              <MagneticButton
                onClick={() => handleViewChange("today")}
                className={`header-button gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                  view === "today" ? "btn-gradient-pink text-white" : "glass-button"
                }`}
              >
                <Plus className="w-4 h-4" />
                <span className="font-medium">Today</span>
              </MagneticButton>

              <MagneticButton
                onClick={() => handleViewChange("tapestry")}
                className={`header-button gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                  view === "tapestry" ? "btn-gradient-pink text-white" : "glass-button"
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span className="font-medium">Tapestry</span>
              </MagneticButton>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Clean Main Content */}
      <main ref={mainContentRef} className="max-w-6xl mx-auto px-6 py-8 opacity-100 relative z-10">
        <AnimatePresence mode="wait">
          {view === "today" ? (
            <motion.div
              key="today"
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Clean Hero Section */}
              <motion.div
                ref={heroTextRef}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Card className="card-premium animate-card-entrance">
                  <CardContent className="p-8 text-center">
                    <motion.div className="mb-6">
                      <motion.div
                        className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center shadow-lg"
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Palette className="w-10 h-10 text-white" />
                      </motion.div>

                      <motion.h2
                        className={`text-2xl font-bold mb-3 heading-premium ${
                          darkMode ? "text-white" : "text-gray-800"
                        }`}
                      >
                        {new Date().toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </motion.h2>

                      <motion.p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                        {getTodayStatus() === "woven"
                          ? "✨ Today's thread has been woven into your tapestry"
                          : "🎨 Ready to weave today's emotional thread?"}
                      </motion.p>
                    </motion.div>

                    {todayThread && (
                      <motion.div
                        className="mb-6"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className={`inline-block p-4 rounded-2xl ${darkMode ? "bg-gray-800/60" : "bg-white/80"}`}>
                          <div
                            className="w-32 h-8 rounded-full shadow-lg thread-base"
                            style={{
                              background:
                                todayThread.pattern === "gradient"
                                  ? `linear-gradient(90deg, ${todayThread.color}, ${todayThread.secondaryColor || "#ffffff"})`
                                  : todayThread.color,
                            }}
                          />
                        </div>
                      </motion.div>
                    )}

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <MagneticButton
                        onClick={() => setShowCreator(true)}
                        className="btn-magical px-8 py-3 text-lg rounded-xl shadow-lg font-medium cursor-sparkle"
                      >
                        <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-2">
                          <Sparkles className="w-5 h-5" />
                          {getTodayStatus() === "woven" ? "Reweave Today" : "Weave Today's Thread"}
                        </motion.div>
                      </MagneticButton>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Clean Recent Threads Preview */}
              {threads.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <Card className="card-premium">
                    <CardContent className="p-6">
                      <motion.h3
                        className={`text-xl font-bold mb-4 text-center heading-premium ${
                          darkMode ? "text-white" : "text-gray-800"
                        }`}
                      >
                        Recent Threads
                      </motion.h3>
                      <EnhancedTapestry threads={threads.slice(-5)} preview={true} darkMode={darkMode} />
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="tapestry"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <TapestryView threads={threads} darkMode={darkMode} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Professional Footer */}
      <motion.footer
        className={`footer-professional py-6 mt-12 ${darkMode ? "dark text-white" : "text-gray-700"}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 text-sm">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500" />
          </div>
          <div className="mt-2 text-xs opacity-60">© {new Date().getFullYear()} Mood Weave. All rights reserved.</div>
        </div>
      </motion.footer>

      {/* Modals */}
      <AnimatePresence>
        {showCreator && (
          <ThreadCreator
            onSave={saveThread}
            onClose={() => setShowCreator(false)}
            existingThread={todayThread}
            darkMode={darkMode}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showVideo && <VideoShowcase onClose={() => setShowVideo(false)} darkMode={darkMode} />}
      </AnimatePresence>

      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={`max-w-2xl p-8 rounded-2xl card-premium ${darkMode ? "bg-gray-800" : "bg-white"} shadow-xl`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className={`text-2xl font-bold heading-premium ${darkMode ? "text-white" : "text-gray-800"}`}>
                  Welcome to Mood Weave
                </h2>
                <MagneticButton onClick={() => setShowIntro(false)} className="p-2 rounded-xl glass-button">
                  <X className="w-5 h-5" />
                </MagneticButton>
              </div>

              <div className="mb-6 space-y-4">
                <p className={`leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  🎨 Mood Weave is an emotional journaling app inspired by ancient weaving traditions from around the
                  world.
                </p>
                <p className={`leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  🧵 Express your emotions through colors, patterns, and symbols to create a beautiful tapestry of your
                  emotional journey.
                </p>
                <p className={`leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  ☁️ Your data is securely stored, allowing you to access your emotional tapestry from any device.
                </p>
              </div>

              <div className="flex justify-between gap-4">
                <MagneticButton
                  onClick={() => {
                    setShowIntro(false)
                    setShowVideo(true)
                  }}
                  className="glass-button px-6 py-2 rounded-xl font-medium"
                >
                  Watch Video
                </MagneticButton>
                <MagneticButton
                  onClick={() => setShowIntro(false)}
                  className="btn-magical px-6 py-2 rounded-xl font-medium cursor-sparkle"
                >
                  Get Started
                </MagneticButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Clean Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-30">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <MagneticButton
            onClick={() => setShowCreator(true)}
            className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg flex items-center justify-center cursor-sparkle"
          >
            <Plus className="w-6 h-6 text-white" />
          </MagneticButton>
        </motion.div>
      </div>
    </div>
  )
}