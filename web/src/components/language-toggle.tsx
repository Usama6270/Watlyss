'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/language'

export function LanguageToggle({ className = '' }: { className?: string }) {
  const { language, setLanguage, t } = useLanguage()
  const isUrdu = language === 'ur'

  return (
    <button
      type="button"
      onClick={() => setLanguage(isUrdu ? 'en' : 'ur')}
      aria-label={t.nav.languageToggle}
      aria-pressed={isUrdu}
      className={`relative z-50 flex h-7 w-16 cursor-pointer touch-manipulation select-none items-center rounded-full border border-border bg-muted p-0.5 pointer-events-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 sm:h-8 sm:w-20 sm:p-1 ${className}`}
    >
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        className="absolute top-0.5 bottom-0.5 w-7 rounded-full bg-card shadow-sm sm:top-1 sm:bottom-1 sm:w-9"
        style={{
          insetInlineStart: isUrdu ? 'auto' : '0.125rem',
          insetInlineEnd: isUrdu ? '0.125rem' : 'auto',
        }}
      />

      <div className="relative z-10 flex w-full items-center justify-between px-1 text-[10px] font-bold sm:text-xs">
        <span
          className={`font-latin transition-colors duration-200 ${
            !isUrdu ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          EN
        </span>
        <span
          className={`font-urdu text-[10px] transition-colors duration-200 sm:text-[11px] ${
            isUrdu ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          اردو
        </span>
      </div>
    </button>
  )
}
