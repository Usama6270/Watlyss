'use client'

import { useEffect } from 'react'
import { useTheme } from '@/components/theme-provider'

const LIGHT = '#F7FBFE'
const DARK = '#0B2A4A'

/** Keeps <meta name="theme-color"> in sync with the active theme. */
export function ThemeColorMeta() {
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const color = resolvedTheme === 'dark' ? DARK : LIGHT
    let meta = document.querySelector('meta[name="theme-color"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'theme-color')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', color)
    document.documentElement.style.colorScheme =
      resolvedTheme === 'dark' ? 'dark' : 'light'
  }, [resolvedTheme])

  return null
}
