'use client'

import React, { useState, useEffect } from 'react'
import Navbar from '@/components/navbar'
import FooterSection from '@/components/footer-section'
import ProductCard from '@/components/product-card'
import { client } from '@/sanity/client'
import { defineQuery } from 'next-sanity'

interface Product {
  _id: string
  title: string
  slug: string
  price: number
  description?: string
  imageUrl: string
  capacity?: string
  categoryTitle?: string
  isComingSoon?: boolean
}

const PRODUCTS_CATALOG_QUERY = defineQuery(`
  *[_type == "product"] {
    _id,
    title,
    "slug": slug.current,
    price,
    description,
    "imageUrl": image.asset->url,
    capacity,
    "categoryTitle": category->title,
    isComingSoon
  }
`)

const MOCK_SHOP_PRODUCTS: Product[] = [
  {
    _id: 'p1',
    title: 'Watlys Classic',
    slug: 'watlys-classic',
    price: 9.99,
    description: 'Natural mineral spring water, bottled at source in our signature design.',
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80',
    capacity: '750ml',
    categoryTitle: 'Glass',
  },
  {
    _id: 'p2',
    title: 'Watlys Sport',
    slug: 'watlys-sport',
    price: 12.99,
    description: 'Enhanced mineral levels and electrolytes encased in durable BPA-free Tritan.',
    imageUrl: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=600&q=80',
    capacity: '1L',
    categoryTitle: 'Active',
  },
  {
    _id: 'p3',
    title: 'Watlys Element',
    slug: 'watlys-element',
    price: 24.99,
    description: 'Double-walled vacuum insulated premium stainless steel bottle.',
    imageUrl: 'https://images.unsplash.com/photo-1548839134-6fd5e60885a3?auto=format&fit=crop&w=600&q=80',
    capacity: '500ml',
    categoryTitle: 'Insulated',
  },
  {
    _id: 'p4',
    title: 'Watlys Pocket',
    slug: 'watlys-pocket',
    price: 5.99,
    description: 'Compact 330ml pocket glass bottle for quick refreshment.',
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80',
    capacity: '330ml',
    categoryTitle: 'Glass',
    isComingSoon: true,
  },
]

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('newest')
  const [notifyEmail, setNotifyEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const data = await client.fetch<Product[]>(PRODUCTS_CATALOG_QUERY)
        if (data && data.length > 0) {
          setProducts(data)
        } else {
          setProducts(MOCK_SHOP_PRODUCTS)
        }
      } catch (err) {
        setProducts(MOCK_SHOP_PRODUCTS)
      }
    }
    load()
  }, [])

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || p.categoryTitle === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price
    if (sortBy === 'price-high') return b.price - a.price
    return 0
  })

  const categories = ['All', ...Array.from(new Set(products.map((p) => p.categoryTitle).filter(Boolean)))]

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (notifyEmail) {
      setIsSubscribed(true)
      setNotifyEmail('')
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#0a1128] text-zinc-900 dark:text-[#FAFAFA] flex flex-col pt-24 transition-colors duration-300">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-12 flex-1 w-full space-y-12">
        {/* Page Title */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#111827] dark:text-[#FAFAFA]">Catalog</h1>
          <p className="text-zinc-550 dark:text-slate-200 max-w-md">Browse our curated collection of pristine water designs.</p>
        </div>

        {/* Filters and Controls */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Search bar */}
          <div className="md:col-span-4">
            <input
              type="text"
              placeholder="Search catalog..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-5 py-3 rounded-xl bg-white dark:bg-[#131c38] border border-zinc-200 dark:border-slate-800 text-[#111827] dark:text-[#FAFAFA] placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-[#0064D0] shadow-sm transition-colors"
            />
          </div>

          {/* Categories selectors */}
          <div className="md:col-span-5 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat || 'All')}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#0064D0] text-white shadow-sm'
                    : 'bg-white dark:bg-[#131c38] border border-zinc-200 dark:border-slate-800 text-zinc-550 dark:text-slate-200 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-sm'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sorter */}
          <div className="md:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-5 py-3 rounded-xl bg-white dark:bg-[#131c38] border border-zinc-200 dark:border-slate-800 text-[#111827] dark:text-[#FAFAFA] focus:outline-none focus:border-[#0064D0] shadow-sm transition-colors"
            >
              <option value="newest">Sort by: Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProducts.map((p) => {
            if (p.isComingSoon) {
              return (
                <div
                  key={p._id}
                  className="group relative flex flex-col rounded-2xl border border-dashed border-zinc-300 dark:border-slate-800 bg-white dark:bg-[#131c38] p-8 text-center justify-between min-h-[350px] shadow-sm"
                >
                  <div className="space-y-4">
                    <span className="inline-block text-[10px] uppercase tracking-widest font-bold text-[#0064D0] bg-[#0064D0]/10 px-3 py-1 rounded-full border border-[#0064D0]/20">
                      Coming Soon
                    </span>
                    <h3 className="text-xl font-bold text-[#111827] dark:text-[#FAFAFA]">{p.title}</h3>
                    <p className="text-sm text-zinc-500 dark:text-slate-200">{p.description}</p>
                    {p.capacity && <span className="text-xs text-zinc-400 dark:text-zinc-500 block font-medium">Capacity: {p.capacity}</span>}
                  </div>

                  <div className="pt-6">
                    {isSubscribed ? (
                      <span className="text-sm font-semibold text-[#0064D0]">✓ You will be notified!</span>
                    ) : (
                      <form onSubmit={handleNotifySubmit} className="space-y-3">
                        <input
                          type="email"
                          placeholder="Your email address"
                          value={notifyEmail}
                          onChange={(e) => setNotifyEmail(e.target.value)}
                          required
                          className="w-full px-4 py-2.5 rounded-lg bg-zinc-50 dark:bg-[#0a1128] border border-zinc-200 dark:border-slate-800 text-xs text-zinc-800 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-[#0064D0] shadow-inner"
                        />
                        <button
                          type="submit"
                          className="w-full py-2.5 rounded-lg bg-[#0064D0] text-white text-xs font-semibold hover:bg-[#0064D0]/80 transition-colors shadow-sm"
                        >
                          Notify Me
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              )
            }

            return (
              <ProductCard
                key={p._id}
                id={p._id}
                title={p.title}
                slug={p.slug}
                price={p.price}
                description={p.description}
                imageUrl={p.imageUrl}
                capacity={p.capacity}
              />
            )
          })}
        </div>
      </main>

      {/* Footer */}
      <FooterSection />
    </div>
  )
}
