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
    <div className="min-h-screen bg-background text-foreground flex flex-col pt-24 transition-colors duration-300">
      <Navbar />

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-8 lg:px-16 py-12 space-y-16">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-[0.25em] text-primary">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <span className="text-zinc-400">Quality Certifications</span>
        </div>

        {/* Hero Header */}
        <div className="space-y-6 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 text-primary">
            <Award size={28} />
          </div>
          <h1 className="page-title font-light text-foreground tracking-wide">
            Certified Quality Standards
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base font-light leading-relaxed">
            Our geological water sources and bottling processes undergo independent quarterly audits by internationally recognized accreditation bodies.
          </p>
        </div>

        {/* Certifications List */}
        <div className="space-y-6">
          {certifications.map((cert, idx) => (
            <div
              key={idx}
              className="p-8 bg-card border border-border rounded-2xl space-y-4 shadow-sm flex flex-col sm:flex-row items-start gap-6"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <cert.icon size={24} />
              </div>
              <div className="space-y-2 flex-1">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                  <h3 className="text-xl font-bold text-foreground">{cert.title}</h3>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider bg-primary/10 px-2.5 py-0.5 rounded border border-primary/20">
                    {cert.code}
                  </span>
                </div>
                <span className="text-xs font-semibold text-zinc-400 block">{cert.authority}</span>
                <p className="text-xs text-muted-foreground font-light leading-relaxed pt-1">
                  {cert.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Download PDF Audit Reports */}
        <div className="p-6 sm:p-7 bg-background dark:bg-card border border-border rounded-2xl text-center space-y-6">
          <h3 className="text-2xl font-serif font-light text-foreground">Download Full Lab Audit Certificates</h3>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            Access our latest unedited chemical laboratory assay reports and ISO compliance documentation.
          </p>
          <div className="pt-2">
            <Link
              href="/about#reports"
              className="px-8 py-4 bg-primary hover:bg-primary-hover text-primary-foreground rounded-xl font-bold text-xs uppercase tracking-[0.2em] inline-flex items-center justify-center space-x-2 transition-all shadow-md"
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
