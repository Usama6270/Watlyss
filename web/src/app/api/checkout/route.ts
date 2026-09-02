import { NextResponse } from 'next/server'
import { client } from '@/sanity/client'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
  apiVersion: '2025-01-27' as any,
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, name, address, items, couponCode, paymentMethod } = body

    if (!email || !items || items.length === 0) {
      return NextResponse.json({ error: 'Missing required checkout information.' }, { status: 400 })
    }

    const orderNumber = `WAT-${Math.floor(100000 + Math.random() * 900000)}`
    const subtotal = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)
    
    // Simple coupon discount simulation
    let discount = 0
    if (couponCode === 'WELCOME10') {
      discount = subtotal * 0.1
    }
    const total = Math.max(0, subtotal - discount)

    // 1. Create order document in Sanity (with pending status) using Write Token
    const writeClient = client.withConfig({
      token: process.env.SANITY_API_WRITE_TOKEN,
      useCdn: false,
    })

    const newOrder = {
      _type: 'order',
      orderNumber,
      customerName: name,
      customerEmail: email,
      items: items.map((i: any) => ({
        _key: i.id + Math.random().toString(),
        productId: i.id,
        title: i.title,
        quantity: i.quantity,
        price: i.price,
      })),
      total,
      paymentStatus: paymentMethod === 'stripe' ? 'pending' : 'paid',
      status: 'placed',
      shippingAddress: {
        line1: address.line1,
        line2: address.line2 || '',
        city: address.city,
        state: address.state,
        postalCode: address.postalCode,
        country: address.country,
      },
      paymentMethod,
    }

    await writeClient.create(newOrder)

    // 2. If Stripe selected, generate Checkout Session
    if (paymentMethod === 'stripe') {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: items.map((item: any) => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.title,
            },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: item.quantity,
        })),
        mode: 'payment',
        success_url: `${req.headers.get('origin')}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.get('origin')}/cart`,
        metadata: {
          orderNumber,
        },
      })

      return NextResponse.json({ id: session.id, orderNumber })
    }

    // Direct checkout for mobile wallets
    return NextResponse.json({ id: null, orderNumber })
  } catch (error: any) {
    console.error('Checkout API error:', error)
    return NextResponse.json({ error: error.message || 'Server error during checkout.' }, { status: 500 })
  }
}
