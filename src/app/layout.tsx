import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Analytics from '@/components/layout/Analytics'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://prakritifoods.in'),
  title: {
    default: 'Prakriti Foods — Pure. Natural. Trusted.',
    template: '%s | Prakriti Foods',
  },
  description:
    'Prakriti Foods brings you farm-fresh pulses, spices, and natural food products — sourced directly, delivered purely.',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://prakritifoods.in',
    siteName: 'Prakriti Foods',
    title: 'Prakriti Foods — Pure. Natural. Trusted.',
    description:
      'Farm-fresh pulses, spices, and natural food products. Sourced directly, delivered purely.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prakriti Foods',
    description: 'Pure. Natural. Trusted.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-inter bg-cream text-charcoal antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster position="top-right" richColors />
        <Analytics />
      </body>
    </html>
  )
}
