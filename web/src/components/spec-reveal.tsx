'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useLanguage } from '@/context/language'

export interface SpecProduct {
  _id: string
  title: string
  imageUrl: string
  pH?: number
  capacity?: string
  material?: string
  minerals?: string[]
  idealUse?: string
}

interface SpecRevealProps {
  products?: SpecProduct[]
}

const DEFAULT_19L_PRODUCTS: SpecProduct[] = [
  {
    _id: 'p19l',
    title: 'Watlys 19L Premium Drinking Water',
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=750&q=80',
    pH: 7.8,
    capacity: '19 Liters (5 Gallons)',
    material: 'Sterilized Lead-Free Glass Container',
    minerals: ['Calcium (Ca2+)', 'Magnesium (Mg2+)', 'Silica (SiO2)', 'Bicarbonate (HCO3-)'],
    idealUse: 'Home, Family, Hostels & Corporate Boardrooms',
  },
]

export default function SpecReveal({ products = DEFAULT_19L_PRODUCTS }: SpecRevealProps) {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const { t, isRtl } = useLanguage()

  const safeProducts = products && products.length > 0 ? products : DEFAULT_19L_PRODUCTS
  const activeProduct = safeProducts[selectedIdx] || DEFAULT_19L_PRODUCTS[0]

  // Redesigned annotation specs
  const specs = [
    {
      side: 'left',
      top: '18%',
      title: t.specs.material,
      value: activeProduct.material || 'Sterilized Lead-free Glass Container',
    },
    {
      side: 'right',
      top: '35%',
      title: t.specs.ph,
      value: `Optimal pH level of ${activeProduct.pH || '7.8'}`,
    },
    {
      side: 'left',
      top: '58%',
      title: t.specs.capacity,
      value: activeProduct.capacity || '19 Liters (5 Gallons)',
    },
    {
      side: 'right',
      top: '75%',
      title: t.specs.minerals,
      value: activeProduct.minerals ? activeProduct.minerals.join(', ') : 'Calcium, Magnesium, Silica',
    },
  ]

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto w-full border-t border-zinc-200/30 dark:border-slate-800/60 bg-white dark:bg-[#0a1128]">
      <div className="text-center space-y-4 mb-16">
        <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#0064D0] font-sans">
          {t.specs.tag}
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif font-light tracking-wide text-zinc-900 dark:text-[#FAFAFA]">
          {t.specs.title}
        </h2>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-slate-200 font-light max-w-lg mx-auto font-sans">
          {t.specs.subtitle}
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto aspect-square sm:aspect-[16/10] bg-zinc-50 dark:bg-[#131c38] border border-zinc-200/40 dark:border-slate-800/60 flex items-center justify-center p-8 overflow-hidden rounded-2xl">

        {/* Product selector buttons if multiple products */}
        {safeProducts.length > 1 && (
          <div className="absolute top-6 left-6 z-20 flex space-x-2">
            {safeProducts.map((p, idx) => (
              <button
                key={p._id}
                onClick={() => setSelectedIdx(idx)}
                className={`px-3 py-1 text-[10px] uppercase font-bold tracking-widest rounded-lg border transition-all ${selectedIdx === idx
                  ? 'bg-[#0064D0] border-[#0064D0] text-white'
                  : 'border-zinc-200 dark:border-slate-800 text-zinc-400'
                  }`}
              >
                {p.title}
              </button>
            ))}
          </div>
        )}

        {/* Central Bottle Image */}
        <div
          className="relative h-full w-full max-w-[320px] transition-transform duration-700 hover:scale-105"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Image
            src={activeProduct.imageUrl}
            alt={activeProduct.title}
            fill
            className="object-contain p-6"
            priority
          />
        </div>

        {/* Annotation Hotspots */}
        {specs.map((spec, idx) => {
          const isLeft = spec.side === 'left'
          return (
            <div
              key={idx}
              className={`absolute flex items-center space-x-3 transition-all duration-500 ${isLeft ? 'left-6 sm:left-12 flex-row' : 'right-6 sm:right-12 flex-row-reverse space-x-reverse'
                }`}
              style={{ top: spec.top }}
            >
              {/* Dot */}
              <div className="relative flex items-center justify-center">
                <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-[#0064D0] opacity-40"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0064D0]"></span>
              </div>

              {/* Text Card */}
              <div className={`p-4 bg-white/95 dark:bg-[#0a1128]/95 border border-zinc-200/60 dark:border-slate-800/60 rounded-xl shadow-sm max-w-[200px] sm:max-w-[240px] ${isRtl ? 'text-right' : isLeft ? 'text-left' : 'text-right'
                }`}>
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#0064D0] block mb-1">
                  {spec.title}
                </span>
                <p className="text-xs text-zinc-700 dark:text-slate-200 font-light leading-relaxed">
                  {spec.value}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
