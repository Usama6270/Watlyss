import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'r6fj3reg'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_STUDIO_TOKEN

const serverClient = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
})

const CUSTOMER_ORDERS_QUERY = `
  *[_type == "order"] | order(_createdAt desc) {
    _id,
    orderNumber,
    customerName,
    phone,
    email,
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

export async function GET() {
  try {
    const orders = await serverClient.fetch(CUSTOMER_ORDERS_QUERY)
    return NextResponse.json({
      success: true,
      orders: orders || [],
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
