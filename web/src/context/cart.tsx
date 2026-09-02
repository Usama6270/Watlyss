'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface CartItem {
  id: string
  title: string
  price: number
  quantity: number
  imageUrl?: string
  capacity?: string
}

export interface Coupon {
  code: string
  discountType: 'percentage' | 'fixed'
  value: number
}

interface CartContextType {
  cart: CartItem[]
  coupon: Coupon | null
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  applyCoupon: (coupon: Coupon | null) => void
  cartTotal: number
  discountAmount: number
  finalTotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [coupon, setCoupon] = useState<Coupon | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const storedCart = localStorage.getItem('watlys_cart')
    const storedCoupon = localStorage.getItem('watlys_coupon')
    if (storedCart) setCart(JSON.parse(storedCart))
    if (storedCoupon) setCoupon(JSON.parse(storedCoupon))
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('watlys_cart', JSON.stringify(cart))
    }
  }, [cart, isLoaded])

  useEffect(() => {
    if (isLoaded) {
      if (coupon) {
        localStorage.setItem('watlys_coupon', JSON.stringify(coupon))
      } else {
        localStorage.removeItem('watlys_coupon')
      }
    }
  }, [coupon, isLoaded])

  const addToCart = (item: Omit<CartItem, 'quantity'>, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        )
      }
      return [...prev, { ...item, quantity }]
    })
  }

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    )
  }

  const clearCart = () => {
    setCart([])
    setCoupon(null)
  }

  const applyCoupon = (newCoupon: Coupon | null) => {
    setCoupon(newCoupon)
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const discountAmount = coupon
    ? coupon.discountType === 'percentage'
      ? (cartTotal * coupon.value) / 100
      : coupon.value
    : 0

  const finalTotal = Math.max(0, cartTotal - discountAmount)

  return (
    <CartContext.Provider
      value={{
        cart,
        coupon,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyCoupon,
        cartTotal,
        discountAmount,
        finalTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
