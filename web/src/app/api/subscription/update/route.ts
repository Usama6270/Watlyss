import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'

export async function POST(req: Request) {
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

    const writeClient = createClient({
      projectId,
      dataset,
      apiVersion: '2024-01-01',
      useCdn: false,
      token: writeToken,
    })

    const body = await req.json()
    const { orderId, phone, bottleQty, frequency } = body

    if (!bottleQty && !frequency) {
      return NextResponse.json(
        { success: false, error: 'Please provide bottleQty or frequency to update.' },
        { status: 400 }
      )
    }

    // Rate per 19L bottle
    const BASE_RATE = 320
    const DELIVERY_FEE = 100

    let updatedCount = 0

    // 1. Patch Order in Sanity
    if (orderId) {
      try {
        const existingOrder = await writeClient.fetch(`*[_type == "order" && _id == $orderId][0]`, { orderId })
        if (existingOrder) {
          const newQty = bottleQty ? Number(bottleQty) : (existingOrder.packageDetails?.bottleQty || 4)
          const newFreq = frequency || existingOrder.packageDetails?.frequency || 'Weekly'
          
          const newSubtotal = newQty * BASE_RATE
          const discountPct = existingOrder.pricingSummary?.appliedDiscountPercentage || 0
          const segDiscount = Math.round(newSubtotal * (discountPct / 100))
          const couponDiscount = existingOrder.pricingSummary?.couponDiscountAmount || 0
          const newGrandTotal = Math.max(0, newSubtotal - segDiscount - couponDiscount + DELIVERY_FEE)

          await writeClient
            .patch(orderId)
            .set({
              'packageDetails.bottleQty': newQty,
              'packageDetails.frequency': newFreq,
              'pricingSummary.subtotal': newSubtotal,
              'pricingSummary.grandTotal': newGrandTotal,
            })
            .commit()
          updatedCount++
        }
      } catch (err) {
        console.warn(`Failed to patch order ${orderId}:`, err)
      }
    }

    // 2. Patch Customer Document in Sanity by phone
    if (phone && phone.trim()) {
      try {
        const customers = await writeClient.fetch(
          `*[_type == "customer" && phone == $phone]._id`,
          { phone: phone.trim() }
        )
        for (const cId of customers) {
          const patchObj: Record<string, any> = {}
          if (bottleQty) patchObj['activeSubscription.bottleQty'] = Number(bottleQty)
          if (frequency) patchObj['activeSubscription.frequency'] = frequency

          await writeClient.patch(cId).set(patchObj).commit()
        }
      } catch (err) {
        console.warn(`Failed to patch customer by phone ${phone}:`, err)
      }
    }

    return NextResponse.json({
      success: true,
      bottleQty,
      frequency,
      updatedCount,
    })
  } catch (error: any) {
    console.error('API /api/subscription/update error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to update subscription in Sanity.',
      },
      { status: 500 }
    )
  }
}
