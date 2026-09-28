import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'
import { sendSubscriptionPauseConfirmation } from '@/lib/email'

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
    const { orderId, customerId, phone, email, customerName, remainingBottles, action } = body

    if (!action || (action !== 'PAUSE' && action !== 'RESUME')) {
      return NextResponse.json(
        { success: false, error: 'Invalid action. Must be "PAUSE" or "RESUME".' },
        { status: 400 }
      )
    }

    const isPause = action === 'PAUSE'
    const subscriptionStatus = isPause ? 'PAUSED' : 'ACTIVE'
    const paymentStatus = isPause ? 'PAUSED_NO_CHARGE' : 'Paid'
    const pauseStartDate = isPause ? new Date().toISOString() : null
    const pendingRolloverBottles = isPause
      ? remainingBottles !== undefined && Number(remainingBottles) >= 0
        ? Number(remainingBottles)
        : 4
      : 0
    const nextBillingDate = isPause
      ? null
      : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()

    let updatedCount = 0

    // 1. Patch specific Order if orderId is supplied
    if (orderId) {
      try {
        await writeClient
          .patch(orderId)
          .set({
            subscriptionStatus,
            paymentStatus,
            pauseStartDate,
            pausedAt: pauseStartDate,
            pendingRolloverBottles,
            nextBillingDate,
          })
          .commit()
        updatedCount++
      } catch (err) {
        console.warn(`Failed to patch order by orderId ${orderId}:`, err)
      }
    }

    // 2. Query & Patch Orders by Phone Number if supplied
    if (phone && phone.trim()) {
      try {
        const cleanPhone = phone.trim()
        const orders = await writeClient.fetch(
          `*[_type == "order" && phone == $phone]._id`,
          { phone: cleanPhone }
        )

        for (const id of orders) {
          if (id !== orderId) {
            await writeClient
              .patch(id)
              .set({
                subscriptionStatus,
                paymentStatus,
                pauseStartDate,
                pausedAt: pauseStartDate,
                pendingRolloverBottles,
                nextBillingDate,
              })
              .commit()
            updatedCount++
          }
        }
      } catch (err) {
        console.warn(`Failed to patch orders by phone ${phone}:`, err)
      }
    }

    // 3. Patch Customer document if customerId or phone is supplied
    if (customerId) {
      try {
        await writeClient
          .patch(customerId)
          .set({
            'activeSubscription.status': isPause ? 'PAUSED' : 'ACTIVE',
            'activeSubscription.subscriptionStatus': subscriptionStatus,
            'activeSubscription.pauseStartDate': pauseStartDate,
            'activeSubscription.pausedAt': pauseStartDate,
            'activeSubscription.pendingRolloverBottles': pendingRolloverBottles,
            'activeSubscription.nextBillingDate': nextBillingDate,
            'activeSubscription.paymentStatus': isPause ? 'PAUSED_NO_CHARGE' : 'PAID',
          })
          .commit()
      } catch (err) {
        console.warn(`Failed to patch customer by customerId ${customerId}:`, err)
      }
    } else if (phone && phone.trim()) {
      try {
        const customers = await writeClient.fetch(
          `*[_type == "customer" && phone == $phone]._id`,
          { phone: phone.trim() }
        )
        for (const cId of customers) {
          await writeClient
            .patch(cId)
            .set({
              'activeSubscription.status': isPause ? 'PAUSED' : 'ACTIVE',
              'activeSubscription.subscriptionStatus': subscriptionStatus,
              'activeSubscription.pauseStartDate': pauseStartDate,
              'activeSubscription.pausedAt': pauseStartDate,
              'activeSubscription.pendingRolloverBottles': pendingRolloverBottles,
              'activeSubscription.nextBillingDate': nextBillingDate,
              'activeSubscription.paymentStatus': isPause ? 'PAUSED_NO_CHARGE' : 'PAID',
            })
            .commit()
        }
      } catch (err) {
        console.warn(`Failed to patch customer by phone ${phone}:`, err)
      }
    }

    // Trigger automated email if action is PAUSE
    let emailResult = null
    if (isPause) {
      const recipientEmail = email || 'usama1@gmail.com'
      const recipientName = customerName || 'Usama'
      try {
        emailResult = await sendSubscriptionPauseConfirmation({
          customerName: recipientName,
          email: recipientEmail,
          phone,
          packageName: 'Family Plan (19L)',
          pendingRolloverBottles,
          pausedAt: pauseStartDate || new Date().toISOString(),
        })
      } catch (e: any) {
        console.error('Failed to send pause email:', e)
      }
    }

    return NextResponse.json({
      success: true,
      action,
      subscriptionStatus,
      paymentStatus,
      pauseStartDate,
      pendingRolloverBottles,
      nextBillingDate,
      updatedCount,
      emailResult,
    })
  } catch (error: any) {
    console.error('API /api/subscription/toggle error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to toggle subscription in Sanity.',
      },
      { status: 500 }
    )
  }
}
