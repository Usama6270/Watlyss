'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import FooterCursorPattern from '@/components/footer-cursor-pattern'
import { 
  FileText, 
  Download, 
  ExternalLink, 
  ShieldAlert, 
  Droplet, 
  CheckCircle2, 
  BookOpen, 
  Sparkles, 
  Eye, 
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Award,
  ArrowUpRight
} from 'lucide-react'

interface ArticleItem {
  num: string
  tag: string
  title: string
  excerpt: string
  metaLeft: string
  metaRight: string
  badge: string
  badgeColor: string
  watlysNote: string
  imageSrc: string
}

export default function IndustryBriefingSection() {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [viewMode, setViewMode] = useState<'gazette' | 'pdf' | 'article'>('gazette')
  const [newsletterEmail, setNewsletterEmail] = useState<string>('')
  const [subscribed, setSubscribed] = useState<boolean>(false)

  const totalPages = 6

  // Distinct Page Content for Pages 1 through 6 with high-resolution images
  const pagesContent: Record<number, ArticleItem[]> = {
    1: [
      {
        num: '1',
        tag: 'SAFETY AUDIT',
        title: 'PCRWR audit flags 29 unsafe bottled water brands',
        excerpt: 'After several months of quarterly sampling, government audits confirm high bacterial contamination (E. coli & Pseudomonas) and elevated sodium levels in 29 uncertified commercial brands across Pakistan.',
        metaLeft: 'PCRWR Official Audit',
        metaRight: 'Health Desk',
        badge: 'Critical Warning',
        badgeColor: 'bg-red-600 text-white',
        watlysNote: 'Watlys enforces 9-stage RO, dual UV-C sterilization, and online ozone dosing.',
        imageSrc: '/gazette/gazette_audit.jpg'
      },
      {
        num: '2',
        tag: 'GEOLOGICAL SOURCE',
        title: 'Northern mountain sources average ~200 mg/L TDS',
        excerpt: 'Pristine mountain aquifers yield natural spring water with balanced minerals (calcium & magnesium), contrasting sharply with high salinity groundwater in southern plains.',
        metaLeft: 'Geological Survey',
        metaRight: 'Aquifer Research',
        badge: 'Purity Benchmark',
        badgeColor: 'bg-[#0064D0] text-white',
        watlysNote: 'Watlys sources exclusively from protected rock aquifers calibrated at 180 mg/L TDS.',
        imageSrc: '/gazette/gazette_mountain_spring.jpg'
      },
      {
        num: '3',
        tag: 'CONSUMER SCIENCE',
        title: 'Portable TDS meters measure minerals, not bacterial safety',
        excerpt: 'A widespread consumer myth assumes TDS pens prove water drinkability. TDS pens measure dissolved salts — failing to detect bacteria, viruses, microplastics, or pesticides.',
        metaLeft: 'Purity Science',
        metaRight: 'Consumer Awareness',
        badge: 'Myth Buster',
        badgeColor: 'bg-amber-600 text-white',
        watlysNote: 'Only multi-barrier ozone and UV treatment guarantees zero biological pathogens.',
        imageSrc: '/gazette/gazette_tds_meter.jpg'
      },
      {
        num: '4',
        tag: 'PACKAGING INTEGRITY',
        title: 'Microplastics and beverage glass integrity thresholds',
        excerpt: 'Recent laboratory assays demonstrate soft plastic PET containers leach microplastic particles over time under high ambient heat, favoring inert glass packaging.',
        metaLeft: 'Packaging Review',
        metaRight: 'Eco Research',
        badge: 'Material Safety',
        badgeColor: 'bg-emerald-600 text-white',
        watlysNote: 'Watlys 19L carboys use medical-grade polycarbonate and returnable glass vessels.',
        imageSrc: '/gazette/gazette_glass_bottle.jpg'
      },
      {
        num: '5',
        tag: 'NATIONAL POLICY',
        title: 'Measured replenishment shapes sustainable water future',
        excerpt: 'The Pakistan National Water Policy mandates 100% aquifer recharge ratios and quarterly published water quality assays for commercial bottling operations.',
        metaLeft: 'Water Policy 2026',
        metaRight: 'Regulatory Outlook',
        badge: 'Policy Standard',
        badgeColor: 'bg-slate-900 dark:bg-slate-700 text-white',
        watlysNote: 'Watlys operates solar-powered extraction with zero waste liquid discharge.',
        imageSrc: '/gazette/gazette_policy_solar.jpg'
      }
    ],
    2: [
      {
        num: '1',
        tag: 'AQUIFER SURVEY',
        title: 'Regional Aquifer Disparities: Northern Springs vs. Southern Wells',
        excerpt: 'Comprehensive hydrological mapping shows deep northern rock aquifers contain natural bicarbonate buffers, while urban groundwater in Sindh suffers from agricultural pesticide leaching.',
        metaLeft: 'Hydrology Division',
        metaRight: 'Aquifer Audit',
        badge: 'Regional Insight',
        badgeColor: 'bg-[#0064D0] text-white',
        watlysNote: 'Watlys selects pristine subterranean aquifers far from urban industrial runoff.',
        imageSrc: '/gazette/gazette_mountain_spring.jpg'
      },
      {
        num: '2',
        tag: 'CHEMICAL ANALYSIS',
        title: 'Excessive Sodium Disparity Flagged in Urban Bottled Brands',
        excerpt: 'Testing revealed sodium concentrations above 50 mg/L in 14 commercial brands, posing hypertension risks for cardiac patients relying on bottled water.',
        metaLeft: 'Lab Analysis',
        metaRight: 'Medical Advisory',
        badge: 'Chemical Risk',
        badgeColor: 'bg-red-600 text-white',
        watlysNote: 'Watlys balances sodium under 15 mg/L for cardiac-safe daily hydration.',
        imageSrc: '/gazette/gazette_audit.jpg'
      },
      {
        num: '3',
        tag: 'FILTRATION SCIENCE',
        title: 'Volcanic Basalt Percolation and Subterranean Mineral Enrichment',
        excerpt: 'Rainwater filtering over decades through volcanic ash and basaltic rock dissolves essential bioavailable minerals naturally without synthetic additives.',
        metaLeft: 'Geology Paper',
        metaRight: 'Spring Minerals',
        badge: 'Natural Process',
        badgeColor: 'bg-emerald-600 text-white',
        watlysNote: 'Natural mineral structure preserved through gentle micro-filtration.',
        imageSrc: '/gazette/gazette_mountain_spring.jpg'
      },
      {
        num: '4',
        tag: 'HEALTH HAZARD',
        title: 'Microbial Hazards: Pseudomonas Aeruginosa in Uncertified Outlets',
        excerpt: 'Uncertified RO water points in urban slums lack proper CIP container washing, leading to biofilm buildup and widespread bacterial contamination.',
        metaLeft: 'Health Ministry',
        metaRight: 'Bacterial Alert',
        badge: 'Microbial Alert',
        badgeColor: 'bg-amber-600 text-white',
        watlysNote: 'Automated CIP washing and double UV-C sterilization guarantee 0% bacteria.',
        imageSrc: '/gazette/gazette_tds_meter.jpg'
      },
      {
        num: '5',
        tag: 'PURIFICATION TECH',
        title: '9-Stage Reverse Osmosis & Ozone Infusion Protocol',
        excerpt: 'Modern bottling plants utilize active carbon adsorption, multi-membrane RO, twin UV lamps, and controlled ozone dosing to achieve 99.999% microbial eradication.',
        metaLeft: 'Engineering Review',
        metaRight: 'Quality Control',
        badge: 'Purification Standard',
        badgeColor: 'bg-sky-600 text-white',
        watlysNote: 'Watlys operates 9-stage hospital-grade purification equipment.',
        imageSrc: '/gazette/gazette_policy_solar.jpg'
      }
    ],
    3: [
      {
        num: '1',
        tag: 'CONSUMER MYTH',
        title: 'Why Low TDS Water Is Not Automatically Pathogen-Free',
        excerpt: 'A low TDS reading of 30-50 mg/L only indicates low inorganic mineral content. It does NOT guarantee freedom from microscopic viruses, E. coli, or heavy metals.',
        metaLeft: 'Consumer Defense',
        metaRight: 'Purity Factcheck',
        badge: 'Myth Buster',
        badgeColor: 'bg-amber-600 text-white',
        watlysNote: 'Watlys tests every batch for biological pathogens regardless of TDS score.',
        imageSrc: '/gazette/gazette_tds_meter.jpg'
      },
      {
        num: '2',
        tag: 'DISINFECTION TECH',
        title: 'Medical-Grade UV-C Disinfection vs. Basic Household Filters',
        excerpt: 'Household carbon filters cannot neutralize bacterial spores. Medical-grade 254nm UV-C light ruptures viral DNA structures in fractions of a second.',
        metaLeft: 'Photobiology Study',
        metaRight: 'Sterilization Tech',
        badge: 'UV Standard',
        badgeColor: 'bg-[#0064D0] text-white',
        watlysNote: 'Watlys uses dual-pass high-intensity UV-C chambers prior to bottling.',
        imageSrc: '/gazette/gazette_audit.jpg'
      },
      {
        num: '3',
        tag: 'HEAVY METALS',
        title: 'Arsenic & Lead Leaching Limitations of Handheld TDS Pens',
        excerpt: 'Handheld TDS pens measure total conductivity, masking dangerous trace arsenic or lead contaminants under benign mineral readings.',
        metaLeft: 'Toxicology Report',
        metaRight: 'Lab Testing',
        badge: 'Toxicology Alert',
        badgeColor: 'bg-red-600 text-white',
        watlysNote: 'Watlys conducts quarterly atomic absorption spectroscopy for heavy metals.',
        imageSrc: '/gazette/gazette_tds_meter.jpg'
      },
      {
        num: '4',
        tag: 'ORGANIC PURITY',
        title: 'Active Carbon Adsorption of Pesticides and Industrial Solvents',
        excerpt: 'Granular coconut shell carbon adsorption effectively captures volatile organic compounds (VOCs) and agricultural pesticide residues before reverse osmosis.',
        metaLeft: 'Chemical Engineering',
        metaRight: 'Organic Carbon',
        badge: 'Filtration Tech',
        badgeColor: 'bg-emerald-600 text-white',
        watlysNote: 'High-density coconut carbon filters ensure zero pesticide residue.',
        imageSrc: '/gazette/gazette_mountain_spring.jpg'
      },
      {
        num: '5',
        tag: 'INSPECTION METHOD',
        title: 'Quarterly PCRWR Water Quality Inspection Standards',
        excerpt: 'Official government audits require physical, chemical, and biological parameters to be logged in public registries every 90 days.',
        metaLeft: 'Regulatory Body',
        metaRight: 'Public Registry',
        badge: 'Compliance Standard',
        badgeColor: 'bg-slate-900 dark:bg-slate-700 text-white',
        watlysNote: 'Watlys PSQCA & PCRWR audit certificates are published online.',
        imageSrc: '/gazette/gazette_policy_solar.jpg'
      }
    ],
    4: [
      {
        num: '1',
        tag: 'PACKAGING SCIENCE',
        title: 'Microplastic Degradation & Leaching in Soft PET Containers',
        excerpt: 'Thermal imaging and laser spectrographic analysis show single-use PET bottles release thousands of microplastic particles per liter under summer heat in transit.',
        metaLeft: 'Materials Science',
        metaRight: 'Environmental Health',
        badge: 'Material Hazard',
        badgeColor: 'bg-red-600 text-white',
        watlysNote: 'Watlys delivers in BPA-free food-grade polycarbonate & glass bottles.',
        imageSrc: '/gazette/gazette_glass_bottle.jpg'
      },
      {
        num: '2',
        tag: 'CHEMICAL MIGRATION',
        title: 'Phthalates & Bisphenol-A (BPA) Heat Exposure Risks',
        excerpt: 'Storing plastic water bottles inside sun-exposed delivery vehicles accelerates phthalate plasticizer migration into drinking water, altering taste and endocrine safety.',
        metaLeft: 'Polymer Lab',
        metaRight: 'Endocrine Audit',
        badge: 'Chemical Alert',
        badgeColor: 'bg-amber-600 text-white',
        watlysNote: 'Watlys temperature-controlled delivery vans prevent heat exposure.',
        imageSrc: '/gazette/gazette_glass_bottle.jpg'
      },
      {
        num: '3',
        tag: 'GLASS INTEGRITY',
        title: 'Why Inert Glass & Premium Carboys Guarantee Zero Taste Alteration',
        excerpt: 'Glass is chemically non-reactive and non-porous, preserving natural mineral taste and spring crispness infinitely without plastic off-flavors.',
        metaLeft: 'Container Study',
        metaRight: 'Glass Standard',
        badge: 'Gold Standard',
        badgeColor: 'bg-emerald-600 text-white',
        watlysNote: 'Watlys Glass Reserve edition offers 100% inert mineral water storage.',
        imageSrc: '/gazette/gazette_glass_bottle.jpg'
      },
      {
        num: '4',
        tag: 'ECO RECYCLING',
        title: 'Closed-Loop 19L Returnable Bottle Sanitization & Lifecycle',
        excerpt: 'Heavy-duty 19L carboys undergo up to 50 sanitized reuse cycles, reducing plastic waste by 98% compared to disposable 1.5L PET bottles.',
        metaLeft: 'Sustainability Office',
        metaRight: 'Circular Economy',
        badge: 'Eco Efficiency',
        badgeColor: 'bg-[#0064D0] text-white',
        watlysNote: 'Watlys operates a 100% closed-loop returnable bottle logistics network.',
        imageSrc: '/gazette/gazette_glass_bottle.jpg'
      },
      {
        num: '5',
        tag: 'LOGISTICS POLICY',
        title: 'Reducing Urban Bottled Water Carbon Footprints',
        excerpt: 'Optimized regional delivery routing cuts diesel emissions by 35%, supporting cleaner air and faster morning door-to-door water drop-offs.',
        metaLeft: 'Supply Chain',
        metaRight: 'Logistics Review',
        badge: 'Carbon Reduction',
        badgeColor: 'bg-slate-900 dark:bg-slate-700 text-white',
        watlysNote: 'Watlys smart delivery fleet powers zero-delay scheduled refills.',
        imageSrc: '/gazette/gazette_policy_solar.jpg'
      }
    ],
    5: [
      {
        num: '1',
        tag: 'WHO GUIDELINES',
        title: 'World Health Organization Hydration & Mineral Standards',
        excerpt: 'WHO drinkability guidelines specify total dissolved solids between 100-300 mg/L with bioavailable calcium (20-80 mg/L) and magnesium (10-30 mg/L).',
        metaLeft: 'WHO Guidelines',
        metaRight: 'Global Policy',
        badge: 'WHO Benchmark',
        badgeColor: 'bg-[#0064D0] text-white',
        watlysNote: 'Watlys Classic is calibrated directly to WHO mineral drinkability metrics.',
        imageSrc: '/gazette/gazette_audit.jpg'
      },
      {
        num: '2',
        tag: 'ELECTROLYTE SCIENCE',
        title: 'Cellular Hydration & Bioavailable Calcium/Magnesium Ratios',
        excerpt: 'De-mineralized zero-TDS RO water can draw minerals from body tissues. Natural mineral water supports intracellular hydration and fluid balance.',
        metaLeft: 'Physiology Paper',
        metaRight: 'Cellular Health',
        badge: 'Bio-Hydration',
        badgeColor: 'bg-emerald-600 text-white',
        watlysNote: 'Watlys retains natural essential electrolytes for optimal absorption.',
        imageSrc: '/gazette/gazette_mountain_spring.jpg'
      },
      {
        num: '3',
        tag: 'ALKALINE PH',
        title: 'Alkaline pH (7.8–8.2) & Neutralization of Dietary Acid',
        excerpt: 'Mildly alkaline mineral water assists in buffering systemic acidity from processed diets and neutralizing gastric acid reflux.',
        metaLeft: 'Gastroenterology',
        metaRight: 'pH Research',
        badge: 'Alkaline Balance',
        badgeColor: 'bg-sky-600 text-white',
        watlysNote: 'Watlys maintains a stable pH of 7.8 to 8.2 in every bottle.',
        imageSrc: '/gazette/gazette_glass_bottle.jpg'
      },
      {
        num: '4',
        tag: 'RENAL HEALTH',
        title: 'Renal Filtration Load Comparison Across Mineral Densities',
        excerpt: 'High TDS water (>500 mg/L) increases kidney stone formation risks, whereas balanced 180 mg/L mineral water ensures smooth renal excretion.',
        metaLeft: 'Nephrology Study',
        metaRight: 'Renal Guidance',
        badge: 'Kidney Health',
        badgeColor: 'bg-amber-600 text-white',
        watlysNote: 'Balanced 180 mg/L TDS prevents kidney strain while providing minerals.',
        imageSrc: '/gazette/gazette_tds_meter.jpg'
      },
      {
        num: '5',
        tag: 'SPORTS RECOVERY',
        title: 'Sports Physiology: Plasma Bicarbonate Buffer Recovery',
        excerpt: 'Consuming naturally alkaline spring water post-workout accelerates blood lactate clearance and mitigates muscle soreness.',
        metaLeft: 'Sports Science',
        metaRight: 'Athletic Recovery',
        badge: 'Athletic Performance',
        badgeColor: 'bg-blue-600 text-white',
        watlysNote: 'Chosen by gyms, executive sports clubs, and active families.',
        imageSrc: '/gazette/gazette_mountain_spring.jpg'
      }
    ],
    6: [
      {
        num: '1',
        tag: 'NATIONAL POLICY',
        title: 'Pakistan National Water Policy 2026 Mandates & Bottler Audits',
        excerpt: 'Federal mandates require commercial water bottlers to implement strict watershed recharge programs, solar-powered plants, and open lab reporting.',
        metaLeft: 'National Water Board',
        metaRight: 'Policy Mandate',
        badge: 'Policy Benchmark',
        badgeColor: 'bg-slate-900 dark:bg-slate-700 text-white',
        watlysNote: 'Watlys complies 100% with Federal National Water Policy 2026.',
        imageSrc: '/gazette/gazette_policy_solar.jpg'
      },
      {
        num: '2',
        tag: 'RECHARGE MANDATE',
        title: '100% Aquifer Recharge & Rainwater Harvesting Directives',
        excerpt: 'To prevent water table depletion, commercial facilities must recharge equal volumes of groundwater through catchment basins and forestry.',
        metaLeft: 'Eco Conservation',
        metaRight: 'Aquifer Protection',
        badge: 'Conservation Leader',
        badgeColor: 'bg-emerald-600 text-white',
        watlysNote: 'Watlys recharges 100% of extracted spring water volume.',
        imageSrc: '/gazette/gazette_mountain_spring.jpg'
      },
      {
        num: '3',
        tag: 'CONSUMER SAFETY',
        title: 'Digital QR Batch Verification Tags for Consumer Protection',
        excerpt: 'Anti-counterfeiting QR codes on bottle neck seals allow consumers to scan and view real-time laboratory test results for that specific delivery batch.',
        metaLeft: 'Consumer Tech',
        metaRight: 'Batch Verification',
        badge: 'Digital Proof',
        badgeColor: 'bg-[#0064D0] text-white',
        watlysNote: 'Every Watlys 19L bottle carries a unique scannable QR batch code.',
        imageSrc: '/gazette/gazette_audit.jpg'
      },
      {
        num: '4',
        tag: 'SOLAR BOTTLING',
        title: 'Watlys Solar-Powered Bottling & Zero Waste Commitment',
        excerpt: 'Our state-of-the-art facility runs on 100% rooftop solar energy with zero chemical effluent release into municipal drainage systems.',
        metaLeft: 'Green Operations',
        metaRight: 'Clean Energy',
        badge: 'Solar Powered',
        badgeColor: 'bg-amber-600 text-white',
        watlysNote: 'Eco-certified green bottling facility serving Islamabad & Lahore.',
        imageSrc: '/gazette/gazette_policy_solar.jpg'
      },
      {
        num: '5',
        tag: 'DOWNLOAD REPORT',
        title: 'Download the Complete 6-Page Industry Report (PDF)',
        excerpt: 'Get full access to detailed chemical tables, PCRWR brand safety listings, and mineral breakdown charts for offline reading.',
        metaLeft: 'Official PDF',
        metaRight: 'Full Document',
        badge: 'Download Ready',
        badgeColor: 'bg-[#0064D0] text-white',
        watlysNote: 'Click the Download PDF button anytime to save the full 6-page report.',
        imageSrc: '/gazette/gazette_glass_bottle.jpg'
      }
    ]
  }

  // Get current active articles for selected page
  const currentArticles = pagesContent[currentPage] || pagesContent[1]

  const handleNextPage = () => {
    setCurrentPage(prev => (prev < totalPages ? prev + 1 : 1))
  }

  const handlePrevPage = () => {
    setCurrentPage(prev => (prev > 1 ? prev - 1 : totalPages))
  }

  return (
    <section 
      id="industry-briefing" 
      className="w-full py-16 sm:py-24 bg-[#FAF9F6] dark:bg-[#0a1128] border-t border-slate-200/80 dark:border-slate-800/60 font-sans transition-colors duration-300"
    >
      {/* RICH GAZETTE CONTAINER (Matching Watlys Brand Theme Colors) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* TOP SUB-HEADER */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#0064D0]/10 border border-[#0064D0]/20 text-[#0064D0] dark:text-sky-400 text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em]">
            <Sparkles size={14} className="animate-pulse" />
            <span>STORIES • PURITY • PERSPECTIVE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight text-slate-900 dark:text-white">
            Watlys Newsletter
          </h2>

          <p className="text-xs sm:text-sm font-serif italic max-w-xl mx-auto text-slate-600 dark:text-slate-300 leading-relaxed">
            A considered look at Pakistan water quality, aquifer geology, and purity standards shaping how we live.
          </p>
        </div>

        {/* PHYSICAL GAZETTE SHEET (Crisp Clean Card Matching Watlys Theme) */}
        <div className="bg-white dark:bg-[#131c38] text-slate-900 dark:text-white rounded-3xl p-4 sm:p-8 md:p-10 shadow-xl border border-slate-200 dark:border-slate-800 space-y-6 font-sans">
          
          {/* GAZETTE MASTHEAD TOP LINE */}
          <div className="flex flex-col sm:flex-row justify-between items-center text-[9px] sm:text-[10px] uppercase font-bold tracking-[0.25em] text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 pb-2 gap-2 text-center sm:text-left font-serif">
            <span>VOL. 01 • NO. 03</span>
            <span className="text-[#0064D0] dark:text-sky-400">QUALITY • HYDRATION • POLICY</span>
            <span>SEPTEMBER 2026</span>
          </div>

          {/* GIANT EDITORIAL MASTHEAD TITLE */}
          <div className="text-center py-4 border-b border-slate-900 dark:border-white">
            <h1 className="text-3xl sm:text-6xl md:text-7xl font-serif font-bold tracking-[0.18em] text-slate-950 dark:text-white uppercase leading-none">
              WATLYS GAZETTE
            </h1>
          </div>

          {/* GAZETTE MASTHEAD BOTTOM SUB-LINE */}
          <div className="flex flex-col sm:flex-row justify-between items-center text-[9px] sm:text-[10px] uppercase font-semibold tracking-[0.2em] text-slate-600 dark:text-slate-400 border-b border-slate-900 dark:border-slate-700 pb-2 gap-2 text-center font-serif">
            <span>PAKISTAN EDITION</span>
            <span className="italic font-normal">Independent notes on mineral water purity & safety</span>
            <span className="text-[#0064D0] dark:text-sky-400 font-bold">COMPLIMENTARY PDF</span>
          </div>

          {/* BROWSE THIS EDITION & CONTROLS BAR */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 py-3 border-b border-slate-200 dark:border-slate-800">
            
            {/* View Mode Toggle Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setViewMode('gazette')}
                className={`px-3.5 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-lg border transition-all cursor-pointer ${
                  viewMode === 'gazette'
                    ? 'bg-[#0064D0] text-white border-[#0064D0] shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                Gazette Grid View
              </button>
              <button
                onClick={() => setViewMode('pdf')}
                className={`px-3.5 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-lg border transition-all flex items-center space-x-1.5 cursor-pointer ${
                  viewMode === 'pdf'
                    ? 'bg-[#0064D0] text-white border-[#0064D0] shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                <Eye size={12} />
                <span>Interactive PDF Viewer</span>
              </button>
              <button
                onClick={() => setViewMode('article')}
                className={`px-3.5 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-lg border transition-all flex items-center space-x-1.5 cursor-pointer ${
                  viewMode === 'article'
                    ? 'bg-[#0064D0] text-white border-[#0064D0] shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                <BookOpen size={12} />
                <span>Full Article</span>
              </button>
            </div>

            {/* Edition Carousel Controller (< 01 / 06 >) with Direct Page Numbers & Download CTA */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center space-x-2 text-xs font-serif font-bold text-slate-800 dark:text-slate-200">
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-sans hidden sm:inline">BROWSE EDITION</span>
                
                {/* DIRECT PAGE NUMBER SELECTOR BUTTONS (1, 2, 3, 4, 5, 6) */}
                <div className="flex items-center space-x-1">
                  <button
                    onClick={handlePrevPage}
                    className="p-1 rounded font-bold border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
                    title="Previous Page"
                  >
                    <ChevronLeft size={14} />
                  </button>

                  {[1, 2, 3, 4, 5, 6].map((pNum) => (
                    <button
                      key={pNum}
                      onClick={() => setCurrentPage(pNum)}
                      className={`w-7 h-7 rounded text-xs font-mono font-bold transition-all cursor-pointer border ${
                        currentPage === pNum
                          ? 'bg-[#0064D0] text-white border-[#0064D0] shadow-xs scale-105'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      0{pNum}
                    </button>
                  ))}

                  <button
                    onClick={handleNextPage}
                    className="p-1 rounded font-bold border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
                    title="Next Page"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              {/* PDF DOWNLOAD BUTTON */}
              <a
                href="/docs/Pakistan_Mineral_Water_Newsletter.pdf"
                download="Pakistan_Mineral_Water_Newsletter.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 bg-[#0064D0] hover:bg-[#0052ad] text-white text-[11px] font-bold uppercase tracking-wider rounded-lg shadow transition-all hover:scale-105"
              >
                <Download size={12} />
                <span>Download PDF</span>
              </a>
            </div>
          </div>

          {/* VIEW MODE 1: GAZETTE NEWS GRID */}
          {viewMode === 'gazette' && (
            <AnimatePresence mode="wait">
              <motion.div
                key={`gazette-page-${currentPage}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="space-y-6 pt-2"
              >
                {/* SECTION SUB-TITLE BAR */}
                <div className="flex justify-between items-center text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] border-b border-slate-900 dark:border-slate-700 pb-1 font-serif text-slate-900 dark:text-white">
                  <span>WATER INDUSTRY NEWS ROUNDUP</span>
                  <span className="font-mono font-bold text-[#0064D0] dark:text-sky-400">PAGE {currentPage} OF {totalPages}</span>
                </div>

                {/* NEWSPAPER CARDS GRID FOR CURRENT PAGE */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* STORY 1 (LARGE FEATURE CARD - 7 COLUMNS WITH IMAGE) */}
                  <div className="lg:col-span-7 bg-[#FAF9F6]/90 dark:bg-[#0a1128]/90 p-5 sm:p-7 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4 flex flex-col justify-between shadow-sm hover:border-[#0064D0] transition-colors group">
                    <div className="space-y-3">
                      {/* Visual Card Image Header Box */}
                      <div className="w-full h-48 sm:h-56 rounded-xl overflow-hidden relative border border-slate-200 dark:border-slate-800 shadow-xs">
                        <img 
                          src={currentArticles[0].imageSrc} 
                          alt={currentArticles[0].title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent p-4 flex flex-col justify-between">
                          <div className="flex justify-between items-start">
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-xs font-sans ${currentArticles[0].badgeColor}`}>
                              {currentArticles[0].badge}
                            </span>
                            <span className="text-xs font-serif font-bold text-white bg-slate-900/80 backdrop-blur-md px-2.5 py-0.5 rounded border border-slate-700">
                              {currentArticles[0].tag}
                            </span>
                          </div>
                          
                          <div className="space-y-0.5">
                            <span className="text-[10px] font-bold text-sky-300 uppercase tracking-widest font-sans block">
                              PAGE 0{currentPage} FEATURE STORY
                            </span>
                            <h4 className="text-sm sm:text-base font-serif font-bold text-white leading-tight">
                              {currentArticles[0].title}
                            </h4>
                          </div>
                        </div>
                      </div>

                      <h3 className="text-lg sm:text-2xl font-serif font-bold text-slate-950 dark:text-white leading-snug group-hover:text-[#0064D0] dark:group-hover:text-sky-400 transition-colors">
                        {currentArticles[0].num}. {currentArticles[0].title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-serif leading-relaxed">
                        {currentArticles[0].excerpt}
                      </p>

                      {/* Watlys Brand Safety Note Box */}
                      <div className="p-3.5 bg-sky-50 dark:bg-[#131c38] border-l-4 border-[#0064D0] rounded-r-lg space-y-1 text-xs font-sans border-y border-r border-sky-100 dark:border-slate-800">
                        <span className="font-bold text-[#0064D0] dark:text-sky-400 flex items-center space-x-1 text-[11px] uppercase tracking-wider">
                          <ShieldCheck size={14} />
                          <span>How Watlys Guarantees Safety</span>
                        </span>
                        <p className="text-slate-700 dark:text-slate-200 text-[11px] font-medium leading-relaxed">
                          {currentArticles[0].watlysNote}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-[10px] uppercase font-bold text-slate-400 font-serif">
                      <span>{currentArticles[0].metaLeft}</span>
                      <span>{currentArticles[0].metaRight}</span>
                    </div>
                  </div>

                  {/* STORY 2 (RIGHT TOP CARD - 5 COLUMNS WITH IMAGE) */}
                  <div className="lg:col-span-5 bg-[#FAF9F6]/90 dark:bg-[#0a1128]/90 p-5 sm:p-7 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4 flex flex-col justify-between shadow-sm hover:border-[#0064D0] transition-colors group">
                    <div className="space-y-3">
                      {/* Visual Card Image Box */}
                      <div className="w-full h-40 sm:h-48 rounded-xl overflow-hidden relative border border-slate-200 dark:border-slate-800 shadow-xs">
                        <img 
                          src={currentArticles[1].imageSrc} 
                          alt={currentArticles[1].title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent p-4 flex flex-col justify-between">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded w-max font-sans ${currentArticles[1].badgeColor}`}>
                            {currentArticles[1].badge}
                          </span>
                          <div>
                            <span className="text-[10px] font-bold text-sky-200 uppercase tracking-wider font-sans block">
                              {currentArticles[1].tag}
                            </span>
                            <span className="text-sm font-serif font-bold text-white">
                              {currentArticles[1].title}
                            </span>
                          </div>
                        </div>
                      </div>

                      <h3 className="text-base sm:text-xl font-serif font-bold text-slate-950 dark:text-white leading-snug group-hover:text-[#0064D0] dark:group-hover:text-sky-400 transition-colors">
                        {currentArticles[1].num}. {currentArticles[1].title}
                      </h3>

                      <p className="text-xs text-slate-600 dark:text-slate-300 font-serif leading-relaxed">
                        {currentArticles[1].excerpt}
                      </p>

                      {/* Watlys Brand Sourcing Note */}
                      <div className="p-3 bg-sky-50 dark:bg-[#131c38] border-l-4 border-[#0064D0] rounded-r-lg space-y-1 text-xs font-sans border-y border-r border-sky-100 dark:border-slate-800">
                        <span className="font-bold text-[#0064D0] dark:text-sky-400 flex items-center space-x-1 text-[10px] uppercase tracking-wider">
                          <Droplet size={12} />
                          <span>Watlys Standard</span>
                        </span>
                        <p className="text-slate-700 dark:text-slate-200 text-[11px] font-medium leading-relaxed">
                          {currentArticles[1].watlysNote}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-[10px] uppercase font-bold text-slate-400 font-serif">
                      <span>{currentArticles[1].metaLeft}</span>
                      <span>{currentArticles[1].metaRight}</span>
                    </div>
                  </div>

                  {/* LOWER ROW - 3 COLUMNS GRID FOR STORIES 3, 4, 5 (WITH IMAGES) */}
                  <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                    {currentArticles.slice(2, 5).map((item) => (
                      <div
                        key={item.num}
                        className="bg-[#FAF9F6]/90 dark:bg-[#0a1128]/90 p-5 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4 flex flex-col justify-between shadow-sm hover:border-[#0064D0] transition-colors group"
                      >
                        <div className="space-y-3">
                          {/* Visual Image Header Box */}
                          <div className="w-full h-28 rounded-xl overflow-hidden relative border border-slate-200 dark:border-slate-800 shadow-xs">
                            <img 
                              src={item.imageSrc} 
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent p-3 flex items-end justify-between">
                              <span className="text-[10px] font-bold text-white uppercase tracking-widest font-sans drop-shadow-xs">
                                {item.tag}
                              </span>
                              <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded font-sans ${item.badgeColor}`}>
                                {item.badge}
                              </span>
                            </div>
                          </div>

                          <h4 className="text-base font-serif font-bold text-slate-950 dark:text-white leading-snug group-hover:text-[#0064D0] dark:group-hover:text-sky-400 transition-colors">
                            {item.num}. {item.title}
                          </h4>

                          <p className="text-xs text-slate-600 dark:text-slate-300 font-serif leading-relaxed">
                            {item.excerpt}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-[9px] uppercase font-bold text-slate-400 font-serif">
                          <span>{item.metaLeft}</span>
                          <span>{item.metaRight}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>
          )}

          {/* VIEW MODE 2: INTERACTIVE PDF EMBEDDED VIEWER */}
          {viewMode === 'pdf' && (
            <div className="space-y-4 pt-2">
              <div className="flex justify-between items-center text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] border-b border-slate-900 dark:border-slate-700 pb-1 font-serif text-slate-900 dark:text-white">
                <span>INTERACTIVE PDF DOCUMENT — PAGE {currentPage} OF {totalPages}</span>
                <a 
                  href={`/docs/Pakistan_Mineral_Water_Newsletter.pdf#page=${currentPage}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#0064D0] dark:text-sky-400 hover:underline flex items-center space-x-1"
                >
                  <span>Open Page {currentPage} Fullscreen</span>
                  <ArrowUpRight size={12} />
                </a>
              </div>

              <div className="w-full h-[650px] bg-slate-100 dark:bg-[#0a1128] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-inner">
                <iframe
                  key={`pdf-embed-page-${currentPage}`}
                  src={`/docs/Pakistan_Mineral_Water_Newsletter.pdf#page=${currentPage}&toolbar=1&navpanes=0&view=FitH`}
                  title={`Pakistan Water & Mineral Water Monthly Briefing Page ${currentPage}`}
                  className="w-full h-full border-0"
                />
              </div>
            </div>
          )}

          {/* VIEW MODE 3: FULL EDITORIAL ARTICLE */}
          {viewMode === 'article' && (
            <div className="space-y-6 pt-2 font-sans">
              <div className="p-4 bg-sky-50 dark:bg-[#0a1128] border border-sky-200 dark:border-slate-800 rounded-xl flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  Full 6-Page Text & Data Digest (Currently Viewing Page {currentPage} Context)
                </span>
                <Link
                  href="/insights/pakistan-mineral-water-briefing"
                  className="px-4 py-2 bg-[#0064D0] hover:bg-[#0052ad] text-white font-bold rounded-lg transition-colors text-[11px] uppercase tracking-wider"
                >
                  Read Full SEO Blog Page
                </Link>
              </div>

              <article className="prose dark:prose-invert max-w-none space-y-6 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-serif leading-relaxed">
                <h2 className="text-xl font-bold text-slate-950 dark:text-white font-serif">
                  Pakistan Water Industry Report (2026): Page {currentPage} Deep-Dive
                </h2>
                <div className="p-5 bg-[#FAF9F6] dark:bg-[#0a1128] border border-slate-200 dark:border-slate-800 rounded-2xl space-y-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white font-serif">
                    {currentArticles[0].title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {currentArticles[0].excerpt}
                  </p>
                </div>
              </article>
            </div>
          )}

          {/* BOTTOM GAZETTE FOOTER CTA */}
          <div className="pt-6 border-t border-slate-900 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left space-y-1 font-serif">
              <h4 className="text-xs sm:text-sm font-bold text-slate-950 dark:text-white">
                Pakistan Water & Mineral Water Monthly Briefing (July–Sept 2026) — Page {currentPage}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">
                Official research document • Certified PSQCA & PCRWR compliance guidelines
              </p>
            </div>

            <a
              href="/docs/Pakistan_Mineral_Water_Newsletter.pdf"
              download="Pakistan_Mineral_Water_Newsletter.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 bg-[#0064D0] hover:bg-[#0052ad] text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md text-center shrink-0 flex items-center justify-center space-x-2"
            >
              <Download size={14} />
              <span>📄 Download Full Industry Report (PDF)</span>
            </a>
          </div>

          {/* DASHED GAZETTE SUBSCRIPTION BANNER */}
          <div className="mt-8 p-6 sm:p-8 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-sky-50/50 dark:bg-[#0a1128]/50 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#0064D0] dark:text-sky-400 font-sans block">
                DELIVERED EVERY MONTH
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-950 dark:text-white">
                Receive the next edition
              </h3>
            </div>

            <form 
              onSubmit={(e) => {
                e.preventDefault()
                if (!newsletterEmail) return
                setSubscribed(true)
                setTimeout(() => {
                  setNewsletterEmail('')
                  setSubscribed(false)
                }, 3000)
              }} 
              className="flex flex-col sm:flex-row items-center gap-2.5 w-full md:w-auto font-sans"
            >
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Your email address"
                className="px-4 py-3 bg-white dark:bg-[#131c38] border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#0064D0] w-full sm:w-64 shadow-xs"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-[#0064D0] hover:bg-[#0052ad] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors inline-flex items-center justify-center space-x-1.5 shrink-0 shadow-md cursor-pointer"
              >
                <span>Subscribe</span>
                <ArrowUpRight size={14} />
              </button>
            </form>
          </div>

          {subscribed && (
            <div className="p-3 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-bold text-center border border-emerald-300 dark:border-emerald-800">
              ✓ Thank you! You will receive the next edition directly in your inbox.
            </div>
          )}

        </div>

        {/* DARK GAZETTE FOOTER CTA (WITH INTERACTIVE MOUSE PATTERN SPOTLIGHT & RIGHT PATTERN OVERLAY) */}
        <FooterCursorPattern patternSrc="/patterns/pattern-05.svg">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#0064D0] dark:bg-[#131c38] text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-sky-500/30 dark:border-slate-800 font-sans relative overflow-hidden group">
            
            {/* Geometric Brand Pattern Overlay on Right Side (Matching reference screenshot) */}
            <div 
              className="absolute right-0 top-0 bottom-0 w-full sm:w-1/2 opacity-20 group-hover:opacity-45 transition-opacity duration-500 pointer-events-none bg-right bg-no-repeat bg-contain"
              style={{
                backgroundImage: `url('/patterns/pattern-05.svg')`,
                maskImage: 'radial-gradient(ellipse at right center, black 40%, transparent 85%)',
                WebkitMaskImage: 'radial-gradient(ellipse at right center, black 40%, transparent 85%)',
              }}
            />

            <div className="space-y-2 text-center md:text-left relative z-10">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.35em] text-sky-200 block font-sans">
                BEGIN WITH A CONVERSATION
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                Let’s find water that feels pure.
              </h2>
            </div>

            <Link
              href="/order"
              className="px-8 py-4 bg-white text-[#0064D0] hover:bg-sky-50 font-bold text-xs uppercase tracking-widest rounded-full transition-all shadow-lg hover:scale-105 inline-flex items-center space-x-2 shrink-0 relative z-10"
            >
              <span>Start your water subscription</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </FooterCursorPattern>

      </div>
    </section>
  )
}
