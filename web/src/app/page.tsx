'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/navbar';
import HeroScrollCanvas from '@/components/HeroScrollCanvas';
import PackagesSection from '@/components/packages-section';
import Link from 'next/link';
import { useLanguage } from '@/context/language';

// Dynamic Lazy Imports for Below-the-fold Heavy Components (Code-Splitting Optimization)
const PackageCalculator = dynamic(() => import('@/components/package-calculator'), { ssr: false });
const ProcessSection = dynamic(() => import('@/components/process-section'));
const IndustryBriefingSection = dynamic(() => import('@/components/industry-briefing-section'));
const WhyWatlysSection = dynamic(() => import('@/components/why-watlys-section'));
const KnowledgeSeries = dynamic(() => import('@/components/knowledge-series'));
const TrustSection = dynamic(() => import('@/components/trust-section'));
const CertificationsSection = dynamic(() => import('@/components/certifications-section'));
const FinalCtaSection = dynamic(() => import('@/components/final-cta-section'));
const MapSection = dynamic(() => import('@/components/map-section'), { ssr: false });
const FooterSection = dynamic(() => import('@/components/footer-section'));

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="w-full min-h-screen overflow-x-clip bg-[#FAF9F6] dark:bg-[#0a1128] text-slate-900 dark:text-[#f8fafc] transition-colors duration-300 font-sans">

      {/* NAVBAR */}
      <Navbar />

      {/* HERO SCROLL CANVAS SEQUENCE */}
      <HeroScrollCanvas />

      {/* SECTION 01 — CURATED HYDRATION PLANS & CUSTOM CALCULATOR (INTERACTIVE CAROUSEL TOGGLE) */}
      <PackagesSection />

      {/* SECTION 03 — OUR PROCESS */}
      <ProcessSection />

      {/* SECTION 04 — WHY WATLYS (INFINITE MARQUEE CAROUSEL WITH HOVER PAUSE & INTERACTIVE MODAL) */}
      <WhyWatlysSection />

      {/* SECTION 07 — CERTIFICATIONS */}
      <CertificationsSection />

      {/* SECTION 08 — FINAL CTA (INTERACTIVE HOVER BLUE & PATTERN SPOTLIGHT LIKE FOOTER) */}
      <FinalCtaSection />

      {/* SECTION 08.5 — 3D ISLAMABAD & REGIONAL MAP SECTION */}
      <MapSection />

      {/* SECTION 08.8 — WATLYS JOURNAL & GAZETTE (PLACED RIGHT ABOVE FOOTER AT THE VERY END) */}
      <IndustryBriefingSection />

      {/* SECTION 09 — FOOTER */}
      <FooterSection />

    </main>
  );
}
