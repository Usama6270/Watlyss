'use client'

import React from 'react'
import Navbar from '@/components/navbar'
import FooterSection from '@/components/footer-section'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ShieldCheck, Droplets, ArrowRight } from 'lucide-react'

export default function ProcessPage() {
  const steps = [
    {
      num: '01',
      title: 'Protected Volcanic Aquifer Storage',
      desc: 'Deep beneath ancient geothermic mountain strata, pristine rainwater collects inside sealed underground reservoirs protected from industrial elements and surface contaminants.',
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1000&q=80',
    },
    {
      num: '02',
      title: 'Decade Geological Stone Filtration',
      desc: 'Water trickles over decades through layers of mineral-rich basalt, granite, and silica rocks, absorbing optimal trace electrolytes naturally without chemical additives.',
      image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1000&q=80',
    },
    {
      num: '03',
      title: 'TDS & Microplastic Screening',
      desc: 'At the aquifer source extraction point, certified hydro-chemists conduct 24-hour automated laboratory testing verifying TDS 180 mg/L stability and 0.00% microplastic purity.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80',
    },
    {
      num: '04',
      title: 'Sterilized Recyclable Glass Bottling',
      desc: 'Water is enclosed directly at source under sterile nitrogen atmosphere into lead-free recyclable glass containers, locking in crisp subterranean freshness.',
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1000&q=80',
    },
    {
      num: '05',
      title: 'Temperature-Controlled Dispatch',
      desc: 'Packed securely in reusable wooden crates, climate-controlled transport vehicles deliver fresh mineral water directly to your home or corporate executive lounge.',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80',
    },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-zinc-900 dark:text-[#FAFAFA] flex flex-col pt-24 transition-colors duration-400">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 space-y-24">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto text-center space-y-6">
          <div className="flex items-center justify-center space-x-2 text-xs font-bold uppercase tracking-[0.25em] text-[#0064D0]">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span>Process</span>
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl font-serif font-light text-zinc-900 dark:text-white tracking-wide"
          >
            The Geological Journey
          </motion.h1>
          <p className="text-zinc-550 dark:text-zinc-400 max-w-xl mx-auto text-sm sm:text-base font-light leading-relaxed">
            Discover the 5-stage subterranean process that transforms natural mountain rain into our award-winning mineral water collection.
          </p>
        </section>

        {/* Timeline Steps */}
        <section className="space-y-24">
          {steps.map((step, idx) => {
            const isEven = idx % 2 === 0
            return (
              <div key={idx} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className={`lg:col-span-6 relative aspect-square sm:h-[400px] bg-zinc-50 dark:bg-[#111111] rounded-2xl overflow-hidden border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm ${!isEven ? 'lg:order-2' : ''}`}>
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>

                <div className="lg:col-span-6 space-y-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#0064D0] block">
                    STAGE {step.num}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-serif font-light text-zinc-900 dark:text-white tracking-wide">
                    {step.title}
                  </h2>
                  <p className="text-sm text-zinc-550 dark:text-zinc-400 font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </section>

        {/* CTA */}
        <div className="p-12 bg-zinc-50 dark:bg-[#111111] border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl text-center space-y-6">
          <h3 className="text-3xl font-serif font-light text-zinc-900 dark:text-white">Experience Uncompromised Purity</h3>
          <div className="pt-2">
            <Link
              href="/shop"
              className="px-8 py-4 bg-[#0064D0] hover:bg-[#0052ad] text-white rounded-xl font-bold text-xs uppercase tracking-[0.2em] inline-flex items-center justify-center space-x-2 transition-all shadow-md"
            >
              <span>Explore Water Collection</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  )
}
