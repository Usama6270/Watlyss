'use client'

import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useInView,
} from 'framer-motion'
import {
  ShieldCheck,
  Award,
  FileCheck,
  CheckCircle2,
  X,
  Check,
  Droplet,
  Sparkles,
  Microchip,
} from 'lucide-react'

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
    shortTag: '24/7 QC Lab',
    desc: 'Every batch of Watlys 19L drinking water undergoes continuous laboratory assay testing. Certified microbiologists verify zero pathogen count, mineral equilibrium, microplastic filtration, and heavy metal absence prior to dispatch.',
    icon: ShieldCheck,
    tds: '140 – 180 mg/L',
    ph: '7.8 – 8.2 (Mildly Alkaline)',
    compliance: 'PSQCA & WHO Compliant',
    protocols: [
      'Daily 24-hour incubation & pathogen screening',
      'Continuous TDS & conductivity inline sensors',
      'Sub-micron zero microplastic membrane filtration',
    ],
    specs: [
      { label: 'Testing Frequency', value: 'Every 2 Hours / Batch' },
      { label: 'Lab Standard', value: 'ISO 17025 Accredited' },
      { label: 'Microplastic Purity', value: '0.00% Detected' },
    ],
  },
  {
    id: 'food-hygiene',
    name: 'Food Safety & Hygiene',
    status: 'Cleanroom Certified',
    shortTag: 'HACCP Class 100',
    desc: 'Bottling operations run inside a Class 100 sterile positive-pressure cleanroom. Bottles undergo a 9-step hydro-thermal wash with ozonated high-pressure rinsing and automated touchless vessel sealing.',
    icon: Award,
    tds: '150 mg/L Balanced',
    ph: '8.0 Ideal Hydration',
    compliance: 'HACCP & ISO 22000',
    protocols: [
      'Triple-stage ozonated bottle sterilization',
      'Touchless filling in positive-pressure cleanroom',
      'Tamper-evident medical grade shrink seal',
    ],
    specs: [
      { label: 'Cleanroom', value: 'Class 100 / ISO 5' },
      { label: 'Ozone', value: '0.4 ppm O₃ Sterilization' },
      { label: 'Cap Integrity', value: 'Ultrasonic Seal Check' },
    ],
  },
  {
    id: 'aquifer-stewardship',
    name: 'Natural Aquifer Stewardship',
    status: 'Eco-Protected Source',
    shortTag: 'Deep Aquifer',
    desc: 'Source water is drawn from deep protected artesian aquifers below sub-surface rock strata. Environmental stewardship prevents over-extraction while preserving mountain water tables.',
    icon: FileCheck,
    tds: 'Natural Mineral Balance',
    ph: '7.9 Pristine pH',
    compliance: 'EPA Aligned Stewardship',
    protocols: [
      'Hydrogeological monitoring of artesian wells',
      'Zero chemical run-off ecological perimeter',
      'Sustainable extraction capping for local tables',
    ],
    specs: [
      { label: 'Aquifer Depth', value: '300+ Feet Well' },
      { label: 'Minerals', value: 'Ca, Mg, Potassium' },
      { label: 'Source Security', value: '24/7 Gated Reserve' },
    ],
  },
  {
    id: 'national-standards',
    name: 'Pakistani Standards Compliance',
    status: 'National Standard Compliant',
    shortTag: 'PSQCA & PCRWR',
    desc: 'Watlys exceeds statutory requirements from PSQCA and PCRWR for bottled drinking water, with full batch traceability on every 19L carboy.',
    icon: CheckCircle2,
    tds: 'Within PCRWR Band',
    ph: 'Optimal Neutral-Alkaline',
    compliance: 'PSQCA S.R.O. 463(I)',
    protocols: [
      'Quarterly third-party government audits',
      'Full traceability barcode on every carboy',
      'Certified under national drinking water guidelines',
    ],
    specs: [
      { label: 'Regulator', value: 'PSQCA & PCRWR' },
      { label: 'Chemistry', value: 'Zero Chloramines' },
      { label: 'Traceability', value: 'QR on Every Cap' },
    ],
  },
  {
    id: 'iso-safety',
    name: 'ISO 22000 & HACCP',
    status: 'Global Quality Assured',
    shortTag: 'International FSMS',
    desc: 'Certified under international food safety management systems. Comprehensive risk assessments and automated monitoring prevent contamination across bottling and delivery.',
    icon: Sparkles,
    tds: 'Controlled Standard',
    ph: '7.8 – 8.2 Range',
    compliance: 'ISO 22000:2018',
    protocols: [
      'HACCP critical control point monitoring',
      'Automated digital sensor quality logging',
      'Annual international surveillance audits',
    ],
    specs: [
      { label: 'Certification Body', value: 'SGS International' },
      { label: 'System Standard', value: 'ISO 22000:2018' },
      { label: 'Audit Result', value: 'Grade A / 100% Pass' },
    ],
  },
]

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

function CertSeal({
  cert,
  onOpen,
}: {
  cert: Certification
  onOpen: () => void
}) {
  const Icon = cert.icon
  return (
    <button
      type="button"
      onClick={onOpen}
      className="cert-seal shrink-0 text-left outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
      aria-label={`${cert.name} — view assay report`}
    >
      <div className="cert-emblem relative z-[1]">
        <Icon size={20} strokeWidth={1.75} />
      </div>
      <div className="relative z-[1] min-w-0 flex-1 pr-1">
        <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] text-primary mb-1">
          {cert.shortTag}
        </p>
        <p className="font-display text-[0.95rem] sm:text-base font-medium text-foreground leading-snug tracking-[-0.01em] line-clamp-2">
          {cert.name}
        </p>
        <p className="mt-1 text-xs text-muted-foreground leading-snug line-clamp-1">
          {cert.status}
        </p>
      </div>
    </button>
  )
}

export default function CertificationsSection() {
  const reduceMotion = useReducedMotion()
  const sectionRef = React.useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })
  const [isPaused, setIsPaused] = useState(false)
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null)
  const [portalReady, setPortalReady] = useState(false)

  useEffect(() => {
    setPortalReady(true)
  }, [])

  useEffect(() => {
    if (!selectedCert) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedCert(null)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [selectedCert])

  const marqueeItems = [...CERTIFICATIONS, ...CERTIFICATIONS, ...CERTIFICATIONS]

  return (
    <section
      ref={sectionRef}
      className="trust-story relative pt-2 sm:pt-4 pb-[clamp(3rem,6vw,5.5rem)] w-full overflow-x-clip select-none"
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.65, ease: EASE, delay: 0.06 }}
        className="relative z-10 container-custom text-center mb-8 sm:mb-10"
      >
        <span className="eyebrow">Certifications & Quality Control</span>
        <h2 className="section-title mt-2.5 sm:mt-3 tracking-[-0.03em]">
          Quality You Can Trust.
        </h2>
        <p className="section-lead mx-auto mt-2.5 text-pretty">
          Every 19L batch is lab-verified before it leaves our facility. Open a seal to read the assay report.
        </p>
      </motion.div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.7, ease: EASE, delay: 0.18 }}
        className="relative z-10 w-full marquee-mask py-3"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          className="flex gap-4 sm:gap-5 w-max will-change-transform px-2"
          animate={
            reduceMotion || isPaused || selectedCert
              ? undefined
              : { x: ['0%', '-33.333%'] }
          }
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 40,
              ease: 'linear',
            },
          }}
        >
          {marqueeItems.map((cert, index) => (
            <CertSeal
              key={`${cert.id}-${index}`}
              cert={cert}
              onOpen={() => {
                setIsPaused(true)
                setSelectedCert(cert)
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {portalReady &&
        createPortal(
          <AnimatePresence>
            {selectedCert && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28 }}
                className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-md overflow-y-auto overscroll-contain"
                role="dialog"
                aria-modal="true"
                aria-labelledby="cert-modal-title"
              >
                <div className="absolute inset-0" onClick={() => setSelectedCert(null)} />
                <motion.div
                  initial={reduceMotion ? false : { y: 40, opacity: 0, scale: 0.96 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={reduceMotion ? undefined : { y: 24, opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="trust-modal-shell relative z-10 w-full max-w-xl rounded-t-[1.75rem] sm:rounded-[1.75rem] p-6 sm:p-8 max-h-[92vh] overflow-y-auto my-auto"
                >
                  <button
                    type="button"
                    onClick={() => setSelectedCert(null)}
                    className="absolute top-4 right-4 sm:top-5 sm:right-5 w-10 h-10 rounded-full bg-muted/80 hover:bg-rose-500 hover:text-white text-muted-foreground flex items-center justify-center transition-colors border border-border z-20"
                    aria-label="Close assay report"
                  >
                    <X size={18} />
                  </button>

                  <div className="space-y-6 text-left">
                    <div className="space-y-3 pr-10">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-semibold tracking-[0.16em] uppercase rounded-full bg-primary/10 text-primary border border-primary/25">
                        <Check size={12} />
                        {selectedCert.status}
                      </span>
                      <div className="flex items-center gap-3.5">
                        <div className="cert-emblem shrink-0 w-14 h-14">
                          <selectedCert.icon size={24} strokeWidth={1.75} />
                        </div>
                        <h3
                          id="cert-modal-title"
                          className="font-display text-xl sm:text-2xl font-medium tracking-[-0.02em] text-foreground"
                        >
                          {selectedCert.name}
                        </h3>
                      </div>
                    </div>

                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {selectedCert.desc}
                    </p>

                    <div className="grid grid-cols-3 gap-2 sm:gap-3 p-3.5 rounded-2xl bg-primary-muted/60 dark:bg-primary/10 border border-primary/15 text-center">
                      <div className="space-y-1 px-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                          TDS
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-primary block leading-snug">
                          {selectedCert.tds}
                        </span>
                      </div>
                      <div className="space-y-1 px-1 border-x border-border/80">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                          pH
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-foreground block leading-snug">
                          {selectedCert.ph}
                        </span>
                      </div>
                      <div className="space-y-1 px-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                          Compliance
                        </span>
                        <span className="text-[10px] sm:text-xs font-bold text-emerald-600 dark:text-emerald-400 block leading-snug">
                          {selectedCert.compliance}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2.5 pt-1 border-t border-border/80">
                      <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-primary flex items-center gap-1.5">
                        <Droplet size={14} /> Batch Verification
                      </h4>
                      <ul className="space-y-2 text-sm text-foreground/90">
                        {selectedCert.protocols.map((protocol) => (
                          <li key={protocol} className="flex items-start gap-2.5">
                            <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                              <Check size={12} />
                            </div>
                            <span>{protocol}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-2xl bg-muted/50 dark:bg-background/60 border border-border space-y-2">
                      <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-1.5">
                        <Microchip size={13} /> Quality Matrix
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                        {selectedCert.specs.map((spec) => (
                          <div key={spec.label} className="space-y-1">
                            <span className="text-[11px] text-muted-foreground block">{spec.label}</span>
                            <span className="text-sm font-semibold text-foreground block">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  )
}
