'use client'

import React from 'react'
import Navbar from '@/components/navbar'
import SpecReveal from '@/components/spec-reveal'
import PackagesSection from '@/components/packages-section'
import PackageCalculator from '@/components/package-calculator'
import ProcessSection from '@/components/process-section'
import KnowledgeSeries from '@/components/knowledge-series'
import TrustSection from '@/components/trust-section'
import CertificationsSection from '@/components/certifications-section'
import FooterSection from '@/components/footer-section'
import InteractiveHeroBottle from '@/components/interactive-hero-bottle'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShieldCheck, Truck, Calendar, Sparkles, MessageCircle } from 'lucide-react'
import { useLanguage } from '@/context/language'

export default function Home() {
  const { t } = useLanguage()

  // Section 04 — Why WATLYS Cards
  const whyWatlysCards = [
    {
      title: 'PURE & HYGIENIC',
      desc: 'Quality-focused water and bottle handling.',
      icon: ShieldCheck,
    },
    {
      title: 'RELIABLE DELIVERY',
      desc: 'Water delivered according to your schedule.',
      icon: Truck,
    },
    {
      title: 'FLEXIBLE PLANS',
      desc: 'Weekly, monthly or custom options.',
      icon: Calendar,
    },
    {
      title: 'MADE FOR MODERN LIVING',
      desc: 'Simple recurring water delivery for homes and businesses.',
      icon: Sparkles,
    },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-[#111111] dark:text-[#FAFAFA] flex flex-col overflow-x-hidden transition-colors duration-400 font-sans">
      
      {/* NAVBAR — UNTOUCHED */}
      <Navbar />

      {/* HERO SECTION — UNTOUCHED & APPROVED */}
      <section className="relative w-full min-h-screen flex items-center justify-center bg-white dark:bg-[#0A0A0A] overflow-hidden pt-20 pb-12">
        <div className="max-w-5xl mx-auto px-6 text-center flex flex-col items-center justify-center space-y-6 relative z-10 w-full">
          
          {/* Centered Interactive 19L Bottle */}
          <div className="w-full flex justify-center items-center">
            <InteractiveHeroBottle />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4 max-w-2xl mx-auto"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#0064D0] font-sans">
              PAKISTAN’S PREMIER 19L WATER BOTTLE
            </span>
            <h1 className="text-4xl sm:text-7xl font-serif font-light text-zinc-900 dark:text-[#FAFAFA] tracking-wide leading-[1.08]">
              {t.hero.tagline}
            </h1>
            <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed font-light max-w-xl mx-auto font-sans">
              {t.hero.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-col sm:flex-row justify-center gap-4 pt-2"
          >
            <Link
              href="/order"
              className="inline-flex items-center justify-center px-10 py-4 bg-[#0064D0] hover:bg-[#0052ad] text-white text-xs font-bold uppercase tracking-[0.25em] rounded-xl transition-all duration-300 shadow-md font-sans"
            >
              {t.hero.ctaOrder}
            </Link>
            <a
              href="https://wa.me/923001234567?text=Hi%20Watlys%20I%20want%20to%20order%2019L%20drinking%20water%20bottles"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-xl transition-all duration-300 shadow-md font-sans space-x-2"
            >
              <MessageCircle size={16} />
              <span>{t.hero.ctaWhatsapp}</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* SECTION 01 — PACKAGES */}
      <PackagesSection />

      {/* SECTION 02 — CUSTOM PACKAGE CALCULATOR */}
      <PackageCalculator />

      {/* SECTION 03 — OUR PROCESS (SCROLL STORYTELLING) */}
      <ProcessSection />

      {/* SECTION 04 — WHY WATLYS */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full border-t border-zinc-200/40 dark:border-zinc-800/40 bg-white dark:bg-[#0A0A0A]">
        <div className="text-center space-y-4 mb-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#0064D0] font-sans">
            THE WATLYS ADVANTAGE
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-zinc-900 dark:text-white">
            Why Choose WATLYS?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyWatlysCards.map((card, idx) => {
            const IconComp = card.icon
            return (
              <div
                key={idx}
                className="group p-8 bg-zinc-50/60 dark:bg-[#111111] border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl space-y-4 shadow-sm hover:border-[#0064D0] transition-all duration-300"
              >
                <div className="inline-flex p-3.5 rounded-xl bg-white dark:bg-[#0A0A0A] border border-zinc-200/40 dark:border-zinc-800 text-[#0064D0] group-hover:scale-105 transition-transform">
                  <IconComp size={22} />
                </div>
                <h3 className="text-sm font-bold tracking-widest text-zinc-900 dark:text-white uppercase font-sans">
                  {card.title}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light leading-relaxed font-sans">
                  {card.desc}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* SECTION 05 — WATER INSIGHTS / NEWSLETTER */}
      <KnowledgeSeries />

      {/* SECTION 06 — TRUSTED BY CLIENTS */}
      <TrustSection />

      {/* SECTION 07 — CERTIFICATIONS / QUALITY */}
      <CertificationsSection />

      {/* SECTION 08 — FINAL CTA */}
      <section className="relative py-24 px-6 bg-white dark:bg-[#0A0A0A] text-zinc-900 dark:text-white text-center overflow-hidden border-t border-zinc-200/60 dark:border-zinc-800/60 transition-colors duration-400">
        
        {/* Background Water Radial Glow */}
        <div className="absolute inset-0 pointer-events-none opacity-15 flex items-center justify-center">
          <div className="w-[500px] h-[500px] rounded-full bg-[#0064D0] blur-3xl" />
        </div>

        <div className="max-w-3xl mx-auto space-y-6 relative z-10 font-sans">
          <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#0064D0]">
            START YOUR SUBSCRIPTION
          </span>
          <h2 className="text-4xl sm:text-6xl font-serif font-light text-zinc-900 dark:text-white tracking-wide">
            Your Water. Your Schedule.
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-light max-w-xl mx-auto leading-relaxed">
            Choose a plan that works for you and get 19L drinking water delivered to your doorstep.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link
              href="/order"
              className="px-10 py-4 bg-[#0064D0] hover:bg-[#0052ad] text-white text-xs font-bold uppercase tracking-[0.25em] rounded-xl transition-all shadow-md"
            >
              Order Water
            </Link>
            <a
              href="#calculator"
              className="px-8 py-4 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white text-xs font-bold uppercase tracking-[0.2em] rounded-xl border border-zinc-200 dark:border-zinc-800 transition-all"
            >
              Build a Custom Plan
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 09 — FOOTER */}
      <FooterSection />

    </div>
  )
}
