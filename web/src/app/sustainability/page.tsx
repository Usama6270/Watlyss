'use client'

import React from 'react'
import Navbar from '@/components/navbar'
import FooterSection from '@/components/footer-section'
import Link from 'next/link'
import Image from 'next/image'
import { Leaf, ShieldCheck, RefreshCw, ArrowRight, Heart } from 'lucide-react'

export default function SustainabilityPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-zinc-900 dark:text-[#FAFAFA] flex flex-col pt-24 transition-colors duration-400">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 space-y-20">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-[0.25em] text-[#0064D0]">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <span className="text-zinc-400">Sustainability</span>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.3em] text-[#0064D0] bg-[#0064D0]/10 px-3.5 py-1.5 rounded-full border border-[#0064D0]/20">
              ECOLOGICAL STEWARDSHIP
            </span>
            <h1 className="text-4xl sm:text-6xl font-serif font-light text-zinc-900 dark:text-white tracking-wide">
              Zero Plastic. 100% Recyclable Glass.
            </h1>
            <p className="text-zinc-550 dark:text-zinc-400 text-sm sm:text-base font-light leading-relaxed">
              Watlys is built to eliminate single-use plastic pollution. By enclosing pristine mineral water exclusively in lead-free, infinitely recyclable glass containers, we safeguard both personal health and planetary ecology.
            </p>
          </div>

          <div className="lg:col-span-6 relative aspect-square sm:h-[450px] bg-zinc-50 dark:bg-[#111111] rounded-2xl overflow-hidden border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm">
            <Image
              src="https://images.unsplash.com/photo-1555529733-0e670560f7e1?auto=format&fit=crop&w=1000&q=80"
              alt="Sustainability Aquifer Stewardship"
              fill
              className="object-cover grayscale"
            />
          </div>
        </div>

        {/* Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white dark:bg-[#111111] border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl space-y-3">
            <RefreshCw className="text-[#0064D0]" size={24} />
            <h3 className="text-xl font-serif font-light text-zinc-900 dark:text-white">Infinitely Recyclable Glass</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
              Glass containers can be sterilized and reused indefinitely or recycled 100% back into new vessels without loss of quality.
            </p>
          </div>
          <div className="p-8 bg-white dark:bg-[#111111] border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl space-y-3">
            <Leaf className="text-[#0064D0]" size={24} />
            <h3 className="text-xl font-serif font-light text-zinc-900 dark:text-white">Aquifer Protection Protocol</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
              We extract less than 15% of annual natural rainfall recharge rates, ensuring geological springs remain preserved for future generations.
            </p>
          </div>
          <div className="p-8 bg-white dark:bg-[#111111] border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl space-y-3">
            <Heart className="text-[#0064D0]" size={24} />
            <h3 className="text-xl font-serif font-light text-zinc-900 dark:text-white">Carbon-Neutral Bottling</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
              Our source bottling facilities operate on 100% solar and hydroelectric power, eliminating carbon emissions during filling.
            </p>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  )
}
