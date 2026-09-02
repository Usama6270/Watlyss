import { NextResponse } from 'next/server'
import { client } from '@/sanity/client'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
  apiVersion: '2025-01-27' as any,
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ''

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature') || ''

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    // Fallback support for developer workspace simulation
    if (process.env.NODE_ENV === 'development') {
      try {
        const payload = JSON.parse(body)
        event = payload as any
      } catch {
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
      }
    } else {
      return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
    }
  }

  // Handle checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const orderNumber = session.metadata?.orderNumber

    if (orderNumber) {
      try {
        // Query the order document in Sanity by orderNumber
        const writeClient = client.withConfig({
          token: process.env.SANITY_API_WRITE_TOKEN,
          useCdn: false,
        })

        const query = `*[_type == "order" && orderNumber == $orderNumber][0]._id`
        const orderId = await writeClient.fetch<string | null>(query, { orderNumber })

        if (orderId) {
          // Patch order document paymentStatus to paid
          await writeClient.patch(orderId).set({ paymentStatus: 'paid' }).commit()
          console.log(`Order ${orderNumber} successfully updated to PAID in Sanity.`)
        } else {
          console.error(`Order document not found for orderNumber: ${orderNumber}`)
        }
      } catch (err) {
        console.error('Sanity order status update error:', err)
        return NextResponse.json({ error: 'Failed to update order status in Sanity' }, { status: 500 })
      }
    }
  }

  return NextResponse.json({ received: true })
}
