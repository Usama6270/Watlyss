'use client'

import React from 'react'
import Navbar from '@/components/navbar'
import FooterSection from '@/components/footer-section'
import PackageCalculator from '@/components/package-calculator'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, ArrowRight, ShieldCheck, Zap, Building } from 'lucide-react'

export default function PackagesOverviewPage() {
  const packages = [
    {
      id: 'student',
      title: 'Student Hydration Plan',
      tag: 'ACTIVE ESSENTIAL',
      price: '$19.99 / mo',
      desc: 'Designed for high-performance active students and young professionals needing daily mineral balance.',
      capacity: '500ml Recyclable Glass',
      deliveries: 'Weekly refills (12 bottles/week)',
      href: '/packages/student',
      icon: Zap,
      features: [
        '12 x 500ml Glass Bottles / week',
        'Free campus & apartment delivery',
        'pH 7.8 mineral balance',
        'Zero plastic contamination',
        'Pause or cancel anytime',
      ],
    },
    {
      id: 'family',
      title: 'Family Wellness Collection',
      tag: 'POPULAR CHOICE',
      price: '$49.99 / mo',
      desc: 'Complete household hydration solution. Sourced from volcanic aquifers to keep your family healthy.',
      capacity: '1L & 1.5L Premium Vessels',
      deliveries: 'Bi-weekly refills (24 bottles/month)',
      href: '/packages/family',
      icon: ShieldCheck,
      features: [
        '24 x 1L Premier Glass Bottles / month',
        'Free home door delivery with wooden crates',
        'Optimal TDS 180 mg/L mineral profile',
        'Included stainless steel table stands',
        'Priority customer concierge support',
      ],
    },
    {
      id: 'corporate',
      title: 'Corporate Executive Suite',
      tag: 'ENTERPRISE SOLUTION',
      price: 'Custom Quote',
      desc: 'Elevate your office aesthetic and employee wellness with custom-branded glass bottles and executive chillers.',
      capacity: 'Custom Sized Glass Containers',
      deliveries: 'Daily / Flexible bulk dispatch',
      href: '/packages/corporate',
      icon: Building,
      features: [
        'Custom engraved corporate logo options',
        'High-flow glass-safe water chillers',
        'Dedicated account manager & SLA',
        'Quarterly water assay reports',
        'Flexible invoicing & tax receipts',
      ],
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
            <span>Packages</span>
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl font-serif font-light text-zinc-900 dark:text-white tracking-wide"
          >
            Watlys Hydration Plans
          </motion.h1>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto text-sm sm:text-base font-light leading-relaxed">
            Select a tailored recurring glass-bottled mineral water subscription designed for individual, household, or corporate wellness.
          </p>
        </section>

        {/* Package Grid */}
        <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="group relative flex flex-col bg-white dark:bg-[#111111] border border-zinc-200/60 dark:border-zinc-800/60 p-8 sm:p-10 rounded-2xl shadow-sm hover:border-[#0064D0] dark:hover:border-[#0064D0] transition-all duration-300"
            >
              <div className="space-y-4 flex-1">
                <span className="inline-block text-[9px] font-bold uppercase tracking-widest text-[#0064D0] bg-[#0064D0]/10 px-3 py-1 rounded-full border border-[#0064D0]/20">
                  {pkg.tag}
                </span>
                <h2 className="text-2xl font-serif font-light text-zinc-900 dark:text-white tracking-wide">{pkg.title}</h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">{pkg.desc}</p>

                <div className="pt-4 pb-6 border-b border-zinc-100 dark:border-zinc-800">
                  <span className="text-3xl font-serif font-light text-zinc-900 dark:text-white">{pkg.price}</span>
                  <span className="text-[10px] text-zinc-400 block mt-1 uppercase tracking-widest font-semibold">{pkg.deliveries}</span>
                </div>

                <ul className="space-y-3 pt-6">
                  {pkg.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center space-x-3 text-xs text-zinc-650 dark:text-zinc-300 font-light">
                      <Check size={14} className="text-[#0064D0] flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <Link
                  href={pkg.href}
                  className="w-full py-4 bg-[#0064D0] hover:bg-[#0052ad] text-white rounded-xl font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center space-x-2 transition-all shadow-sm"
                >
                  <span>Explore Plan Details</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </section>

        {/* Interactive Custom Package Calculator */}
        <PackageCalculator />
      </main>

      <FooterSection />
    </div>
  )
}
