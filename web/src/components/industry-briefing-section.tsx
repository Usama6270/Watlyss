'use client'

import React from 'react'
import NewsletterBubbleUniverse from '@/components/newsletter-bubble-universe'

export default function IndustryBriefingSection() {
  return (
    <section 
      id="industry-briefing" 
      className="w-full py-8 sm:py-16 bg-[#FAF9F6] dark:bg-[#0a1128] border-t border-slate-200/80 dark:border-slate-800/60 font-sans transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <NewsletterBubbleUniverse />
      </div>
    </section>
  )
}
