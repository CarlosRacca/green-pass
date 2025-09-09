import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { MainLayout } from "@/components/layout/main-layout"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Green Pass - Plataforma de Golf Premium",
  description: "Plataforma de gestión para viajes y torneos de golf premium",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <MainLayout>{children}</MainLayout>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
