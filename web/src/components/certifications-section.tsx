'use client'

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Award, FileCheck, CheckCircle2, X, ArrowUpRight, Check, Droplet, Sparkles, Microchip } from 'lucide-react'

interface Certification {
  id: string
  name: string
  status: string
  shortTag: string
  desc: string
  icon: React.ElementType
  tds: string
  ph: string
  compliance: string
  protocols: string[]
  specs: { label: string; value: string }[]
}

const CERTIFICATIONS: Certification[] = [
  {
    id: 'lab-assay',
    name: 'Laboratory Testing Assay',
    status: 'Verified Batch Protocol',
    shortTag: '24/7 QC Lab Batching',
    desc: 'Every single batch of Watlys 19L drinking water undergoes 24-hour continuous laboratory assay testing. Our certified microbiologists verify zero pathogen count, mineral equilibrium, microplastic filtration, and heavy metal absence prior to dispatch.',
    icon: ShieldCheck,
    tds: '140 - 180 mg/L',
    ph: '7.8 - 8.2 (Mildly Alkaline)',
    compliance: 'PSQCA & WHO Compliant',
    protocols: [
      'Daily 24-hour incubation & pathogen screening',
      'Continuous TDS & Electrical Conductivity inline sensors',
      'Sub-micron zero microplastic membrane filtration'
    ],
    specs: [
      { label: 'Testing Frequency', value: 'Every 2 Hours / Hourly Batch' },
      { label: 'Lab Standard', value: 'ISO 17025 Accredited Methodology' },
      { label: 'Microplastic Purity', value: '0.00% (Absolute Zero Detection)' }
    ]
  },
  {
    id: 'food-hygiene',
    name: 'Food Safety & Hygiene Standard',
    status: 'Cleanroom Certified',
    shortTag: 'HACCP & ISO 22000 Class 100',
    desc: 'Bottling operations are performed inside a Class 100 sterile positive-pressure cleanroom. Bottles undergo a 9-step hydro-thermal wash with ozonated high-pressure rinsing and automated touchless vessel sealing.',
    icon: Award,
    tds: '150 mg/L Balanced',
    ph: '8.0 Ideal Hydration',
    compliance: 'HACCP & ISO 22000 Certified',
    protocols: [
      'Triple-stage ozonated high-pressure bottle sterilization',
      'Touchless filling in positive-pressure cleanroom',
      'Tamper-evident medical grade shrink seal'
    ],
    specs: [
      { label: 'Cleanroom Standard', value: 'Class 100 (ISO Class 5 Equivalent)' },
      { label: 'Ozone Concentration', value: '0.4 ppm O3 Sterilization' },
      { label: 'Cap Integrity', value: 'Automated Ultrasonic Seal Verification' }
    ]
  },
  {
    id: 'aquifer-stewardship',
    name: 'Natural Aquifer Stewardship',
    status: 'Eco-Protected Source',
    shortTag: 'Deep Aquifer Protection',
    desc: 'Our source water is drawn from deep protected artesian aquifers below sub-surface rock strata. Rigorous environmental stewardship ensures ecological balance, preventing over-extraction while preserving mountain water tables.',
    icon: FileCheck,
    tds: 'Natural Mineral Balance',
    ph: '7.9 Pristine pH',
    compliance: 'Environmental Protection Agency (EPA)',
    protocols: [
      'Hydrogeological monitoring of deep artesian wells',
      'Zero chemical run-off ecological perimeter barrier',
      'Sustainable extraction capping preserving local water tables'
    ],
    specs: [
      { label: 'Aquifer Depth', value: 'Over 300+ Feet Deep Well' },
      { label: 'Mineral Composition', value: 'Calcium, Magnesium, Potassium' },
      { label: 'Source Security', value: '24/7 Gated Eco-Protected Reserve' }
    ]
  },
  {
    id: 'national-standards',
    name: 'Pakistani Standards Compliance',
    status: 'National Standard Compliant',
    shortTag: 'PSQCA & PCRWR Approved',
    desc: 'Watlys exceeds all statutory requirements laid down by the Pakistan Standards and Quality Control Authority (PSQCA) and Pakistan Council of Research in Water Resources (PCRWR) for bottled drinking water.',
    icon: CheckCircle2,
    tds: 'Strictly Within PCRWR Band',
    ph: 'Optimal Neutral-Alkaline',
    compliance: 'PSQCA Specification S.R.O. 463(I)',
    protocols: [
      'Quarterly third-party audits by government bodies',
      'Full traceability barcode assigned to every 19L carboy',
      'Certified compliant under national drinking water guidelines'
    ],
    specs: [
      { label: 'Regulator', value: 'PSQCA License & PCRWR Verified' },
      { label: 'Chemical Standards', value: 'Zero Sodium Hydroxide / Zero Chloramines' },
      { label: 'Batch Traceability', value: 'QR/Barcode Printed on Every Cap' }
    ]
  },
  {
    id: 'iso-safety',
    name: 'ISO 22000 & HACCP Certification',
    status: 'Global Quality Assured',
    shortTag: 'International Food Standard',
    desc: 'Certified under international management systems for food safety and hazard control. Comprehensive risk assessments and automated monitoring prevent contamination across every stage of bottling and delivery.',
    icon: Sparkles,
    tds: 'Controlled Standard',
    ph: '7.8 - 8.2 Range',
    compliance: 'ISO 22000:2018 Registered',
    protocols: [
      'Hazard Analysis Critical Control Point (HACCP) controls',
      'Automated digital sensor logging for water quality metrics',
      'Annual international surveillance audits'
    ],
    specs: [
      { label: 'Certification Body', value: 'SGS International Accreditation' },
      { label: 'System Standard', value: 'ISO 22000:2018 Management' },
      { label: 'Audit Result', value: '100% Pass Rate / Grade A' }
    ]
  }
]

export default function CertificationsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null)

  // Cursor position tracking for outer-hover pattern spotlight
  const [cursorPos, setCursorPos] = useState({ x: -500, y: -500 })
  const [isOutsideHovered, setIsOutsideHovered] = useState(false)

  const handleSectionMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  // Triplicate array for 100% gapless infinite marquee scrolling
  const marqueeItems = [...CERTIFICATIONS, ...CERTIFICATIONS, ...CERTIFICATIONS]

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      onMouseEnter={() => setIsOutsideHovered(true)}
      onMouseLeave={() => setIsOutsideHovered(false)}
      className="relative py-14 sm:py-24 w-full border-t border-border/60 bg-background transition-colors duration-300 font-sans overflow-hidden select-none"
    >
      
      {/* COMPACT CURSOR-FOLLOWING LIGHT PATTERN SPOTLIGHT (ACTIVE ONLY OUTSIDE CONTENT) */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ease-out z-0 ${
          isOutsideHovered ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          maskImage: `radial-gradient(220px circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)`,
          WebkitMaskImage: `radial-gradient(220px circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)`,
        }}
      >
        {/* Subtle Light Pattern Layer */}
        <div
          className="w-full h-full opacity-20 dark:opacity-35"
          style={{
            backgroundImage: `url('/patterns/pattern-01.svg')`,
            backgroundRepeat: 'repeat',
            backgroundSize: '240px 240px',
          }}
        />
        
        {/* Soft Compact Light Glow Sphere at Cursor */}
        <div
          className="absolute w-[240px] h-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 dark:bg-primary/25 blur-2xl pointer-events-none"
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
          }}
        />
      </div>

      {/* Editorial Header (Removes pattern spotlight on hover) */}
      <div
        onMouseEnter={(e) => {
          e.stopPropagation()
          setIsOutsideHovered(false)
        }}
        onMouseLeave={() => setIsOutsideHovered(true)}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 text-center mb-10 sm:mb-16"
      >
        <span className="eyebrow">Certifications & Quality Control</span>
        <h2 className="section-title mt-3 sm:mt-4">Quality You Can Trust.</h2>
        <p className="section-lead mx-auto mt-3">
          Every 19L batch is lab-tested for purity. Tap a certification to open its assay report.
        </p>
      </div>

      {/* INFINITE MARQUEE ROW (PILL TABS) */}
      <div
        className="relative z-10 w-full overflow-hidden py-4"
        onMouseEnter={(e) => {
          e.stopPropagation()
          setIsPaused(true)
          setIsOutsideHovered(false)
        }}
        onMouseLeave={() => {
          setIsPaused(false)
          setIsOutsideHovered(true)
        }}
      >
        {/* Left Fade Overlay */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-r from-[var(--background)] dark:from-[var(--background)] to-transparent z-10 pointer-events-none" />
        
        {/* Right Fade Overlay */}
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-l from-[var(--background)] dark:from-[var(--background)] to-transparent z-10 pointer-events-none" />

        {/* Marquee Motion Track */}
        <motion.div
          className="flex gap-4 sm:gap-6 w-max"
          animate={isPaused ? { x: undefined } : { x: ['0%', '-33.333%'] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 26,
              ease: 'linear',
            },
          }}
        >
          {marqueeItems.map((cert, index) => {
            const IconComponent = cert.icon
            return (
              <motion.div
                key={`${cert.id}-${index}`}
                whileHover={{ scale: 1.04, y: -2 }}
                transition={{ duration: 0.2 }}
                onClick={() => {
                  setIsPaused(true)
                  setSelectedCert(cert)
                }}
                className="rounded-full inline-flex items-center gap-3 px-6 py-3.5 bg-white/90 dark:bg-card/90 backdrop-blur-md border border-blue-100 dark:border-slate-800 shadow-sm hover:border-primary dark:hover:border-primary hover:shadow-blue-500/20 cursor-pointer transition-all shrink-0 group select-none"
              >
                {/* Left Icon in Ocean Blue */}
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary dark:bg-primary/20 dark:text-sky-400 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                  <IconComponent size={17} />
                </div>

                {/* Center Title */}
                <span className="font-semibold text-slate-800 dark:text-white text-sm md:text-base whitespace-nowrap tracking-wide">
                  {cert.name}
                </span>

                {/* Right Action Arrow */}
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:text-primary dark:group-hover:text-sky-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0">
                  <ArrowUpRight size={16} />
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* INTERACTIVE GLASSMORPHISM DETAIL MODAL */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto"
          >
            {/* Backdrop click dismiss */}
            <div className="absolute inset-0" onClick={() => setSelectedCert(null)} />

            {/* Modal Box Container */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 15 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-xl bg-card text-foreground rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-700/80 overflow-hidden"
            >
              {/* Close (X) Button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-rose-500 hover:text-white text-muted-foreground flex items-center justify-center transition-colors cursor-pointer border border-slate-200 dark:border-slate-700 z-20"
                aria-label="Close Certification Details"
              >
                <X size={18} />
              </button>

              {/* Modal Inner Content */}
              <div className="space-y-6 text-left">
                
                {/* Header Badge & Title */}
                <div className="space-y-3 pr-8">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full bg-primary/10 text-primary dark:text-sky-400 border border-primary/20">
                    <Check size={12} className="text-primary dark:text-sky-400" />
                    {selectedCert.status}
                  </span>
                  
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-primary/10 text-primary dark:bg-primary/20 dark:text-sky-400 shrink-0">
                      <selectedCert.icon size={26} />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-foreground tracking-wide">
                      {selectedCert.name}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-sans">
                  {selectedCert.desc}
                </p>

                {/* TDS & pH Key Parameters Grid */}
                <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-sky-50/80 dark:bg-background border border-sky-100 dark:border-slate-800 text-center">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block">TDS Level</span>
                    <span className="text-xs sm:text-sm font-extrabold text-primary dark:text-sky-400 block">{selectedCert.tds}</span>
                  </div>
                  <div className="space-y-1 border-x border-border px-2">
                    <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block">pH Balance</span>
                    <span className="text-xs sm:text-sm font-extrabold text-foreground block">{selectedCert.ph}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block">Compliance</span>
                    <span className="text-[10px] sm:text-xs font-bold text-emerald-600 dark:text-emerald-400 block leading-snug">{selectedCert.compliance}</span>
                  </div>
                </div>

                {/* Batch Protocols List */}
                <div className="space-y-2.5 pt-2 border-t border-border">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-primary dark:text-sky-400 flex items-center gap-1.5">
                    <Droplet size={14} /> Batch Verification Protocols
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-200">
                    {selectedCert.protocols.map((protocol, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                          <Check size={11} />
                        </div>
                        <span>{protocol}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technical Specifications */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-background border border-border space-y-2">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                    <Microchip size={13} /> Technical Quality Matrix
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    {selectedCert.specs.map((spec, idx) => (
                      <div key={idx} className="space-y-0.5">
                        <span className="text-[10px] text-slate-400 block">{spec.label}</span>
                        <span className="text-xs font-bold text-foreground block">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  )
}
