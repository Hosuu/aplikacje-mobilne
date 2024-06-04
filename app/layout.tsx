import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Head from "next/head"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "WroKawka",
  description: "Pieknie dzis wygladasz :3",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='pl'>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0, viewport-fit=cover' />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
