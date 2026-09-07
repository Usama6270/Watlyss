'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/language'
import { MessageCircle, Mail, MapPin, ChevronDown } from 'lucide-react'
import FooterWaterEffect from '@/components/footer-water-effect'

export default function FooterSection() {
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [openSection, setOpenSection] = useState<string | null>(null)
  const footerRef = useRef<HTMLElement>(null)

  const rafId = useRef<number | null>(null)

  const toggleSection = (section: string) => {
    setOpenSection(prev => (prev === section ? null : section))
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current)
    }

    rafId.current = requestAnimationFrame(() => {
      setMousePosition({ x, y })
    })
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
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="relative w-full text-zinc-900 dark:text-[#FAFAFA] pt-14 sm:pt-20 pb-12 border-t font-sans transition-all duration-700 ease-in-out overflow-hidden bg-white dark:bg-[#0a1128] border-zinc-200/60 dark:border-slate-800/60"
    >
      {/* Grand Luxury Brand Watermark Background Pattern (Patterns-05.png) — Sincere Capital Reference Aesthetic */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 z-0 overflow-hidden">
        {/* Soft Radial Ambient Blue Glow */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#0064D0]/10 dark:bg-[#0064D0]/20 rounded-full blur-3xl" />

        {/* Patterns-05.png Brand Texture Overlay */}
        <div
          className="w-full h-full bg-repeat bg-right-center mix-blend-multiply dark:mix-blend-screen opacity-15 dark:opacity-25 transition-opacity duration-500"
          style={{
            backgroundImage: `url('/patterns/Patterns-05.png'), url('/Patterns-05.png')`,
            backgroundSize: '220px auto',
            maskImage: 'radial-gradient(ellipse at 80% 50%, black 25%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at 80% 50%, black 25%, transparent 80%)',
            filter: 'contrast(1.2) brightness(0.96)',
          }}
        />
      </div>

      {/* Dynamic Cursor-Following Soft Ambient Spotlight Glow on Hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="pointer-events-none absolute w-[340px] h-[340px] rounded-full blur-2xl z-0 transform-gpu will-change-transform"
            style={{
              left: mousePosition.x - 170,
              top: mousePosition.y - 170,
              background: 'radial-gradient(circle, rgba(0, 100, 208, 0.18) 0%, rgba(0, 100, 208, 0.05) 50%, transparent 75%)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Subtle Premium Cursor Water Effect Canvas */}
      <FooterWaterEffect containerRef={footerRef} />

      <div className="relative z-20 max-w-7xl mx-auto px-6 space-y-12 sm:space-y-16 pointer-events-auto">

        {/* Brand Statement Lead-in */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 sm:pb-16 border-b transition-colors duration-700 items-start ${isHovered ? 'border-[#c0dcfa] dark:border-slate-800' : 'border-zinc-200/60 dark:border-slate-800/60'
          }`}>
          <div className="lg:col-span-6 space-y-4">
            <Link href="/" className="relative block h-16 sm:h-20 w-52 sm:w-64">
              <Image
                src="/logo.png"
                alt="Watlys 19L Pure Water Logo"
                fill
                priority
                className="object-contain object-left transition-transform duration-300 hover:scale-105"
              />
            </Link>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-slate-200 font-light leading-relaxed max-w-md">
              Pakistan’s premier 19-Liter mineral drinking water subscription service. Delivering subterranean aquifer water directly to homes, student hostels, and corporate offices across Lahore, Karachi, and Islamabad.
            </p>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#0064D0] block">
              SUBSCRIBE TO WATER INSIGHTS
            </span>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.newsletter.emailPlaceholder}
                required
                className="flex-1 px-4 py-3 bg-[#f8fafc] dark:bg-[#131c38] border border-zinc-200 dark:border-slate-800 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-[#0064D0] rounded-xl shadow-sm"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#0064D0] hover:bg-[#0052ad] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md"
              >
                {t.newsletter.button}
              </button>
            </form>
            {success && (
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-light pt-1">{t.newsletter.success}</p>
            )}
          </div>
        </div>

        {/* Desktop & Tablet Navigation Columns */}
        <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-4 gap-8 text-xs font-light">
          {sections.map((sec) => (
            <div key={sec.id} className="space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0064D0]">{sec.title}</h4>
              <ul className="space-y-2.5 text-zinc-700 dark:text-slate-200">
                {sec.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-[#0064D0] dark:hover:text-[#0064D0] transition-colors">
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
              <div key={sec.id} className="border-b border-zinc-200/60 dark:border-slate-800/60 pb-3">
                <button
                  onClick={() => toggleSection(sec.id)}
                  className="w-full flex justify-between items-center py-2 text-xs font-bold uppercase tracking-wider text-[#0064D0]"
                >
                  <span>{sec.title}</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#0064D0]' : 'text-zinc-400'}`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pt-2 pb-1 space-y-2 text-xs text-zinc-600 dark:text-slate-300 font-light"
                    >
                      {sec.links.map((link) => (
                        <li key={link.href}>
                          <Link href={link.href} className="block py-1 hover:text-[#0064D0]">
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

        {/* Concierge & Direct Contact Strip */}
        <div className="pt-8 border-t border-zinc-200/60 dark:border-slate-800/60 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-zinc-600 dark:text-slate-200 font-light">
          <div className="flex items-center space-x-3">
            <MessageCircle size={18} className="text-[#0064D0] shrink-0" />
            <div>
              <span className="text-[10px] uppercase font-bold text-zinc-400 dark:text-slate-400 block tracking-wider">WHATSAPP CONCIERGE</span>
              <a href="https://wa.me/923000000000" className="hover:text-[#0064D0] font-medium">+92 300 0000000</a>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Mail size={18} className="text-[#0064D0] shrink-0" />
            <div>
              <span className="text-[10px] uppercase font-bold text-zinc-400 dark:text-slate-400 block tracking-wider">EMAIL ASSISTANCE</span>
              <a href="mailto:care@watlys.com" className="hover:text-[#0064D0] font-medium">care@watlys.com</a>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <MapPin size={18} className="text-[#0064D0] shrink-0" />
            <div>
              <span className="text-[10px] uppercase font-bold text-zinc-400 dark:text-slate-400 block tracking-wider">SERVICE REGIONS</span>
              <span className="font-medium">Lahore • Karachi • Islamabad</span>
            </div>
          </div>
        </div>

        {/* Bottom Rights & Legal Row */}
        <div className={`pt-8 border-t transition-colors duration-700 flex flex-col sm:flex-row justify-between items-center text-[10px] text-zinc-500 dark:text-slate-200 gap-4 ${isHovered ? 'border-[#c0dcfa] dark:border-slate-800' : 'border-zinc-200/60 dark:border-slate-800/60'
          }`}>
          <p>{t.footer.rights}</p>
          <div className="flex items-center space-x-6">
            <Link href="/privacy-policy" className="hover:text-[#0064D0] dark:hover:text-[#0064D0] transition-colors">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-[#0064D0] dark:hover:text-[#0064D0] transition-colors">Terms & Conditions</Link>
            <Link href="/terms-and-conditions#refund" className="hover:text-[#0064D0] dark:hover:text-[#0064D0] transition-colors">Refund / Delivery Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
