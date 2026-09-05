'use client'

import React, { useState, useEffect } from 'react'
import Navbar from '@/components/navbar'
import FooterSection from '@/components/footer-section'
import SpecReveal, { SpecProduct } from '@/components/spec-reveal'
import ProductCard from '@/components/product-card'
import { client } from '@/sanity/client'
import { defineQuery } from 'next-sanity'
import Image from 'next/image'
import { useCart } from '@/context/cart'
import { ShoppingBag, Star } from 'lucide-react'

interface ProductDetail {
  _id: string
  title: string
  slug: string
  price: number
  description?: string
  imageUrl: string
  secondaryImageUrl?: string
  capacity?: string
  pH?: number
  material?: string
  minerals?: string[]
  idealUse?: string
}

const PRODUCT_DETAIL_QUERY = defineQuery(`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    price,
    description,
    "imageUrl": image.asset->url,
    "secondaryImageUrl": secondaryImage.asset->url,
    capacity,
    pH,
    material,
    minerals,
    idealUse
  }
`)

const RELATED_PRODUCTS_QUERY = defineQuery(`
  *[_type == "product" && slug.current != $slug][0...3] {
    _id,
    title,
    "slug": slug.current,
    price,
    description,
    "imageUrl": image.asset->url,
    capacity
  }
`)

const MOCK_DETAIL_PRODUCTS: Record<string, ProductDetail> = {
  'watlys-classic': {
    _id: 'p1',
    title: 'Watlys Classic',
    slug: 'watlys-classic',
    price: 9.99,
    description: 'Natural mineral spring water, bottled at source in our signature design. Crafted for daily wellness and optimal body balance.',
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80',
    capacity: '750ml',
    pH: 7.8,
    material: 'Premium Glass',
    minerals: ['Calcium (12mg/L)', 'Magnesium (4mg/L)', 'Potassium (2mg/L)'],
    idealUse: 'Daily Hydration',
  },
  'watlys-sport': {
    _id: 'p2',
    title: 'Watlys Sport',
    slug: 'watlys-sport',
    price: 12.99,
    description: 'Enhanced mineral levels and electrolytes encased in durable BPA-free Tritan. Perfect companion for active workouts.',
    imageUrl: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=600&q=80',
    capacity: '1L',
    pH: 8.2,
    material: 'BPA-Free Tritan',
    minerals: ['Calcium (18mg/L)', 'Magnesium (6mg/L)', 'Sodium (10mg/L)'],
    idealUse: 'Sports & Active',
  },
  'watlys-element': {
    _id: 'p3',
    title: 'Watlys Element',
    slug: 'watlys-element',
    price: 24.99,
    description: 'Double-walled vacuum insulated premium stainless steel bottle. Keeps your water ice-cold for up to 24 hours.',
    imageUrl: 'https://images.unsplash.com/photo-1548839134-6fd5e60885a3?auto=format&fit=crop&w=600&q=80',
    capacity: '500ml',
    pH: 7.4,
    material: 'Stainless Steel',
    minerals: ['Magnesium (8mg/L)', 'Zinc (1.2mg/L)'],
    idealUse: 'Daily Hydration',
  },
}

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const [slug, setSlug] = useState('')
  const [product, setProduct] = useState<ProductDetail | null>(null)
  const [related, setRelated] = useState<ProductDetail[]>([])
  const [quantity, setQuantity] = useState(1)
  const [zoomStyle, setZoomStyle] = useState({ display: 'none', transform: 'scale(1.5)', transformOrigin: 'center' })

  const { addToCart } = useCart()

  useEffect(() => {
    params.then((p) => setSlug(p.slug))
  }, [params])

  useEffect(() => {
    if (!slug) return
    async function load() {
      try {
        const prodData = await client.fetch<ProductDetail | null>(PRODUCT_DETAIL_QUERY, { slug })
        const relatedData = await client.fetch<ProductDetail[]>(RELATED_PRODUCTS_QUERY, { slug })
        if (prodData) {
          setProduct(prodData)
        } else {
          setProduct(MOCK_DETAIL_PRODUCTS[slug] || MOCK_DETAIL_PRODUCTS['watlys-classic'])
        }
        if (relatedData && relatedData.length > 0) {
          setRelated(relatedData)
        } else {
          setRelated(Object.values(MOCK_DETAIL_PRODUCTS).filter((p) => p.slug !== slug))
        }
      } catch (err) {
        setProduct(MOCK_DETAIL_PRODUCTS[slug] || MOCK_DETAIL_PRODUCTS['watlys-classic'])
        setRelated(Object.values(MOCK_DETAIL_PRODUCTS).filter((p) => p.slug !== slug))
      }
    }
    load()
  }, [slug])

  if (!product) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0a1128] text-zinc-900 dark:text-white flex items-center justify-center">
        <span className="font-bold text-[#0064D0]">Loading premium container...</span>
      </div>
    )
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    setZoomStyle({
      display: 'block',
      transform: 'scale(2.2)',
      transformOrigin: `${x}% ${y}%`,
    })
  }

  const handleMouseLeave = () => {
    setZoomStyle((prev) => ({ ...prev, display: 'none' }))
  }

  const specProducts: SpecProduct[] = [
    {
      _id: product._id,
      title: product.title,
      imageUrl: product.imageUrl,
      pH: product.pH,
      capacity: product.capacity,
      material: product.material,
      minerals: product.minerals,
      idealUse: product.idealUse,
    },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a1128] text-zinc-900 dark:text-[#FAFAFA] flex flex-col pt-24 transition-colors duration-300">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-12 flex-1 w-full space-y-24">
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Image with zoom */}
          <div className="lg:col-span-6 relative aspect-square bg-white dark:bg-[#131c38] rounded-2xl overflow-hidden border border-zinc-200/65 dark:border-slate-800/60 shadow-sm">
            <div
              className="w-full h-full relative cursor-zoom-in"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <Image
                src={product.imageUrl}
                alt={product.title}
                fill
                className="object-contain p-12 transition-transform duration-200"
                style={zoomStyle.display === 'block' ? { transform: zoomStyle.transform, transformOrigin: zoomStyle.transformOrigin } : {}}
              />
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 dark:text-[#FAFAFA]">{product.title}</h1>
            <div className="flex items-center space-x-2 text-sm text-[#0064D0]">
              <span className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </span>
              <span className="text-zinc-500 dark:text-slate-200 font-semibold">(4.9 rating / 82 reviews)</span>
            </div>
            <p className="text-3xl font-black text-zinc-900 dark:text-[#FAFAFA]">${product.price.toFixed(2)}</p>
            <p className="text-zinc-555 dark:text-slate-200 leading-relaxed text-base">{product.description}</p>

            {/* Add to Cart Actions */}
            <div className="flex items-center space-x-4 pt-6 border-t border-zinc-200/60 dark:border-slate-800/60">
              <div className="flex items-center border border-zinc-200 dark:border-slate-800 bg-white dark:bg-[#131c38] rounded-xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors text-zinc-500 dark:text-slate-200 font-bold"
                >
                  -
                </button>
                <span className="px-4 font-bold text-sm text-zinc-800 dark:text-[#FAFAFA]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors text-zinc-500 dark:text-slate-200 font-bold"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => addToCart({ id: product._id, title: product.title, price: product.price, imageUrl: product.imageUrl, capacity: product.capacity }, quantity)}
                className="flex-1 py-4 bg-[#0064D0] text-white hover:bg-[#0064D0]/85 font-bold rounded-xl flex items-center justify-center space-x-3 transition-colors duration-300 shadow-sm cursor-pointer"
              >
                <ShoppingBag size={20} />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>

        {/* Spec Reveal */}
        <div className="space-y-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] dark:text-[#FAFAFA] text-center">Technical Breakdown</h2>
          <SpecReveal products={specProducts} />
        </div>

        {/* Related Products */}
        <div className="space-y-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-[#FAFAFA]">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {related.map((p) => (
              <ProductCard
                key={p._id}
                id={p._id}
                title={p.title}
                slug={p.slug}
                price={p.price}
                imageUrl={p.imageUrl}
                capacity={p.capacity}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <FooterSection />
    </div>
  )
}
