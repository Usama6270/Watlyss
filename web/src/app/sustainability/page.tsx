'use client'

import React from 'react'
import Navbar from '@/components/navbar'
import FooterSection from '@/components/footer-section'
import Link from 'next/link'
import Image from 'next/image'
import { Leaf, ShieldCheck, RefreshCw, ArrowRight, Heart, ArrowUpRight } from 'lucide-react'

interface ArticleItem {
  id: string
  slug: string
  num: string
  tag: string
  category: string
  title: string
  excerpt: string
  metaLeft: string
  metaRight: string
  badge: string
  badgeColor: string
  watlysNote: string
  imageSrc: string
  date: string
}

const KNOWLEDGE_ARTICLES: ArticleItem[] = [
  {
    id: '1',
    slug: 'who-guidelines-on-mineral-drinkability',
    num: '01',
    tag: 'WHO GUIDELINES',
    category: 'who',
    title: 'WHO Guidelines on Mineral Drinkability',
    excerpt: 'Deep analysis of mineral levels, safety parameters, and physiological hydration benefits of alkaline sources.',
    metaLeft: 'WHO Guidelines',
    metaRight: 'August 24, 2026',
    badge: 'WHO Standard',
    badgeColor: 'bg-[#0064D0] text-white',
    watlysNote: 'Watlys Classic is calibrated to WHO mineral drinkability metrics.',
    imageSrc: '/gazette/gazette_audit.jpg',
    date: 'August 24, 2026'
  },
  {
    id: '2',
    slug: 'water-hydration-and-skin-glow-chemistry',
    num: '02',
    tag: 'BEAUTY SCIENCE',
    category: 'beauty',
    title: 'Water Hydration & Skin Glow Chemistry',
    excerpt: 'How trace silica and structural cellular hydration keeps skin supple and prevents oxidative stress.',
    metaLeft: 'Dermatology Lab',
    metaRight: 'August 18, 2026',
    badge: 'Cellular Health',
    badgeColor: 'bg-emerald-600 text-white',
    watlysNote: 'Preserves essential silica & minerals for dermal hydration.',
    imageSrc: '/gazette/gazette_mountain_spring.jpg',
    date: 'August 18, 2026'
  },
  {
    id: '3',
    slug: 'pakistan-national-water-policy-review',
    num: '03',
    tag: 'NATIONAL POLICY',
    category: 'policy',
    title: 'Pakistan National Water Policy Review',
    excerpt: 'A detailed overview of clean aquifers, sustainable pumping thresholds, and packaging carbon policies.',
    metaLeft: 'Water Board',
    metaRight: 'August 10, 2026',
    badge: 'Policy Benchmark',
    badgeColor: 'bg-slate-900 dark:bg-slate-700 text-white',
    watlysNote: 'Watlys operates solar-powered extraction with zero waste discharge.',
    imageSrc: '/gazette/gazette_policy_solar.jpg',
    date: 'August 10, 2026'
  },
  {
    id: '4',
    slug: 'volcanic-geological-filtration-phases',
    num: '04',
    tag: 'GEOLOGY',
    category: 'industry',
    title: 'Volcanic Geological Filtration Phases',
    excerpt: 'How natural mineral composition takes decades to filter through layers of underground stones.',
    metaLeft: 'Geological Survey',
    metaRight: 'July 28, 2026',
    badge: 'Natural Process',
    badgeColor: 'bg-amber-600 text-white',
    watlysNote: 'Sourced from deep subterranean rock aquifers calibrated at 180 mg/L TDS.',
    imageSrc: '/gazette/gazette_mountain_spring.jpg',
    date: 'July 28, 2026'
  },
  {
    id: '5',
    slug: 'preventing-joint-inflammation-with-alkaline-ph',
    num: '05',
    tag: 'ALKALINE HEALTH',
    category: 'health',
    title: 'Preventing Joint Inflammation with Alkaline pH',
    excerpt: 'Scientific studies showing the correlation of pH 7.8 and neutralization of lactic acid buildup.',
    metaLeft: 'Sports Science',
    metaRight: 'July 15, 2026',
    badge: 'Alkaline Balance',
    badgeColor: 'bg-sky-600 text-white',
    watlysNote: 'Watlys maintains a stable pH of 7.8 to 8.2 in every bottle.',
    imageSrc: '/gazette/gazette_tds_meter.jpg',
    date: 'July 15, 2026'
  },
  {
    id: '6',
    slug: 'microplastics-and-beverage-glass-integrity',
    num: '06',
    tag: 'PACKAGING SAFETY',
    category: 'who',
    title: 'Microplastics & Beverage Glass Integrity',
    excerpt: 'Comparing glass containers to single-use PET bottles and microplastic filtration thresholds.',
    metaLeft: 'Materials Review',
    metaRight: 'July 05, 2026',
    badge: 'Material Safety',
    badgeColor: 'bg-indigo-600 text-white',
    watlysNote: 'Medical-grade BPA-free polycarbonate & returnable glass vessels.',
    imageSrc: '/gazette/gazette_glass_bottle.jpg',
    date: 'July 05, 2026'
  }
]

export default function SustainabilityPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#0a1128] text-zinc-900 dark:text-[#FAFAFA] flex flex-col pt-24 transition-colors duration-300 font-sans">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 space-y-20">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-[0.25em] text-[#0064D0]">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <span className="text-zinc-400">Sustainability</span>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.3em] text-[#0064D0] bg-[#0064D0]/10 px-3.5 py-1.5 rounded-full border border-[#0064D0]/20">
              ECOLOGICAL STEWARDSHIP
            </span>
            <h1 className="text-4xl sm:text-6xl font-serif font-light text-zinc-900 dark:text-white tracking-wide">
              Zero Plastic. 100% Recyclable Glass.
            </h1>
            <p className="text-zinc-550 dark:text-slate-200 text-sm sm:text-base font-light leading-relaxed">
              Watlys is built to eliminate single-use plastic pollution. By enclosing pristine mineral water exclusively in lead-free, infinitely recyclable glass containers, we safeguard both personal health and planetary ecology.
            </p>
          </div>

          <div className="lg:col-span-6 relative h-[380px] sm:h-[480px] flex items-center justify-center">
            <Image
              src="/Water19.png"
              alt="Watlys 19L Eco Bottle"
              fill
              className="object-contain hover:scale-105 transition-transform duration-500 select-none drop-shadow-[0_25px_40px_rgba(0,102,255,0.2)]"
              priority
            />
          </div>
        </div>

        {/* Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white dark:bg-[#131c38] border border-zinc-200/60 dark:border-slate-800/60 rounded-2xl space-y-3 shadow-sm">
            <RefreshCw className="text-[#0064D0]" size={24} />
            <h3 className="text-xl font-serif font-light text-zinc-900 dark:text-white">Infinitely Recyclable Glass</h3>
            <p className="text-xs text-zinc-500 dark:text-slate-200 font-light leading-relaxed">
              Glass containers can be sterilized and reused indefinitely or recycled 100% back into new vessels without loss of quality.
            </p>
          </div>
          <div className="p-8 bg-white dark:bg-[#131c38] border border-zinc-200/60 dark:border-slate-800/60 rounded-2xl space-y-3 shadow-sm">
            <Leaf className="text-[#0064D0]" size={24} />
            <h3 className="text-xl font-serif font-light text-zinc-900 dark:text-white">Aquifer Protection Protocol</h3>
            <p className="text-xs text-zinc-500 dark:text-slate-200 font-light leading-relaxed">
              We extract less than 15% of annual natural rainfall recharge rates, ensuring geological springs remain preserved for future generations.
            </p>
          </div>
          <div className="p-8 bg-white dark:bg-[#131c38] border border-zinc-200/60 dark:border-slate-800/60 rounded-2xl space-y-3 shadow-sm">
            <Heart className="text-[#0064D0]" size={24} />
            <h3 className="text-xl font-serif font-light text-zinc-900 dark:text-white">Carbon-Neutral Bottling</h3>
            <p className="text-xs text-zinc-500 dark:text-slate-200 font-light leading-relaxed">
              Our source bottling facilities operate on 100% solar and hydroelectric power, eliminating carbon emissions during filling.
            </p>
          </div>
        </div>

        {/* RESEARCH ARTICLES & PURITY SCIENCE SECTION (MOVED FROM HOME PAGE) */}
        <div className="space-y-8 pt-10 border-t border-zinc-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#0064D0] block mb-1">
                WATLYS RESEARCH & SCIENTIFIC STUDIES
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-zinc-900 dark:text-white tracking-wide">
                Research Articles & Purity Science
              </h2>
            </div>
            <span className="text-xs font-mono text-zinc-400 font-bold">
              {KNOWLEDGE_ARTICLES.length} ARTICLES AVAILABLE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {KNOWLEDGE_ARTICLES.map((art) => (
              <article
                key={art.id}
                className="group flex flex-col bg-white dark:bg-[#131c38] border border-slate-200 dark:border-slate-800 p-6 sm:p-7 rounded-2xl transition-all duration-300 hover:border-[#0064D0] shadow-lg shadow-black/5 hover:-translate-y-1"
              >
                <div className="flex justify-between items-center mb-4 font-sans">
                  <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded font-sans ${art.badgeColor}`}>
                    {art.badge}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium font-serif">{art.date}</span>
                </div>

                <div className="w-full h-36 rounded-xl overflow-hidden mb-4 relative border border-slate-200 dark:border-slate-800">
                  <img
                    src={art.imageSrc}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent p-3 flex items-end">
                    <span className="text-[10px] font-bold text-white uppercase tracking-widest font-sans">
                      {art.tag}
                    </span>
                  </div>
                </div>

                <h4 className="text-base font-serif font-bold tracking-wide text-slate-900 dark:text-white mb-3 group-hover:text-[#0064D0] dark:group-hover:text-sky-400 transition-colors leading-snug">
                  {art.title}
                </h4>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-serif flex-1 mb-6">
                  {art.excerpt}
                </p>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 font-sans flex justify-between items-center">
                  <Link
                    href={`/insights/${art.slug}`}
                    className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-[#0064D0] dark:text-sky-400 hover:underline"
                  >
                    <span>Read Document</span>
                    <ArrowUpRight size={12} />
                  </Link>
                  <span className="text-[10px] text-slate-400 font-serif uppercase">{art.metaLeft}</span>
                </div>
              </article>
            ))}
          </div>
        </div>

      </main>

      <FooterSection />
    </div>
  )
}
