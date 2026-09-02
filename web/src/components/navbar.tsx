'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Menu, X, ChevronDown, MessageCircle } from 'lucide-react'
import { useCart } from '@/context/cart'
import { useLanguage } from '@/context/language'
import { ThemeToggle } from '@/components/theme-toggle'

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

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 border-b ${
          isScrolled
            ? 'bg-white/95 dark:bg-[#0A0A0A]/95 backdrop-blur-md border-zinc-200/20 dark:border-zinc-800/40 shadow-[0_2px_20px_rgba(0,0,0,0.03)]'
            : 'bg-white dark:bg-[#0A0A0A] border-zinc-100 dark:border-zinc-900'
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
                  <button className="flex items-center space-x-1.5 py-2 text-[11px] uppercase tracking-[0.18em] font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors duration-300 cursor-pointer whitespace-nowrap font-sans">
                    <span>{link.label}</span>
                    <ChevronDown size={11} className={`text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-transform duration-300 ${activeDropdown === link.id ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <Link href={link.href || '#'} className="py-2 text-[11px] uppercase tracking-[0.18em] font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors duration-300 whitespace-nowrap font-sans block">
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
                      className="absolute top-full left-0 mt-1 w-60 bg-white dark:bg-[#111111] border border-zinc-200/80 dark:border-zinc-800 py-3 shadow-xl rounded-xl z-50"
                    >
                      {link.items?.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="block px-4 py-2.5 text-[11px] text-zinc-600 dark:text-zinc-300 hover:bg-[#0064D0]/10 hover:text-[#0064D0] dark:hover:text-[#0064D0] transition-colors font-medium whitespace-nowrap"
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
            <Link href="/" aria-label="Watlys Homepage" className="relative block h-14 sm:h-16 2xl:h-20 w-56 sm:w-64 2xl:w-72 transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]">
              <Image
                src="/logo.png"
                alt="Watlys Pure Mineral Water"
                fill
                priority
                className="object-contain"
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
                    <button className="flex items-center space-x-1.5 py-2 text-[11px] uppercase tracking-[0.18em] font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors duration-300 cursor-pointer whitespace-nowrap font-sans">
                      <span>{link.label}</span>
                      <ChevronDown size={11} className={`text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-transform duration-300 ${activeDropdown === link.id ? 'rotate-180' : ''}`} />
                    </button>
                  ) : (
                    <Link href={link.href || '#'} className="py-2 text-[11px] uppercase tracking-[0.18em] font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors duration-300 whitespace-nowrap font-sans block">
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
                        className="absolute top-full right-0 mt-1 w-56 bg-white dark:bg-[#111111] border border-zinc-200/80 dark:border-zinc-800 py-3 shadow-xl rounded-xl z-50"
                      >
                        {link.items?.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="block px-4 py-2.5 text-[11px] text-zinc-600 dark:text-zinc-300 hover:bg-[#0064D0]/10 hover:text-[#0064D0] dark:hover:text-[#0064D0] transition-colors font-medium whitespace-nowrap"
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

            {/* Utility Group: EN/UR | Dark Mode | Cart | WhatsApp */}
            <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
              
              {/* Language Selector */}
              <div className="flex items-center space-x-1.5 text-[10px] font-medium text-zinc-400">
                <button
                  onClick={() => setLanguage('en')}
                  className={`cursor-pointer transition-colors duration-300 ${
                    language === 'en'
                      ? 'text-zinc-950 dark:text-white border-b-2 border-[#0064D0] pb-0.5 font-semibold'
                      : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white font-medium'
                  }`}
                >
                  EN
                </button>
                <span className="text-zinc-300 dark:text-zinc-700 text-[9px] font-normal select-none">/</span>
                <button
                  onClick={() => setLanguage('ur')}
                  className={`cursor-pointer font-urdu text-[10px] transition-colors duration-300 ${
                    language === 'ur'
                      ? 'text-zinc-950 dark:text-white border-b-2 border-[#0064D0] pb-0.5 font-semibold'
                      : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white font-medium'
                  }`}
                >
                  اردو
                </button>
              </div>

              {/* Dark Mode Icon */}
              <ThemeToggle />

              {/* Cart / Bag Icon */}
              <Link
                href="/cart"
                aria-label="Shopping Bag"
                className="relative w-8 h-8 flex items-center justify-center text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors duration-300"
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

        {/* MOBILE HEADER (< xl) — PERFECTLY BALANCED WITH CENTERED LOGO */}
        <div className="relative w-full h-16 px-6 flex xl:hidden items-center justify-between">
          
          {/* Left: Mobile Menu Trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-zinc-900 dark:text-white cursor-pointer z-10"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Center: Absolute Centered Logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <Link href="/" className="relative block h-12 w-44 sm:w-52">
              <Image
                src="/logo.png"
                alt="Watlys Logo"
                fill
                priority
                className="object-contain"
              />
            </Link>
          </div>

          {/* Right: Language & Cart */}
          <div className="flex items-center space-x-3 z-10">
            <div className="flex items-center space-x-1 text-[10px] font-medium text-zinc-400">
              <button
                onClick={() => setLanguage('en')}
                className={language === 'en' ? 'text-[#0064D0] font-bold' : 'text-zinc-400'}
              >
                EN
              </button>
              <span>/</span>
              <button
                onClick={() => setLanguage('ur')}
                className={language === 'ur' ? 'text-[#0064D0] font-bold font-urdu' : 'text-zinc-400'}
              >
                اردو
              </button>
            </div>

            <Link
              href="/cart"
              aria-label="Shopping Cart"
              className="relative w-7 h-7 flex items-center justify-center text-zinc-700 dark:text-zinc-300"
            >
              <ShoppingBag size={18} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#0064D0] text-white text-[7px] font-bold h-3.5 w-3.5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* MOBILE SLIDE DRAWER */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white dark:bg-[#0A0A0A] border-b border-zinc-200 dark:border-zinc-800 px-6 py-8 space-y-6 overflow-hidden"
            >
              <div className="flex flex-col space-y-4 font-sans">
                <Link
                  href="/our-water"
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-serif text-[#0064D0]"
                >
                  {t.nav.ourWater}
                </Link>
                <Link
                  href="/process"
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-serif text-zinc-900 dark:text-white"
                >
                  {t.nav.process}
                </Link>
                <Link
                  href="/order"
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-serif text-zinc-900 dark:text-white"
                >
                  {t.nav.order}
                </Link>
                <Link
                  href="/services"
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-serif text-zinc-900 dark:text-white"
                >
                  {t.nav.services}
                </Link>
                <Link
                  href="/sustainability"
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-serif text-zinc-900 dark:text-white"
                >
                  {t.nav.sustainability}
                </Link>
                <Link
                  href="/about"
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-serif text-zinc-900 dark:text-white"
                >
                  {t.nav.about}
                </Link>
                <Link
                  href="/locations"
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-serif text-zinc-900 dark:text-white"
                >
                  {t.nav.findUs}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  )
}
