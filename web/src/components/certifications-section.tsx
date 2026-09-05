'use client'

import React from 'react'
import { ShieldCheck, Award, FileCheck, CheckCircle2 } from 'lucide-react'

export default function CertificationsSection() {
  const certifications = [
    {
      icon: ShieldCheck,
      name: 'Laboratory Testing Assay',
      desc: '24-hour batch laboratory testing verifying TDS 180 mg/L mineral stability, pH 7.8, and 0% microplastic purity.',
      status: 'Verified Batch Protocol',
    },
    {
      icon: Award,
      name: 'Food Safety & Hygiene Standard',
      desc: 'Triple-stage ozonated high-pressure bottle sterilization and food-grade sealed vessel filling.',
      status: 'Cleanroom Certified',
    },
    {
      icon: FileCheck,
      name: 'Natural Aquifer Stewardship',
      desc: 'Sourced under strict ecological aquifer conservation guidelines, preserving mountain water tables.',
      status: 'Eco-Protected Source',
    },
    {
      icon: CheckCircle2,
      name: 'Pakistani Standards Compliance',
      desc: 'Fully compliant with national drinking water quality standards (PSQCA & PCRWR Guidelines).',
      status: 'National Standard Compliant',
    },
  ]

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto w-full border-t border-zinc-200/40 dark:border-slate-800/60 bg-white dark:bg-[#0b1329] transition-colors duration-300 font-sans">
      <div className="text-center space-y-3 sm:space-y-4 mb-10 sm:mb-14">
        <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#0064D0]">
          CERTIFICATIONS & QUALITY CONTROL
        </span>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-zinc-900 dark:text-white leading-tight">
          Quality You Can Trust.
        </h2>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-slate-200 font-light max-w-lg mx-auto">
          Every batch of Watlys 19L drinking water undergoes rigorous testing and compliance procedures.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {certifications.map((cert, idx) => {
          const IconComponent = cert.icon
          return (
            <div
              key={idx}
              className="p-6 bg-zinc-50/70 dark:bg-[#162447]/90 border border-zinc-200/60 dark:border-slate-700/60 rounded-2xl space-y-4 flex flex-col justify-between shadow-lg shadow-black/10 hover:border-[#0064D0] transition-colors"
            >
              <div className="space-y-3">
                <div className="inline-flex p-3 rounded-xl bg-[#0064D0]/10 text-[#0064D0]">
                  <IconComponent size={24} />
                </div>
                <h3 className="text-base font-serif font-light text-zinc-900 dark:text-white">{cert.name}</h3>
                <p className="text-xs text-zinc-600 dark:text-slate-200 font-light leading-relaxed">
                  {cert.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-200/40 dark:border-slate-800/60">
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#0064D0]">
                  ✓ {cert.status}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
