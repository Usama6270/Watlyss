import React from 'react'
import Navbar from '@/components/navbar'
import FooterSection from '@/components/footer-section'
import Link from 'next/link'
import { Download, ShieldCheck, Droplet, CheckCircle2, ArrowLeft, FileText, Sparkles, ExternalLink } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pakistan Water Industry Report (2026): Quality Trends, Sourcing & What You Need to Know | Watlys',
  description: 'Comprehensive analysis of PCRWR water test audit in Pakistan, northern spring TDS metrics, microplastic safety, and certified purification standards.',
  keywords: ['PCRWR water test Pakistan', 'bottled water safety Islamabad', 'mineral water TDS levels', 'Watlys water purity', 'Pakistan water report 2026'],
  openGraph: {
    title: 'Pakistan Water Industry Report (2026): Quality Trends & Sourcing',
    description: 'PCRWR audit findings, northern vs. southern aquifer analysis, and essential hydration safety guidance for Pakistani families.',
    type: 'article',
    url: 'https://watlys.com/insights/pakistan-mineral-water-briefing',
  },
}

export default function IndustryReportArticlePage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#0a1128] text-slate-900 dark:text-[#f8fafc] flex flex-col pt-24 font-sans transition-colors duration-300">
      <Navbar />

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
        
        {/* Back Link */}
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-[0.2em] text-[#0064D0]">
          <Link href="/#industry-briefing" className="inline-flex items-center space-x-1 hover:underline">
            <ArrowLeft size={14} />
            <span>Back to Home Briefing</span>
          </Link>
          <span>/</span>
          <span className="text-slate-400">Industry Report 2026</span>
        </div>

        {/* TOP DOWNLOAD CTA BOX */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-[#0064D0] to-sky-700 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="p-3.5 bg-white/10 backdrop-blur-md rounded-2xl shrink-0">
              <FileText size={32} />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-sky-200 block">
                OFFICIAL RESEARCH PUBLICATION (JULY–SEPT 2026)
              </span>
              <h2 className="text-base sm:text-lg font-serif font-bold">
                Pakistan Water & Mineral Water Monthly Briefing
              </h2>
              <p className="text-xs text-sky-100 font-light">
                Download the complete 6-page PDF document for lab tables & audit stats.
              </p>
            </div>
          </div>

          <a
            href="/docs/Pakistan_Mineral_Water_Newsletter.pdf"
            download="Pakistan_Mineral_Water_Newsletter.pdf"
            className="w-full sm:w-auto px-6 py-3.5 bg-white text-[#0064D0] hover:bg-sky-50 font-bold text-xs uppercase tracking-widest rounded-2xl transition-all shadow-lg text-center shrink-0 inline-flex items-center justify-center space-x-2"
          >
            <Download size={16} />
            <span>Download PDF Version</span>
          </a>
        </div>

        {/* ARTICLE HEADER */}
        <header className="space-y-4 border-b border-slate-200 dark:border-slate-800 pb-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#0064D0]/10 text-[#0064D0] dark:text-sky-400 text-[10px] font-bold uppercase tracking-wider">
            <Sparkles size={12} />
            <span>SPECIAL FEATURE ARTICLE</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 dark:text-white leading-tight">
            Pakistan Water Industry Report (2026): Quality Trends, Sourcing & What You Need to Know
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span>By Watlys Hydro-Research Team</span>
            <span>•</span>
            <span>Published: September 2026</span>
            <span>•</span>
            <span>Read Time: 8 min read</span>
          </div>
        </header>

        {/* MAIN BODY CONTENT */}
        <article className="prose dark:prose-invert max-w-none space-y-8 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          
          {/* SECTION 1 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-white border-l-4 border-[#0064D0] pl-4">
              1. PCRWR Quality Audit: 29 Bottled Water Brands Flagged as Unsafe
            </h2>
            <p>
              In the latest quarterly evaluation released by the <strong>Pakistan Council of Research in Water Resources (PCRWR)</strong>, nationwide testing of bottled water samples collected from Islamabad, Lahore, Karachi, Peshawar, and Quetta revealed alarming safety deficiencies.
            </p>
            <p>
              A total of <strong>29 commercial brands</strong> were declared unfit for human consumption due to high microbial counts and chemical imbalances.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Bacterial Hazards:</strong> Contamination with <em>Pseudomonas aeruginosa</em> and coliform bacteria, posing gastroenteritis and infection risks to vulnerable groups.
              </li>
              <li>
                <strong>High Sodium Disparity:</strong> Multiple brands exceeded permissible sodium limits (over 50 mg/L), unsuitable for individuals managing hypertension.
              </li>
              <li>
                <strong>Absence of Batch Testing:</strong> Small-scale unauthorized suppliers lack automated multi-stage UV and ozone disinfections.
              </li>
            </ul>
          </section>

          {/* WATLYS SAFETY BOX 1 */}
          <div className="p-6 sm:p-8 bg-sky-50 dark:bg-[#131c38] border border-sky-200 dark:border-slate-800 rounded-3xl space-y-3 shadow-md">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#0064D0] block">
              WATLYS BRAND TIE-IN
            </span>
            <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <ShieldCheck size={20} className="text-[#0064D0]" />
              <span>How Watlys Guarantees Safety</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
              Watlys enforces zero-compromise purification standards. Our 19L bottles pass through a 9-stage purification cycle featuring medical-grade reverse osmosis, active carbon adsorption, twin UV-C sterilizers, and online ozone dosing. Every bottle features a tamper-evident seal and batch QR code verifying PSQCA & PCRWR compliance.
            </p>
          </div>

          {/* SECTION 2 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-white border-l-4 border-[#0064D0] pl-4">
              2. Sourcing Disparities: Northern Springs vs. Saline Groundwater
            </h2>
            <p>
              Geological analysis confirms that location determines raw water quality. Northern mountain aquifers fed by snowmelt and natural granite filtering maintain ideal mineral conductivity averaging <strong>~200 mg/L TDS</strong>.
            </p>
            <p>
              Conversely, deep urban wells in southern agricultural and coastal plains encounter severe mineral hardness and industrial heavy metal leaching, making raw water treatment significantly more intensive.
            </p>
          </section>

          {/* WATLYS SAFETY BOX 2 */}
          <div className="p-6 sm:p-8 bg-sky-50 dark:bg-[#131c38] border border-sky-200 dark:border-slate-800 rounded-3xl space-y-3 shadow-md">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#0064D0] block">
              WATLYS BRAND TIE-IN
            </span>
            <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <Droplet size={20} className="text-[#0064D0]" />
              <span>How Watlys Guarantees Optimal Sourcing</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
              Watlys selects subterranean aquifer sources rich in natural electrolytes (Calcium, Magnesium, and Bicarbonates) while removing unwanted total dissolved solids. The result is pure, refreshing water calibrated precisely to 180 mg/L TDS for optimal cellular hydration.
            </p>
          </div>

          {/* SECTION 3 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-white border-l-4 border-[#0064D0] pl-4">
              3. Consumer Myth Buster: TDS Pens Do Not Measure Bacterial Safety
            </h2>
            <p>
              Many households rely on cheap handheld TDS meters to determine water purity. However, a TDS meter only detects ionic electrical conductivity (minerals like sodium, calcium, and chloride). It is completely blind to:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Bacteria, viruses, and parasites</li>
              <li>Organic pesticides and industrial solvents</li>
              <li>Microplastic fragments</li>
            </ul>
            <p>
              Therefore, water with low TDS is not automatically safe unless it has undergone validated microbiological disinfection.
            </p>
          </section>

        </article>

        {/* EMBEDDED PDF PREVIEW / CONTAINER */}
        <div className="bg-white dark:bg-[#131c38] p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-white">
              Embedded PDF Document
            </h3>
            <a
              href="/docs/Pakistan_Mineral_Water_Newsletter.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-[#0064D0] hover:underline inline-flex items-center space-x-1"
            >
              <span>Open in new tab</span>
              <ExternalLink size={12} />
            </a>
          </div>

          <div className="w-full h-[500px] bg-slate-100 dark:bg-[#0a1128] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <iframe
              src="/docs/Pakistan_Mineral_Water_Newsletter.pdf#toolbar=1"
              title="Pakistan Water Newsletter PDF"
              className="w-full h-full border-0"
            />
          </div>
        </div>

        {/* BOTTOM DOWNLOAD CTA BOX */}
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white shadow-2xl text-center space-y-6">
          <div className="max-w-xl mx-auto space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#0064D0]">
              DOWNLOAD FULL REPORT
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold">
              Pakistan Water & Mineral Water Monthly Briefing
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-light">
              Get immediate offline access to the complete 6-page document including lab analysis and brand safety guidelines.
            </p>
          </div>

          <a
            href="/docs/Pakistan_Mineral_Water_Newsletter.pdf"
            download="Pakistan_Mineral_Water_Newsletter.pdf"
            className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-[#0064D0] hover:bg-[#0052ad] text-white font-bold text-xs uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-[#0064D0]/30 hover:scale-105"
          >
            <Download size={18} />
            <span>📄 Download Full Industry Report (PDF)</span>
          </a>
        </div>

      </main>

      <FooterSection />
    </div>
  )
}
