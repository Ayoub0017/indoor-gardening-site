import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  metadataBase: new URL('https://justindoorgardens.com'),
  title: 'Indoor Gardens - Your Guide to Indoor Gardening',
  description: 'Discover the joy of indoor gardening with expert tips, plant care guides, and inspiration for your green space.',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn(inter.variable, "font-sans antialiased bg-background text-foreground min-h-screen flex flex-col")}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-6QYKGL8R68"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-6QYKGL8R68');
          `}
        </Script>
        <Header />
        <main className="flex-grow pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
