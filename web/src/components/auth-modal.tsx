'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Lock, Phone, Mail, User as UserIcon, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react'
import { useAuth } from '@/context/auth'

export default function AuthModal() {
  const { isAuthModalOpen, authModalTab, closeAuthModal, login, signup } = useAuth()
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(authModalTab || 'login')
  const [authMethod, setAuthMethod] = useState<'password' | 'otp'>('password')

  // Form State
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [otpCode, setOtpCode] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  // Sync tab state from context when modal opens
  React.useEffect(() => {
    if (authModalTab) {
      setActiveTab(authModalTab)
    }
  }, [authModalTab])

  if (!isAuthModalOpen) return null

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault()
    if (!phone) {
      setErrorMsg('Please enter a valid phone number')
      return
    }
    setErrorMsg('')
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setOtpSent(true)
    }, 600)
  }

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')
    const identifier = (email || phone).trim()
    if (!identifier) {
      setErrorMsg('Please enter your email or phone number')
      return
    }

    if (authMethod === 'password') {
      if (!password) {
        setErrorMsg('Please enter your password')
        return
      }
      setLoading(true)
      try {
        await login(identifier, password)
      } catch (err: any) {
        setErrorMsg(err.message || 'Failed to sign in')
      } finally {
        setLoading(false)
      }
    } else {
      if (!otpCode) {
        setErrorMsg('Please enter the 4-digit verification code sent to your phone')
        return
      }
      setLoading(true)
      try {
        await login(phone, undefined, otpCode)
      } catch (err: any) {
        setErrorMsg(err.message || 'Failed to sign in')
      } finally {
        setLoading(false)
      }
    }
  }

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    if (!fullName || fullName.trim().length < 2) {
      setErrorMsg('Please enter your full name (at least 2 characters)')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email.trim())) {
      setErrorMsg('Please enter a valid email address (e.g. name@example.com)')
      return
    }

    const cleanPhone = phone ? phone.trim().replace(/[\s-]/g, '') : ''
    if (!cleanPhone || cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid phone number (at least 10 digits)')
      return
    }

    if (!password || password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long')
      return
    }

    setLoading(true)
    try {
      await signup(fullName.trim(), cleanPhone, email.trim(), password)
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to create account')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAuthModal}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-md bg-white dark:bg-[#131c38] border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10 font-sans"
        >
          {/* Top Decorative Bar */}
          <div className="h-2 bg-gradient-to-r from-[#0064D0] via-sky-400 to-[#0064D0]" />

          {/* Close Button */}
          <button
            onClick={closeAuthModal}
            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
            aria-label="Close Auth Modal"
          >
            <X size={18} />
          </button>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Header */}
            <div className="space-y-1.5 text-center">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-[#0064D0]/10 rounded-full text-[#0064D0] text-[10px] font-bold uppercase tracking-widest">
                <Sparkles size={12} />
                <span>Watlys Customer Portal</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white tracking-wide pt-1">
                {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-200">
                {activeTab === 'login'
                  ? 'Access your 19L bottle subscription & orders'
                  : 'Join Watlys for recurring water deliveries'}
              </p>
            </div>

            {/* Navigation Tabs */}
            <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-[#0a1128] rounded-xl text-xs font-bold">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('login')
                  setErrorMsg('')
                }}
                className={`py-2.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'login'
                    ? 'bg-white dark:bg-[#131c38] text-[#0064D0] shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('signup')
                  setErrorMsg('')
                }}
                className={`py-2.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'signup'
                    ? 'bg-white dark:bg-[#131c38] text-[#0064D0] shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Create Account
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 text-xs bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-xl font-medium">
                {errorMsg}
              </div>
            )}

            {/* LOGIN TAB */}
            {activeTab === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {/* Method Switcher: Password vs OTP */}
                <div className="flex justify-end text-[11px] font-semibold text-[#0064D0] space-x-2 pb-1">
                  <button
                    type="button"
                    onClick={() => setAuthMethod(authMethod === 'password' ? 'otp' : 'password')}
                    className="hover:underline cursor-pointer"
                  >
                    {authMethod === 'password' ? 'Sign in with Phone OTP instead' : 'Sign in with Password instead'}
                  </button>
                </div>

                {authMethod === 'password' ? (
                  <>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                        Phone Number or Email
                      </label>
                      <div className="relative">
                        <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          required
                          placeholder="+92 300 1234567 or email@example.com"
                          value={phone || email}
                          onChange={(e) => {
                            const val = e.target.value
                            if (val.includes('@')) {
                              setEmail(val)
                              setPhone('')
                            } else {
                              setPhone(val)
                              setEmail('')
                            }
                          }}
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-[#0a1128] border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-[#0064D0]"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                        Password
                      </label>
                      <div className="relative">
                        <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="password"
                          required
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-[#0a1128] border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-[#0064D0]"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                        Phone Number
                      </label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="tel"
                            required
                            placeholder="+92 300 1234567"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-[#0a1128] border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-[#0064D0]"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={handleSendOtp}
                          disabled={otpSent || loading}
                          className="px-4 py-3 bg-slate-200 dark:bg-slate-800 hover:bg-[#0064D0] hover:text-white text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                        >
                          {otpSent ? 'Resend' : 'Send Code'}
                        </button>
                      </div>
                    </div>

                    {otpSent && (
                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex justify-between">
                          <span>Verification Code (SMS OTP)</span>
                          <span className="text-[#0064D0]">Demo Code: 1234</span>
                        </label>
                        <div className="relative">
                          <ShieldCheck size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="text"
                            maxLength={6}
                            placeholder="Enter 4-digit OTP"
                            value={otpCode}
                            onChange={(e) => setOtpCode(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-[#0a1128] border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-[#0064D0]"
                          />
                        </div>
                      </div>
                    )}
                  </>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-[#0064D0] hover:bg-[#0052ad] text-white rounded-xl font-bold text-xs uppercase tracking-[0.15em] flex items-center justify-center space-x-2 transition-all shadow-lg shadow-[#0064D0]/30 cursor-pointer"
                >
                  <span>{loading ? 'Signing In...' : 'Sign In to Account'}</span>
                  <ArrowRight size={14} />
                </button>
              </form>
            )}

            {/* CREATE ACCOUNT TAB */}
            {activeTab === 'signup' && (
              <form onSubmit={handleSignupSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Full Name
                  </label>
                  <div className="relative">
                    <UserIcon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Muhammad Ali"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-[#0a1128] border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-[#0064D0]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Phone Number (Primary Key)
                  </label>
                  <div className="relative">
                    <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      required
                      placeholder="+92 300 1234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-[#0a1128] border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-[#0064D0]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      required
                      placeholder="ali@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-[#0a1128] border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-[#0064D0]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Password / PIN
                  </label>
                  <div className="relative">
                    <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      required
                      placeholder="At least 6 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-[#0a1128] border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-[#0064D0]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-[#0064D0] hover:bg-[#0052ad] text-white rounded-xl font-bold text-xs uppercase tracking-[0.15em] flex items-center justify-center space-x-2 transition-all shadow-lg shadow-[#0064D0]/30 cursor-pointer"
                >
                  <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
                  <ArrowRight size={14} />
                </button>
              </form>
            )}

            <p className="text-[10px] text-slate-400 text-center">
              By continuing, you agree to Watlys Terms of Service & Privacy Policy.
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
