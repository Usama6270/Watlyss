'use client'

import React from 'react'
import Navbar from '@/components/navbar'
import FooterSection from '@/components/footer-section'
import Link from 'next/link'
import { Award, ShieldCheck, Heart, Download, Check, ArrowRight } from 'lucide-react'

export default function CertificationsPage() {
  const certifications = [
    {
      title: 'ISO 9001:2015 Quality Management System',
      authority: 'International Organization for Standardization',
      code: 'CERT-ISO-9001-HYDRO-2026',
      desc: 'Certifies that Watlys bottling facilities adhere to strict global quality control, hygienic sanitation, and batch tracking standards.',
      icon: ShieldCheck,
    },
    {
      title: 'WHO Drinking Water Guidelines Compliance',
      authority: 'World Health Organization Standards',
      code: 'CERT-WHO-SAFE-2026',
      desc: 'Verifies that mineral composition, TDS levels (180 mg/L), and microbiological purity meet WHO guidelines for optimal daily human consumption.',
      icon: Award,
    },
    {
      title: 'Zero Plastic & Eco Packaging Verification',
      authority: 'Global Environmental Protection Alliance',
      code: 'CERT-ECO-GLASS-001',
      desc: 'Validates that 100% of primary containers are lead-free glass and zero single-use PET polymers are utilized across the entire supply chain.',
      icon: Heart,
    },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a1128] text-zinc-900 dark:text-[#FAFAFA] flex flex-col pt-24 transition-colors duration-300">
      <Navbar />

      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-12 space-y-16">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-[0.25em] text-[#0064D0]">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <span className="text-zinc-400">Quality Certifications</span>
        </div>

        {/* Hero Header */}
        <div className="space-y-6 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-[#0064D0]/10 text-[#0064D0]">
            <Award size={28} />
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-light text-zinc-900 dark:text-white tracking-wide">
            Certified Quality Standards
          </h1>
          <p className="text-zinc-550 dark:text-slate-200 text-sm sm:text-base font-light leading-relaxed">
            Our geological water sources and bottling processes undergo independent quarterly audits by internationally recognized accreditation bodies.
          </p>
        </div>

        {/* Certifications List */}
        <div className="space-y-6">
          {certifications.map((cert, idx) => (
            <div
              key={idx}
              className="p-8 bg-white dark:bg-[#131c38] border border-zinc-200/60 dark:border-slate-800/60 rounded-2xl space-y-4 shadow-sm flex flex-col sm:flex-row items-start gap-6"
            >
              <div className="w-12 h-12 rounded-xl bg-[#0064D0]/10 flex items-center justify-center text-[#0064D0] flex-shrink-0">
                <cert.icon size={24} />
              </div>
              <div className="space-y-2 flex-1">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white">{cert.title}</h3>
                  <span className="text-[10px] font-bold text-[#0064D0] uppercase tracking-wider bg-[#0064D0]/10 px-2.5 py-0.5 rounded border border-[#0064D0]/20">
                    {cert.code}
                  </span>
                </div>
                <span className="text-xs font-semibold text-zinc-400 block">{cert.authority}</span>
                <p className="text-xs text-zinc-550 dark:text-slate-200 font-light leading-relaxed pt-1">
                  {cert.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Download PDF Audit Reports */}
        <div className="p-10 bg-zinc-50 dark:bg-[#131c38] border border-zinc-200/60 dark:border-slate-800/60 rounded-2xl text-center space-y-6">
          <h3 className="text-2xl font-serif font-light text-zinc-900 dark:text-white">Download Full Lab Audit Certificates</h3>
          <p className="text-xs text-zinc-500 dark:text-slate-200 max-w-md mx-auto">
            Access our latest unedited chemical laboratory assay reports and ISO compliance documentation.
          </p>
          <div className="pt-2">
            <Link
              href="/about#reports"
              className="px-8 py-4 bg-[#0064D0] hover:bg-[#0052ad] text-white rounded-xl font-bold text-xs uppercase tracking-[0.2em] inline-flex items-center justify-center space-x-2 transition-all shadow-md"
            >
              <span>Download Assay Certificate (PDF)</span>
              <Download size={14} />
            </Link>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  )
}
