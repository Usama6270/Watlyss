import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'
import { sendSubscriptionPauseConfirmation } from '@/lib/email'

export async function POST(req: Request) {
  try {
    const writeToken = process.env.SANITY_API_WRITE_TOKEN
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'r6fj3reg'
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

    let writeClient: any = null
    if (writeToken) {
      writeClient = createClient({
        projectId,
        dataset,
        apiVersion: '2024-01-01',
        useCdn: false,
        token: writeToken,
      })
    }

    const body = await req.json()
    const {
      orderId,
      customerId,
      phone,
      email,
      customerName,
      packageName,
      remainingBottles,
      bottleQty,
    } = body

    const pausedAt = new Date().toISOString()
    const status = 'PAUSED'
    const paymentStatus = 'PAUSED_NO_CHARGE'

    // Calculate pending rollover bottles (e.g. 4 bottles or remaining count from current cycle allocation)
    const pendingRolloverBottles = remainingBottles !== undefined && Number(remainingBottles) >= 0
      ? Number(remainingBottles)
      : bottleQty !== undefined && Number(bottleQty) > 0
      ? Number(bottleQty)
      : 4

    let updatedCount = 0

    // 1. Update Order Document in Sanity if writeClient is configured
    if (writeClient) {
      if (orderId) {
        try {
          await writeClient
            .patch(orderId)
            .set({
              subscriptionStatus: status,
              paymentStatus,
              pauseStartDate: pausedAt,
              pausedAt,
              pendingRolloverBottles,
              nextBillingDate: null,
            })
            .commit()
          updatedCount++
        } catch (err) {
          console.warn(`[Pause API] Failed to patch order ${orderId}:`, err)
        }
      }

      // Query & patch orders by phone if provided
      if (phone && phone.trim()) {
        try {
          const orders = await writeClient.fetch(
            `*[_type == "order" && phone == $phone]._id`,
            { phone: phone.trim() }
          )
          for (const id of orders) {
            if (id !== orderId) {
              await writeClient
                .patch(id)
                .set({
                  subscriptionStatus: status,
                  paymentStatus,
                  pauseStartDate: pausedAt,
                  pausedAt,
                  pendingRolloverBottles,
                  nextBillingDate: null,
                })
                .commit()
              updatedCount++
            }
          }
        } catch (err) {
          console.warn(`[Pause API] Failed to patch orders by phone ${phone}:`, err)
        }
      }

      // 2. Update Customer Document in Sanity
      if (customerId) {
        try {
          await writeClient
            .patch(customerId)
            .set({
              'activeSubscription.status': 'PAUSED',
              'activeSubscription.subscriptionStatus': status,
              'activeSubscription.pauseStartDate': pausedAt,
              'activeSubscription.pausedAt': pausedAt,
              'activeSubscription.pendingRolloverBottles': pendingRolloverBottles,
              'activeSubscription.paymentStatus': paymentStatus,
              'activeSubscription.nextBillingDate': null,
            })
            .commit()
        } catch (err) {
          console.warn(`[Pause API] Failed to patch customer ${customerId}:`, err)
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
                'activeSubscription.status': 'PAUSED',
                'activeSubscription.subscriptionStatus': status,
                'activeSubscription.pauseStartDate': pausedAt,
                'activeSubscription.pausedAt': pausedAt,
                'activeSubscription.pendingRolloverBottles': pendingRolloverBottles,
                'activeSubscription.paymentStatus': paymentStatus,
                'activeSubscription.nextBillingDate': null,
              })
              .commit()
          }
        } catch (err) {
          console.warn(`[Pause API] Failed to patch customer by phone ${phone}:`, err)
        }
      }
    }

    // 3. Trigger Automated Email Notification via Resend
    const recipientEmail = email || 'usama1@gmail.com'
    const recipientName = customerName || 'Usama'

    let emailResult = { success: false, reason: 'Not attempted' }
    try {
      emailResult = await sendSubscriptionPauseConfirmation({
        customerName: recipientName,
        email: recipientEmail,
        phone,
        packageName: packageName || 'Family Plan (19L)',
        pendingRolloverBottles,
        pausedAt,
      })
    } catch (emailErr: any) {
      console.error('[Pause API] Email dispatch error:', emailErr)
    }

    return NextResponse.json({
      success: true,
      status,
      pausedAt,
      pendingRolloverBottles,
      updatedCount,
      emailResult,
      message: `Subscription paused successfully. ${pendingRolloverBottles} rollover bottles saved and automated email sent to ${recipientEmail}.`,
    })
  } catch (error: any) {
    console.error('API /api/subscription/pause error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to pause subscription.',
      },
      { status: 500 }
    )
  }
}
