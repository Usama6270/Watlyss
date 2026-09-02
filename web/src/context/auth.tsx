'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface User {
  email: string
  name: string
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
  login: (email: string, name: string) => void
  signup: (email: string, name: string) => void
  logout: () => void
  saveAddress: (address: NonNullable<User['address']>) => void
  isGuest: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem('watlys_user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoaded(true)
  }, [])

  const login = (email: string, name: string) => {
    const newUser = { email, name }
    setUser(newUser)
    localStorage.setItem('watlys_user', JSON.stringify(newUser))
  }

  const signup = (email: string, name: string) => {
    const newUser = { email, name }
    setUser(newUser)
    localStorage.setItem('watlys_user', JSON.stringify(newUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('watlys_user')
  }

  const saveAddress = (address: NonNullable<User['address']>) => {
    if (user) {
      const updatedUser = { ...user, address }
      setUser(updatedUser)
      localStorage.setItem('watlys_user', JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        saveAddress,
        isGuest: !user,
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
