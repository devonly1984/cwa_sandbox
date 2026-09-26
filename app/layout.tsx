import { ClerkProvider } from "@clerk/nextjs"
import { shadcn } from "@clerk/ui/themes"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { fontMono, geist } from "@/lib/constants/fonts"
import { cn } from "@/lib/utils"
import { Metadata } from "next"
import { ReactNode } from "react"

export const metadata: Metadata = {
  title: {
    default: "Sandbox - Build 3D games with AI",
    template: "%s - Sandbox",
  },
  description:
    "Describe a game and watch it come to life. Sandbox is an agentic three.js game builder that plans the scene, writes the code, and streams playable worlds from plain English.",
}
const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode
}>) => {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <body>
        <ClerkProvider appearance={{ theme: shadcn }}>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
export default RootLayout
