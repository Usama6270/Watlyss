'use client'

import React from 'react'
import Navbar from '@/components/navbar'
import FooterSection from '@/components/footer-section'
import Link from 'next/link'
import { Droplets, ShieldCheck, Download, ArrowRight, Activity, Check } from 'lucide-react'

export default function WaterTestingPage() {
  const testParameters = [
    { name: 'pH Level', standard: '6.5 - 8.5', watlys: '7.8 (Natural Alkaline)', importance: 'Protects body cellular acid-alkaline balance.' },
    { name: 'Total Dissolved Solids (TDS)', standard: '100 - 300 mg/L', watlys: '180 mg/L Optimal', importance: 'Ensures optimal trace mineral conductivity.' },
    { name: 'Heavy Metals (Lead, Arsenic)', standard: '< 0.01 mg/L', watlys: 'Undetected (0.00%)', importance: 'Guarantees protection from industrial pollutants.' },
    { name: 'Microplastics', standard: '0%', watlys: 'Undetected (0.00%)', importance: 'Eliminates synthetic polymer ingestion risk.' },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col pt-24 transition-colors duration-300">
      <Navbar />

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-8 lg:px-16 py-12 space-y-16">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-[0.25em] text-primary">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <Link href="/services" className="hover:underline">Services</Link>
          <span>/</span>
          <span className="text-zinc-400">Water Testing & Analysis</span>
        </div>

        {/* Hero Header */}
        <div className="space-y-6 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 text-primary">
            <Droplets size={28} />
          </div>
          <h1 className="page-title font-light text-foreground tracking-wide">
            Chemical & TDS Assay Testing
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base font-light leading-relaxed">
            We believe in total scientific transparency. Our certified hydro-chemists conduct continuous batch assays on every aquifer collection, verifying TDS balance, pH levels, and zero microplastic purity.
          </p>
        </div>

        {/* Assay Table */}
        <div className="space-y-6 bg-card border border-border p-8 rounded-2xl shadow-sm">
          <h2 className="text-xl font-bold text-foreground">Assay Report Parameters</h2>
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-xs font-light">
              <thead>
                <tr className="border-b border-border text-[9px] uppercase tracking-wider text-zinc-400 font-bold">
                  <th className="py-3">Parameter Analyzed</th>
                  <th className="py-3">WHO Regulatory Standard</th>
                  <th className="py-3">Watlys Certified Level</th>
                  <th className="py-3">Health Impact</th>
                </tr>
              </thead>
              <tbody>
                {testParameters.map((row, idx) => (
                  <tr key={idx} className="border-b border-border/60">
                    <td className="py-4 font-semibold text-foreground">{row.name}</td>
                    <td className="py-4 text-zinc-500">{row.standard}</td>
                    <td className="py-4 font-bold text-primary">{row.watlys}</td>
                    <td className="py-4 text-zinc-400 italic">{row.importance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Custom Water Test Request */}
        <div className="p-6 sm:p-7 bg-background dark:bg-card border border-border rounded-2xl text-center space-y-6">
          <h3 className="text-2xl font-serif font-light text-foreground">Request a Private Home Water Test</h3>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            Concerned about tap water contaminants in your residential area? Order a certified Watlys sample collection kit.
          </p>
          <div className="pt-2">
            <Link
              href="/contact?service=water-testing"
              className="px-8 py-4 bg-primary hover:bg-primary-hover text-primary-foreground rounded-xl font-bold text-xs uppercase tracking-[0.2em] inline-flex items-center justify-center space-x-2 transition-all shadow-md"
            >
              <span>Order Water Testing Kit</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  )
}
