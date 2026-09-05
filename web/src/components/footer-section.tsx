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
  const [openSection, setOpenSection] = useState<string | null>(null)
  const footerRef = useRef<HTMLElement>(null)

  const toggleSection = (section: string) => {
    setOpenSection(prev => (prev === section ? null : section))
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
      className={`relative w-full text-zinc-900 dark:text-[#FAFAFA] pt-14 sm:pt-20 pb-12 border-t font-sans transition-all duration-700 ease-in-out overflow-hidden ${isHovered
          ? 'bg-[#ebf4fd] dark:bg-[#0D1520] border-[#c0dcfa] dark:border-slate-800'
          : 'bg-white dark:bg-[#0a1128] border-zinc-200/60 dark:border-slate-800/60'
        }`}
    >
      {/* Subtle Premium Cursor Water Effect Canvas */}
      <FooterWaterEffect containerRef={footerRef} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 space-y-12 sm:space-y-16 pointer-events-auto">

        {/* Brand Statement Lead-in */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 sm:pb-16 border-b transition-colors duration-700 items-start ${isHovered ? 'border-[#c0dcfa] dark:border-slate-800' : 'border-zinc-200/60 dark:border-slate-800/60'
          }`}>
          <div className="lg:col-span-6 space-y-4">
            <Link href="/" className="relative block h-14 w-48">
              <Image
                src="/logo.png"
                alt="Watlys 19L Pure Water Logo"
                fill
                priority
                className="object-contain dark:invert dark:brightness-200"
              />
            </Link>
            <p className="text-xs sm:text-sm text-slate-500 font-medium tracking-tight whitespace-normal max-w-md">
              Pakistan’s premier 19L mineral water delivery across Lahore, Karachi &amp; Islamabad.
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
                className="flex-1 px-4 py-3 bg-white dark:bg-[#111822] border border-zinc-200 dark:border-slate-800 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-[#0064D0] rounded-xl shadow-sm"
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

        {/* Structured Grid with Mobile Accordions & Desktop Fallback */}
        <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-8 text-xs font-light">

          {/* Mapped Accordion Sections for Product, Services, Company, Support */}
          {sections.map((sec) => {
            const isOpen = openSection === sec.id
            return (
              <div key={sec.id} className="space-y-3 sm:space-y-4">
                {/* Header: Clickable Accordion Button on Mobile (<640px), Static Heading on Desktop */}
                <button
                  onClick={() => toggleSection(sec.id)}
                  className="flex justify-between items-center w-full py-3 border-b border-slate-200/60 dark:border-slate-800/60 text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-zinc-200 sm:border-none sm:py-0 sm:mb-3 sm:cursor-default"
                >
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#0064D0]">
                    {sec.title}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`sm:hidden text-zinc-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#0064D0]' : ''
                      }`}
                  />
                </button>

                {/* Animated Mobile Dropdown list + Permanently Expanded Desktop View */}
                <div className="sm:block">
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="sm:hidden space-y-2.5 pt-1 pb-3 text-zinc-700 dark:text-slate-200 overflow-hidden"
                      >
                        {sec.links.map((link) => (
                          <li key={link.label}>
                            <Link
                              href={link.href}
                              className="hover:text-[#0064D0] dark:hover:text-[#0064D0] transition-colors block py-0.5"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>

                  {/* Permanent Static Desktop Links */}
                  <ul className="hidden sm:block space-y-2.5 text-zinc-700 dark:text-slate-200">
                    {sec.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="hover:text-[#0064D0] dark:hover:text-[#0064D0] transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}

          {/* Column 5: PAKISTAN CONTACT / CONCIERGE (Always Visible) */}
          <div className="col-span-1 sm:col-span-4 lg:col-span-1 space-y-4 pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-200/60 dark:border-slate-800/60">
            <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#0064D0]">
              PAKISTAN CONCIERGE
            </h4>
            <div className="space-y-3 text-zinc-700 dark:text-slate-200">
              <a
                href="https://wa.me/923001234567?text=Hi%20Watlys%20I%20want%20to%20order%2019L%20drinking%20water%20bottles"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2.5 bg-[#25D366] text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#20ba5a] transition-all shadow-md"
              >
                <MessageCircle size={14} />
                <span>WhatsApp Order</span>
              </a>
              <div className="flex items-center space-x-2 text-zinc-600 dark:text-slate-200 text-xs">
                <Mail size={14} className="text-[#0064D0]" />
                <span className="hover:text-[#0064D0] transition-colors">concierge@watlys.pk</span>
              </div>
              <div className="flex items-center space-x-2 text-zinc-600 dark:text-slate-200 text-xs">
                <MapPin size={14} className="text-[#0064D0]" />
                <span>Lahore • Karachi • Islamabad</span>
              </div>
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
