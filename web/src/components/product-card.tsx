'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Eye } from 'lucide-react'
import { useCart } from '@/context/cart'
import { useLanguage } from '@/context/language'

export interface ProductCardProps {
  id: string
  title: string
  slug: string
  price: number
  description?: string
  imageUrl: string
  secondaryImageUrl?: string
  capacity?: string
}

export default function ProductCard({
  id,
  title,
  slug,
  price,
  description,
  imageUrl,
  secondaryImageUrl,
  capacity,
}: ProductCardProps) {
  const { addToCart } = useCart()
  const { t } = useLanguage()
  const [isHovered, setIsHovered] = useState(false)
  const [isFlying, setIsFlying] = useState(false)
  const [flyCoords, setFlyCoords] = useState({ x: 0, y: 0 })

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const rect = e.currentTarget.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2

    setFlyCoords({ x, y })
    setIsFlying(true)

    setTimeout(() => {
      addToCart({ id, title, price, imageUrl, capacity }, 1)
      const badge = document.getElementById('cart-badge')
      if (badge) {
        badge.classList.add('animate-bounce')
        setTimeout(() => badge.classList.remove('animate-bounce'), 500)
      }
    }, 600)

    setTimeout(() => {
      setIsFlying(false)
    }, 700)
  }

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col bg-white dark:bg-[#111111] border border-zinc-200/40 dark:border-zinc-800/40 overflow-hidden transition-all duration-700 hover:border-brand-blue/30 dark:hover:border-brand-blue/30 text-zinc-900 dark:text-zinc-100"
    >
      {/* Product Image Panel */}
      <div className="relative aspect-[4/5] w-full bg-zinc-50 dark:bg-[#0A0A0A] overflow-hidden">
        <Link href={`/product/${slug}`} className="block w-full h-full">
          {/* Primary Image */}
          <Image
            src={imageUrl}
            alt={title}
            fill
            className={`object-contain p-10 transition-transform duration-[1000ms] ease-out ${
              isHovered && secondaryImageUrl ? 'opacity-0 scale-95' : 'opacity-100 scale-100 group-hover:scale-105'
            }`}
            sizes="(max-w-768px) 100vw, 25vw"
          />

          {/* Hover/Secondary Image */}
          {secondaryImageUrl && (
            <Image
              src={secondaryImageUrl}
              alt={`${title} alt`}
              fill
              className={`object-contain p-10 absolute inset-0 transition-all duration-[1000ms] ease-out ${
                isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
              sizes="(max-w-768px) 100vw, 25vw"
            />
          )}
        </Link>

        {/* Action Overlays */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center space-x-3 pointer-events-none group-hover:pointer-events-auto">
          <Link
            href={`/product/${slug}`}
            className="p-3.5 bg-white text-zinc-900 rounded-full hover:bg-brand-blue hover:text-white transition-colors duration-300 shadow-md pointer-events-auto cursor-pointer"
          >
            <Eye size={16} />
          </Link>
          <button
            onClick={handleAddToCart}
            className="p-3.5 bg-white text-zinc-900 rounded-full hover:bg-brand-blue hover:text-white transition-colors duration-300 shadow-md pointer-events-auto cursor-pointer"
          >
            <ShoppingBag size={16} />
          </button>
        </div>

        {/* Capacity tag */}
        {capacity && (
          <span className="absolute top-4 left-4 bg-white/95 dark:bg-[#111111]/95 text-[9px] uppercase tracking-widest font-bold text-zinc-600 dark:text-zinc-300 px-3 py-1 rounded-full border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm pointer-events-none">
            {capacity}
          </span>
        )}
      </div>

      {/* Info Container */}
      <div className="flex flex-col flex-1 p-6 space-y-3">
        <Link href={`/product/${slug}`}>
          <h3 className="text-lg font-serif font-semibold tracking-wide text-zinc-900 dark:text-white transition-colors duration-300 group-hover:text-brand-blue">
            {title}
          </h3>
        </Link>
        {description && (
          <p className="text-zinc-500 dark:text-zinc-400 text-xs line-clamp-2 flex-1 leading-relaxed font-light">
            {description}
          </p>
        )}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <span className="text-lg font-light tracking-wider text-zinc-900 dark:text-white">${price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            className="text-[10px] uppercase tracking-widest font-bold px-4 py-2.5 rounded-full bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:bg-brand-blue dark:hover:bg-brand-blue hover:text-white dark:hover:text-white transition-all duration-300 cursor-pointer"
          >
            {t.products.addToCart}
          </button>
        </div>
      </div>

      {/* Fly-to-cart particle animation */}
      <AnimatePresence>
        {isFlying && (
          <motion.div
            initial={{
              position: 'fixed',
              top: flyCoords.y,
              left: flyCoords.x,
              scale: 1,
              opacity: 1,
              zIndex: 9999,
            }}
            animate={{
              top: '20px',
              left: 'calc(100vw - 120px)',
              scale: 0.1,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="w-12 h-12 bg-brand-blue rounded-full border border-white/50 flex items-center justify-center shadow-lg"
          >
            <ShoppingBag size={20} className="text-white animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
