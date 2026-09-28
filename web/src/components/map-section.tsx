'use client'

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Navigation, MessageCircle, ExternalLink, Sparkles, Building2, Phone, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react'
import { useLanguage } from '@/context/language'

interface CityLocation {
  id: string
  name: string
  nameUrdu: string
  shortName: string
  shortNameUrdu: string
  address: string
  addressUrdu: string
  embedUrl: string
  phone: string
  status: string
  statusUrdu: string
  latPos: string
  lngPos: string
}

const CITIES: CityLocation[] = [
  {
    id: 'islamabad',
    name: 'Islamabad (Headquarters)',
    nameUrdu: 'اسلام آباد (مرکزی دفتر)',
    shortName: 'Islamabad HQ',
    shortNameUrdu: 'اسلام آباد HQ',
    address: 'Executive Tower, Blue Area, F-7, Islamabad',
    addressUrdu: 'ایگزیکٹو ٹاور، بلیو ایریا، F-7، اسلام آباد',
    embedUrl: 'https://maps.google.com/maps?q=Blue%20Area,%20Islamabad,%20Pakistan&t=&z=14&ie=UTF8&iwloc=&output=embed',
    phone: '+92 51 111 928 597',
    status: 'ONLINE • Express 60-Min Delivery',
    statusUrdu: 'آن لائن • 60 منٹ ڈیلیوری',
    latPos: '42%',
    lngPos: '50%'
  },
  {
    id: 'lahore',
    name: 'Lahore Flagship Hub',
    nameUrdu: 'لاہور فلیگ شپ ہب',
    shortName: 'Lahore Hub',
    shortNameUrdu: 'لاہور ہب',
    address: 'Phase 5 Commercial Area, DHA, Lahore',
    addressUrdu: 'فیز 5 کمرشل، ڈی ایچ اے، لاہور',
    embedUrl: 'https://maps.google.com/maps?q=DHA%20Phase%205,%20Lahore,%20Pakistan&t=&z=14&ie=UTF8&iwloc=&output=embed',
    phone: '+92 42 111 928 597',
    status: 'ONLINE • Active Dispatch Network',
    statusUrdu: 'آن لائن • فعال ڈسپیچ نیٹ ورک',
    latPos: '48%',
    lngPos: '52%'
  },
  {
    id: 'karachi',
    name: 'Karachi Regional Hub',
    nameUrdu: 'کراچی ریجنل ہب',
    shortName: 'Karachi Hub',
    shortNameUrdu: 'کراچی ہب',
    address: 'Main Khayaban-e-Ittehad, DHA Phase 6, Karachi',
    addressUrdu: 'خیابانِ اتحاد، ڈی ایچ اے، کراچی',
    embedUrl: 'https://maps.google.com/maps?q=Khayaban-e-Ittehad,%20DHA%20Phase%206,%20Karachi,%20Pakistan&t=&z=14&ie=UTF8&iwloc=&output=embed',
    phone: '+92 21 111 928 597',
    status: 'ONLINE • Coastal Logistics Center',
    statusUrdu: 'آن لائن • کوسٹل لاجسٹکس سینٹر',
    latPos: '55%',
    lngPos: '48%'
  },
  {
    id: 'rawalpindi',
    name: 'Rawalpindi Express Depot',
    nameUrdu: 'راولپنڈی ایکسپریس ڈیپو',
    shortName: 'Rawalpindi Depot',
    shortNameUrdu: 'راولپنڈی ڈیپو',
    address: 'Saddar Cantt Commercial Center, Rawalpindi',
    addressUrdu: 'صدر کینٹ کمرشل سینٹر، راولپنڈی',
    embedUrl: 'https://maps.google.com/maps?q=Saddar,%20Rawalpindi,%20Pakistan&t=&z=14&ie=UTF8&iwloc=&output=embed',
    phone: '+92 51 111 928 598',
    status: 'ONLINE • Twin Cities Direct',
    statusUrdu: 'آن لائن • جڑواں شہر ڈائریکٹ',
    latPos: '38%',
    lngPos: '46%'
  }
]

export default function MapSection() {
  const { isRtl } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [selectedCityId, setSelectedCityId] = useState<string>('islamabad')

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

  const activeCity = CITIES.find((c) => c.id === selectedCityId) || CITIES[0]

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      onMouseEnter={() => setIsOutsideHovered(true)}
      onMouseLeave={() => setIsOutsideHovered(false)}
      className="relative py-12 sm:py-24 px-4 sm:px-8 max-w-[1536px] mx-auto w-full font-sans overflow-hidden bg-[#FAF9F6] dark:bg-[#0a1128] transition-colors duration-300 select-none"
    >
      
      {/* AMBIENT OCEAN BLUE GLOW ACCENT */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[800px] h-[400px] sm:h-[800px] bg-[#0066FF]/10 dark:bg-[#0066FF]/20 rounded-full blur-[120px] pointer-events-none z-0" />

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
          className="w-full h-full opacity-20 dark:opacity-30"
          style={{
            backgroundImage: `url('/patterns/pattern-01.svg')`,
            backgroundRepeat: 'repeat',
            backgroundSize: '240px 240px',
          }}
        />
        
        {/* Soft Compact Light Glow Sphere at Cursor */}
        <div
          className="absolute w-[240px] h-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0066FF]/15 dark:bg-[#0066FF]/25 blur-2xl pointer-events-none"
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
          }}
        />
      </div>

      {/* HEADER TITLE (Removes pattern spotlight on hover) */}
      <div
        onMouseEnter={(e) => {
          e.stopPropagation()
          setIsOutsideHovered(false)
        }}
        onMouseLeave={() => setIsOutsideHovered(true)}
        className="relative z-10 text-center space-y-3 mb-10 sm:mb-16 px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/30 text-[#0066FF] text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em]"
        >
          <Sparkles size={14} className="animate-pulse text-[#0066FF]" />
          <span>{isRtl ? '3D لوکیشن نیٹ ورک' : 'WATLYS INTERACTIVE SPLIT MAP'}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 dark:text-white tracking-wide"
        >
          {isRtl ? 'حقیقی وقت کی ترسیلی مراکز' : 'Islamabad Flagship Hub & Network'}
        </motion.h2>
        
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light max-w-lg mx-auto">
          Explore our automated bottling facilities and regional express fulfillment hubs.
        </p>
      </div>

      {/* INTERACTIVE SPLIT MAP SYSTEM GRID (Removes pattern spotlight on hover) */}
      <div
        onMouseEnter={(e) => {
          e.stopPropagation()
          setIsOutsideHovered(false)
        }}
        onMouseLeave={() => setIsOutsideHovered(true)}
        className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch max-w-7xl mx-auto"
      >

        {/* SIDEBAR PANEL (LEFT) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-4 bg-slate-950/80 backdrop-blur-xl border border-blue-900/40 text-white rounded-3xl p-5 sm:p-7 flex flex-col justify-between shadow-2xl shadow-blue-950/40 space-y-6"
        >
          {/* Sidebar Header */}
          <div className="space-y-2 border-b border-blue-900/40 pb-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#0066FF]">
                SELECT WATLYS HUB
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-600/20 text-blue-400 text-[10px] font-bold border border-blue-500/30">
                {CITIES.length} Active Centers
              </span>
            </div>
            <h3 className="text-lg font-serif font-bold text-white tracking-wide">
              Regional Delivery Network
            </h3>
          </div>

          {/* Location Items List */}
          <div className="space-y-3 flex-1 overflow-y-auto pr-1">
            {CITIES.map((city) => {
              const isActive = city.id === selectedCityId
              return (
                <div
                  key={city.id}
                  onClick={() => setSelectedCityId(city.id)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all flex items-center justify-between border ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(0,102,255,0.4)] border-blue-400/50 scale-[1.01]'
                      : 'text-slate-300 hover:bg-blue-600/20 hover:text-white transition-all border-transparent'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div className={`p-2.5 rounded-xl transition-colors shrink-0 ${
                      isActive ? 'bg-white/20 text-white' : 'bg-blue-950/60 text-[#0066FF]'
                    }`}>
                      <Building2 size={18} />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-sm font-bold tracking-wide">
                        {isRtl ? city.shortNameUrdu : city.shortName}
                      </h4>
                      <p className={`text-xs line-clamp-1 font-light ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                        {isRtl ? city.addressUrdu : city.address}
                      </p>
                    </div>
                  </div>

                  <div className={`w-3 h-3 rounded-full shrink-0 ${
                    isActive ? 'bg-white animate-pulse' : 'bg-slate-700'
                  }`} />
                </div>
              )
            })}
          </div>

          {/* Sidebar Footer Support Card */}
          <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-900/30 space-y-2 text-xs text-slate-300">
            <div className="flex items-center gap-2 text-[#0066FF] font-bold text-[11px] uppercase tracking-wider">
              <ShieldCheck size={14} />
              <span>Dedicated Concierge Line</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Same-day fulfillment guaranteed for home subscriptions & commercial accounts.
            </p>
            <div className="pt-1 font-mono font-bold text-white text-xs flex items-center gap-1.5">
              <Phone size={13} className="text-[#0066FF]" />
              <span>{activeCity.phone}</span>
            </div>
          </div>

        </motion.div>

        {/* INTERACTIVE MAP PANEL (RIGHT) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-8 relative rounded-3xl overflow-hidden border border-blue-900/40 bg-slate-950 shadow-2xl shadow-blue-950/30 min-h-[480px] sm:min-h-[580px] flex flex-col justify-between"
        >

          {/* MAP IFRAME CONTAINER */}
          <div className="absolute inset-0 w-full h-full">
            <AnimatePresence mode="wait">
              <motion.iframe
                key={activeCity.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                title={`Watlys ${activeCity.name} 3D Map`}
                src={activeCity.embedUrl}
                width="100%"
                height="100%"
                className="w-full h-full border-0 filter contrast-125 brightness-95"
                loading="lazy"
                allowFullScreen
              />
            </AnimatePresence>
          </div>

          {/* TOP SIDEBAR BADGE OVERLAY */}
          <div className="relative z-20 p-4 sm:p-6 flex justify-between items-start pointer-events-none">
            {/* Live Status Badge */}
            <div className="pointer-events-auto flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-slate-950/80 backdrop-blur-xl border border-blue-900/40 text-white text-xs font-bold shadow-xl">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span>{isRtl ? activeCity.statusUrdu : activeCity.status}</span>
            </div>

            {/* Ocean Blue Brand Tag */}
            <div className="pointer-events-auto hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950/80 backdrop-blur-xl border border-blue-900/40 text-white text-xs font-bold tracking-widest uppercase shadow-xl">
              <span className="w-2 h-2 rounded-full bg-[#0066FF]" />
              <span>WATLYS 3D HQ MAP</span>
            </div>
          </div>

          {/* CUSTOM WATER DROPLET PIN MARKERS OVERLAY ON MAP */}
          <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center">
            {/* Animated Ocean Blue SVG Water Droplet Pin with Outer Glowing Pulse Ring */}
            <div className="relative pointer-events-auto flex flex-col items-center group">
              
              {/* Outer Glowing Pulse Ring */}
              <div className="absolute -inset-3 rounded-full bg-[#0066FF] animate-ping opacity-75 blur-sm" />
              
              {/* SVG Water Droplet Pin Button */}
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-12 h-12 rounded-full bg-[#0066FF] text-white flex items-center justify-center shadow-[0_0_25px_rgba(0,102,255,0.8)] border-2 border-white cursor-pointer z-10 transition-transform"
              >
                <svg className="w-6 h-6 fill-current drop-shadow-md" viewBox="0 0 24 24">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
              </motion.div>

              {/* Active Pin Tooltip: Clean White Glassmorphism Card */}
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                key={activeCity.id + '-pin-tooltip'}
                className="mt-3 bg-white/95 text-slate-900 backdrop-blur-md rounded-xl p-3 sm:p-3.5 border border-blue-200 shadow-2xl space-y-1 max-w-[260px] text-center pointer-events-auto z-30"
              >
                <div className="flex items-center justify-center gap-1.5 text-[#0066FF] font-bold text-xs">
                  <Building2 size={14} />
                  <span>{isRtl ? activeCity.shortNameUrdu : activeCity.shortName}</span>
                </div>
                <p className="text-[11px] text-slate-600 font-medium leading-tight">
                  {isRtl ? activeCity.addressUrdu : activeCity.address}
                </p>
                <div className="pt-1 flex items-center justify-center gap-1 text-[10px] font-bold text-emerald-600 uppercase">
                  <CheckCircle2 size={12} />
                  <span>Active Dispatch Center</span>
                </div>
              </motion.div>

            </div>
          </div>

          {/* BOTTOM FLOATING CONTROL PANEL CARD */}
          <div className="relative z-20 p-4 sm:p-6 pointer-events-auto max-w-md w-full">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              key={activeCity.id + '-bottom-card'}
              className="p-5 rounded-2xl bg-slate-950/80 backdrop-blur-xl border border-blue-900/40 shadow-2xl text-white space-y-4"
            >
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-blue-600 text-white shrink-0 shadow-[0_0_15px_rgba(0,102,255,0.5)]">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white tracking-wide">
                    {isRtl ? activeCity.nameUrdu : activeCity.name}
                  </h4>
                  <p className="text-xs text-slate-300 font-light leading-relaxed mt-0.5">
                    {isRtl ? activeCity.addressUrdu : activeCity.address}
                  </p>
                </div>
              </div>

              {/* Action Buttons Grid */}
              <div className="flex items-center gap-3 pt-2 border-t border-blue-900/40">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeCity.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,102,255,0.4)] transition-all active:scale-[0.98] border border-blue-400/30"
                >
                  <Navigation size={14} />
                  <span>{isRtl ? 'گوگل میپ سمت' : 'Get Directions'}</span>
                  <ExternalLink size={12} />
                </a>

                <a
                  href="https://wa.me/923001234567?text=Hi%20Watlys%20I%20want%20to%20order%20drinking%20water"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98]"
                >
                  <MessageCircle size={15} />
                  <span>WhatsApp</span>
                </a>
              </div>
            </motion.div>
          </div>

        </motion.div>

      </div>

    </section>
  )
}
