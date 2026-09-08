'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/navbar';
import HeroScrollCanvas from '@/components/HeroScrollCanvas';
import PackagesSection from '@/components/packages-section';
import Link from 'next/link';
import { ShieldCheck, Truck, Calendar, Sparkles, Droplets, Waves } from 'lucide-react';
import { useLanguage } from '@/context/language';
import WatlysPatternHover from '@/components/watlys-pattern-hover';

// Dynamic Lazy Imports for Below-the-fold Heavy Components (Code-Splitting Optimization)
const PackageCalculator = dynamic(() => import('@/components/package-calculator'), { ssr: false });
const ProcessSection = dynamic(() => import('@/components/process-section'));
const KnowledgeSeries = dynamic(() => import('@/components/knowledge-series'));
const TrustSection = dynamic(() => import('@/components/trust-section'));
const CertificationsSection = dynamic(() => import('@/components/certifications-section'));
const MapSection = dynamic(() => import('@/components/map-section'), { ssr: false });
const FooterSection = dynamic(() => import('@/components/footer-section'));

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
    <main className="w-full min-h-screen overflow-x-clip bg-[#FAF9F6] dark:bg-[#0a1128] text-slate-900 dark:text-[#f8fafc] transition-colors duration-300 font-sans">

      {/* NAVBAR */}
      <Navbar />

      {/* HERO SCROLL CANVAS SEQUENCE */}
      <HeroScrollCanvas />

      {/* SECTION 01 — PACKAGES */}
      <PackagesSection />

      {/* SECTION 02 — CUSTOM PACKAGE CALCULATOR */}
      <PackageCalculator />

      {/* SECTION 03 — OUR PROCESS */}
      <ProcessSection />

      {/* SECTION 04 — WHY WATLYS (RESPONSIVE CARDS & GRID SYSTEM WITH GLASSMORPHISM) */}
      <section className="py-12 sm:py-20 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full border-t border-slate-200/80 dark:border-slate-800/60 bg-[#FAF9F6] dark:bg-[#0a1128] transition-colors duration-300">
        <div className="text-center space-y-3 sm:space-y-4 mb-10 sm:mb-16">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.35em] text-[#0064D0] font-sans">
            THE WATLYS ADVANTAGE
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
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
                className="group p-5 sm:p-8 bg-white dark:bg-[#131c38]/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-md shadow-slate-200/60 rounded-3xl space-y-3 sm:space-y-4 hover:border-[#0064D0] dark:hover:border-[#0064D0] active:scale-[1.02] active:border-[#0064D0] touch-manipulation transition-all duration-300"
              >
                <div className="inline-flex p-3 sm:p-3.5 rounded-2xl bg-sky-50 dark:bg-[#0a1128] border border-sky-100 dark:border-slate-800 text-[#0064D0] group-hover:scale-105 transition-transform">
                  <IconComp size={20} />
                </div>
                <h3 className="text-xs sm:text-sm font-bold tracking-widest text-slate-900 dark:text-white uppercase font-sans">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-200 font-light leading-relaxed font-sans">
                  {card.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 05 — KNOWLEDGE SERIES */}
      <KnowledgeSeries />

      {/* SECTION 07 — CERTIFICATIONS */}
      <CertificationsSection />

      {/* SECTION 08 — FINAL CTA */}
      <section className="relative py-14 sm:py-24 px-4 sm:px-8 lg:px-12 bg-[#FAF9F6] dark:bg-[#0a1128] text-slate-900 dark:text-white text-center overflow-hidden border-t border-slate-200/80 dark:border-slate-800/60 transition-colors duration-300">
        <div className="max-w-3xl mx-auto space-y-5 sm:space-y-6 relative z-10 font-sans px-2">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.35em] text-[#0064D0]">
            START YOUR SUBSCRIPTION
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-wide">
            Your Water. Your Schedule.
          </h2>
          <p className="text-xs sm:text-base text-slate-600 dark:text-slate-200 font-light max-w-xl mx-auto leading-relaxed">
            Choose a plan that works for you and get 19L drinking water delivered to your doorstep.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4">
            <Link
              href="/order"
              className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 bg-[#0064D0] hover:bg-[#0052ad] text-white text-xs font-bold uppercase tracking-[0.25em] rounded-2xl transition-all shadow-xl shadow-[#0064D0]/20 text-center"
            >
              Order Water
            </Link>
            <a
              href="#calculator"
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-white/80 dark:bg-white dark:text-black hover:dark:bg-slate-100 text-slate-900 text-xs font-bold uppercase tracking-[0.2em] rounded-2xl border border-slate-200 dark:border-white transition-all shadow-sm text-center"
            >
              Build a Custom Plan
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 08.5 — 3D ISLAMABAD & REGIONAL MAP SECTION */}
      <MapSection />

      {/* SECTION 09 — FOOTER */}
      <FooterSection />

    </main>
  );
}
