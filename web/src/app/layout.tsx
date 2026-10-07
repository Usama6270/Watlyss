import { Fraunces, Noto_Nastaliq_Urdu } from 'next/font/google'
import { SanityLive } from '@/sanity/live'
import { VisualEditing } from 'next-sanity/visual-editing'
import { draftMode } from 'next/headers'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/context/auth'
import { CartProvider } from '@/context/cart'
import { LanguageProvider } from '@/context/language'
import LazyGlobalWidgets from '@/components/lazy-global-widgets'

const velocitySans = localFont({
  src: '../fonts/Velocity-Sans.otf',
  variable: '--font-velocity-sans',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-fraunces',
  display: 'swap',
})

// Urdu font: preload false so EN-first paint isn't blocked by a large Arabic face
const notoNastaliqUrdu = Noto_Nastaliq_Urdu({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-noto-nastaliq',
  display: 'swap',
  preload: false,
})

export const metadata: Metadata = {
  title: 'Watlys | Premium Mineral Water Bottle',
  description:
    'Experience the cleanest, most refreshing mineral water in a beautifully crafted container.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const isDraftMode = (await draftMode()).isEnabled

  return (
    <html
      lang="en"
      className={`${velocitySans.variable} ${fraunces.variable} ${notoNastaliqUrdu.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <link
          rel="preload"
          as="image"
          href="/frames/ezgif-frame-001.webp"
          fetchPriority="high"
        />
      </head>
      <body
        className="min-h-full flex flex-col overflow-x-clip bg-background text-foreground font-sans transition-colors duration-300"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <CartProvider>
                {children}
                <SanityLive />
                {isDraftMode && <VisualEditing />}
                <LazyGlobalWidgets />
              </CartProvider>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
