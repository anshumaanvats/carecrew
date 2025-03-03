import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "./components/Header"
import Footer from "./components/Footer"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "CARECREW",
  description: "Revolutionizing mobility with cutting-edge technology and seamless control.",
  generator: "Next.js",
  keywords: [
    "OmniMate Wheelchair",
    "Smart Wheelchair",
    "Mobility Device",
    "Gesture Control",
    "Accessibility Tech",
  ],
  authors: [{ name: "CARECREW", url: "https://carecrew.vercel.app" }],
  icons: {
    icon: "/logo.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "OmniMate Wheelchair",
    description: "Experience next-level mobility with smart control and real-time tracking.",
    images: ["/og-image.jpg"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css' 