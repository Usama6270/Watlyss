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
      id: 'product',
      title: 'PRODUCT',
      links: [
        { label: '19L Water Bottle', href: '/our-water' },
        { label: 'Build 19L Water Plan', href: '/order' },
        { label: 'Student & Hostel Plan', href: '/order?plan=student' },
        { label: 'Family Household Plan', href: '/order?plan=family' },
        { label: 'Corporate Suite Plan', href: '/order?plan=office' },
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
      id: 'company',
      title: 'COMPANY',
      links: [
        { label: 'About Watlys', href: '/about' },
        { label: 'Water Process', href: '/process' },
        { label: 'Sustainability', href: '/sustainability' },
        { label: 'Water Insights', href: '/insights' },
        { label: 'Certifications', href: '/certifications' },
      ],
    },
    {
      id: 'support',
      title: 'SUPPORT',
      links: [
        { label: 'FAQ', href: '/faq' },
        { label: 'Coverage Areas', href: '/locations' },
        { label: 'Contact Concierge', href: '/contact' },
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
      className={`relative w-full pt-14 sm:pt-20 pb-12 border-t font-sans transition-all duration-700 ease-in-out overflow-hidden ${
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

      <div className="relative z-20 max-w-7xl mx-auto px-6 space-y-12 sm:space-y-16 pointer-events-auto">

        {/* Brand Statement Lead-in */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 sm:pb-16 border-b transition-colors duration-700 items-start ${
          isHovered ? 'border-white/30' : 'border-zinc-200/60 dark:border-slate-800/60'
        }`}>
          <div className="lg:col-span-6 space-y-4">
            <Link href="/" className="relative block h-16 sm:h-20 w-52 sm:w-64">
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
            <p className={`text-xs sm:text-sm font-light leading-relaxed max-w-md transition-colors duration-500 ${
              isHovered ? 'text-sky-100' : 'text-zinc-600 dark:text-slate-200'
            }`}>
              Pakistan’s premier 19-Liter mineral drinking water subscription service. Delivering subterranean aquifer water directly to homes, student hostels, and corporate offices across Lahore, Karachi, and Islamabad.
            </p>
          </div>

          <div className="lg:col-span-6 space-y-3">
            <span className={`text-[10px] font-bold uppercase tracking-[0.25em] block transition-colors duration-500 ${
              isHovered ? 'text-white' : 'text-[#0064D0]'
            }`}>
              SUBSCRIBE TO WATER INSIGHTS
            </span>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.newsletter.emailPlaceholder}
                required
                className={`flex-1 px-4 py-3 border text-xs rounded-xl shadow-sm transition-all ${
                  isHovered 
                    ? 'bg-white/10 text-white placeholder-sky-100 border-white/30 focus:bg-white focus:text-slate-900 focus:placeholder-slate-400' 
                    : 'bg-white dark:bg-[#131c38] border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:border-[#0064D0]'
                }`}
              />
              <button
                type="submit"
                className={`px-6 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md ${
                  isHovered 
                    ? 'bg-white text-[#0064D0] hover:bg-sky-50 hover:scale-105 shadow-xl font-bold' 
                    : 'bg-[#0064D0] hover:bg-[#0052ad] text-white'
                }`}
              >
                {t.newsletter.button}
              </button>
            </form>
            <p className={`text-[11px] font-light pt-0.5 transition-colors duration-500 ${
              isHovered ? 'text-sky-100' : 'text-slate-500 dark:text-slate-400'
            }`}>
              Weekly water insights, no spam — unsubscribe anytime.
            </p>
            {success && (
              <p className={`text-xs font-light pt-1 ${isHovered ? 'text-emerald-200 font-bold' : 'text-emerald-600 dark:text-emerald-400'}`}>
                {t.newsletter.success}
              </p>
            )}
          </div>
        </div>

        {/* Desktop & Tablet Navigation Columns */}
        <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-4 gap-8 text-xs font-light">
          {sections.map((sec) => (
            <div key={sec.id} className="space-y-4">
              <h4 className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-500 ${
                isHovered ? 'text-white' : 'text-[#0064D0]'
              }`}>
                {sec.title}
              </h4>
              <ul className={`space-y-2.5 transition-colors duration-500 ${
                isHovered ? 'text-sky-100' : 'text-slate-600 dark:text-slate-200'
              }`}>
                {sec.links.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href} 
                      className={`transition-colors ${
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
        <div className="sm:hidden space-y-3">
          {sections.map((sec) => {
            const isOpen = openSection === sec.id
            return (
              <div key={sec.id} className={`border-b pb-3 ${isHovered ? 'border-white/30' : 'border-slate-200/80 dark:border-slate-800/60'}`}>
                <button
                  onClick={() => toggleSection(sec.id)}
                  className={`w-full flex justify-between items-center py-2 text-xs font-bold uppercase tracking-wider ${
                    isHovered ? 'text-white' : 'text-[#0064D0]'
                  }`}
                >
                  <span>{sec.title}</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-white' : isHovered ? 'text-white' : 'text-slate-400'}`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className={`pt-2 pb-1 space-y-2 text-xs font-light ${isHovered ? 'text-sky-100' : 'text-slate-600 dark:text-slate-300'}`}
                    >
                      {sec.links.map((link) => (
                        <li key={link.href}>
                          <Link href={link.href} className="block py-1 hover:underline">
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

        {/* Concierge & Direct Contact Strip (Turns Crisp White with Watlys Blue text on Hover) */}
        <div className="pt-8 border-t border-slate-200/80 dark:border-slate-800/60 grid grid-cols-1 md:grid-cols-3 gap-5 text-xs font-light items-center">
          
          {/* WhatsApp Contact + CTA Card */}
          <div className={`flex items-center justify-between gap-3 p-3.5 rounded-2xl border shadow-sm transition-all duration-300 ${
            isHovered ? 'bg-white text-slate-900 border-white shadow-xl scale-[1.02]' : 'bg-white dark:bg-[#131c38] text-slate-900 dark:text-white border-slate-200/80 dark:border-slate-800'
          }`}>
            <div className="flex items-center space-x-3">
              <MessageCircle size={20} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-bold text-[#0064D0] block tracking-wider">WHATSAPP CONCIERGE</span>
                <a href="https://wa.me/923001234567" className="hover:text-[#0064D0] font-semibold text-slate-900">+92 300 1234567</a>
              </div>
            </div>
            <a
              href="https://wa.me/923001234567?text=Hi%20Watlys%20I%20want%20to%20order%20drinking%20water"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] uppercase tracking-wider rounded-xl inline-flex items-center gap-1.5 shadow-md transition-all active:scale-[0.97] shrink-0"
            >
              <MessageCircle size={13} />
              <span>Order</span>
            </a>
          </div>

          {/* Email Assistance Card */}
          <div className={`flex items-center space-x-3 p-3.5 rounded-2xl border shadow-sm transition-all duration-300 ${
            isHovered ? 'bg-white text-slate-900 border-white shadow-xl scale-[1.02]' : 'bg-white dark:bg-[#131c38] text-slate-900 dark:text-white border-slate-200/80 dark:border-slate-800'
          }`}>
            <Mail size={20} className="text-[#0064D0] shrink-0" />
            <div>
              <span className="text-[10px] uppercase font-bold text-[#0064D0] block tracking-wider">EMAIL ASSISTANCE</span>
              <a href="mailto:care@watlys.com" className="hover:text-[#0064D0] font-semibold text-slate-900">care@watlys.com</a>
            </div>
          </div>

          {/* Service Regions Card */}
          <div className={`flex items-center space-x-3 p-3.5 rounded-2xl border shadow-sm transition-all duration-300 ${
            isHovered ? 'bg-white text-slate-900 border-white shadow-xl scale-[1.02]' : 'bg-white dark:bg-[#131c38] text-slate-900 dark:text-white border-slate-200/80 dark:border-slate-800'
          }`}>
            <MapPin size={20} className="text-[#0064D0] shrink-0" />
            <div>
              <span className="text-[10px] uppercase font-bold text-[#0064D0] block tracking-wider">SERVICE REGIONS</span>
              <span className="font-semibold text-slate-900">Lahore • Karachi • Islamabad</span>
            </div>
          </div>

        </div>

        {/* Bottom Rights & Legal Row */}
        <div className={`pt-8 border-t transition-colors duration-700 flex flex-col sm:flex-row justify-between items-center text-[10px] gap-4 ${
          isHovered ? 'border-white/30 text-sky-100' : 'border-zinc-200/60 dark:border-slate-800/60 text-zinc-500 dark:text-slate-400'
        }`}>
          <p>{t.footer.rights}</p>
          <div className="flex items-center space-x-6">
            <Link href="/privacy-policy" className={isHovered ? 'hover:text-white hover:underline' : 'hover:text-[#0064D0]'}>Privacy Policy</Link>
            <Link href="/terms-and-conditions" className={isHovered ? 'hover:text-white hover:underline' : 'hover:text-[#0064D0]'}>Terms & Conditions</Link>
            <Link href="/terms-and-conditions#refund" className={isHovered ? 'hover:text-white hover:underline' : 'hover:text-[#0064D0]'}>Refund / Delivery Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
