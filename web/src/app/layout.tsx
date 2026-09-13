import { SanityLive } from '@/sanity/live';
import { VisualEditing } from 'next-sanity/visual-editing';
import { draftMode } from 'next/headers';
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/context/auth';
import { CartProvider } from '@/context/cart';
import { LanguageProvider } from '@/context/language';
import TawkWidget from '@/components/tawk-widget';
import AuthModal from '@/components/auth-modal';

const velocitySans = localFont({
  src: '../fonts/Velocity-Sans.otf',
  variable: '--font-velocity-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Watlys | Premium Mineral Water Bottle",
  description: "Experience the cleanest, most refreshing mineral water in a beautifully crafted container.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const isDraftMode = (await draftMode()).isEnabled;

  return (
    <html
      lang="en"
      className={`${velocitySans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect for external assets to accelerate DNS & TLS handshakes */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://cdn.sanity.io" />
      </head>
      <body
        className="min-h-full flex flex-col bg-[#FAF9F6] dark:bg-[#0a1128] text-slate-900 dark:text-[#FAFAFA] font-sans transition-colors duration-300"
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <LanguageProvider>
            <AuthProvider>
              <CartProvider>
                {children}
                <AuthModal />
                <SanityLive />
                {isDraftMode && <VisualEditing />}
                <TawkWidget />
              </CartProvider>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
