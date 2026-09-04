'use client';

import React from 'react';
import Navbar from '@/components/navbar';
import PackagesSection from '@/components/packages-section';
import PackageCalculator from '@/components/package-calculator';
import ProcessSection from '@/components/process-section';
import KnowledgeSeries from '@/components/knowledge-series';
import TrustSection from '@/components/trust-section';
import CertificationsSection from '@/components/certifications-section';
import FooterSection from '@/components/footer-section';
import Responsive3DBottleHero from '@/components/antigravity-bottle';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Calendar, Sparkles, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/context/language';

export default function Home() {
  const { t } = useLanguage();

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
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-slate-50 via-white to-sky-50/30 dark:from-[#0A0A0A] dark:via-[#0A0A0A] dark:to-[#0A0A0A] text-[#111111] dark:text-[#FAFAFA] flex flex-col overflow-x-hidden transition-colors duration-400 font-sans">

      {/* NAVBAR */}
      <Navbar />

      {/* HERO SECTION WITH FLUID TYPOGRAPHY & 3D BOTTLE */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20 pb-12 px-4 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto text-center flex flex-col items-center justify-center space-y-6 relative z-10 w-full">

          {/* Centered Responsive 3D 19L Bottle Component */}
          <div className="w-full flex justify-center items-center">
            <Responsive3DBottleHero />
          </div>

          {/* Fluid Typography Headlines & Subtitles */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4 max-w-3xl mx-auto px-2"
          >
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.35em] text-[#0064D0] font-sans">
              PAKISTAN’S PREMIER 19L WATER BOTTLE
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-[#FAFAFA] leading-[1.08]">
              {t.hero.tagline}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-zinc-400 leading-relaxed font-light max-w-xl mx-auto font-sans">
              {t.hero.subtitle}
            </p>
          </motion.div>

          {/* Responsive CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full sm:w-auto pt-2"
          >
            <Link
              href="/order"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 sm:px-10 py-4 bg-[#0064D0] hover:bg-[#0052ad] text-white text-xs font-bold uppercase tracking-[0.25em] rounded-2xl transition-all duration-300 shadow-xl shadow-[#0064D0]/20 font-sans"
            >
              {t.hero.ctaOrder}
            </Link>
            <a
              href="https://wa.me/923001234567?text=Hi%20Watlys%20I%20want%20to%20order%2019L%20drinking%20water%20bottles"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-2xl transition-all duration-300 shadow-xl shadow-[#25D366]/20 font-sans space-x-2"
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

      {/* SECTION 03 — OUR PROCESS */}
      <ProcessSection />

      {/* SECTION 04 — WHY WATLYS (RESPONSIVE CARDS & GRID SYSTEM WITH GLASSMORPHISM) */}
      <section className="py-20 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full border-t border-slate-200/50 dark:border-zinc-800/50">
        <div className="text-center space-y-4 mb-16">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.35em] text-[#0064D0] font-sans">
            THE WATLYS ADVANTAGE
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white">
            Why Choose WATLYS?
          </h2>
        </div>

        {/* Dynamic Responsive Grid System */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
          {whyWatlysCards.map((card, idx) => {
            const IconComp = card.icon;
            return (
              <div
                key={idx}
                className="group p-6 sm:p-8 bg-white/80 dark:bg-[#111111]/80 backdrop-blur-md border border-slate-100 dark:border-zinc-800 shadow-xl shadow-sky-950/5 rounded-3xl space-y-4 hover:border-[#0064D0] dark:hover:border-[#0064D0] active:scale-[1.02] active:border-[#0064D0] touch-manipulation transition-all duration-300"
              >
                <div className="inline-flex p-3.5 rounded-2xl bg-sky-50 dark:bg-[#1A1A1A] border border-sky-100 dark:border-zinc-800 text-[#0064D0] group-hover:scale-105 transition-transform">
                  <IconComp size={22} />
                </div>
                <h3 className="text-sm font-bold tracking-widest text-slate-900 dark:text-white uppercase font-sans">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 font-light leading-relaxed font-sans">
                  {card.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 05 — KNOWLEDGE SERIES */}
      <KnowledgeSeries />

      {/* SECTION 06 — TRUSTED BY CLIENTS */}
      <TrustSection />

      {/* SECTION 07 — CERTIFICATIONS */}
      <CertificationsSection />

      {/* SECTION 08 — FINAL CTA */}
      <section className="relative py-24 px-4 sm:px-8 lg:px-12 bg-white/60 dark:bg-[#0A0A0A] text-slate-900 dark:text-white text-center overflow-hidden border-t border-slate-200/50 dark:border-zinc-800/50">
        <div className="absolute inset-0 pointer-events-none opacity-15 flex items-center justify-center">
          <div className="w-[500px] h-[500px] rounded-full bg-[#0064D0] blur-3xl" />
        </div>

        <div className="max-w-3xl mx-auto space-y-6 relative z-10 font-sans px-2">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.35em] text-[#0064D0]">
            START YOUR SUBSCRIPTION
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-semibold text-slate-900 dark:text-white tracking-wide">
            Your Water. Your Schedule.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 font-light max-w-xl mx-auto leading-relaxed">
            Choose a plan that works for you and get 19L drinking water delivered to your doorstep.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link
              href="/order"
              className="px-10 py-4 bg-[#0064D0] hover:bg-[#0052ad] text-white text-xs font-bold uppercase tracking-[0.25em] rounded-2xl transition-all shadow-xl shadow-[#0064D0]/20"
            >
              Order Water
            </Link>
            <a
              href="#calculator"
              className="px-8 py-4 bg-white/80 dark:bg-zinc-900 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-900 dark:text-white text-xs font-bold uppercase tracking-[0.2em] rounded-2xl border border-slate-200 dark:border-zinc-800 transition-all shadow-sm"
            >
              Build a Custom Plan
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 09 — FOOTER */}
      <FooterSection />

    </div>
  );
}
