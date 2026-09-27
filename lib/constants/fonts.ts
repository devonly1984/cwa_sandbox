import { Fraunces, Geist, Geist_Mono } from "next/font/google"

export const geist = Geist({subsets:['latin'],variable:'--font-sans'})

export const fontLogo = Fraunces({
  subsets: ["latin"],
  variable: "--font-logo",
})

export const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})