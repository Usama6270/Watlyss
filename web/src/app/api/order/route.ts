import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'
import { sendCustomerOrderConfirmation, sendAdminOrderNotification } from '@/lib/email'
import {
  calculateCustomPlan,
  type CustomerPackageId,
  type DurationId,
  type LocationId,
} from '@/lib/pricing/custom-plan'

function mapSegmentToPackageId(segment: string): CustomerPackageId {
  const s = (segment || '').toLowerCase()
  if (s.includes('single')) return 'family'
  if (s.includes('student')) return 'student'
  if (s.includes('corporate')) return 'corporate'
  return 'family'
}

function mapDurationId(
  durationId?: string,
  weeks?: number,
  frequency?: string
): DurationId {
  if (durationId === '1w' || durationId === '2w' || durationId === '3w' || durationId === '1m') {
    return durationId
  }
  if (weeks === 1) return '1w'
  if (weeks === 2) return '2w'
  if (weeks === 3) return '3w'
  if (weeks === 4) return '1m'
  const f = (frequency || '').toLowerCase()
  if (f.includes('1 week') || f === 'weekly' || f === 'one-time') return '1w'
  if (f.includes('2 week') || f.includes('bi')) return '2w'
  if (f.includes('3 week')) return '3w'
  if (f.includes('month') || f.includes('4 week')) return '1m'
  return '1w'
}

function mapLocationId(locationId?: string, city?: string): LocationId {
  if (
    locationId === 'lahore' ||
    locationId === 'islamabad' ||
    locationId === 'rawalpindi' ||
    locationId === 'sialkot' ||
    locationId === 'other'
  ) {
    return locationId
  }
  const c = (city || '').toLowerCase()
  if (c.includes('sialkot')) return 'sialkot'
  if (c.includes('rawalpindi') && !c.includes('islamabad')) return 'rawalpindi'
  if (c.includes('islamabad') || c.includes('rawalpindi')) return 'islamabad'
  if (c.includes('lahore')) return 'lahore'
  return 'other'
}

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

    // Authoritative recalculation — never trust client totals alone
    const bottleQty = Number(packageDetails.bottleQty || 1)
    const packageId =
      (packageDetails.packageId as CustomerPackageId) ||
      mapSegmentToPackageId(packageDetails.customerSegment || 'Family / Individual')
    const durationId = mapDurationId(
      packageDetails.durationId,
      Number(packageDetails.weeks) || undefined,
      packageDetails.frequency
    )
    const locationId = mapLocationId(packageDetails.locationId, city)

    const plan = calculateCustomPlan({
      packageId,
      bottlesPerWeek: bottleQty,
      durationId,
      locationId,
    })

    if (plan.validationErrors.length > 0) {
      return NextResponse.json(
        { success: false, error: plan.validationErrors[0] },
        { status: 400 }
      )
    }

    const couponDiscountAmount = Math.max(
      0,
      Number(body.couponDiscountAmount || pricingSummary.couponDiscountAmount || 0)
    )
    // Cap coupon at 5% of product (never on deposit)
    const maxCoupon = Math.round(plan.productSubtotal * 0.05)
    const safeCoupon = Math.min(couponDiscountAmount, maxCoupon)
    const grandTotal = Math.max(0, plan.totalPayable - safeCoupon)

    const randomSuffix = Math.floor(1000 + Math.random() * 9000).toString()
    const orderNumber = `WAT-2026-${randomSuffix}`

    const doc = await writeClient.create({
      _type: 'order',
      orderNumber,
      customerName: customerName.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : '',
      deliveryAddress: deliveryAddress.trim(),
      city: city || plan.location.name,
      packageDetails: {
        bottleQty: plan.bottlesPerWeek,
        frequency: plan.duration.name,
        customerSegment: plan.packagesUnlocked
          ? plan.package?.name ?? 'Family / Individual'
          : 'Single Bottle',
        weeks: plan.weeks,
        durationId: plan.selection.durationId,
        packageId: plan.packagesUnlocked ? plan.selection.packageId : undefined,
        locationId: plan.selection.locationId,
        totalBottles: plan.totalBottles,
        packagesUnlocked: plan.packagesUnlocked,
      },
      pricingSummary: {
        basePrice: plan.refillUnitPrice,
        firstFillUnitPrice: plan.firstFillUnitPrice,
        firstFillSubtotal: plan.firstFillSubtotal,
        refillUnitPrice: plan.refillUnitPrice,
        refillSubtotal: plan.refillSubtotal,
        productSubtotal: plan.productSubtotal,
        subtotal: plan.undiscountedProductSubtotal,
        appliedDiscountPercentage: Math.round(plan.combinedDiscountRate * 100),
        customerDiscountAmount: plan.customerDiscountAmount,
        durationDiscountAmount: plan.durationDiscountAmount,
        securityDeposit: plan.securityDeposit,
        appliedCoupon: body.appliedCoupon || pricingSummary.appliedCoupon || '',
        couponDiscountAmount: safeCoupon,
        deliveryFee: plan.deliverySubtotal,
        estimatedMonthlyCost: plan.estimatedMonthlyCost,
        totalSavings: plan.totalSavings,
        grandTotal,
      },
      paymentMethod: paymentMethod || 'Cash on Delivery',
      paymentStatus: paymentStatus || 'Unpaid',
      transactionReference: transactionReference ? String(transactionReference).trim() : '',
      orderStatus: 'Pending',
      createdAt: new Date().toISOString(),
    })

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

    return NextResponse.json({
      success: true,
      orderId: doc._id,
      orderNumber: doc.orderNumber,
      pricing: {
        grandTotal,
        totalBottles: plan.totalBottles,
        refillUnitPrice: plan.refillUnitPrice,
      },
    })
  } catch (error: unknown) {
    console.error('Failed to create order in Sanity:', error)
    const message =
      error instanceof Error
        ? error.message
        : 'An error occurred while submitting your order.'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
