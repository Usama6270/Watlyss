'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

/**
 * Watlys theme: system preference by default, manual override persisted.
 * Uses class strategy (.dark) so CSS variables swap automatically.
 *
 * React 19 / Next 16: next-themes injects an inline <script>. Marking it as
 * application/json stops the "Encountered a script tag" console error.
 * Theme flash is handled by /public/watlys-boot.js instead.
 */
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      storageKey="watlys-theme"
      disableTransitionOnChange={false}
      scriptProps={{ type: 'application/json' }}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}

export { useTheme } from 'next-themes'
