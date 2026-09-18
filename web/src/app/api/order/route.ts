import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'
import { sendCustomerOrderConfirmation, sendAdminOrderNotification } from '@/lib/email'

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
    const {
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
    } = body

    // 1. Validation
    if (!customerName || typeof customerName !== 'string' || !customerName.trim()) {
      return NextResponse.json({ success: false, error: 'Customer Name is required.' }, { status: 400 })
    }

    if (!phone || typeof phone !== 'string' || !phone.trim()) {
      return NextResponse.json({ success: false, error: 'Phone Number is required.' }, { status: 400 })
    }

    if (!deliveryAddress || typeof deliveryAddress !== 'string' || !deliveryAddress.trim()) {
      return NextResponse.json({ success: false, error: 'Delivery Address is required.' }, { status: 400 })
    }

    if (!packageDetails || typeof packageDetails !== 'object') {
      return NextResponse.json({ success: false, error: 'Package Details are required.' }, { status: 400 })
    }

    if (!pricingSummary || typeof pricingSummary !== 'object') {
      return NextResponse.json({ success: false, error: 'Pricing Summary is required.' }, { status: 400 })
    }

    // 2. Generate Order Number: WAT-2026-XXXX
    const randomSuffix = Math.floor(1000 + Math.random() * 9000).toString()
    const orderNumber = `WAT-2026-${randomSuffix}`

    // 3. Create document in Sanity
    const doc = await writeClient.create({
      _type: 'order',
      orderNumber,
      customerName: customerName.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : '',
      deliveryAddress: deliveryAddress.trim(),
      city: city || 'Islamabad / Rawalpindi',
      packageDetails: {
        bottleQty: Number(packageDetails.bottleQty || 1),
        frequency: packageDetails.frequency || 'Bi-Weekly',
        customerSegment: packageDetails.customerSegment || 'Family',
      },
      pricingSummary: {
        basePrice: Number(pricingSummary.basePrice || 320),
        subtotal: Number(pricingSummary.subtotal || 0),
        appliedDiscountPercentage: Number(pricingSummary.appliedDiscountPercentage || 0),
        appliedCoupon: body.appliedCoupon || pricingSummary.appliedCoupon || '',
        couponDiscountAmount: Number(body.couponDiscountAmount || pricingSummary.couponDiscountAmount || 0),
        deliveryFee: Number(pricingSummary.deliveryFee || 100),
        grandTotal: Number(pricingSummary.grandTotal || 0),
      },
      paymentMethod: paymentMethod || 'Cash on Delivery',
      paymentStatus: paymentStatus || 'Unpaid',
      transactionReference: transactionReference ? String(transactionReference).trim() : '',
      orderStatus: 'Pending',
      createdAt: new Date().toISOString(),
    })

    // 4. Non-blocking Background Transactional Email Notifications
    const emailPayload = {
      orderId: doc._id,
      orderNumber: doc.orderNumber,
      customerName: doc.customerName,
      phone: doc.phone,
      email: doc.email,
      deliveryAddress: doc.deliveryAddress,
      city: doc.city,
      packageDetails: doc.packageDetails,
      pricingSummary: doc.pricingSummary,
      paymentMethod: doc.paymentMethod,
      paymentStatus: doc.paymentStatus,
      transactionReference: doc.transactionReference,
      createdAt: doc.createdAt,
    }

    ;(async () => {
      try {
        await Promise.allSettled([
          sendCustomerOrderConfirmation(emailPayload),
          sendAdminOrderNotification(emailPayload),
        ])
      } catch (emailErr) {
        console.error('[Background Email Error] Failed to send order emails:', emailErr)
      }
    })()

    // 5. Return success response
    return NextResponse.json({
      success: true,
      orderId: doc._id,
      orderNumber: doc.orderNumber,
    })
  } catch (error: any) {
    console.error('Failed to create order in Sanity:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'An error occurred while submitting your order.',
      },
      { status: 500 }
    )
  }
}
