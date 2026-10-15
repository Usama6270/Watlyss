import { Noto_Nastaliq_Urdu, Noto_Sans_Arabic } from 'next/font/google'
import { SanityLive } from '@/sanity/live'
import { VisualEditing } from 'next-sanity/visual-editing'
import { cookies, draftMode } from 'next/headers'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Script from 'next/script'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { ThemeColorMeta } from '@/components/theme-color-meta'
import { DocumentMeta } from '@/components/document-meta'
import { AuthProvider } from '@/context/auth'
import { CartProvider } from '@/context/cart'
import { LanguageProvider } from '@/context/language'
import LazyGlobalWidgets from '@/components/lazy-global-widgets'
import { UrduSuggestHint } from '@/components/urdu-suggest-hint'
import { isLocale, type Locale, DEFAULT_LOCALE } from '@/lib/i18n'

/** Velocity Sans Medium only (usWeightClass 500) — single master, no bold/italic. */
const velocitySans = localFont({
  src: [
    {
      path: '../fonts/Velocity-Sans.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-velocity',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
  adjustFontFallback: 'Arial',
})

/** Nastaliq for Urdu display / hero headings. */
const notoNastaliqUrdu = Noto_Nastaliq_Urdu({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-noto-nastaliq',
  display: 'swap',
  preload: false,
})

/** Naskh for Urdu UI (nav, buttons, body, forms). */
const notoSansArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-naskh',
  display: 'swap',
  preload: false,
})

export const metadata: Metadata = {
  title: 'Watlys — Premium 19L Mineral Water Delivery in Pakistan',
  description:
    "Watlys delivers premium 19L mineral water sourced from protected mountain aquifers to homes, hostels, and offices across Lahore, Karachi & Islamabad.",
  openGraph: {
    title: 'Watlys — Pure Hydration, Delivered',
    description:
      "Pakistan's premium 19L mineral water subscription. Lab-tested purity, flexible plans, doorstep delivery.",
    locale: 'en_PK',
    alternateLocale: ['ur_PK'],
  },
  alternates: {
    languages: {
      en: '/',
      ur: '/',
      'x-default': '/',
    },
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const isDraftMode = (await draftMode()).isEnabled
  const cookieStore = await cookies()
  const cookieLang = cookieStore.get('watlys_lang')?.value
  const initialLocale: Locale = isLocale(cookieLang) ? cookieLang : DEFAULT_LOCALE
  const isUr = initialLocale === 'ur'

  return (
    <html
      lang={initialLocale}
      dir={isUr ? 'rtl' : 'ltr'}
      className={`${velocitySans.variable} ${notoNastaliqUrdu.variable} ${notoSansArabic.variable} h-full antialiased${isUr ? ' font-urdu' : ''}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content="#F7FBFE" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0B2A4A" media="(prefers-color-scheme: dark)" />
        <meta property="og:locale" content={isUr ? 'ur_PK' : 'en_PK'} />
        <meta property="og:locale:alternate" content={isUr ? 'en_PK' : 'ur_PK'} />
        <link rel="alternate" hrefLang="en" href="/" />
        <link rel="alternate" hrefLang="ur" href="/" />
        <link rel="alternate" hrefLang="x-default" href="/" />
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
        className={`${velocitySans.className} flex min-h-full flex-col overflow-x-clip bg-background font-sans text-foreground transition-colors duration-300`}
        suppressHydrationWarning
      >
        {/* External boot script — avoids React 19 inline-<script> console error */}
        <Script src="/watlys-boot.js" strategy="beforeInteractive" />
        <ThemeProvider>
          <ThemeColorMeta />
          <LanguageProvider initialLocale={initialLocale}>
            <DocumentMeta />
            <UrduSuggestHint />
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
