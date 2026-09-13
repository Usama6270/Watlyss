import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'

const SANITY_WRITE_TOKEN =
  process.env.SANITY_API_WRITE_TOKEN ||
  'skp59J7MkNWjr6EoeF7Rj5xFXciXCUrdQ6HYDBZuEccKmxWx2Pc3MijY9Z5ksJxTvWv6h6wGvtvEFa5fRg1rNDG56KUJ3z4QqIU8YAqwSAl64HxPnI1BkiphXVJoVw0sIav06ku7Jmhtyt2doWRtGWgAfKAIKblY8KJ7ugbHvjRl6mLktKe3'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'r6fj3reg',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: SANITY_WRITE_TOKEN,
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { identifier, password, otp } = body

    if (!identifier || identifier.trim() === '') {
      return NextResponse.json(
        { error: 'Please enter your phone number or email address' },
        { status: 400 }
      )
    }

    const cleanIdentifier = identifier.trim().replace(/[\s-]/g, '')

    // 1. QUERY CUSTOMER DOCUMENT FROM SANITY
    const customer = await client.fetch(
      `*[_type == "customer" && (email == $identifier || phone == $identifier || phone == $cleanPhone)][0]`,
      { identifier: identifier.trim(), cleanPhone: cleanIdentifier }
    )

    if (!customer) {
      return NextResponse.json(
        { error: 'Account not found with this email or phone. Please create an account first.' },
        { status: 404 }
      )
    }

    // 2. VERIFY PASSWORD / OTP AUTHENTICATION
    if (otp) {
      if (otp !== '1234' && otp !== '123456') {
        return NextResponse.json(
          { error: 'Invalid verification code (OTP). Please use demo code 1234.' },
          { status: 401 }
        )
      }
    } else {
      if (!password || password.trim() === '') {
        return NextResponse.json(
          { error: 'Please enter your password' },
          { status: 400 }
        )
      }

      if (customer.password && customer.password !== password) {
        return NextResponse.json(
          { error: 'Incorrect email/phone or password. Please try again.' },
          { status: 401 }
        )
      }
    }

    // 3. FORMAT SAVED ADDRESSES WITH UNIQUE _key FOR SANITY COMPATIBILITY
    const addressList = (customer.addressList || []).map((addr: any, idx: number) => ({
      id: addr._key || 'addr_' + idx,
      addressLabel: addr.addressLabel || 'Primary Address',
      street: addr.street || '',
      city: addr.city || 'Lahore',
      postalCode: addr.postalCode || '54000',
    }))

    const activeSubscription = customer.activeSubscription || {
      packageType: 'Family Plan (19L)',
      frequency: 'weekly',
      bottleQty: 4,
      status: 'active',
    }

    const userPayload = {
      fullName: customer.fullName || 'Watlys Customer',
      email: customer.email,
      phone: customer.phone,
      addressList: addressList.length > 0 ? addressList : [
        {
          id: 'addr_default',
          addressLabel: 'Primary Address',
          street: 'Block H3, Johar Town',
          city: 'Lahore',
          postalCode: '54770',
        },
      ],
      activeSubscription,
    }

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user: userPayload,
    })
  } catch (error: any) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: error.message || 'Authentication login error' },
      { status: 500 }
    )
  }
}
