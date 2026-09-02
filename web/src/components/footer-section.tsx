'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/context/language'
import { MessageCircle, Mail, MapPin } from 'lucide-react'
import FooterWaterEffect from '@/components/footer-water-effect'

export default function FooterSection() {
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const footerRef = useRef<HTMLElement>(null)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSuccess(true)
    setTimeout(() => {
      setEmail('')
      setSuccess(false)
    }, 3000)
  }

  return (
    <footer
      id="footer"
      ref={footerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-full text-zinc-900 dark:text-[#FAFAFA] pt-20 pb-12 border-t font-sans transition-all duration-700 ease-in-out overflow-hidden ${
        isHovered
          ? 'bg-[#ebf4fd] dark:bg-[#0D1520] border-[#c0dcfa] dark:border-zinc-800'
          : 'bg-white dark:bg-[#0A0A0A] border-zinc-200/60 dark:border-zinc-800/60'
      }`}
    >
      {/* Subtle Premium Cursor Water Effect Canvas */}
      <FooterWaterEffect containerRef={footerRef} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 space-y-16 pointer-events-auto">
        
        {/* Brand Statement Lead-in */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b transition-colors duration-700 items-start ${
          isHovered ? 'border-[#c0dcfa] dark:border-zinc-800' : 'border-zinc-200/60 dark:border-zinc-800/60'
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
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-light leading-relaxed max-w-md">
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
                className="flex-1 px-4 py-3 bg-white dark:bg-[#111822] border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-[#0064D0] rounded-xl shadow-sm"
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

        {/* Structured 5-Column Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 text-xs font-light">
          
          {/* Column 1: PRODUCT */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0064D0]">PRODUCT</h4>
            <ul className="space-y-2.5 text-zinc-700 dark:text-zinc-300">
              <li><Link href="/our-water" className="hover:text-[#0064D0] dark:hover:text-[#0064D0] transition-colors">19L Water Bottle</Link></li>
              <li><Link href="/order" className="hover:text-[#0064D0] dark:hover:text-[#0064D0] transition-colors">Build 19L Water Plan</Link></li>
              <li><Link href="/order?plan=student" className="hover:text-[#0064D0] dark:hover:text-[#0064D0] transition-colors">Student & Hostel Plan</Link></li>
              <li><Link href="/order?plan=family" className="hover:text-[#0064D0] dark:hover:text-[#0064D0] transition-colors">Family Household Plan</Link></li>
              <li><Link href="/order?plan=office" className="hover:text-[#0064D0] dark:hover:text-[#0064D0] transition-colors">Corporate Suite Plan</Link></li>
            </ul>
          </div>

          {/* Column 2: SERVICES */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0064D0]">SERVICES</h4>
            <ul className="space-y-2.5 text-zinc-700 dark:text-zinc-300">
              <li><Link href="/services/water-delivery" className="hover:text-[#0064D0] dark:hover:text-[#0064D0] transition-colors">19L Water Delivery</Link></li>
              <li><Link href="/services/free-bottle-installation" className="hover:text-[#0064D0] dark:hover:text-[#0064D0] transition-colors">Free Bottle Installation</Link></li>
              <li><Link href="/services/water-testing" className="hover:text-[#0064D0] dark:hover:text-[#0064D0] transition-colors">Water Testing Assay</Link></li>
              <li><Link href="/services/dispenser-service" className="hover:text-[#0064D0] dark:hover:text-[#0064D0] transition-colors">Dispenser Service</Link></li>
            </ul>
          </div>

          {/* Column 3: COMPANY */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0064D0]">COMPANY</h4>
            <ul className="space-y-2.5 text-zinc-700 dark:text-zinc-300">
              <li><Link href="/about" className="hover:text-[#0064D0] dark:hover:text-[#0064D0] transition-colors">About Watlys</Link></li>
              <li><Link href="/process" className="hover:text-[#0064D0] dark:hover:text-[#0064D0] transition-colors">Water Process</Link></li>
              <li><Link href="/sustainability" className="hover:text-[#0064D0] dark:hover:text-[#0064D0] transition-colors">Sustainability</Link></li>
              <li><Link href="/insights" className="hover:text-[#0064D0] dark:hover:text-[#0064D0] transition-colors">Water Insights</Link></li>
              <li><Link href="/certifications" className="hover:text-[#0064D0] dark:hover:text-[#0064D0] transition-colors">Certifications</Link></li>
            </ul>
          </div>

          {/* Column 4: SUPPORT */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0064D0]">SUPPORT</h4>
            <ul className="space-y-2.5 text-zinc-700 dark:text-zinc-300">
              <li><Link href="/faq" className="hover:text-[#0064D0] dark:hover:text-[#0064D0] transition-colors">FAQ</Link></li>
              <li><Link href="/locations" className="hover:text-[#0064D0] dark:hover:text-[#0064D0] transition-colors">Coverage Areas</Link></li>
              <li><Link href="/contact" className="hover:text-[#0064D0] dark:hover:text-[#0064D0] transition-colors">Contact Concierge</Link></li>
            </ul>
          </div>

          {/* Column 5: PAKISTAN CONTACT */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0064D0]">PAKISTAN CONCIERGE</h4>
            <div className="space-y-3 text-zinc-700 dark:text-zinc-300">
              <a
                href="https://wa.me/923001234567?text=Hi%20Watlys%20I%20want%20to%20order%2019L%20drinking%20water%20bottles"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2.5 bg-[#25D366] text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#20ba5a] transition-all shadow-md"
              >
                <MessageCircle size={14} />
                <span>WhatsApp Order</span>
              </a>
              <div className="flex items-center space-x-2 text-zinc-600 dark:text-zinc-400 text-xs">
                <Mail size={14} className="text-[#0064D0]" />
                <span className="hover:text-[#0064D0] transition-colors">concierge@watlys.pk</span>
              </div>
              <div className="flex items-center space-x-2 text-zinc-600 dark:text-zinc-400 text-xs">
                <MapPin size={14} className="text-[#0064D0]" />
                <span>Lahore • Karachi • Islamabad</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Rights & Legal Row */}
        <div className={`pt-8 border-t transition-colors duration-700 flex flex-col sm:flex-row justify-between items-center text-[10px] text-zinc-500 dark:text-zinc-400 gap-4 ${
          isHovered ? 'border-[#c0dcfa] dark:border-zinc-800' : 'border-zinc-200/60 dark:border-zinc-800/60'
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
