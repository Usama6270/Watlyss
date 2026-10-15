'use client'

import React, { useEffect, useState } from 'react'
import { useTheme } from '@/components/theme-provider'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className={`w-8 h-8 flex items-center justify-center ${className}`}>
        <div className="w-4 h-4 rounded-full bg-muted animate-pulse" />
      </div>
    )
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring touch-manipulation dark:hover:bg-[var(--bg-raised)] dark:hover:text-white ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? 'dark' : 'light'}
          initial={{ opacity: 0, rotate: isDark ? -90 : 90, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: isDark ? 90 : -90, scale: 0.5 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="absolute flex items-center justify-center"
        >
          {isDark ? (
            <Sun size={18} className="text-warning" />
          ) : (
            <Moon size={18} className="text-foreground/70" />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  )
}
