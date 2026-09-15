import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  try {
    const writeToken = process.env.SANITY_API_WRITE_TOKEN
    if (!writeToken) {
      return NextResponse.json(
        { error: 'Server configuration error: SANITY_API_WRITE_TOKEN is missing' },
        { status: 500 }
      )
    }

    const writeClient = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'r6fj3reg',
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
      apiVersion: '2024-01-01',
      useCdn: false,
      token: writeToken,
    })

    const body = await req.json()
    const { fullName, phone, email, password } = body

    // 1. FORM FIELD VALIDATIONS
    if (!fullName || fullName.trim().length < 2) {
      return NextResponse.json(
        { error: 'Please enter your full name (at least 2 characters)' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: 'Please enter a valid email address (e.g. name@example.com)' },
        { status: 400 }
      )
    }

    const cleanPhone = phone ? phone.trim().replace(/[\s-]/g, '') : ''
    if (!cleanPhone || cleanPhone.length < 10) {
      return NextResponse.json(
        { error: 'Please enter a valid phone number (at least 10 digits)' },
        { status: 400 }
      )
    }

    if (!password || password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      )
    }

    // 2. CHECK DUPLICATE ACCOUNT IN SANITY
    const existingCustomer = await writeClient.fetch(
      `*[_type == "customer" && (email == $email || phone == $phone)][0]`,
      { email: email.trim(), phone: cleanPhone }
    )

    if (existingCustomer) {
      return NextResponse.json(
        { error: 'An account with this email or phone number already exists. Please sign in instead.' },
        { status: 409 }
      )
    }

    // 3. HASH PASSWORD BEFORE SAVING TO SANITY
    const hashedPassword = await bcrypt.hash(password, 10)

    // 4. PREPARE CUSTOMER PAYLOAD WITH _key FOR SANITY ARRAY COMPATIBILITY
    const addressKey = 'addr_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7)
    
    const addressItem = {
      _key: addressKey,
      _type: 'savedAddress',
      addressLabel: 'Primary Address',
      street: 'Block H3, Johar Town',
      city: 'Lahore',
      postalCode: '54770',
    }

    const activeSub = {
      packageType: 'Family Plan (19L)',
      frequency: 'weekly',
      bottleQty: 4,
      status: 'active',
    }

    // 5. CREATE DOCUMENT IN SANITY DATASET
    await writeClient.create({
      _type: 'customer',
      fullName: fullName.trim(),
      email: email.trim(),
      phone: cleanPhone,
      password: hashedPassword,
      addressList: [addressItem],
      activeSubscription: activeSub,
    })

    const userPayload = {
      fullName: fullName.trim(),
      email: email.trim(),
      phone: cleanPhone,
      addressList: [
        {
          id: addressKey,
          addressLabel: 'Primary Address',
          street: 'Block H3, Johar Town',
          city: 'Lahore',
          postalCode: '54770',
        },
      ],
      activeSubscription: activeSub,
    }

    return NextResponse.json({
      success: true,
      message: 'Account created successfully and saved in Sanity Studio',
      user: userPayload,
    })
  } catch (error: any) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: error.message || 'Server signup error' },
      { status: 500 }
    )
  }
}
