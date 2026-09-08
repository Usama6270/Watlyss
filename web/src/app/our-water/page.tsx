'use client'

import React from 'react'
import Navbar from '@/components/navbar'
import FooterSection from '@/components/footer-section'
import InteractiveHeroBottle from '@/components/interactive-hero-bottle'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ShieldCheck, Droplets, ArrowRight, Check, Heart, Sparkles, Truck, RefreshCw } from 'lucide-react'

export default function OurWaterPage() {
  const bottleSpecs = [
    { label: 'Volume Capacity', value: '19 Liters (5 Gallons)' },
    { label: 'pH Balance', value: '7.8 Natural Alkaline' },
    { label: 'Mineral TDS', value: '180 mg/L Bioavailable' },
    { label: 'Vessel Material', value: 'Lead-Free Sterilized Food-Grade Glass' },
    { label: 'Microplastics Level', value: '0.00% Undetected (Lab Verified)' },
    { label: 'Origin Source', value: 'Protected Subterranean Mountain Springs' },
  ]

  const hygieneSteps = [
    { title: 'Automated Triple Sanitation', desc: 'Each 19L bottle undergoes high-pressure ozonated water washing and thermal sterilization before refilling.' },
    { title: 'Nitrogen Cap Sealing', desc: 'Sealed under nitrogen barrier atmosphere to preserve freshness and eliminate air-borne exposure.' },
    { title: 'Batch QR Code Assays', desc: 'Every 19L vessel carries a batch tracking QR code linking to its 24-hour laboratory chemical report.' },
  ]

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#0a1128] text-zinc-900 dark:text-[#FAFAFA] flex flex-col pt-24 transition-colors duration-300">
      <Navbar />

      <main className="flex-1 w-full space-y-24 pb-24">
        {/* Breadcrumb & Hero Header */}
        <section className="max-w-7xl mx-auto px-6 pt-8 space-y-12">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-[0.25em] text-[#0064D0]">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span>Our Water (19L)</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-block text-[10px] font-bold uppercase tracking-[0.3em] text-[#0064D0] bg-[#0064D0]/10 px-3.5 py-1.5 rounded-full border border-[#0064D0]/20">
                THE 19L FLAGSHIP VESSEL
              </span>
              <h1 className="text-4xl sm:text-6xl font-serif font-light text-zinc-900 dark:text-white tracking-wide leading-tight">
                Watlys Premium 19-Liter Drinking Water
              </h1>
              <p className="text-zinc-550 dark:text-slate-200 text-sm sm:text-base font-light leading-relaxed">
                Single-product excellence. Sourced from protected high-altitude subterranean springs, enriched with bioavailable minerals, and enclosed in heavy-duty 19-Liter glass containers designed for Pakistani households and corporate suites.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/order"
                  className="px-8 py-4 bg-[#0064D0] hover:bg-[#0052ad] text-white rounded-xl font-bold text-xs uppercase tracking-[0.2em] inline-flex items-center justify-center space-x-2 transition-all shadow-md"
                >
                  <span>Order 19L Water</span>
                  <ArrowRight size={14} />
                </Link>
                <a
                  href="https://wa.me/923001234567?text=Hi%20Watlys%20I%20want%20to%20order%2019L%20drinking%20water%20bottles"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 border border-zinc-200 dark:border-slate-800 text-zinc-800 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-xl font-bold text-xs uppercase tracking-[0.2em] inline-flex items-center justify-center transition-all"
                >
                  WhatsApp Order
                </a>
              </div>
            </div>

            {/* Interactive 19L Bottle Preview */}
            <div className="lg:col-span-6 relative h-[480px] bg-[#FAF9F6] dark:bg-[#131c38] rounded-2xl overflow-hidden border border-zinc-200/60 dark:border-slate-800/60 shadow-sm flex items-center justify-center">
              <InteractiveHeroBottle />
            </div>
          </div>
        </section>

        {/* Specifications Matrix */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="bg-white dark:bg-[#131c38] border border-zinc-200/60 dark:border-slate-800/60 p-8 sm:p-12 rounded-2xl shadow-sm space-y-8">
            <h2 className="text-2xl sm:text-3xl font-serif font-light text-zinc-900 dark:text-white">
              19-Liter Bottle Specifications & Assay
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bottleSpecs.map((spec, idx) => (
                <div key={idx} className="p-6 bg-zinc-50 dark:bg-[#0a1128] border border-zinc-200/40 dark:border-slate-800/60 rounded-xl space-y-2">
                  <span className="text-[10px] font-bold text-[#0064D0] uppercase tracking-wider block">{spec.label}</span>
                  <span className="text-sm font-semibold text-zinc-900 dark:text-white block">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hygiene & Sanitation Protocol */}
        <section className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#0064D0]">SAFETY GUARANTEE</span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-zinc-900 dark:text-white">
              Strict 19L Hygiene Protocol
            </h2>
            <p className="text-xs sm:text-sm text-zinc-550 dark:text-slate-200 font-light">
              We sanitize and inspect every 19L vessel to pharmaceutical standards before direct door delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {hygieneSteps.map((step, idx) => (
              <div key={idx} className="p-8 bg-white dark:bg-[#131c38] border border-zinc-200/60 dark:border-slate-800/60 rounded-2xl space-y-4 shadow-sm">
                <ShieldCheck size={24} className="text-[#0064D0]" />
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">{step.title}</h3>
                <p className="text-xs text-zinc-550 dark:text-slate-200 font-light leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final Conversion Banner */}
        <section className="max-w-4xl mx-auto px-6 text-center">
          <div className="p-12 bg-[#FAF9F6] dark:bg-[#131c38] border border-zinc-200/60 dark:border-slate-800/60 rounded-2xl space-y-6">
            <h3 className="text-3xl font-serif font-light text-zinc-900 dark:text-white">
              Ready for Clean 19L Water Delivery?
            </h3>
            <p className="text-xs text-zinc-500 dark:text-slate-200 max-w-md mx-auto">
              Select your delivery frequency and receive fresh 19-Liter water bottles delivered directly to your doorstep in Pakistan.
            </p>
            <div className="pt-2">
              <Link
                href="/order"
                className="px-8 py-4 bg-[#0064D0] hover:bg-[#0052ad] text-white rounded-xl font-bold text-xs uppercase tracking-[0.2em] inline-flex items-center justify-center space-x-2 transition-all shadow-md"
              >
                <span>Build Your 19L Plan</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  )
}
