'use client'

import React from 'react'
import Navbar from '@/components/navbar'
import FooterSection from '@/components/footer-section'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShieldCheck, Droplets, Wrench, Truck, ArrowRight } from 'lucide-react'

export default function ServicesOverviewPage() {
  const services = [
    {
      slug: 'free-bottle-installation',
      title: 'Free Bottle & Stand Installation',
      tag: 'COMPLIMENTARY SETUP',
      desc: 'Complimentary professional installation of stainless steel tabletop stands and heavy-duty glass bottle dispensers at your home or workplace.',
      icon: Wrench,
      features: ['White-glove technician setup', 'Ergonomic height adjustment', 'Safety latch inspection'],
    },
    {
      slug: 'water-testing',
      title: 'Chemical & TDS Assay Testing',
      tag: 'LABORATORY ANALYSIS',
      desc: 'Comprehensive chemical assay, TDS mineral testing, and microplastic screening for home and commercial water sources.',
      icon: Droplets,
      features: ['24-hour certified laboratory report', 'Heavy metal & nitrate screening', 'TDS & pH balance breakdown'],
    },
    {
      slug: 'dispenser-service',
      title: 'Luxury Dispenser & Chiller Service',
      tag: 'EQUIPMENT MANAGEMENT',
      desc: 'High-aesthetic stainless steel and glass-compatible cooling dispensers designed for luxury residences and corporate boardrooms.',
      icon: ShieldCheck,
      features: ['Dual temperature precision cooling', 'Sanitized quarterly maintenance', 'Quiet compressor technology'],
    },
    {
      slug: 'delivery',
      title: 'Express Temperature-Controlled Delivery',
      tag: 'LOGISTICS NETWORK',
      desc: 'Reliable, climate-controlled logistics ensuring your mineral water is delivered at optimal subterranean temperature.',
      icon: Truck,
      features: ['Zero-shatter wooden crate transport', 'Scheduled recurring deliveries', 'Real-time GPS delivery tracking'],
    },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-zinc-900 dark:text-[#FAFAFA] flex flex-col pt-24 transition-colors duration-400">
      <Navbar />

      <main className="flex-1 w-full space-y-24 pb-24">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto px-6 py-16 text-center space-y-6">
          <div className="flex items-center justify-center space-x-2 text-xs font-bold uppercase tracking-[0.25em] text-[#0064D0]">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span>Services</span>
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl font-serif font-light text-zinc-900 dark:text-white tracking-wide"
          >
            Watlys Concierge Services
          </motion.h1>
          <p className="text-zinc-550 dark:text-zinc-400 max-w-xl mx-auto text-sm sm:text-base font-light leading-relaxed">
            From certified aquifer laboratory testing to custom glass dispenser installation, explore our end-to-end hydration services.
          </p>
        </section>

        {/* Services Grid */}
        <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((srv) => (
            <div
              key={srv.slug}
              className="group flex flex-col justify-between bg-white dark:bg-[#111111] border border-zinc-200/60 dark:border-zinc-800/60 p-8 sm:p-12 rounded-2xl shadow-sm hover:border-[#0064D0] transition-all duration-300"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-xl bg-[#0064D0]/10 flex items-center justify-center text-[#0064D0]">
                    <srv.icon size={22} />
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#0064D0] bg-[#0064D0]/10 px-3 py-1 rounded-full border border-[#0064D0]/20">
                    {srv.tag}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-serif font-light text-zinc-900 dark:text-white tracking-wide">{srv.title}</h2>
                <p className="text-xs sm:text-sm text-zinc-550 dark:text-zinc-400 font-light leading-relaxed">{srv.desc}</p>

                <ul className="space-y-2.5 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  {srv.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center space-x-3 text-xs text-zinc-650 dark:text-zinc-300 font-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0064D0]" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <Link
                  href={`/services/${srv.slug}`}
                  className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-[0.2em] text-[#0064D0] hover:text-[#0052ad] transition-colors"
                >
                  <span>Learn More & Book Service</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </section>
      </main>

      <FooterSection />
    </div>
  )
}
