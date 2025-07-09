import { Montserrat } from "next/font/google"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
})

export const metadata = {
  title: "Mood Weave - Visual Emotional Journal",
  description: "A unique journaling app where you weave your emotions into a beautiful tapestry with ancient symbols",
  keywords: "mood journal, emotional tracking, visual journal, tapestry, non-verbal journal, ancient symbols",
  authors: [{ name: "Mood Weave" }],
}

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f3ff" },
    { media: "(prefers-color-scheme: dark)", color: "#1e1b4b" },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
