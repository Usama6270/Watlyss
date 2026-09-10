import { SanityLive } from '@/sanity/live';
import { VisualEditing } from 'next-sanity/visual-editing';
import { draftMode } from 'next/headers';
import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from 'next/script';
import "./globals.css";
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/context/auth';
import { CartProvider } from '@/context/cart';
import { LanguageProvider } from '@/context/language';

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
                <SanityLive />
                {isDraftMode && <VisualEditing />}
                <Script id="tawk-to" strategy="lazyOnload">
                  {`
                    var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
                    (function(){
                      var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                      s1.async=true;
                      s1.src='https://embed.tawk.to/6aa06c225914873442c8ff55/1k21acq8d';
                      s1.charset='UTF-8';
                      s1.setAttribute('crossorigin','*');
                      s0.parentNode.insertBefore(s1,s0);
                    })();
                  `}
                </Script>
              </CartProvider>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
