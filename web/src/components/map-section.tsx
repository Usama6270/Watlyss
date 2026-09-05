'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Navigation, MessageCircle, ExternalLink, Sparkles, Building2 } from 'lucide-react'
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
    status: 'ONLINE • Express Delivery',
    statusUrdu: 'آن لائن • 60 منٹ ڈیلیوری'
  },
  {
    id: 'lahore',
    name: 'Lahore Hub',
    nameUrdu: 'لاہور ہب',
    shortName: 'Lahore Hub',
    shortNameUrdu: 'لاہور ہب',
    address: 'Phase 5 Commercial Area, DHA, Lahore',
    addressUrdu: 'فیز 5 کمرشل، ڈی ایچ اے، لاہور',
    embedUrl: 'https://maps.google.com/maps?q=DHA%20Phase%205,%20Lahore,%20Pakistan&t=&z=14&ie=UTF8&iwloc=&output=embed',
    phone: '+92 42 111 928 597',
    status: 'ONLINE • Active Route',
    statusUrdu: 'آن لائن • فعال روٹ'
  },
  {
    id: 'karachi',
    name: 'Karachi Hub',
    nameUrdu: 'کراچی ہب',
    shortName: 'Karachi Hub',
    shortNameUrdu: 'کراچی ہب',
    address: 'Main Khayaban-e-Ittehad, DHA Phase 6, Karachi',
    addressUrdu: 'خیابانِ اتحاد، ڈی ایچ اے، کراچی',
    embedUrl: 'https://maps.google.com/maps?q=Khayaban-e-Ittehad,%20DHA%20Phase%206,%20Karachi,%20Pakistan&t=&z=14&ie=UTF8&iwloc=&output=embed',
    phone: '+92 21 111 928 597',
    status: 'ONLINE • South Logistics',
    statusUrdu: 'آن لائن • جنوبی سینٹر'
  }
]

export default function MapSection() {
  const { isRtl } = useLanguage()
  const [selectedCityId, setSelectedCityId] = useState<string>('islamabad')

  const activeCity = CITIES.find((c) => c.id === selectedCityId) || CITIES[0]

  return (
    <section className="relative py-10 sm:py-20 px-3 sm:px-8 max-w-[1536px] mx-auto w-full font-sans overflow-hidden">
      
      {/* AMBIENT BACKGROUND GLOW ACCENT */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[700px] h-[350px] sm:h-[700px] bg-[#0064D0]/10 dark:bg-[#0064D0]/20 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none z-0" />

      {/* HEADER TITLE */}
      <div className="relative z-10 text-center space-y-2.5 mb-6 sm:mb-12 px-2">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sky-100 dark:bg-[#0064D0]/20 border border-sky-200 dark:border-[#0064D0]/40 text-[#0064D0] dark:text-sky-300 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]"
        >
          <Sparkles size={13} className="animate-pulse" />
          <span>{isRtl ? '3D لوکیشن میپ' : 'WATLYS 3D LOCATION MAP'}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight"
        >
          {isRtl ? 'اسلام آباد ہیڈکوارٹرز' : 'Islamabad Flagship Hub'}
        </motion.h2>
      </div>

      {/* COMPACT SINGLE-ROW MOBILE CITY SELECTION PILLS */}
      <div className="relative z-10 flex justify-center items-center gap-1.5 sm:gap-3 mb-5 sm:mb-8 px-1">
        {CITIES.map((city) => {
          const isActive = city.id === selectedCityId
          return (
            <motion.button
              key={city.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedCityId(city.id)}
              className={`px-3 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-[11px] sm:text-sm font-bold tracking-wide transition-all cursor-pointer flex items-center gap-1.5 shadow-sm sm:shadow-md ${
                isActive
                  ? 'bg-[#0064D0] text-white shadow-[#0064D0]/30 border border-blue-400'
                  : 'bg-white dark:bg-[#131c38] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 hover:border-[#0064D0]/50'
              }`}
            >
              <Building2 size={14} className={isActive ? 'text-white' : 'text-[#0064D0]'} />
              <span>{isRtl ? city.shortNameUrdu : city.shortName}</span>
            </motion.button>
          )
        })}
      </div>

      {/* FULLY RESPONSIVE 3D MAP CONTAINER (CLEAN MOBILE COLUMN & DESKTOP OVERLAY) */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full rounded-3xl bg-white dark:bg-[#0a1128] border border-slate-200 dark:border-slate-800 shadow-xl shadow-sky-950/5 overflow-hidden flex flex-col sm:block"
      >

        {/* MAP IFRAME CONTAINER */}
        <div className="relative w-full h-[320px] sm:h-[500px] md:h-[600px] overflow-hidden border-b sm:border-b-0 border-slate-200 dark:border-slate-800">
          
          <AnimatePresence mode="wait">
            <motion.iframe
              key={activeCity.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              title={`Watlys ${activeCity.name} 3D Map`}
              src={activeCity.embedUrl}
              width="100%"
              height="100%"
              className="absolute inset-0 w-full h-full border-0 filter dark:contrast-125 dark:brightness-90"
              loading="lazy"
              allowFullScreen
            />
          </AnimatePresence>

          {/* COMPACT FLOATING LIVE STATUS BADGE */}
          <div className="absolute top-3 left-3 sm:top-5 sm:left-5 z-20 pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              key={activeCity.id}
              className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl bg-white/95 dark:bg-[#0a1128]/95 backdrop-blur-md border border-slate-200/80 dark:border-slate-700 shadow-lg"
            >
              <div className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-emerald-500" />
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-slate-900 dark:text-white">
                {isRtl ? activeCity.statusUrdu : activeCity.status}
              </span>
            </motion.div>
          </div>

          {/* DESKTOP-ONLY 3D BADGE CORNER */}
          <div className="absolute top-5 right-5 z-20 pointer-events-none hidden sm:block">
            <div className="px-3.5 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-xs font-bold tracking-widest uppercase shadow-lg">
              WATLYS 3D HQ MAP
            </div>
          </div>
        </div>

        {/* LOCATION DETAILS & ACTION BUTTONS CARD — CLEAN MOBILE SECTION / DESKTOP OVERLAY */}
        <div className="p-4 sm:p-5 sm:absolute sm:bottom-6 sm:left-6 sm:right-auto z-20 sm:max-w-md w-full pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={activeCity.id + '-card'}
            className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-slate-50 sm:bg-white/95 dark:bg-[#0e1738] sm:dark:bg-[#0a1128]/95 backdrop-blur-xl border border-slate-200/90 dark:border-slate-700/90 shadow-lg sm:shadow-2xl space-y-3"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-[#0064D0] text-white shrink-0 shadow-md">
                <MapPin size={18} className="sm:w-5 sm:h-5" />
              </div>
              <div>
                <h4 className="text-sm sm:text-lg font-bold text-slate-900 dark:text-white">
                  {isRtl ? activeCity.nameUrdu : activeCity.name}
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed mt-0.5">
                  {isRtl ? activeCity.addressUrdu : activeCity.address}
                </p>
              </div>
            </div>

            {/* ACTION BUTTONS GRID */}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-200/80 dark:border-slate-800">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeCity.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-3.5 bg-[#0064D0] hover:bg-[#0052ad] text-white font-bold rounded-xl sm:rounded-2xl text-[11px] sm:text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-[0.98]"
              >
                <Navigation size={14} />
                <span>{isRtl ? 'گوگل میپ سمت' : 'Get Directions'}</span>
                <ExternalLink size={12} />
              </a>

              <a
                href="https://wa.me/923001234567?text=Hi%20Watlys%20I%20want%20to%20order%20drinking%20water"
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl sm:rounded-2xl text-[11px] sm:text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-[0.98]"
              >
                <MessageCircle size={15} />
                <span>WhatsApp</span>
              </a>
            </div>
          </motion.div>
        </div>

      </motion.div>
    </section>
  )
}
