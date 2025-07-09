// "use client"

// import { useState, useEffect } from "react"
// import { X, Save, Sparkles, Music, MicOffIcon as MusicOff } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Textarea } from "@/components/ui/textarea"

// const MOOD_COLORS = [
//   { name: "Joyful", color: "#FFD700", description: "Bright and sunny" },
//   { name: "Calm", color: "#87CEEB", description: "Peaceful and serene" },
//   { name: "Energetic", color: "#FF6347", description: "Vibrant and active" },
//   { name: "Melancholy", color: "#4682B4", description: "Thoughtful and blue" },
//   { name: "Passionate", color: "#DC143C", description: "Intense and fiery" },
//   { name: "Balanced", color: "#32CD32", description: "Harmonious and stable" },
//   { name: "Mysterious", color: "#9370DB", description: "Deep and contemplative" },
//   { name: "Gentle", color: "#FFB6C1", description: "Soft and tender" },
//   { name: "Bold", color: "#FF4500", description: "Confident and strong" },
//   { name: "Peaceful", color: "#98FB98", description: "Tranquil and restful" },
//   { name: "Dreamy", color: "#DDA0DD", description: "Ethereal and imaginative" },
//   { name: "Focused", color: "#1E90FF", description: "Clear and determined" },
// ]

// const THREAD_PATTERNS = [
//   { id: "smooth", name: "Smooth", description: "A calm, steady day" },
//   { id: "wavy", name: "Wavy", description: "Ups and downs throughout" },
//   { id: "jagged", name: "Jagged", description: "Chaotic and stressful" },
//   { id: "dotted", name: "Dotted", description: "Scattered moments" },
//   { id: "thick", name: "Thick", description: "Intense and full" },
//   { id: "gradient", name: "Gradient", description: "Transitional feelings" },
// ]

// export default function ThreadCreator({ onSave, onClose, existingThread, darkMode }) {
//   const [selectedColor, setSelectedColor] = useState(existingThread?.color || MOOD_COLORS[0].color)
//   const [secondaryColor, setSecondaryColor] = useState(existingThread?.secondaryColor || MOOD_COLORS[1].color)
//   const [selectedPattern, setSelectedPattern] = useState(existingThread?.pattern || "smooth")
//   const [intensity, setIntensity] = useState(existingThread?.intensity || 5)
//   const [note, setNote] = useState(existingThread?.note || "")
//   const [ambientSound, setAmbientSound] = useState(localStorage.getItem("moodWeaveAmbientSound") === "true")
//   const [audioElement, setAudioElement] = useState(null)
//   const [activeTab, setActiveTab] = useState("color")
//   const [animateIn, setAnimateIn] = useState(false)

//   useEffect(() => {
//     // Trigger entrance animation
//     setTimeout(() => setAnimateIn(true), 50)

//     // Initialize ambient sound
//     const audio = new Audio("/ambient-sound.mp3")
//     audio.volume = 0.2
//     audio.loop = true
//     setAudioElement(audio)

//     if (ambientSound) {
//       audio.play().catch((e) => console.log("Audio autoplay prevented"))
//     }

//     return () => {
//       if (audio) {
//         audio.pause()
//         audio.currentTime = 0
//       }
//     }
//   }, [])

//   useEffect(() => {
//     // Only play sound if user has interacted and audio is enabled
//     if (selectedPattern && ambientSound) {
//       try {
//         const patternSound = new Audio("/ui-click.mp3")
//         patternSound.volume = 0.2
//         patternSound.play().catch(() => {
//           // Silently fail if audio can't play
//         })
//       } catch (error) {
//         // Silently handle audio errors
//       }
//     }
//   }, [selectedPattern, ambientSound])

//   useEffect(() => {
//     // Only play sound if user has interacted and audio is enabled
//     if (selectedColor && ambientSound) {
//       try {
//         const colorSound = new Audio("/color-select.mp3")
//         colorSound.volume = 0.1
//         colorSound.play().catch(() => {
//           // Silently fail if audio can't play
//         })
//       } catch (error) {
//         // Silently handle audio errors
//       }
//     }
//   }, [selectedColor, ambientSound])

//   const toggleAmbientSound = () => {
//     if (audioElement) {
//       if (ambientSound) {
//         audioElement.pause()
//       } else {
//         audioElement.play().catch((e) => console.log("Audio play prevented"))
//       }
//     }

//     setAmbientSound(!ambientSound)
//     localStorage.setItem("moodWeaveAmbientSound", !ambientSound)
//   }

//   const handleSave = () => {
//     // Play save sound only if audio is enabled
//     if (ambientSound) {
//       try {
//         const saveSound = new Audio("/save-sound.mp3")
//         saveSound.volume = 0.3
//         saveSound.play().catch(() => {
//           // Silently fail if audio can't play
//         })
//       } catch (error) {
//         // Silently handle audio errors
//       }
//     }

//     onSave({
//       color: selectedColor,
//       secondaryColor: selectedPattern === "gradient" ? secondaryColor : undefined,
//       pattern: selectedPattern,
//       intensity,
//       note: note.trim(),
//     })
//   }

//   const getPatternStyle = (patternId, color, secondary) => {
//     const baseStyle = {
//       background: color,
//       height: `${intensity * 2 + 4}px`,
//     }

//     switch (patternId) {
//       case "wavy":
//         return {
//           ...baseStyle,
//           backgroundImage:
//             "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)",
//         }
//       case "jagged":
//         return {
//           ...baseStyle,
//           backgroundImage:
//             "repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(255,255,255,0.2) 1px, rgba(255,255,255,0.2) 2px)",
//         }
//       case "dotted":
//         return {
//           ...baseStyle,
//           backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 1px)",
//           backgroundSize: "8px 8px",
//         }
//       case "thick":
//         return {
//           ...baseStyle,
//           height: `${intensity * 3 + 8}px`,
//           boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)",
//         }
//       case "gradient":
//         return {
//           ...baseStyle,
//           background: `linear-gradient(90deg, ${color}, ${secondary || "#ffffff"})`,
//         }
//       default:
//         return baseStyle
//     }
//   }

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-opacity duration-300">
//       <Card
//         className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto border-0 shadow-2xl transition-all duration-500 transform ${animateIn ? "scale-100 opacity-100" : "scale-95 opacity-0"} ${
//           darkMode ? "bg-gray-900 text-white" : "bg-white"
//         }`}
//       >
//         <CardHeader className={`bg-gradient-to-r from-purple-500 to-pink-500 text-white relative overflow-hidden`}>
//           <div className="absolute inset-0 opacity-20">
//             <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.2),transparent_70%)]"></div>
//           </div>
//           <div className="flex items-center justify-between relative z-10">
//             <CardTitle className="text-xl flex items-center gap-2">
//               <Sparkles className="w-5 h-5" />
//               Weave Today's Thread
//             </CardTitle>
//             <div className="flex items-center gap-2">
//               <Button variant="ghost" size="icon" onClick={toggleAmbientSound} className="text-white hover:bg-white/20">
//                 {ambientSound ? <Music className="w-5 h-5" /> : <MusicOff className="w-5 h-5" />}
//               </Button>
//               <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
//                 <X className="w-5 h-5" />
//               </Button>
//             </div>
//           </div>
//         </CardHeader>

//         <CardContent className={`p-6 space-y-8 ${darkMode ? "text-gray-200" : ""}`}>
//           {/* Thread Preview */}
//           <div className="text-center">
//             <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>
//               Your Thread Preview
//             </h3>
//             <div className={`${darkMode ? "bg-gray-800" : "bg-gray-50"} p-6 rounded-lg shadow-inner`}>
//               <div
//                 className="w-full rounded-full shadow-inner transition-all duration-300 transform hover:scale-105"
//                 style={getPatternStyle(selectedPattern, selectedColor, secondaryColor)}
//               />
//             </div>
//           </div>

//           {/* Tabs */}
//           <div className="flex border-b border-gray-200 dark:border-gray-700">
//             <button
//               onClick={() => setActiveTab("color")}
//               className={`px-4 py-2 font-medium text-sm transition-all duration-200 ${
//                 activeTab === "color"
//                   ? darkMode
//                     ? "border-b-2 border-purple-400 text-purple-400"
//                     : "border-b-2 border-purple-500 text-purple-700"
//                   : darkMode
//                     ? "text-gray-400 hover:text-gray-200"
//                     : "text-gray-500 hover:text-gray-700"
//               }`}
//             >
//               Choose Color
//             </button>
//             <button
//               onClick={() => setActiveTab("pattern")}
//               className={`px-4 py-2 font-medium text-sm transition-all duration-200 ${
//                 activeTab === "pattern"
//                   ? darkMode
//                     ? "border-b-2 border-purple-400 text-purple-400"
//                     : "border-b-2 border-purple-500 text-purple-700"
//                   : darkMode
//                     ? "text-gray-400 hover:text-gray-200"
//                     : "text-gray-500 hover:text-gray-700"
//               }`}
//             >
//               Choose Pattern
//             </button>
//             <button
//               onClick={() => setActiveTab("note")}
//               className={`px-4 py-2 font-medium text-sm transition-all duration-200 ${
//                 activeTab === "note"
//                   ? darkMode
//                     ? "border-b-2 border-purple-400 text-purple-400"
//                     : "border-b-2 border-purple-500 text-purple-700"
//                   : darkMode
//                     ? "text-gray-400 hover:text-gray-200"
//                     : "text-gray-500 hover:text-gray-700"
//               }`}
//             >
//               Add Note
//             </button>
//           </div>

//           {/* Tab Content */}
//           <div className="transition-all duration-300">
//             {activeTab === "color" && (
//               <div className="space-y-6 animate-fade-in">
//                 <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>
//                   Choose Your Mood Color
//                 </h3>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                   {MOOD_COLORS.map((mood) => (
//                     <button
//                       key={mood.color}
//                       onClick={() => setSelectedColor(mood.color)}
//                       className={`p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
//                         selectedColor === mood.color
//                           ? darkMode
//                             ? "border-purple-400 shadow-lg bg-gray-800"
//                             : "border-purple-500 shadow-lg"
//                           : darkMode
//                             ? "border-gray-700 hover:border-gray-600"
//                             : "border-gray-200 hover:border-gray-300"
//                       }`}
//                     >
//                       <div
//                         className="w-10 h-10 rounded-full mx-auto mb-2 shadow-inner transform hover:rotate-12 transition-transform duration-300"
//                         style={{ backgroundColor: mood.color }}
//                       />
//                       <div className={`text-xs font-medium ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
//                         {mood.name}
//                       </div>
//                       <div className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
//                         {mood.description}
//                       </div>
//                     </button>
//                   ))}
//                 </div>

//                 {selectedPattern === "gradient" && (
//                   <div className="mt-6 animate-fade-in">
//                     <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>
//                       Choose Secondary Color
//                     </h3>
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                       {MOOD_COLORS.map((mood) => (
//                         <button
//                           key={mood.color}
//                           onClick={() => setSecondaryColor(mood.color)}
//                           className={`p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
//                             secondaryColor === mood.color
//                               ? darkMode
//                                 ? "border-purple-400 shadow-lg bg-gray-800"
//                                 : "border-purple-500 shadow-lg"
//                               : darkMode
//                                 ? "border-gray-700 hover:border-gray-600"
//                                 : "border-gray-200 hover:border-gray-300"
//                           }`}
//                         >
//                           <div
//                             className="w-10 h-10 rounded-full mx-auto mb-2 shadow-inner"
//                             style={{ backgroundColor: mood.color }}
//                           />
//                           <div className={`text-xs font-medium ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
//                             {mood.name}
//                           </div>
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}

//             {activeTab === "pattern" && (
//               <div className="space-y-6 animate-fade-in">
//                 <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>
//                   Choose Your Day's Pattern
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                   {THREAD_PATTERNS.map((pattern) => (
//                     <button
//                       key={pattern.id}
//                       onClick={() => setSelectedPattern(pattern.id)}
//                       className={`p-4 rounded-lg border-2 text-left transition-all duration-200 hover:scale-105 ${
//                         selectedPattern === pattern.id
//                           ? darkMode
//                             ? "border-purple-400 shadow-lg bg-gray-800"
//                             : "border-purple-500 shadow-lg bg-purple-50"
//                           : darkMode
//                             ? "border-gray-700 hover:border-gray-600"
//                             : "border-gray-200 hover:border-gray-300"
//                       }`}
//                     >
//                       <div className="flex items-center gap-3">
//                         <div
//                           className="w-16 h-6 rounded-full shadow-inner flex-shrink-0 transform hover:scale-110 transition-transform duration-300"
//                           style={getPatternStyle(pattern.id, selectedColor, secondaryColor)}
//                         />
//                         <div>
//                           <div className={`font-medium ${darkMode ? "text-white" : "text-gray-800"}`}>
//                             {pattern.name}
//                           </div>
//                           <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
//                             {pattern.description}
//                           </div>
//                         </div>
//                       </div>
//                     </button>
//                   ))}
//                 </div>

//                 {/* Intensity Slider */}
//                 <div className="mt-8">
//                   <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>
//                     Emotional Intensity: {intensity}/10
//                   </h3>
//                   <input
//                     type="range"
//                     min="1"
//                     max="10"
//                     value={intensity}
//                     onChange={(e) => setIntensity(Number.parseInt(e.target.value))}
//                     className="w-full h-3 rounded-lg appearance-none cursor-pointer slider"
//                     style={{
//                       background: `linear-gradient(to right, ${selectedColor} 0%, ${selectedColor} ${intensity * 10}%, ${
//                         darkMode ? "#374151" : "#e5e7eb"
//                       } ${intensity * 10}%, ${darkMode ? "#374151" : "#e5e7eb"} 100%)`,
//                     }}
//                   />
//                   <div className={`flex justify-between text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
//                     <span>Gentle</span>
//                     <span>Intense</span>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {activeTab === "note" && (
//               <div className="space-y-6 animate-fade-in">
//                 <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>
//                   Optional Note{" "}
//                   <span className={`text-sm font-normal ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
//                     (private)
//                   </span>
//                 </h3>
//                 <Textarea
//                   placeholder="Add a private note about today (optional)..."
//                   value={note}
//                   onChange={(e) => setNote(e.target.value)}
//                   className={`resize-none ${darkMode ? "bg-gray-800 border-gray-700 text-white" : ""}`}
//                   rows={5}
//                 />
//                 <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
//                   Your note is private and helps you remember the context of this day's emotions.
//                 </p>
//               </div>
//             )}
//           </div>

//           {/* Save Button */}
//           <Button
//             onClick={handleSave}
//             className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
//             size="lg"
//           >
//             {Save && <Save className="w-5 h-5 mr-2" />}
//             Weave This Thread
//           </Button>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { X, Save, Sparkles, Music, MicOffIcon as MusicOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

const MOOD_COLORS = [
  { name: "Joyful", color: "#FFD700", description: "Bright and sunny" },
  { name: "Calm", color: "#87CEEB", description: "Peaceful and serene" },
  { name: "Energetic", color: "#FF6347", description: "Vibrant and active" },
  { name: "Melancholy", color: "#4682B4", description: "Thoughtful and blue" },
  { name: "Passionate", color: "#DC143C", description: "Intense and fiery" },
  { name: "Balanced", color: "#32CD32", description: "Harmonious and stable" },
  { name: "Mysterious", color: "#9370DB", description: "Deep and contemplative" },
  { name: "Gentle", color: "#FFB6C1", description: "Soft and tender" },
  { name: "Bold", color: "#FF4500", description: "Confident and strong" },
  { name: "Peaceful", color: "#98FB98", description: "Tranquil and restful" },
  { name: "Dreamy", color: "#DDA0DD", description: "Ethereal and imaginative" },
  { name: "Focused", color: "#1E90FF", description: "Clear and determined" },
]

const THREAD_PATTERNS = [
  { id: "smooth", name: "Smooth", description: "A calm, steady day" },
  { id: "wavy", name: "Wavy", description: "Ups and downs throughout" },
  { id: "jagged", name: "Jagged", description: "Chaotic and stressful" },
  { id: "dotted", name: "Dotted", description: "Scattered moments" },
  { id: "thick", name: "Thick", description: "Intense and full" },
  { id: "gradient", name: "Gradient", description: "Transitional feelings" },
]

export default function ThreadCreator({ onSave, onClose, existingThread, darkMode }) {
  const [selectedColor, setSelectedColor] = useState(existingThread?.color || MOOD_COLORS[0].color)
  const [secondaryColor, setSecondaryColor] = useState(existingThread?.secondaryColor || MOOD_COLORS[1].color)
  const [selectedPattern, setSelectedPattern] = useState(existingThread?.pattern || "smooth")
  const [intensity, setIntensity] = useState(existingThread?.intensity || 5)
  const [note, setNote] = useState(existingThread?.note || "")
  const [ambientSound, setAmbientSound] = useState(localStorage.getItem("moodWeaveAmbientSound") === "true")
  const [audioElement, setAudioElement] = useState(null)
  const [activeTab, setActiveTab] = useState("color")
  const [animateIn, setAnimateIn] = useState(false)

  useEffect(() => {
    // Trigger entrance animation
    setTimeout(() => setAnimateIn(true), 50)

    // Initialize ambient sound
    const audio = new Audio("/ambient-sound.mp3")
    audio.volume = 0.2
    audio.loop = true
    setAudioElement(audio)

    if (ambientSound) {
      audio.play().catch((e) => console.log("Audio autoplay prevented"))
    }

    return () => {
      if (audio) {
        audio.pause()
        audio.currentTime = 0
      }
    }
  }, [])

  useEffect(() => {
    // Only play sound if user has interacted and audio is enabled
    if (selectedPattern && ambientSound) {
      try {
        const patternSound = new Audio("/ui-click.mp3")
        patternSound.volume = 0.2
        patternSound.play().catch(() => {
          // Silently fail if audio can't play
        })
      } catch (error) {
        // Silently handle audio errors
      }
    }
  }, [selectedPattern, ambientSound])

  useEffect(() => {
    // Only play sound if user has interacted and audio is enabled
    if (selectedColor && ambientSound) {
      try {
        const colorSound = new Audio("/color-select.mp3")
        colorSound.volume = 0.1
        colorSound.play().catch(() => {
          // Silently fail if audio can't play
        })
      } catch (error) {
        // Silently handle audio errors
      }
    }
  }, [selectedColor, ambientSound])

  const toggleAmbientSound = () => {
    if (audioElement) {
      if (ambientSound) {
        audioElement.pause()
      } else {
        audioElement.play().catch((e) => console.log("Audio play prevented"))
      }
    }

    setAmbientSound(!ambientSound)
    localStorage.setItem("moodWeaveAmbientSound", !ambientSound)
  }

  const handleSave = () => {
    // Play save sound only if audio is enabled
    if (ambientSound) {
      try {
        const saveSound = new Audio("/save-sound.mp3")
        saveSound.volume = 0.3
        saveSound.play().catch(() => {
          // Silently fail if audio can't play
        })
      } catch (error) {
        // Silently handle audio errors
      }
    }

    onSave({
      color: selectedColor,
      secondaryColor: selectedPattern === "gradient" ? secondaryColor : undefined,
      pattern: selectedPattern,
      intensity,
      note: note.trim(),
    })
  }

  const getPatternStyle = (patternId, color, secondary) => {
    const baseStyle = {
      backgroundColor: color,
      height: `${intensity * 2 + 4}px`,
    }

    switch (patternId) {
      case "wavy":
        return {
          ...baseStyle,
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)",
        }
      case "jagged":
        return {
          ...baseStyle,
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(255,255,255,0.2) 1px, rgba(255,255,255,0.2) 2px)",
        }
      case "dotted":
        return {
          ...baseStyle,
          backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "8px 8px",
        }
      case "thick":
        return {
          ...baseStyle,
          height: `${intensity * 3 + 8}px`,
          boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)",
        }
      case "gradient":
        return {
          ...baseStyle,
          backgroundColor: "transparent",
          backgroundImage: `linear-gradient(90deg, ${color}, ${secondary || "#ffffff"})`,
        }
      default:
        return baseStyle
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-opacity duration-300">
      <Card
        className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto border-0 shadow-2xl transition-all duration-500 transform ${animateIn ? "scale-100 opacity-100" : "scale-95 opacity-0"} ${
          darkMode ? "bg-gray-900 text-white" : "bg-white"
        }`}
      >
        <CardHeader className={`bg-gradient-to-r from-purple-500 to-pink-500 text-white relative overflow-hidden`}>
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.2),transparent_70%)]"></div>
          </div>
          <div className="flex items-center justify-between relative z-10">
            <CardTitle className="text-xl flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Weave Today's Thread
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={toggleAmbientSound} className="text-white hover:bg-white/20">
                {ambientSound ? <Music className="w-5 h-5" /> : <MusicOff className="w-5 h-5" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className={`p-6 space-y-8 ${darkMode ? "text-gray-200" : ""}`}>
          {/* Thread Preview */}
          <div className="text-center">
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>
              Your Thread Preview
            </h3>
            <div className={`${darkMode ? "bg-gray-800" : "bg-gray-50"} p-6 rounded-lg shadow-inner`}>
              <div
                className="w-full rounded-full shadow-inner transition-all duration-300 transform hover:scale-105"
                style={getPatternStyle(selectedPattern, selectedColor, secondaryColor)}
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab("color")}
              className={`px-4 py-2 font-medium text-sm transition-all duration-200 ${
                activeTab === "color"
                  ? darkMode
                    ? "border-b-2 border-purple-400 text-purple-400"
                    : "border-b-2 border-purple-500 text-purple-700"
                  : darkMode
                    ? "text-gray-400 hover:text-gray-200"
                    : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Choose Color
            </button>
            <button
              onClick={() => setActiveTab("pattern")}
              className={`px-4 py-2 font-medium text-sm transition-all duration-200 ${
                activeTab === "pattern"
                  ? darkMode
                    ? "border-b-2 border-purple-400 text-purple-400"
                    : "border-b-2 border-purple-500 text-purple-700"
                  : darkMode
                    ? "text-gray-400 hover:text-gray-200"
                    : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Choose Pattern
            </button>
            <button
              onClick={() => setActiveTab("note")}
              className={`px-4 py-2 font-medium text-sm transition-all duration-200 ${
                activeTab === "note"
                  ? darkMode
                    ? "border-b-2 border-purple-400 text-purple-400"
                    : "border-b-2 border-purple-500 text-purple-700"
                  : darkMode
                    ? "text-gray-400 hover:text-gray-200"
                    : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Add Note
            </button>
          </div>

          {/* Tab Content */}
          <div className="transition-all duration-300">
            {activeTab === "color" && (
              <div className="space-y-6 animate-fade-in">
                <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>
                  Choose Your Mood Color
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {MOOD_COLORS.map((mood) => (
                    <button
                      key={mood.color}
                      onClick={() => setSelectedColor(mood.color)}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                        selectedColor === mood.color
                          ? darkMode
                            ? "border-purple-400 shadow-lg bg-gray-800"
                            : "border-purple-500 shadow-lg"
                          : darkMode
                            ? "border-gray-700 hover:border-gray-600"
                            : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div
                        className="w-10 h-10 rounded-full mx-auto mb-2 shadow-inner transform hover:rotate-12 transition-transform duration-300"
                        style={{ backgroundColor: mood.color }}
                      />
                      <div className={`text-xs font-medium ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                        {mood.name}
                      </div>
                      <div className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        {mood.description}
                      </div>
                    </button>
                  ))}
                </div>

                {selectedPattern === "gradient" && (
                  <div className="mt-6 animate-fade-in">
                    <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>
                      Choose Secondary Color
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {MOOD_COLORS.map((mood) => (
                        <button
                          key={mood.color}
                          onClick={() => setSecondaryColor(mood.color)}
                          className={`p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                            secondaryColor === mood.color
                              ? darkMode
                                ? "border-purple-400 shadow-lg bg-gray-800"
                                : "border-purple-500 shadow-lg"
                              : darkMode
                                ? "border-gray-700 hover:border-gray-600"
                                : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div
                            className="w-10 h-10 rounded-full mx-auto mb-2 shadow-inner"
                            style={{ backgroundColor: mood.color }}
                          />
                          <div className={`text-xs font-medium ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                            {mood.name}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "pattern" && (
              <div className="space-y-6 animate-fade-in">
                <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>
                  Choose Your Day's Pattern
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {THREAD_PATTERNS.map((pattern) => (
                    <button
                      key={pattern.id}
                      onClick={() => setSelectedPattern(pattern.id)}
                      className={`p-4 rounded-lg border-2 text-left transition-all duration-200 hover:scale-105 ${
                        selectedPattern === pattern.id
                          ? darkMode
                            ? "border-purple-400 shadow-lg bg-gray-800"
                            : "border-purple-500 shadow-lg bg-purple-50"
                          : darkMode
                            ? "border-gray-700 hover:border-gray-600"
                            : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-16 h-6 rounded-full shadow-inner flex-shrink-0 transform hover:scale-110 transition-transform duration-300"
                          style={getPatternStyle(pattern.id, selectedColor, secondaryColor)}
                        />
                        <div>
                          <div className={`font-medium ${darkMode ? "text-white" : "text-gray-800"}`}>
                            {pattern.name}
                          </div>
                          <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                            {pattern.description}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Intensity Slider */}
                <div className="mt-8">
                  <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>
                    Emotional Intensity: {intensity}/10
                  </h3>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={intensity}
                    onChange={(e) => setIntensity(Number.parseInt(e.target.value))}
                    className="w-full h-3 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, ${selectedColor} 0%, ${selectedColor} ${intensity * 10}%, ${
                        darkMode ? "#374151" : "#e5e7eb"
                      } ${intensity * 10}%, ${darkMode ? "#374151" : "#e5e7eb"} 100%)`,
                    }}
                  />
                  <div className={`flex justify-between text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    <span>Gentle</span>
                    <span>Intense</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "note" && (
              <div className="space-y-6 animate-fade-in">
                <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>
                  Optional Note{" "}
                  <span className={`text-sm font-normal ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    (private)
                  </span>
                </h3>
                <Textarea
                  placeholder="Add a private note about today (optional)..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className={`resize-none ${darkMode ? "bg-gray-800 border-gray-700 text-white" : ""}`}
                  rows={5}
                />
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  Your note is private and helps you remember the context of this day's emotions.
                </p>
              </div>
            )}
          </div>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            size="lg"
          >
            {Save && <Save className="w-5 h-5 mr-2" />}
            Weave This Thread
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}