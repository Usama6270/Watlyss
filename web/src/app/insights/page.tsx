'use client'

import React, { useState } from 'react'
import Navbar from '@/components/navbar'
import FooterSection from '@/components/footer-section'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, BookOpen } from 'lucide-react'

export interface Article {
  slug: string
  title: string
  category: 'who' | 'beauty' | 'policy' | 'industry' | 'health'
  categoryLabel: string
  excerpt: string
  content: string
  date: string
  author: string
  readTime: string
}

export const ARTICLES_DATA: Article[] = [
  {
    slug: 'who-guidelines-on-mineral-drinkability',
    title: 'WHO Guidelines on Mineral Drinkability',
    category: 'who',
    categoryLabel: 'WHO Studies',
    excerpt: 'Deep analysis of mineral levels, safety parameters, and physiological hydration benefits of alkaline sources.',
    date: 'August 24, 2026',
    author: 'Dr. Mariam Y., Chief Hydrologist',
    readTime: '6 min read',
    content: `
The World Health Organization (WHO) outlines rigorous physical and chemical parameters for natural mineral water intended for human consumption. Natural mineral water differs fundamentally from ordinary tap or purified water because it originates from subterranean aquifers protected from environmental pollution.

### Key Mineral Conductivity Guidelines

1. **Total Dissolved Solids (TDS)**: Optimal drinking water TDS ranges between 100 mg/L and 300 mg/L. Watlys Classic maintains an optimal 180 mg/L balance, providing vital electrolytes including calcium and magnesium without heavy mineral taste.
2. **pH Balance**: Natural alkalinity between 7.5 and 8.5 aids cellular hydration and neutralizes acidic dietary components.
3. **Heavy Metal Thresholds**: Zero detectable levels of lead, arsenic, or industrial nitrates.

By adhering to these parameters, mineral spring sources provide sustained physiological hydration without overburdening renal filtration systems.
    `,
  },
  {
    slug: 'water-hydration-and-skin-glow-chemistry',
    title: 'Water Hydration & Skin Glow Chemistry',
    category: 'beauty',
    categoryLabel: 'Beauty & Wellness',
    excerpt: 'How trace silica and structural cellular hydration keeps skin supple and prevents oxidative stress.',
    date: 'August 18, 2026',
    author: 'Sophia Alvi, Wellness Director',
    readTime: '4 min read',
    content: `
Dermatological studies confirm that topical skincare is only effective when supported by optimal cellular hydration. Natural mineral water enriched with orthosilicic acid (silica) plays a crucial role in collagen synthesis and skin elasticity.

### The Role of Bioavailable Silica

Silica acts as a structural building block for connective tissue. When ingested via natural geological water:
- It supports glycosaminoglycan formation in dermal layers.
- It enhances intracellular water retention, preventing fine dehydration lines.
- It assists in flushing cellular metabolic waste.

Enclosing mineral water in non-leaching glass containers prevents microplastic chemicals from disrupting endocrine balance and damaging skin barrier integrity.
    `,
  },
  {
    slug: 'pakistan-national-water-policy-review',
    title: 'Pakistan National Water Policy Review',
    category: 'policy',
    categoryLabel: 'National Policy',
    excerpt: 'A detailed overview of clean aquifers, sustainable pumping thresholds, and packaging carbon policies.',
    date: 'August 10, 2026',
    author: 'Tariq Hassan, Environmental Policy Fellow',
    readTime: '8 min read',
    content: `
Pakistan's National Water Policy emphasizes sustainable groundwater extraction and source aquifer conservation. As commercial bottling scales, enforcing strict replenishment ratios is critical.

### Key Policy Mandates for Commercial Bottlers

1. **Recharge Mandate**: Bottlers must recharge or preserve 100% of extracted spring volume through watershed forestry and rainwater harvesting systems.
2. **Single-Use Plastics Reduction**: Transitioning from disposable PET containers toward glass and returnable aluminum packaging.
3. **Third-Party Assay Audits**: Mandating quarterly published chemical reports accessible to the public.

Watlys complies fully with all National Water Policy directives, utilizing solar-powered bottling and lead-free recyclable glass.
    `,
  },
  {
    slug: 'volcanic-geological-filtration-phases',
    title: 'Volcanic Geological Filtration Phases',
    category: 'industry',
    categoryLabel: 'Geology & Research',
    excerpt: 'How natural mineral composition takes decades to filter through layers of underground stones.',
    date: 'July 28, 2026',
    author: 'Geological Research Bureau',
    readTime: '5 min read',
    content: `
Natural spring water quality is determined by the geology of its filtration path. Over decades, rainwater percolates through porous basaltic rock, volcanic ash, and granite strata deep underground.

### Stages of Subterranean Filtration

1. **Mechanical Sedimentation**: Heavy sand and organic particles are filtered within the first 10 meters of soil.
2. **Mineral Exchange**: Water trickles past basalt and limestone, dissolving trace ions of Calcium (Ca2+), Magnesium (Mg2+), and Bicarbonate (HCO3-).
3. **Pressurized Subterranean Storage**: Water rests under atmospheric pressure in subterranean aquifer chambers until collected at natural spring heads.
    `,
  },
  {
    slug: 'preventing-joint-inflammation-with-alkaline-ph',
    title: 'Preventing Joint Inflammation with Alkaline pH',
    category: 'health',
    categoryLabel: 'Health & Endurance',
    excerpt: 'Scientific studies showing the correlation of pH 7.8 and neutralization of lactic acid buildup.',
    date: 'July 15, 2026',
    author: 'Sports Physiology Lab',
    readTime: '5 min read',
    content: `
Intense athletic training leads to lactic acid accumulation and transient systemic acidosis. Consuming naturally alkaline mineral water (pH 7.8 to 8.2) assists in restoring plasma bicarbonate buffers and mitigating exercise-induced inflammation.

### Benefits for Active Individuals

- Rapid lactate clearance during post-workout recovery windows.
- Reduced muscle soreness and joint stiffness.
- Optimal electrolyte replacement without added sugars or artificial flavorings.
    `,
  },
  {
    slug: 'microplastics-and-beverage-glass-integrity',
    title: 'Microplastics & Beverage Glass Integrity',
    category: 'who',
    categoryLabel: 'WHO Studies',
    excerpt: 'Comparing glass containers to single-use PET bottles and microplastic filtration thresholds.',
    date: 'July 05, 2026',
    author: 'Eco Packaging Institute',
    readTime: '7 min read',
    content: `
Recent global studies reveal that liquid stored in soft plastic PET bottles contains thousands of microscopic polymer fragments per liter. Glass packaging remains the gold standard for beverage purity.

### Why Glass is Chemically Inert

- **Zero Chemical Migration**: Glass does not leach phthalates, bisphenol-A (BPA), or antimony into stored liquids.
- **Infinite Recyclability**: Glass melts down infinitely without structural degradation.
- **Taste Preservation**: Preserves the natural mineral crispness of natural spring water without plastic off-flavors.
    `,
  },
]

export default function InsightsCatalogPage() {
  const [selectedCat, setSelectedCat] = useState<string>('all')

  const filteredArticles = selectedCat === 'all'
    ? ARTICLES_DATA
    : ARTICLES_DATA.filter((art) => art.category === selectedCat)

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-zinc-900 dark:text-[#FAFAFA] flex flex-col pt-24 transition-colors duration-400">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 space-y-16">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-[0.25em] text-[#0064D0]">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <span className="text-zinc-400">Knowledge Series</span>
        </div>

        {/* Hero Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 border-b border-zinc-200/50 dark:border-zinc-800/50 pb-12">
          <div className="space-y-4">
            <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-[#0064D0]">RESEARCH & PAPERS</span>
            <h1 className="text-4xl sm:text-6xl font-serif font-light text-zinc-900 dark:text-white tracking-wide">
              Watlys Knowledge Series
            </h1>
            <p className="text-zinc-550 dark:text-zinc-400 text-sm font-light max-w-lg">
              Explore scientific research papers, geological assays, WHO guidelines, and health studies on premium hydration.
            </p>
          </div>

          {/* Filter Categories */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Research' },
              { id: 'who', label: 'WHO Studies' },
              { id: 'beauty', label: 'Beauty' },
              { id: 'policy', label: 'Policy' },
              { id: 'health', label: 'Health' },
              { id: 'industry', label: 'Geology' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  selectedCat === cat.id
                    ? 'bg-[#0064D0] text-white shadow-sm'
                    : 'bg-white dark:bg-[#111111] border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((art) => (
            <article
              key={art.slug}
              className="group flex flex-col justify-between bg-white dark:bg-[#111111] border border-zinc-200/60 dark:border-zinc-800/60 p-8 rounded-2xl shadow-sm hover:border-[#0064D0] transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-zinc-400">
                  <span className="text-[#0064D0] bg-[#0064D0]/10 px-2.5 py-0.5 rounded border border-[#0064D0]/20">
                    {art.categoryLabel}
                  </span>
                  <span>{art.readTime}</span>
                </div>

                <h2 className="text-xl font-serif font-light text-zinc-900 dark:text-white tracking-wide group-hover:text-[#0064D0] transition-colors">
                  {art.title}
                </h2>

                <p className="text-xs text-zinc-550 dark:text-zinc-400 font-light leading-relaxed">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800 mt-6 flex justify-between items-center text-xs">
                <span className="text-[10px] text-zinc-400">{art.date}</span>
                <Link
                  href={`/insights/${art.slug}`}
                  className="inline-flex items-center space-x-1.5 font-bold text-[#0064D0] hover:text-[#0052ad] uppercase tracking-wider text-[10px]"
                >
                  <span>Read Article</span>
                  <ArrowUpRight size={12} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>

      <FooterSection />
    </div>
  )
}
