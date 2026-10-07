'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/language'

export function LanguageToggle({ className = '' }: { className?: string }) {
  const { language, setLanguage } = useLanguage()
  const isUrdu = language === 'ur'

  const toggleLanguage = () => {
    setLanguage(isUrdu ? 'en' : 'ur')
  }

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label="Toggle language between English and Urdu"
      className={`relative flex items-center bg-muted p-0.5 sm:p-1 rounded-full cursor-pointer select-none border border-border h-7 w-16 sm:h-8 sm:w-20 z-50 pointer-events-auto touch-manipulation focus:outline-none ${className}`}
    >
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        className={`absolute top-0.5 bottom-0.5 sm:top-1 sm:bottom-1 w-7 sm:w-9 bg-card rounded-full shadow-sm ${
          isUrdu ? 'right-0.5 sm:right-1' : 'left-0.5 sm:left-1'
        }`}
      />

      <div className="relative z-10 flex w-full justify-between items-center px-1 text-[10px] sm:text-xs font-bold">
        <span
          className={`transition-colors duration-200 ${
            !isUrdu ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          EN
        </span>
        <span
          className={`font-urdu text-[10px] sm:text-[11px] transition-colors duration-200 ${
            isUrdu ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          اردو
        </span>
      </div>
    </button>
  )
}
