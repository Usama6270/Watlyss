'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Menu, X, ChevronDown, MessageCircle, ArrowRight, Sparkles } from 'lucide-react'
import { useCart } from '@/context/cart'
import { useLanguage } from '@/context/language'
import { ThemeToggle } from '@/components/theme-toggle'
import { LanguageToggle } from '@/components/language-toggle'

export default function Navbar() {
  const { cart } = useCart()
  const { language, setLanguage, t, isRtl } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock background body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.touchAction = 'none'
    } else {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }
  }, [isOpen])

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  // LEFT NAVIGATION GROUP
  const leftLinks = [
    { label: t.nav.ourWater, href: '/our-water' },
    { label: t.nav.process, href: '/process' },
    {
      label: t.nav.services,
      type: 'dropdown',
      id: 'services',
      items: [
        { label: t.nav.servicesList.delivery, href: '/services/water-delivery' },
        { label: t.nav.servicesList.installation, href: '/services/free-bottle-installation' },
        { label: t.nav.servicesList.testing, href: '/services/water-testing' },
        { label: t.nav.servicesList.dispenser, href: '/services/dispenser-service' },
      ],
    },
  ]

  // RIGHT NAVIGATION GROUP
  const rightLinks = [
    { label: t.nav.sustainability, href: '/sustainability' },
    { label: t.nav.about, href: '/about' },
    {
      label: t.nav.findUs,
      type: 'dropdown',
      id: 'findUs',
      items: [
        { label: t.nav.findUsList.contact, href: '/contact' },
        { label: t.nav.findUsList.locations, href: '/locations' },
        { label: t.nav.findUsList.inquiry, href: '/contact?type=corporate' },
      ],
    },
  ]

  const dropdownVariants = {
    hidden: { opacity: 0, y: 12, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    },
    exit: {
      opacity: 0,
      y: 8,
      scale: 0.98,
      transition: { duration: 0.15, ease: 'easeIn' as any }
    }
  }

  // Staggered Entrance Animations for Mobile Menu Links
  const menuContainerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -15,
      transition: { duration: 0.2, ease: 'easeIn' as any }
    }
  }

  const menuItemVariants = {
    hidden: { opacity: 0, x: isRtl ? 20 : -20, y: 10 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    }
  }

  const mobileNavItems = [
    { num: '01', label: t.nav.ourWater, href: '/our-water' },
    { num: '02', label: t.nav.process, href: '/process' },
    { num: '03', label: t.nav.order, href: '/order' },
    { num: '04', label: t.nav.services, href: '/services/water-delivery' },
    { num: '05', label: t.nav.findUs, href: '/locations' },
    { num: '06', label: t.nav.about, href: '/about' },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled
            ? 'bg-white/95 dark:bg-[#0a1128]/95 backdrop-blur-md border-zinc-200/20 dark:border-slate-800/60 shadow-[0_2px_20px_rgba(0,0,0,0.1)]'
            : 'bg-white dark:bg-[#0a1128] border-zinc-100 dark:border-slate-800/40'
          }`}
      >
        {/* DESKTOP NAVBAR CONTAINER — ABSOLUTE CENTERED LOGO */}
        <div className="relative w-full max-w-[1536px] mx-auto h-20 sm:h-[84px] px-8 2xl:px-14 hidden xl:flex items-center justify-between">

          {/* LEFT SIDE NAVIGATION */}
          <div className={`flex items-center gap-6 2xl:gap-8 z-10 ${isRtl ? 'flex-row-reverse' : ''}`}>
            {leftLinks.map((link) => (
              <div
                key={link.label}
                className="relative whitespace-nowrap group"
                onMouseEnter={() => link.type === 'dropdown' && setActiveDropdown(link.id)}
                onMouseLeave={() => link.type === 'dropdown' && setActiveDropdown(null)}
              >
                {link.type === 'dropdown' ? (
                  <button className="flex items-center space-x-1.5 py-2 text-[11px] uppercase tracking-[0.18em] font-medium text-zinc-600 dark:text-slate-200 hover:text-zinc-950 dark:hover:text-white transition-colors duration-300 cursor-pointer whitespace-nowrap font-sans">
                    <span>{link.label}</span>
                    <ChevronDown size={11} className={`text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-transform duration-300 ${activeDropdown === link.id ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <Link href={link.href || '#'} className="py-2 text-[11px] uppercase tracking-[0.18em] font-medium text-zinc-600 dark:text-slate-200 hover:text-zinc-950 dark:hover:text-white transition-colors duration-300 whitespace-nowrap font-sans block">
                    {link.label}
                  </Link>
                )}

                {/* Dropdown Box */}
                <AnimatePresence>
                  {link.type === 'dropdown' && activeDropdown === link.id && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute top-full left-0 mt-1 w-60 bg-white dark:bg-[#131c38] border border-zinc-200/80 dark:border-slate-800 py-3 shadow-xl rounded-xl z-50"
                    >
                      {link.items?.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="block px-4 py-2.5 text-[11px] text-zinc-600 dark:text-slate-200 hover:bg-[#0064D0]/10 hover:text-[#0064D0] dark:hover:text-[#0064D0] transition-colors font-medium whitespace-nowrap"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* ABSOLUTE HORIZONTAL CENTERED WATLYS LOGO */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center pointer-events-auto">
            <Link href="/" aria-label="Watlys Homepage" className="relative block h-18 sm:h-20 2xl:h-24 w-64 sm:w-72 2xl:w-84 transition-transform duration-300 hover:scale-[1.04] active:scale-[0.98]">
              <Image
                src="/logo.png"
                alt="Watlys Pure Mineral Water"
                fill
                priority
                className="object-contain scale-110"
              />
            </Link>
          </div>

          {/* RIGHT SIDE NAVIGATION & UTILITY CONTROLS */}
          <div className={`flex items-center gap-5 2xl:gap-7 z-10 ${isRtl ? 'flex-row-reverse' : ''}`}>

            {/* Nav Links */}
            <div className={`flex items-center gap-5 2xl:gap-6 ${isRtl ? 'flex-row-reverse' : ''}`}>
              {rightLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative whitespace-nowrap group"
                  onMouseEnter={() => link.type === 'dropdown' && setActiveDropdown(link.id)}
                  onMouseLeave={() => link.type === 'dropdown' && setActiveDropdown(null)}
                >
                  {link.type === 'dropdown' ? (
                    <button className="flex items-center space-x-1.5 py-2 text-[11px] uppercase tracking-[0.18em] font-medium text-zinc-600 dark:text-slate-200 hover:text-zinc-950 dark:hover:text-white transition-colors duration-300 cursor-pointer whitespace-nowrap font-sans">
                      <span>{link.label}</span>
                      <ChevronDown size={11} className={`text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-transform duration-300 ${activeDropdown === link.id ? 'rotate-180' : ''}`} />
                    </button>
                  ) : (
                    <Link href={link.href || '#'} className="py-2 text-[11px] uppercase tracking-[0.18em] font-medium text-zinc-600 dark:text-slate-200 hover:text-zinc-950 dark:hover:text-white transition-colors duration-300 whitespace-nowrap font-sans block">
                      {link.label}
                    </Link>
                  )}

                  {/* Dropdown Box */}
                  <AnimatePresence>
                    {link.type === 'dropdown' && activeDropdown === link.id && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute top-full right-0 mt-1 w-56 bg-white dark:bg-[#131c38] border border-zinc-200/80 dark:border-slate-800 py-3 shadow-xl rounded-xl z-50"
                      >
                        {link.items?.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="block px-4 py-2.5 text-[11px] text-zinc-600 dark:text-slate-200 hover:bg-[#0064D0]/10 hover:text-[#0064D0] dark:hover:text-[#0064D0] transition-colors font-medium whitespace-nowrap"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Utility Group: Animated LanguageToggle Pill | Dark Mode | Cart */}
            <div className={`relative z-50 flex items-center gap-3 pointer-events-auto ${isRtl ? 'flex-row-reverse' : ''}`}>
              {/* Language Selector Pill Toggle */}
              <LanguageToggle />

              {/* Dark Mode Icon */}
              <ThemeToggle />

              {/* Cart / Bag Icon */}
              <Link
                href="/cart"
                aria-label="Shopping Bag"
                className="relative w-8 h-8 flex items-center justify-center text-zinc-600 hover:text-zinc-950 dark:text-slate-200 dark:hover:text-white transition-colors duration-300"
              >
                <ShoppingBag size={17} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#0064D0] text-white text-[7px] font-bold h-4 w-4 rounded-full flex items-center justify-center border border-white dark:border-[#0A0A0A]">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>

          </div>

        </div>

        {/* MOBILE HEADER (< xl) — RE-ARCHITECTED NON-OVERLAPPING LAYOUT */}
        <div className="relative w-full h-16 px-4 flex xl:hidden items-center justify-between z-50 bg-white/90 dark:bg-[#0a1128]/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">

          {/* Left Slot: Navigation Menu Trigger */}
          <div className="flex items-center z-10">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 cursor-pointer rounded-full transition-all duration-300 ${isOpen
                  ? 'bg-[#0064D0]/10 text-[#0064D0] dark:text-sky-400 rotate-90 scale-105 border border-[#0064D0]/30'
                  : 'text-zinc-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Absolute Center Slot: Geometric Center Logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center pointer-events-auto">
            <Link href="/" className="relative block h-12 w-44 sm:h-15 sm:w-56">
              <Image
                src="/logo.png"
                alt="Watlys Logo"
                fill
                priority
                className="object-contain scale-110"
              />
            </Link>
          </div>

          {/* Right Slot: Action Utilities Cluster */}
          <div className="relative z-30 flex items-center gap-1.5 sm:gap-3 pointer-events-auto">
            {/* Animated Scaled Mobile Language Toggle Switch */}
            <LanguageToggle />

            {/* Theme Toggle Button */}
            <ThemeToggle />

            <Link
              href="/cart"
              aria-label="Shopping Cart"
              className="relative w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-zinc-700 dark:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <ShoppingBag size={17} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#0064D0] text-white text-[7px] font-bold h-3.5 w-3.5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* REDESIGNED LUXURY DIMENSIONAL MOBILE DRAWER OVERLAY (SITS DIRECTLY BELOW NAVBAR) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={menuContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-16 left-0 right-0 bottom-0 h-[calc(100dvh-64px)] w-full z-40 bg-white dark:bg-[#0a1128] bg-gradient-to-b from-white via-slate-50 to-sky-50/50 dark:from-[#0a1128] dark:via-[#0e1738] dark:to-[#080d20] flex flex-col justify-between p-5 sm:p-8 xl:hidden overflow-y-auto font-sans shadow-2xl"
            >
              {/* SUBTLE BRAND WATERMARK GRAPHIC IN BACKGROUND */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#0064D0]/5 dark:text-[#0064D0]/10 font-bold text-9xl pointer-events-none select-none z-0">
                WATLYS
              </div>

              {/* MAIN STAGGERED NAVIGATION LINKS (VERTICALLY BALANCED) */}
              <div className="relative z-10 py-6 flex-1 flex flex-col justify-center space-y-2">
                {mobileNavItems.map((item) => (
                  <motion.div key={item.num} variants={menuItemVariants}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="group py-3.5 px-4 rounded-2xl flex items-center justify-between bg-white dark:bg-[#131c38] hover:bg-[#0064D0]/10 dark:hover:bg-[#0064D0]/20 border border-slate-200/80 dark:border-slate-800/80 hover:border-[#0064D0]/40 transition-all duration-300 active:scale-[0.98] shadow-sm"
                    >
                      <div className="flex items-center space-x-3.5">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-sky-100 dark:bg-sky-950/80 text-[#0064D0] dark:text-sky-400 group-hover:bg-[#0064D0] group-hover:text-white transition-all">
                          {item.num}
                        </span>
                        <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-100 group-hover:text-[#0064D0] dark:group-hover:text-sky-400 transition-colors">
                          {item.label}
                        </span>
                      </div>
                      <ArrowRight size={16} className={`text-slate-400 group-hover:text-[#0064D0] transition-transform duration-300 ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* COMPACT FOOTER & WHATSAPP BRANDED CTA SECTION */}
              <div className="relative z-10 pt-5 border-t border-slate-200/60 dark:border-slate-800/80 space-y-3.5">

                {/* WhatsApp Order Button */}
                <a
                  href="https://wa.me/923001234567?text=Hi%20Watlys%20I%20want%20to%20order%2019L%20drinking%20water%20bottles"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 text-xs sm:text-sm uppercase tracking-wider transition-all active:scale-[0.98]"
                >
                  <MessageCircle size={18} />
                  <span>{t.whatsapp || 'Order via WhatsApp'}</span>
                </a>

                {/* 2-Column Secondary Links Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300 font-medium px-1">
                  <Link
                    href="/sustainability"
                    onClick={() => setIsOpen(false)}
                    className="hover:text-[#0064D0] dark:hover:text-white transition-colors"
                  >
                    Sustainability
                  </Link>
                  <Link
                    href="/certifications"
                    onClick={() => setIsOpen(false)}
                    className="hover:text-[#0064D0] dark:hover:text-white transition-colors"
                  >
                    Certifications
                  </Link>
                  <Link
                    href="/about"
                    onClick={() => setIsOpen(false)}
                    className="hover:text-[#0064D0] dark:hover:text-white transition-colors"
                  >
                    About Watlys
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="hover:text-[#0064D0] dark:hover:text-white transition-colors"
                  >
                    Contact Concierge
                  </Link>
                </div>

                {/* City Badges */}
                <p className="text-[10px] sm:text-[11px] text-slate-400 dark:text-zinc-500 text-center uppercase tracking-widest pt-1 font-semibold">
                  {isRtl ? 'لاہور • کراچی • اسلام آباد' : 'Lahore • Karachi • Islamabad'}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  )
}
