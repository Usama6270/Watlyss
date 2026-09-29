'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { useLanguage } from '@/context/language'
import { MessageCircle, Mail, MapPin, ChevronDown } from 'lucide-react'
import FooterWaterEffect from '@/components/footer-water-effect'

export default function FooterSection() {
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isOverInteractive, setIsOverInteractive] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [openSection, setOpenSection] = useState<string | null>(null)
  const [isPointerFine, setIsPointerFine] = useState(false)
  const footerRef = useRef<HTMLElement>(null)

  // Framer Motion Springs for Desktop Cursor-Follow Parallax Shift
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rafId = useRef<number | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsPointerFine(window.matchMedia('(hover: hover) and (pointer: fine)').matches)
    }
  }, [])

  const toggleSection = (section: string) => {
    setOpenSection(prev => (prev === section ? null : section))
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const target = e.target as HTMLElement
    const isInteractive = target.closest('button, a, input, select, textarea, [role="button"]') !== null
    setIsOverInteractive(isInteractive)

    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current)
    }

    rafId.current = requestAnimationFrame(() => {
      setMousePosition({ x, y })

      if (isPointerFine) {
        const offsetX = (x / rect.width) - 0.5
        const offsetY = (y / rect.height) - 0.5
        mouseX.set(offsetX * 30)
        mouseY.set(offsetY * 30)
      }
    })
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLElement>) => {
    if (!e.touches[0]) return
    const rect = e.currentTarget.getBoundingClientRect()
    const touch = e.touches[0]
    const x = touch.clientX - rect.left
    const y = touch.clientY - rect.top

    const target = document.elementFromPoint(touch.clientX, touch.clientY) as HTMLElement
    const isInteractive = target ? target.closest('button, a, input, select, textarea, [role="button"]') !== null : false
    setIsOverInteractive(isInteractive)

    setIsHovered(true)
    setMousePosition({ x, y })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setIsOverInteractive(false)
    if (isPointerFine) {
      mouseX.set(0)
      mouseY.set(0)
    }
  }

  const handleTouchEnd = () => {
    setIsHovered(false)
    setIsOverInteractive(false)
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSuccess(true)
    setTimeout(() => {
      setEmail('')
      setSuccess(false)
    }, 3000)
  }

  const sections = [
    {
      id: 'explore',
      title: 'EXPLORE',
      links: [
        { label: 'Our Water (19L)', href: '/our-water' },
        { label: 'How It Works', href: '/process' },
        { label: 'Sustainability', href: '/sustainability' },
        { label: 'About Us', href: '/about' },
      ],
    },
    {
      id: 'services',
      title: 'SERVICES',
      links: [
        { label: '19L Water Delivery', href: '/services/water-delivery' },
        { label: 'Free Bottle Installation', href: '/services/free-bottle-installation' },
        { label: 'Water Testing Assay', href: '/services/water-testing' },
        { label: 'Dispenser Service', href: '/services/dispenser-service' },
      ],
    },
    {
      id: 'locations',
      title: 'LOCATIONS & CONTACT',
      links: [
        { label: 'Contact Concierge', href: '/contact' },
        { label: 'Service Locations', href: '/locations' },
        { label: 'Corporate Inquiry', href: '/contact?type=corporate' },
      ],
    },
  ]

  return (
    <footer
      id="footer"
      ref={footerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchMove}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      className={`relative w-full pt-6 sm:pt-8 pb-4 sm:pb-6 border-t font-sans transition-all duration-700 ease-in-out overflow-hidden ${
        isHovered
          ? 'bg-[#0064D0] dark:bg-[#0052ad] text-white border-[#0064D0]'
          : 'bg-[#FAF9F6] dark:bg-[#0a1128] text-zinc-900 dark:text-[#FAFAFA] border-zinc-200/60 dark:border-slate-800/60'
      }`}
    >
      {/* Dynamic Cursor-Following Pattern Spotlight (Reveals Pattern ONLY on Hover and NOT over clickable buttons) */}
      <AnimatePresence>
        {isHovered && !isOverInteractive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="pointer-events-none absolute w-[380px] h-[380px] sm:w-[500px] sm:h-[500px] rounded-full z-10 overflow-hidden transform-gpu will-change-transform"
            style={{
              left: mousePosition.x - 250,
              top: mousePosition.y - 250,
              maskImage: 'radial-gradient(circle 220px at center, black 30%, transparent 85%)',
              WebkitMaskImage: 'radial-gradient(circle 220px at center, black 30%, transparent 85%)',
            }}
          >
            {/* Ambient White/Sky Blue Radial Spotlight Glow */}
            <div className="absolute inset-0 bg-white/20 dark:bg-white/25 rounded-full blur-xl" />

            {/* Pattern Layer revealed exclusively around mouse cursor */}
            <div
              className="absolute inset-0 w-full h-full bg-repeat opacity-50 dark:opacity-70 mix-blend-overlay"
              style={{
                backgroundImage: `url('/patterns/pattern-05.svg'), url('/patterns/pattern-04.svg')`,
                backgroundSize: '240px auto',
                backgroundPosition: 'center',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle Premium Cursor Water Effect Canvas */}
      <FooterWaterEffect containerRef={footerRef} />

      <div className="relative z-20 max-w-[1240px] mx-auto px-6 sm:px-8 space-y-4 sm:space-y-5 pointer-events-auto">

        {/* Brand Statement Lead-in */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 pb-4 sm:pb-5 border-b transition-colors duration-700 items-start ${
          isHovered ? 'border-white/30' : 'border-zinc-200/60 dark:border-slate-800/60'
        }`}>
          <div className="lg:col-span-6 space-y-1.5">
            <Link href="/" className="relative block h-9 sm:h-11 w-32 sm:w-40">
              <Image
                src="/logo.png"
                alt="Watlys 19L Pure Water Logo"
                fill
                priority
                className={`object-contain object-left transition-transform duration-300 hover:scale-105 ${
                  isHovered ? 'brightness-200 contrast-125' : ''
                }`}
              />
            </Link>
            <p className={`text-[11px] sm:text-xs font-normal leading-tight max-w-md transition-colors duration-500 ${
              isHovered ? 'text-sky-100' : 'text-zinc-600 dark:text-slate-300'
            }`}>
              Premier 19-Liter mineral drinking water subscription service delivered directly to your home or office.
            </p>
          </div>

          <div className="lg:col-span-6 space-y-1.5">
            <span className={`text-[9.5px] font-bold uppercase tracking-[0.25em] block transition-colors duration-500 ${
              isHovered ? 'text-white' : 'text-[#0064D0]'
            }`}>
              SUBSCRIBE TO WATER INSIGHTS
            </span>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.newsletter.emailPlaceholder}
                required
                className={`flex-1 px-3.5 py-1.5 border text-xs rounded-xl shadow-xs transition-all ${
                  isHovered 
                    ? 'bg-white/10 text-white placeholder-sky-100 border-white/30 focus:bg-white focus:text-slate-900 focus:placeholder-slate-400' 
                    : 'bg-white dark:bg-[#131c38] border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:border-[#0064D0]'
                }`}
              />
              <button
                type="submit"
                className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md shrink-0 ${
                  isHovered 
                    ? 'bg-white text-[#0064D0] hover:bg-sky-50 hover:scale-105 shadow-xl font-bold' 
                    : 'bg-[#0064D0] hover:bg-[#0052ad] text-white'
                }`}
              >
                {t.newsletter.button}
              </button>
            </form>
            <p className={`text-[10px] font-light pt-0.5 transition-colors duration-500 ${
              isHovered ? 'text-sky-100' : 'text-slate-500 dark:text-slate-400'
            }`}>
              Weekly water insights — unsubscribe anytime.
            </p>
            {success && (
              <p className={`text-xs font-light pt-1 ${isHovered ? 'text-emerald-200 font-bold' : 'text-emerald-600 dark:text-emerald-400'}`}>
                {t.newsletter.success}
              </p>
            )}
          </div>
        </div>

        {/* Desktop & Tablet Navigation Columns (3 Columns strictly matching Navbar) */}
        <div className="hidden sm:grid sm:grid-cols-3 gap-5 text-xs font-normal">
          {sections.map((sec) => (
            <div key={sec.id} className="space-y-2">
              <h4 className={`text-[9.5px] font-bold uppercase tracking-[0.2em] transition-colors duration-500 ${
                isHovered ? 'text-white' : 'text-[#0064D0]'
              }`}>
                {sec.title}
              </h4>
              <ul className={`space-y-1 transition-colors duration-500 ${
                isHovered ? 'text-sky-100' : 'text-slate-600 dark:text-slate-300'
              }`}>
                {sec.links.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href} 
                      className={`transition-colors inline-block ${
                        isHovered ? 'hover:text-white hover:underline' : 'hover:text-[#0064D0]'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mobile Accordion Navigation */}
        <div className="sm:hidden space-y-1.5">
          {sections.map((sec) => {
            const isOpen = openSection === sec.id
            return (
              <div key={sec.id} className={`border-b pb-1.5 ${isHovered ? 'border-white/30' : 'border-slate-200/80 dark:border-slate-800/60'}`}>
                <button
                  onClick={() => toggleSection(sec.id)}
                  className={`w-full flex justify-between items-center py-1 text-xs font-bold uppercase tracking-wider ${
                    isHovered ? 'text-white' : 'text-[#0064D0]'
                  }`}
                >
                  <span>{sec.title}</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-white' : isHovered ? 'text-white' : 'text-slate-400'}`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className={`pt-1 pb-0.5 space-y-1 text-xs font-light ${isHovered ? 'text-sky-100' : 'text-slate-600 dark:text-slate-300'}`}
                    >
                      {sec.links.map((link) => (
                        <li key={link.href}>
                          <Link href={link.href} className="block py-0.5 hover:underline">
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        {/* Concierge & Direct Contact Strip (3 Ultra-Compact Glass Cards with Right-Aligned Icons) */}
        <div className="pt-2.5 sm:pt-3 border-t border-slate-200/80 dark:border-slate-800/60 grid grid-cols-1 md:grid-cols-3 gap-2 text-xs font-light items-stretch">
          
          {/* WhatsApp Contact Card */}
          <a
            href="https://wa.me/923001234567?text=Hi%20Watlys%20I%20want%20to%20order%20drinking%20water"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-between h-9 sm:h-10 px-3 sm:px-3.5 rounded-lg border shadow-xs transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] group ${
              isHovered ? 'bg-white text-slate-900 border-white shadow-md' : 'bg-white dark:bg-[#131c38] text-slate-900 dark:text-white border-slate-200/80 dark:border-slate-800'
            }`}
          >
            <div className="min-w-0 flex-1">
              <span className="text-[8px] uppercase font-bold text-[#0064D0] block tracking-wider truncate leading-none mb-0.5">WHATSAPP CONCIERGE</span>
              <span className="font-semibold text-[11px] text-slate-900 dark:text-white truncate block group-hover:text-[#0064D0] transition-colors leading-none">+92 300 1234567</span>
            </div>
            <MessageCircle size={15} className="text-emerald-600 dark:text-emerald-400 shrink-0 ml-2 group-hover:scale-110 transition-transform" />
          </a>

          {/* Email Assistance Card */}
          <a
            href="mailto:care@watlys.com"
            className={`flex items-center justify-between h-9 sm:h-10 px-3 sm:px-3.5 rounded-lg border shadow-xs transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] group ${
              isHovered ? 'bg-white text-slate-900 border-white shadow-md' : 'bg-white dark:bg-[#131c38] text-slate-900 dark:text-white border-slate-200/80 dark:border-slate-800'
            }`}
          >
            <div className="min-w-0 flex-1">
              <span className="text-[8px] uppercase font-bold text-[#0064D0] block tracking-wider truncate leading-none mb-0.5">EMAIL ASSISTANCE</span>
              <span className="font-semibold text-[11px] text-slate-900 dark:text-white truncate block group-hover:text-[#0064D0] transition-colors leading-none">care@watlys.com</span>
            </div>
            <Mail size={15} className="text-[#0064D0] shrink-0 ml-2 group-hover:scale-110 transition-transform" />
          </a>

          {/* Service Regions Card */}
          <Link
            href="/locations"
            className={`flex items-center justify-between h-9 sm:h-10 px-3 sm:px-3.5 rounded-lg border shadow-xs transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] group ${
              isHovered ? 'bg-white text-slate-900 border-white shadow-md' : 'bg-white dark:bg-[#131c38] text-slate-900 dark:text-white border-slate-200/80 dark:border-slate-800'
            }`}
          >
            <div className="min-w-0 flex-1">
              <span className="text-[8px] uppercase font-bold text-[#0064D0] block tracking-wider truncate leading-none mb-0.5">SERVICE REGIONS</span>
              <span className="font-semibold text-[11px] text-slate-900 dark:text-white truncate block group-hover:text-[#0064D0] transition-colors leading-none">Lahore • Islamabad • Karachi</span>
            </div>
            <MapPin size={15} className="text-[#0064D0] shrink-0 ml-2 group-hover:scale-110 transition-transform" />
          </Link>

        </div>

        {/* Bottom Rights & Legal Row */}
        <div className={`pt-4 border-t transition-colors duration-700 flex flex-col sm:flex-row justify-between items-center text-[10px] gap-3 ${
          isHovered ? 'border-white/30 text-sky-100' : 'border-zinc-200/60 dark:border-slate-800/60 text-zinc-500 dark:text-slate-400'
        }`}>
          <p>{t.footer.rights}</p>
          <div className="flex items-center space-x-5">
            <Link href="/privacy-policy" className={isHovered ? 'hover:text-white hover:underline' : 'hover:text-[#0064D0]'}>Privacy Policy</Link>
            <Link href="/terms-and-conditions" className={isHovered ? 'hover:text-white hover:underline' : 'hover:text-[#0064D0]'}>Terms & Conditions</Link>
            <Link href="/terms-and-conditions#refund" className={isHovered ? 'hover:text-white hover:underline' : 'hover:text-[#0064D0]'}>Refund / Delivery Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
