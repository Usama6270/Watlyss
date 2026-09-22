'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import FooterCursorPattern from '@/components/footer-cursor-pattern'
import NewsletterBubbleUniverse from '@/components/newsletter-bubble-universe'
import {
  FileText,
  Download,
  ExternalLink,
  ShieldAlert,
  Droplet,
  CheckCircle2,
  BookOpen,
  Sparkles,
  Eye,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Award,
  ArrowUpRight
} from 'lucide-react'

interface ArticleItem {
  id: string
  slug: string
  num: string
  tag: string
  category: 'who' | 'beauty' | 'policy' | 'health' | 'industry' | 'gazette'
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

// Full List of Research & Gazette Articles
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

// Dynamic Content for Gazette Edition Pages 01 through 06
const GAZETTE_PAGES_DATA: Record<number, {
  alertBadge: string
  alertBadgeColor: string
  editionTitle: string
  metrics: { title: string; desc: string; iconType: 'alert' | 'droplet' | 'shield' }[]
}> = {
  1: {
    alertBadge: 'CRITICAL AUDIT ALERT',
    alertBadgeColor: 'bg-red-600 text-white',
    editionTitle: 'Watlys Gazette: Pakistan Water Quality & Safety Audit',
    metrics: [
      { title: 'PCRWR Official Audit', desc: '29 Unsafe Brands Flagged for high E. coli & Pseudomonas bacterial contamination.', iconType: 'alert' },
      { title: 'Aquifer TDS Benchmark', desc: 'Northern rock springs calibrated at 180 mg/L TDS vs high salinity groundwaters.', iconType: 'droplet' },
      { title: 'Watlys 9-Stage Standard', desc: 'Multi-membrane RO, Dual UV-C & Ozone Infusion guarantee 100% biological safety.', iconType: 'shield' }
    ]
  },
  2: {
    alertBadge: 'REGIONAL AQUIFER SURVEY',
    alertBadgeColor: 'bg-amber-600 text-white',
    editionTitle: 'Watlys Gazette: Aquifer Disparities & Sodium Audit',
    metrics: [
      { title: 'Sodium Disparity Flagged', desc: '14 commercial brands found with >50 mg/L sodium, posing hypertension risks.', iconType: 'alert' },
      { title: 'Northern Mountain Springs', desc: 'Northern rock aquifers contain natural bicarbonate buffers preserving minerals.', iconType: 'droplet' },
      { title: 'Automated CIP Sanitation', desc: 'Automated high-pressure CIP washing eradicates biofilm buildup completely.', iconType: 'shield' }
    ]
  },
  3: {
    alertBadge: 'PURITY MYTH BUSTER',
    alertBadgeColor: 'bg-blue-600 text-white',
    editionTitle: 'Watlys Gazette: TDS Pen Myth & Pathogen Safety',
    metrics: [
      { title: 'TDS Pen Myth Buster', desc: 'Handheld TDS pens measure mineral salts, failing to detect bacteria or viruses.', iconType: 'alert' },
      { title: 'Medical-Grade 254nm UV-C', desc: 'Dual-pass high-intensity UV-C lamps rupture viral DNA structures in seconds.', iconType: 'droplet' },
      { title: 'Heavy Metal Testing', desc: 'Quarterly atomic absorption spectroscopy verifies zero lead or arsenic.', iconType: 'shield' }
    ]
  },
  4: {
    alertBadge: 'MATERIAL & GLASS INTEGRITY',
    alertBadgeColor: 'bg-emerald-600 text-white',
    editionTitle: 'Watlys Gazette: Microplastics & Container Safety',
    metrics: [
      { title: 'Microplastics Leaching Alert', desc: 'Thermal assays confirm soft PET bottles release microplastics under summer heat.', iconType: 'alert' },
      { title: 'Inert Glass & Carboys', desc: 'Glass & food-grade carboys preserve crisp spring taste with zero chemical migration.', iconType: 'droplet' },
      { title: 'Closed-Loop 19L Network', desc: 'Returnable 19L carboys reduce plastic packaging waste by 98% compared to PET.', iconType: 'shield' }
    ]
  },
  5: {
    alertBadge: 'WHO HEALTH BENCHMARK',
    alertBadgeColor: 'bg-[#0064D0] text-white',
    editionTitle: 'Watlys Gazette: WHO Mineral & Bio-Hydration Metrics',
    metrics: [
      { title: 'WHO Hydration Standard', desc: 'Calibrated essential minerals: 100-300 mg/L TDS with bioavailable Ca & Mg.', iconType: 'alert' },
      { title: 'Alkaline pH (7.8 - 8.2)', desc: 'Mildly alkaline spring water buffers systemic acidity and gastric acid reflux.', iconType: 'droplet' },
      { title: 'Renal Stone Prevention', desc: 'Balanced 180 mg/L TDS prevents kidney strain while delivering essential minerals.', iconType: 'shield' }
    ]
  },
  6: {
    alertBadge: 'NATIONAL POLICY 2026',
    alertBadgeColor: 'bg-slate-900 text-white',
    editionTitle: 'Watlys Gazette: National Water Policy & QR Verification',
    metrics: [
      { title: '100% Aquifer Recharge', desc: 'Fully compliant with Federal National Water Policy 2026 groundwater recharge directives.', iconType: 'alert' },
      { title: 'Scannable QR Batch Tags', desc: 'Every 19L bottle neck seal features a scannable QR code for real-time lab test results.', iconType: 'droplet' },
      { title: '100% Solar-Powered Plant', desc: 'Zero liquid effluent discharge operating on 100% rooftop solar energy.', iconType: 'shield' }
    ]
  }
}

export default function IndustryBriefingSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [viewMode, setViewMode] = useState<'gazette' | 'pdf' | 'article'>('gazette')
  const [newsletterEmail, setNewsletterEmail] = useState<string>('')
  const [subscribed, setSubscribed] = useState<boolean>(false)

  const totalPages = 6
  const activePageData = GAZETTE_PAGES_DATA[currentPage] || GAZETTE_PAGES_DATA[1]

  // Categories Filter Bar Config
  const categories = [
    { id: 'all', label: 'ALL TOPICS' },
    { id: 'gazette', label: 'MONTHLY GAZETTE' },
    { id: 'who', label: 'WHO STUDIES' },
    { id: 'beauty', label: 'BEAUTY' },
    { id: 'policy', label: 'POLICY' },
    { id: 'health', label: 'HEALTH' },
    { id: 'industry', label: 'INDUSTRY' }
  ]

  // Filtered Articles based on selected category tab
  const filteredArticles = selectedCategory === 'all' || selectedCategory === 'gazette'
    ? KNOWLEDGE_ARTICLES
    : KNOWLEDGE_ARTICLES.filter(art => art.category === selectedCategory)

  const handleNextPage = () => {
    setCurrentPage(prev => (prev < totalPages ? prev + 1 : 1))
  }

  const handlePrevPage = () => {
    setCurrentPage(prev => (prev > 1 ? prev - 1 : totalPages))
  }

  return (
    <section 
      id="industry-briefing" 
      className="w-full py-16 sm:py-24 bg-[#FAF9F6] dark:bg-[#0a1128] border-t border-slate-200/80 dark:border-slate-800/60 font-sans transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* 1. UNIFIED HEADER SECTION */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#0064D0]/10 border border-[#0064D0]/20 text-[#0064D0] dark:text-sky-400 text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em]">
            <Sparkles size={14} className="animate-pulse" />
            <span>WATLYS JOURNAL & RESEARCH</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold tracking-wide text-slate-900 dark:text-white">
            Watlys Journal & Gazette
          </h2>

          <p className="text-xs sm:text-base font-serif text-slate-600 dark:text-slate-300 leading-relaxed">
            Explore scientific findings, WHO mineral standards, and monthly industry briefings.
          </p>

          {/* CATEGORY FILTER TABS BAR */}
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 pt-6 border-b border-slate-200 dark:border-slate-800 pb-4 font-sans">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id)
                  }}
                  className={`px-4 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-[#0064D0] text-white border-[#0064D0] shadow-md scale-105'
                      : 'bg-white dark:bg-[#131c38] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {cat.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* 2. FEATURED GAZETTE SPOTLIGHT CARD (TOP PRIORITY) */}
        {(selectedCategory === 'all' || selectedCategory === 'gazette' || selectedCategory === 'who') && (
          <div className="bg-white dark:bg-[#131c38] text-slate-900 dark:text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-8 font-sans">
            
            {/* GAZETTE SPOTLIGHT HEADER */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border-b border-slate-200 dark:border-slate-800 pb-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-xs ${activePageData.alertBadgeColor}`}>
                    {activePageData.alertBadge}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-[#0064D0] dark:text-sky-400 uppercase tracking-widest">
                    VOL. 01 / PAGE 0{currentPage} OF 06 / PAKISTAN EDITION
                  </span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-serif font-bold text-slate-950 dark:text-white tracking-wide">
                  {activePageData.editionTitle}
                </h3>
              </div>

              {/* ACTION BUTTONS: INTERACTIVE PDF VIEWER & DOWNLOAD PDF */}
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  onClick={() => setViewMode(viewMode === 'pdf' ? 'gazette' : 'pdf')}
                  className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl border transition-all flex items-center space-x-2 cursor-pointer ${
                    viewMode === 'pdf'
                      ? 'bg-[#0064D0] text-white border-[#0064D0] shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Eye size={14} />
                  <span>{viewMode === 'pdf' ? 'Close Interactive PDF' : '📄 Interactive PDF Viewer'}</span>
                </button>

                <a
                  href="/docs/Pakistan_Mineral_Water_Newsletter.pdf"
                  download="Pakistan_Mineral_Water_Newsletter.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-[#0064D0] hover:bg-[#0052ad] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all hover:scale-105 flex items-center space-x-2"
                >
                  <Download size={14} />
                  <span>📥 Download PDF</span>
                </a>
              </div>
            </div>

            {/* HIGHLIGHTED METRICS BADGES INSIDE FEATURED CARD FOR CURRENT PAGE */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {activePageData.metrics.map((m, idx) => (
                <div 
                  key={idx}
                  className={`p-4 rounded-2xl space-y-1 border ${
                    m.iconType === 'alert' 
                      ? 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900/50' 
                      : m.iconType === 'droplet'
                      ? 'bg-sky-50 dark:bg-sky-950/30 border-sky-200 dark:border-sky-900/50'
                      : 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/50'
                  }`}
                >
                  <div className={`flex items-center space-x-1.5 font-bold text-xs ${
                    m.iconType === 'alert' ? 'text-red-600 dark:text-red-400' : m.iconType === 'droplet' ? 'text-[#0064D0] dark:text-sky-400' : 'text-emerald-600 dark:text-emerald-400'
                  }`}>
                    {m.iconType === 'alert' && <ShieldAlert size={16} />}
                    {m.iconType === 'droplet' && <Droplet size={16} />}
                    {m.iconType === 'shield' && <ShieldCheck size={16} />}
                    <span>{m.title}</span>
                  </div>
                  <p className="text-xs font-serif text-slate-800 dark:text-slate-200 leading-snug">
                    {m.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* INTERACTIVE EMBEDDED PDF VIEWER (WHEN ACTIVE) */}
            {viewMode === 'pdf' ? (
              <div className="space-y-4 pt-2">
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                  <span>INTERACTIVE PDF DOCUMENT: PAGE {currentPage} OF {totalPages}</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handlePrevPage}
                      className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
                      title="Previous Page"
                    >
                      <ChevronLeft size={14} />
                    </button>
                    <span>PAGE 0{currentPage}</span>
                    <button
                      onClick={handleNextPage}
                      className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
                      title="Next Page"
                    >
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>

                <div className="w-full h-[600px] bg-slate-100 dark:bg-[#0a1128] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-inner">
                  <iframe
                    key={`pdf-embed-page-${currentPage}`}
                    src={`/docs/Pakistan_Mineral_Water_Newsletter.pdf#page=${currentPage}&toolbar=1&navpanes=0&view=FitH`}
                    title={`Pakistan Water & Mineral Water Monthly Briefing Page ${currentPage}`}
                    className="w-full h-full border-0"
                  />
                </div>
              </div>
            ) : (
              /* GAZETTE CAROUSEL PAGE PREVIEW CONTROL BAR (DOES NOT FORCE PDF OPEN) */
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center space-x-2 text-xs font-serif font-bold text-slate-800 dark:text-slate-200">
                  <span className="text-[10px] uppercase tracking-widest text-slate-400 font-sans">SELECT GAZETTE EDITION PAGE:</span>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5, 6].map((pNum) => (
                      <button
                        key={pNum}
                        onClick={() => setCurrentPage(pNum)}
                        className={`w-7 h-7 rounded text-xs font-mono font-bold transition-all cursor-pointer border ${
                          currentPage === pNum
                            ? 'bg-[#0064D0] text-white border-[#0064D0] shadow-xs scale-105'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        0{pNum}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setViewMode('pdf')}
                  className="text-xs font-bold text-[#0064D0] dark:text-sky-400 hover:underline inline-flex items-center space-x-1 cursor-pointer"
                >
                  <span>Open Full PDF Document Reader</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>
            )}

          </div>
        )}

        {/* 3. RESPONSIVE ARTICLE GRID (3 COLUMNS) */}
        <div className="space-y-6">
          <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-white">
              {selectedCategory === 'all' ? 'Research Articles & Purity Science' : `${selectedCategory.toUpperCase()} Articles`}
            </h3>
            <span className="text-xs font-mono text-slate-400 font-bold">
              {filteredArticles.length} ARTICLES AVAILABLE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((art) => (
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

        {/* 4. INTERACTIVE SCATTERED BUBBLE NEWSLETTER UNIVERSE */}
        <div className="pt-10 sm:pt-16 -mx-4 sm:-mx-8 lg:-mx-12">
          <NewsletterBubbleUniverse />
        </div>

      </div>
    </section>
  )
}
