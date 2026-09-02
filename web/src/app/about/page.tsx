'use client'

import React from 'react'
import Navbar from '@/components/navbar'
import FooterSection from '@/components/footer-section'
import Image from 'next/image'
import { useLanguage } from '@/context/language'
import { motion } from 'framer-motion'
import { Shield, Sparkles, Droplets, Download } from 'lucide-react'

export default function AboutPage() {
  const { t, isRtl } = useLanguage()

  const textFadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-100px' },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
  }

  // Lab analysis metrics data
  const labMetrics = [
    { component: 'pH Balance', limit: '6.5 - 8.5', value: '7.8', status: 'Optimal' },
    { component: 'Calcium (Ca)', limit: '200 mg/L', value: '12.4 mg/L', status: 'Compliant' },
    { component: 'Magnesium (Mg)', limit: '150 mg/L', value: '4.2 mg/L', status: 'Compliant' },
    { component: 'Silica (SiO2)', limit: 'N/A', value: '9.8 mg/L', status: 'Natural Trace' },
    { component: 'Microplastics', limit: '0%', value: 'Undetected', status: 'Pure' },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-zinc-900 dark:text-[#FAFAFA] flex flex-col transition-colors duration-400 overflow-x-hidden pt-20">
      <Navbar />

      <main className="flex-1 w-full pb-32">
        {/* Header Block */}
        <section className="max-w-4xl mx-auto px-6 py-24 text-center space-y-6">
          <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-zinc-400">
            ESTABLISHED SOURCE
          </span>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-7xl font-sans font-light tracking-wide text-zinc-900 dark:text-[#FAFAFA] leading-tight"
          >
            {t.about.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-zinc-500 dark:text-[#AAAAAA] max-w-xl mx-auto text-xs sm:text-sm font-light leading-relaxed"
          >
            {t.about.subtitle}
          </motion.p>
        </section>

        {/* 1. Origin Story Section (Grayscale full bleed) */}
        <section className="w-full relative h-[450px] sm:h-[600px] bg-zinc-50 dark:bg-[#111111] mb-28 border-y border-zinc-200/10 dark:border-zinc-800/30 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1555529733-0e670560f7e1?auto=format&fit=crop&w=1600&q=80"
            alt="Pristine mountain aquifers"
            fill
            className="object-cover grayscale transition-transform duration-[2000ms] hover:scale-103"
            priority
          />
          <div className="absolute inset-0 bg-black/5 dark:bg-black/40" />
        </section>

        {/* Origin Narrative Details */}
        <div className="max-w-4xl mx-auto px-6 space-y-32">
          
          <motion.section 
            {...textFadeIn}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-b border-zinc-200/30 dark:border-zinc-800/40 pb-20"
          >
            <div className="md:col-span-4 text-[9px] font-bold uppercase tracking-widest text-zinc-400 pt-1">
              01 / OUR GENESIS
            </div>
            <div className="md:col-span-8 space-y-6 text-zinc-550 dark:text-[#AAAAAA] text-xs sm:text-sm leading-relaxed font-light">
              <h3 className="text-xl sm:text-2xl font-sans text-zinc-900 dark:text-[#FAFAFA] font-light tracking-wide uppercase">{t.about.storyTitle}</h3>
              <p>{t.about.storyText1}</p>
              <p>{t.about.storyText2}</p>
            </div>
          </motion.section>

          {/* 2. Mission & Values Section */}
          <motion.section 
            {...textFadeIn}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-b border-zinc-200/30 dark:border-zinc-800/40 pb-20"
          >
            <div className="md:col-span-4 text-[9px] font-bold uppercase tracking-widest text-zinc-400 pt-1">
              02 / VALUES
            </div>
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-3 border-l border-zinc-200 dark:border-zinc-800 pl-4 py-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-[#FAFAFA]">Absolute Purity</h4>
                <p className="text-xs text-zinc-500 dark:text-[#AAAAAA] leading-relaxed font-light">
                  Protected source aquifer ensures that no synthetic chemicals or microplastics ever compromise our water.
                </p>
              </div>
              <div className="space-y-3 border-l border-zinc-200 dark:border-zinc-800 pl-4 py-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-[#FAFAFA]">Eco Stewardship</h4>
                <p className="text-xs text-zinc-500 dark:text-[#AAAAAA] leading-relaxed font-light">
                  Carbon-neutral filling facility operations and lead-free recyclable custom glass vessels.
                </p>
              </div>
            </div>
          </motion.section>

          {/* 3. Sourcing & Filtration Process Diagram */}
          <motion.section 
            {...textFadeIn}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-b border-zinc-200/30 dark:border-zinc-800/40 pb-20"
          >
            <div className="md:col-span-4 text-[9px] font-bold uppercase tracking-widest text-zinc-400 pt-1">
              03 / VISUAL FILTRATION
            </div>
            <div className="md:col-span-8 space-y-8">
              <h3 className="text-xl sm:text-2xl font-sans text-zinc-900 dark:text-[#FAFAFA] font-light tracking-wide uppercase">Natural Geology Cycle</h3>
              <div className="relative border-l border-zinc-200 dark:border-zinc-800 ml-2 pl-6 space-y-10 py-2">
                <div className="relative">
                  <div className="absolute -left-[29px] top-1.5 h-1.5 w-1.5 rounded-full bg-zinc-950 dark:bg-white" />
                  <span className="text-[8px] text-zinc-400 font-bold block mb-1">STAGE 1</span>
                  <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 block mb-1">Volcanic Aquifer Deposition</span>
                  <p className="text-xs text-zinc-500 dark:text-[#AAAAAA] font-light">Rain water settles deep in ancient geothermic mountain storage chambers.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[29px] top-1.5 h-1.5 w-1.5 rounded-full bg-zinc-950 dark:bg-white" />
                  <span className="text-[8px] text-zinc-400 font-bold block mb-1">STAGE 2</span>
                  <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 block mb-1">Decade Filtration Scrape</span>
                  <p className="text-xs text-zinc-500 dark:text-[#AAAAAA] font-light">Water slowly trickles through layers of natural volcanic stone absorbing active minerals.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[29px] top-1.5 h-1.5 w-1.5 rounded-full bg-zinc-950 dark:bg-white" />
                  <span className="text-[8px] text-zinc-400 font-bold block mb-1">STAGE 3</span>
                  <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 block mb-1">Sterilized Bottling</span>
                  <p className="text-xs text-zinc-500 dark:text-[#AAAAAA] font-light">Collected at source point without surface contact directly into sterilized containers.</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* 4. Founder / Team Note Block */}
          <motion.section 
            {...textFadeIn}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-zinc-200/30 dark:border-zinc-800/40 pb-20"
          >
            <div className="md:col-span-4 relative h-64 w-full bg-zinc-50 dark:bg-[#111111] overflow-hidden border border-zinc-200/10 dark:border-zinc-800/30">
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
                alt="Founder Portrait"
                fill
                className="object-cover grayscale"
              />
            </div>
            <div className="md:col-span-8 space-y-4 pl-0 sm:pl-6">
              <span className="text-[9px] font-bold uppercase text-zinc-400">Founder Statement</span>
              <p className="text-base sm:text-xl font-sans font-light text-zinc-800 dark:text-[#FAFAFA] italic leading-relaxed">
                "Hydration should not be a thoughtless, disposable act. Watlys is built to challenge plastic convenience and elevate water to its rightful geological luxury profile."
              </p>
              <div>
                <span className="text-xs font-bold uppercase text-zinc-900 dark:text-[#FAFAFA] tracking-widest block">Sophia Alvi</span>
                <span className="text-[10px] text-zinc-400 block mt-0.5 font-light">CEO & Founder, Watlys</span>
              </div>
            </div>
          </motion.section>

          {/* 5. Certifications & Lab Test Results Table */}
          <motion.section 
            {...textFadeIn}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-b border-zinc-200/30 dark:border-zinc-800/40 pb-20"
          >
            <div className="md:col-span-4 text-[9px] font-bold uppercase tracking-widest text-zinc-400 pt-1">
              04 / REPORTS
            </div>
            <div className="md:col-span-8 space-y-6">
              <h3 className="text-xl sm:text-2xl font-sans text-zinc-900 dark:text-[#FAFAFA] font-light tracking-wide uppercase">Chemical Assays</h3>
              <p className="text-xs text-zinc-500 dark:text-[#AAAAAA] font-light leading-relaxed">
                We believe in absolute scientific transparency. Below is our latest geological aquifer assay report.
              </p>
              
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left text-xs font-light">
                  <thead>
                    <tr className="border-b border-zinc-200 dark:border-zinc-800 text-[9px] uppercase tracking-wider text-zinc-400 font-bold">
                      <th className="py-3">Component Analyzed</th>
                      <th className="py-3">Regulatory Limit</th>
                      <th className="py-3">Watlys Assayed</th>
                      <th className="py-3 text-right">Assurance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {labMetrics.map((row) => (
                      <tr key={row.component} className="border-b border-zinc-100 dark:border-zinc-800/50 text-zinc-650 dark:text-zinc-300">
                        <td className="py-3 font-medium">{row.component}</td>
                        <td className="py-3 text-zinc-400">{row.limit}</td>
                        <td className="py-3 text-zinc-950 dark:text-[#FAFAFA] font-semibold">{row.value}</td>
                        <td className="py-3 text-right text-zinc-400 italic font-light">{row.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="pt-4 flex justify-end">
                <button className="inline-flex items-center space-x-2 text-[9px] font-bold uppercase tracking-widest text-zinc-900 dark:text-[#FAFAFA] border-b border-zinc-950 dark:border-white pb-0.5 hover:text-zinc-500 dark:hover:text-zinc-400 cursor-pointer">
                  <span>Download Lab Assay Report (PDF)</span>
                  <Download size={12} />
                </button>
              </div>
            </div>
          </motion.section>

          {/* 6. Sustainability Commitments */}
          <motion.section 
            {...textFadeIn}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
          >
            <div className="md:col-span-4 text-[9px] font-bold uppercase tracking-widest text-zinc-400 pt-1">
              05 / ECOLOGY
            </div>
            <div className="md:col-span-8 space-y-6 text-zinc-550 dark:text-[#AAAAAA] text-xs sm:text-sm leading-relaxed font-light">
              <h3 className="text-xl sm:text-2xl font-sans text-zinc-900 dark:text-[#FAFAFA] font-light tracking-wide uppercase">{t.about.sourceTitle}</h3>
              <p>{t.about.sourceText}</p>
              <p>
                Our structural commitment implies utilizing lead-free custom-drawn crystal containers, allowing consumers to reuse vessels indefinitely or recycle them completely back into manufacturing cycles.
              </p>
            </div>
          </motion.section>

        </div>
      </main>

      <FooterSection />
    </div>
  )
}
