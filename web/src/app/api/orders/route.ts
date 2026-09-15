import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'

export async function GET(req: Request) {
  try {
    const writeToken = process.env.SANITY_API_WRITE_TOKEN
    if (!writeToken) {
      return NextResponse.json(
        { success: false, error: 'Server configuration error: SANITY_API_WRITE_TOKEN missing' },
        { status: 500 }
      )
    }

    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'r6fj3reg'
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

    const serverClient = createClient({
      projectId,
      dataset,
      apiVersion: '2024-01-01',
      useCdn: false,
      token: writeToken,
    })

    const { searchParams } = new URL(req.url)
    const userEmailHeader = req.headers.get('x-user-email')
    const userPhoneHeader = req.headers.get('x-user-phone')
    
    // Cookie session fallback
    const cookieHeader = req.headers.get('cookie') || ''
    const cookieEmailMatch = cookieHeader.match(/watlys_user_email=([^;]+)/)
    const cookiePhoneMatch = cookieHeader.match(/watlys_user_phone=([^;]+)/)

    const email = (userEmailHeader || searchParams.get('email') || (cookieEmailMatch ? decodeURIComponent(cookieEmailMatch[1]) : '') || '').trim()
    const phone = (userPhoneHeader || searchParams.get('phone') || (cookiePhoneMatch ? decodeURIComponent(cookiePhoneMatch[1]) : '') || '').trim()

    // Require valid authenticated customer session identity
    if (!email && !phone) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: No valid customer session present' },
        { status: 401 }
      )
    }

    const CUSTOMER_ORDERS_QUERY = `
      *[_type == "order" && (
        (defined($email) && $email != "" && (customerEmail == $email || email == $email)) ||
        (defined($phone) && $phone != "" && (customerPhone == $phone || phone == $phone))
      )] | order(_createdAt desc) {
        _id,
        orderNumber,
        customerName,
        phone,
        email,
        customerEmail,
        customerPhone,
        deliveryAddress,
        city,
        packageDetails,
        pricingSummary,
        paymentMethod,
        paymentStatus,
        transactionReference,
        orderStatus,
        subscriptionStatus,
        pauseStartDate,
        nextBillingDate,
        status,
        total,
        items,
        _createdAt
      }
    `

    const orders = await serverClient.fetch(CUSTOMER_ORDERS_QUERY, { email, phone })

    // Deduplicate orders to prevent duplicate UI cards when Sanity Studio creates draft vs published pairs
    const orderMap = new Map<string, any>()
    for (const order of orders || []) {
      const orderKey = order.orderNumber || order._id.replace(/^drafts\./, '')
      if (!orderMap.has(orderKey) || order._id.startsWith('drafts.')) {
        orderMap.set(orderKey, order)
      }
    }
    const deduplicatedOrders = Array.from(orderMap.values())

    return NextResponse.json({
      success: true,
      orders: deduplicatedOrders,
    })
  } catch (error: any) {
    console.error('API /api/orders fetch error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch orders from Sanity',
        orders: [],
      },
      { status: 500 }
    )
  }
}
