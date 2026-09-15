'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface AddressItem {
  id?: string
  addressLabel: string
  street: string
  city: string
  postalCode: string
}

export interface ActiveSubscription {
  packageType: string
  frequency: 'weekly' | 'bi-weekly' | 'monthly'
  bottleQty: number
  status: 'active' | 'paused' | 'cancelled'
}

export interface User {
  fullName: string
  name?: string
  email: string
  phone: string
  addressList: AddressItem[]
  activeSubscription?: ActiveSubscription
  address?: {
    line1: string
    line2?: string
    city: string
    state: string
    postalCode: string
    country: string
  }
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isGuest: boolean
  login: (identifier: string, password?: string, otp?: string) => Promise<void>
  signup: (fullName: string, phone: string, email: string, password?: string) => Promise<void>
  logout: () => void
  saveAddress: (address: NonNullable<User['address']>) => void
  addAddress: (address: AddressItem) => void
  removeAddress: (index: number) => void
  toggleSubscriptionStatus: () => void
  updateSubscription: (subscription: Partial<ActiveSubscription>) => void
  isAuthModalOpen: boolean
  authModalTab: 'login' | 'signup'
  openAuthModal: (tab?: 'login' | 'signup') => void
  closeAuthModal: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const setSessionCookies = (u: User) => {
  if (typeof document !== 'undefined') {
    if (u.email) {
      document.cookie = `watlys_user_email=${encodeURIComponent(u.email)}; path=/; max-age=604800; SameSite=Lax`
    }
    if (u.phone) {
      document.cookie = `watlys_user_phone=${encodeURIComponent(u.phone)}; path=/; max-age=604800; SameSite=Lax`
    }
  }
}

const clearSessionCookies = () => {
  if (typeof document !== 'undefined') {
    document.cookie = 'watlys_user_email=; path=/; max-age=0; SameSite=Lax'
    document.cookie = 'watlys_user_phone=; path=/; max-age=0; SameSite=Lax'
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authModalTab, setAuthModalTab] = useState<'login' | 'signup'>('login')

  useEffect(() => {
    const storedUser = localStorage.getItem('watlys_user')
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser)
        if (parsed && (parsed.email || parsed.phone)) {
          const userObj: User = {
            ...parsed,
            fullName: parsed.fullName || parsed.name || 'Watlys Customer',
            name: parsed.name || parsed.fullName || 'Watlys Customer',
            addressList: parsed.addressList || (parsed.address ? [{
              addressLabel: 'Home',
              street: parsed.address.line1,
              city: parsed.address.city,
              postalCode: parsed.address.postalCode,
            }] : []),
          }
          setUser(userObj)
          setSessionCookies(userObj)
        } else {
          setUser(null)
          localStorage.removeItem('watlys_user')
          clearSessionCookies()
        }
      } catch {
        setUser(null)
        localStorage.removeItem('watlys_user')
        clearSessionCookies()
      }
    } else {
      setUser(null)
      clearSessionCookies()
    }
    setIsLoaded(true)
  }, [])

  const openAuthModal = (tab: 'login' | 'signup' = 'login') => {
    setAuthModalTab(tab)
    setIsAuthModalOpen(true)
  }

  const closeAuthModal = () => {
    setIsAuthModalOpen(false)
  }

  const login = async (identifier: string, password?: string, otp?: string) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password, otp }),
    })
    const data = await res.json()
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Failed to sign in')
    }

    const fetchedUser: User = data.user
    setUser(fetchedUser)
    localStorage.setItem('watlys_user', JSON.stringify(fetchedUser))
    setSessionCookies(fetchedUser)
    setIsAuthModalOpen(false)
  }

  const signup = async (fullName: string, phone: string, email: string, password?: string) => {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, phone, email, password }),
    })
    const data = await res.json()
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Failed to create account')
    }

    const newUser: User = data.user
    setUser(newUser)
    localStorage.setItem('watlys_user', JSON.stringify(newUser))
    setSessionCookies(newUser)
    setIsAuthModalOpen(false)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('watlys_user')
    clearSessionCookies()
  }

  const saveAddress = (address: NonNullable<User['address']>) => {
    if (user) {
      const newAddressItem: AddressItem = {
        addressLabel: 'Primary Address',
        street: address.line1 + (address.line2 ? `, ${address.line2}` : ''),
        city: address.city,
        postalCode: address.postalCode,
      }
      const updatedUser = {
        ...user,
        address,
        addressList: [newAddressItem, ...(user.addressList || []).filter((a: AddressItem) => a.street !== newAddressItem.street)],
      }
      setUser(updatedUser)
      localStorage.setItem('watlys_user', JSON.stringify(updatedUser))
    }
  }

  const addAddress = (address: AddressItem) => {
    if (user) {
      const updatedList = [...(user.addressList || []), address]
      const updatedUser = {
        ...user,
        addressList: updatedList,
      }
      setUser(updatedUser)
      localStorage.setItem('watlys_user', JSON.stringify(updatedUser))
    }
  }

  const removeAddress = (index: number) => {
    if (user && user.addressList) {
      const updatedList = user.addressList.filter((_: AddressItem, i: number) => i !== index)
      const updatedUser = { ...user, addressList: updatedList }
      setUser(updatedUser)
      localStorage.setItem('watlys_user', JSON.stringify(updatedUser))
    }
  }

  const toggleSubscriptionStatus = () => {
    if (user && user.activeSubscription) {
      const currentStatus = user.activeSubscription.status
      const newStatus = currentStatus === 'active' ? 'paused' : 'active'
      const updatedUser: User = {
        ...user,
        activeSubscription: {
          ...user.activeSubscription,
          status: newStatus,
        },
      }
      setUser(updatedUser)
      localStorage.setItem('watlys_user', JSON.stringify(updatedUser))
    }
  }

  const updateSubscription = (subscription: Partial<ActiveSubscription>) => {
    if (user) {
      const updatedUser: User = {
        ...user,
        activeSubscription: {
          packageType: user.activeSubscription?.packageType || 'Family Plan (19L)',
          frequency: user.activeSubscription?.frequency || 'weekly',
          bottleQty: user.activeSubscription?.bottleQty || 4,
          status: user.activeSubscription?.status || 'active',
          ...subscription,
        },
      }
      setUser(updatedUser)
      localStorage.setItem('watlys_user', JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isGuest: !user,
        login,
        signup,
        logout,
        saveAddress,
        addAddress,
        removeAddress,
        toggleSubscriptionStatus,
        updateSubscription,
        isAuthModalOpen,
        authModalTab,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
