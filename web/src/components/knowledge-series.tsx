'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useLanguage } from '@/context/language'
import { ArrowUpRight } from 'lucide-react'

interface Article {
  id: string
  slug: string
  title: string
  category: 'industry' | 'beauty' | 'health' | 'who' | 'policy'
  excerpt: string
  date: string
}

const ARTICLES: Article[] = [
  { id: '1', slug: 'who-guidelines-on-mineral-drinkability', title: 'WHO Guidelines on Mineral Drinkability', category: 'who', excerpt: 'Deep analysis of mineral levels, safety parameters, and physiological hydration benefits of alkaline sources.', date: 'August 24, 2026' },
  { id: '2', slug: 'water-hydration-and-skin-glow-chemistry', title: 'Water Hydration & Skin Glow Chemistry', category: 'beauty', excerpt: 'How trace silica and structural cellular hydration keeps skin supple and prevents oxidative stress.', date: 'August 18, 2026' },
  { id: '3', slug: 'pakistan-national-water-policy-review', title: 'Pakistan National Water Policy Review', category: 'policy', excerpt: 'A detailed overview of clean aquifers, sustainable pumping thresholds, and packaging carbon policies.', date: 'August 10, 2026' },
  { id: '4', slug: 'volcanic-geological-filtration-phases', title: 'Volcanic Geological Filtration Phases', category: 'industry', excerpt: 'How natural mineral composition takes decades to filter through layers of underground stones.', date: 'July 28, 2026' },
  { id: '5', slug: 'preventing-joint-inflammation-with-alkaline-ph', title: 'Preventing Joint Inflammation with Alkaline pH', category: 'health', excerpt: 'Scientific studies showing the correlation of pH 7.8 and neutralization of lactic acid buildup.', date: 'July 15, 2026' },
  { id: '6', slug: 'microplastics-and-beverage-glass-integrity', title: 'Microplastics & Beverage Glass Integrity', category: 'who', excerpt: 'Comparing glass containers to single-use PET bottles and microplastic filtration thresholds.', date: 'July 05, 2026' },
]

export default function KnowledgeSeries() {
  const { t, isRtl } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const categories = [
    { label: isRtl ? 'تمام موضوعات' : 'All Topics', id: 'all' },
    { label: isRtl ? 'عالمی ادارہ صحت' : 'WHO Studies', id: 'who' },
    { label: isRtl ? 'خوبصورتی' : 'Beauty', id: 'beauty' },
    { label: isRtl ? 'پالیسی' : 'Policy', id: 'policy' },
    { label: isRtl ? 'صحت' : 'Health', id: 'health' },
    { label: isRtl ? 'تحقیق' : 'Industry', id: 'industry' },
  ]

  const filteredArticles = selectedCategory === 'all'
    ? ARTICLES
    : ARTICLES.filter(art => art.category === selectedCategory)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
    setTimeout(() => {
      setEmail('')
    }, 2000)
  }

  return (
    <section id="newsletter" className="py-12 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto w-full border-t border-zinc-200/30 dark:border-slate-800/60 bg-[#FAF9F6] dark:bg-[#0b1329] text-[#111111] dark:text-[#f8fafc] transition-colors duration-300">

      {/* Editorial Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 sm:gap-8 mb-10 sm:mb-16">
        <div className="space-y-3 sm:space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#0064D0]">
            WATLYS JOURNAL & RESEARCH
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold tracking-wide text-zinc-900 dark:text-white leading-tight">
            Knowledge & Purity Science.
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-slate-200 font-light max-w-md">
            Explore scientific findings, WHO mineral standards, and water safety policies.
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap gap-3 pt-4 border-b border-zinc-100 dark:border-slate-800 pb-1 font-sans">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`pb-1 text-[10px] uppercase tracking-widest font-semibold transition-all cursor-pointer border-b ${selectedCategory === cat.id
                ? 'border-zinc-950 dark:border-white text-[#111111] dark:text-[#FAFAFA]'
                : 'border-transparent text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {filteredArticles.map((art) => (
          <article
            key={art.id}
            className="group flex flex-col bg-white dark:bg-[#162447]/90 border border-zinc-200/40 dark:border-slate-700/60 p-6 sm:p-8 rounded-2xl transition-all duration-300 hover:border-[#0064D0] shadow-lg shadow-black/10"
          >
            <div className="flex justify-between items-baseline mb-6 font-sans">
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#0064D0] dark:text-sky-400">
                {art.category.toUpperCase()}
              </span>
              <span className="text-[9px] text-zinc-400 dark:text-slate-300 font-medium">{art.date}</span>
            </div>

            <h3 className="text-base font-serif font-bold tracking-wide text-zinc-900 dark:text-white mb-4 group-hover:text-[#0064D0] dark:group-hover:text-sky-300 transition-colors">
              {art.title}
            </h3>

            <p className="text-xs text-zinc-600 dark:text-slate-200 leading-relaxed font-light flex-1 mb-8 font-sans">
              {art.excerpt}
            </p>

            <div className="pt-4 border-t border-zinc-200/30 dark:border-slate-700/60 font-sans">
              <Link
                href={`/insights/${art.slug}`}
                className="inline-flex items-center space-x-2 text-[9px] font-bold uppercase tracking-widest text-zinc-900 dark:text-white hover:text-[#0064D0] dark:hover:text-sky-400 transition-colors"
              >
                <span>Read Document</span>
                <ArrowUpRight size={10} />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Subscription Form panel */}
      <div className="bg-zinc-50 dark:bg-[#162447]/90 border border-zinc-200/40 dark:border-slate-700/60 p-8 sm:p-16 text-center max-w-4xl mx-auto rounded-3xl shadow-xl font-sans">
        <h3 className="text-2xl sm:text-4xl font-serif font-bold tracking-widest uppercase text-zinc-900 dark:text-white mb-6">
          Subscribe to Knowledge Series
        </h3>
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.newsletter.emailPlaceholder}
            required
            className="flex-1 px-5 py-3.5 rounded-xl bg-white dark:bg-[#0a1128] border border-zinc-200 dark:border-slate-700 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-slate-400 focus:outline-none focus:border-[#0064D0] transition-colors text-xs font-medium"
          />
          <button
            type="submit"
            className="px-8 py-3.5 rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-slate-100 transition-colors duration-300 text-xs font-bold uppercase tracking-widest cursor-pointer shadow-md"
          >
            {t.newsletter.button}
          </button>
        </form>

        {submitted && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-emerald-600 dark:text-emerald-400 mt-4 font-semibold"
          >
            {t.newsletter.success}
          </motion.p>
        )}
      </div>

    </section>
  )
}
