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
      image: '/Water19.webp',
    },
    {
      num: '05',
      title: 'Temperature-Controlled Dispatch',
      desc: 'Packed securely in reusable wooden crates, climate-controlled transport vehicles deliver fresh mineral water directly to your home or corporate executive lounge.',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80',
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col pt-24 transition-colors duration-300">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-12 space-y-24">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto text-center space-y-6">
          <div className="flex items-center justify-center space-x-2 text-xs font-bold uppercase tracking-[0.25em] text-primary">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span>Process</span>
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-4xl lg:text-6xl font-serif font-light text-foreground tracking-wide"
          >
            The Geological Journey
          </motion.h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base font-light leading-relaxed">
            Discover the 5-stage subterranean process that transforms natural mountain rain into our award-winning mineral water collection.
          </p>
        </section>

        {/* Timeline Steps */}
        <section className="space-y-24">
          {steps.map((step, idx) => {
            const isEven = idx % 2 === 0
            const isProductShot = step.image.startsWith('/')
            return (
              <div key={idx} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className={`lg:col-span-6 relative h-[420px] sm:h-[500px] bg-gradient-to-br from-blue-50/30 via-white to-slate-50 dark:from-[#0f1a3a] dark:via-[var(--background)] dark:to-[var(--background)] rounded-3xl overflow-hidden border border-blue-100/80 dark:border-slate-800 shadow-md flex items-center justify-center p-2 ${!isEven ? 'lg:order-2' : ''}`}>
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    priority={idx === 0}
                    className={`${isProductShot ? 'object-contain scale-[1.42] hover:scale-[1.5]' : 'object-cover'} grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer select-none drop-shadow-xl`}
                  />
                </div>

                <div className="lg:col-span-6 space-y-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary block">
                    STAGE {step.num}
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-serif font-light text-foreground tracking-wide">
                    {step.title}
                  </h2>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </section>

        {/* CTA */}
        <div className="p-12 bg-background dark:bg-card border border-border rounded-2xl text-center space-y-6">
          <h3 className="text-3xl font-serif font-light text-foreground">Experience Uncompromised Purity</h3>
          <div className="pt-2">
            <Link
              href="/shop"
              className="px-8 py-4 bg-primary hover:bg-primary-hover text-primary-foreground rounded-xl font-bold text-xs uppercase tracking-[0.2em] inline-flex items-center justify-center space-x-2 transition-all shadow-md"
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
