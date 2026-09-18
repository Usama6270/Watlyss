import { Resend } from 'resend'

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY || 're_fallback_key')

export interface OrderEmailData {
  orderId?: string
  orderNumber: string
  customerName: string
  phone: string
  email?: string
  deliveryAddress: string
  city?: string
  packageDetails?: {
    bottleQty?: number
    frequency?: string
    customerSegment?: string
  }
  pricingSummary?: {
    basePrice?: number
    subtotal?: number
    appliedDiscountPercentage?: number
    appliedCoupon?: string
    couponDiscountAmount?: number
    deliveryFee?: number
    grandTotal?: number
  }
  paymentMethod?: string
  paymentStatus?: string
  transactionReference?: string
  createdAt?: string
  items?: Array<{
    title: string
    quantity: number
    price: number
  }>
}

/**
 * Sends a branded Customer Order Confirmation Receipt via Resend.
 */
export async function sendCustomerOrderConfirmation(orderData: OrderEmailData) {
  const customerEmail = orderData.email || orderData.email
  if (!customerEmail || !customerEmail.includes('@')) {
    console.log(`[Email Dispatch] Skipped customer confirmation email: No valid email provided for order ${orderData.orderNumber}`)
    return { success: false, reason: 'No customer email provided' }
  }

  const fromEmail = process.env.EMAIL_FROM || 'Watlys Hydration <onboarding@resend.dev>'
  const orderDateStr = orderData.createdAt
    ? new Date(orderData.createdAt).toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : new Date().toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })

  const bottleQty = orderData.packageDetails?.bottleQty || (orderData.items ? orderData.items.reduce((s, i) => s + i.quantity, 0) : 1)
  const basePrice = orderData.pricingSummary?.basePrice || 320
  const subtotal = orderData.pricingSummary?.subtotal || bottleQty * basePrice
  const deliveryFee = orderData.pricingSummary?.deliveryFee ?? 100
  const discountPct = orderData.pricingSummary?.appliedDiscountPercentage || 0
  const couponDiscount = orderData.pricingSummary?.couponDiscountAmount || 0
  const couponCode = orderData.pricingSummary?.appliedCoupon || ''
  const grandTotal = orderData.pricingSummary?.grandTotal || (subtotal + deliveryFee - couponDiscount)

  const trackingUrl = process.env.NEXT_PUBLIC_APP_URL
    ? `${process.env.NEXT_PUBLIC_APP_URL}/account`
    : 'https://watlyss.vercel.app/account'

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation - Watlys</title>
      <style>
        body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f7fa; color: #1e293b; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
        .header { background: linear-gradient(135deg, #0066FF 0%, #0044B3 100%); padding: 36px 32px; text-align: center; color: #ffffff; }
        .header h1 { margin: 0 0 8px 0; font-size: 26px; font-weight: 800; letter-spacing: -0.5px; }
        .header p { margin: 0; font-size: 14px; opacity: 0.9; }
        .logo-badge { display: inline-block; background: rgba(255,255,255,0.2); padding: 4px 14px; border-radius: 20px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 12px; }
        .content { padding: 32px; }
        .card { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 24px; }
        .card-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #0066FF; margin-bottom: 12px; }
        .detail-row { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px; }
        .detail-label { color: #64748b; font-weight: 500; }
        .detail-value { color: #0f172a; font-weight: 600; text-align: right; }
        .table { width: 100%; border-collapse: collapse; margin-top: 16px; }
        .table th { text-align: left; padding: 10px 12px; background-color: #f1f5f9; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: #475569; }
        .table td { padding: 12px; border-bottom: 1px solid #e2e8f0; font-size: 14px; }
        .total-row { background-color: #eef6ff; font-weight: 700; }
        .total-row td { border-bottom: none; font-size: 16px; color: #0066FF; }
        .btn-container { text-align: center; margin: 32px 0 20px 0; }
        .btn { display: inline-block; background-color: #0066FF; color: #ffffff !important; font-weight: 700; font-size: 15px; padding: 14px 32px; border-radius: 10px; text-decoration: none; box-shadow: 0 4px 14px rgba(0, 102, 255, 0.35); }
        .footer { background-color: #0f172a; color: #94a3b8; text-align: center; padding: 24px 32px; font-size: 13px; line-height: 1.6; }
        .footer strong { color: #ffffff; }
      </style>
    </head>
    <body>
      <div style="padding: 20px 0;">
        <div class="container">
          <!-- Header -->
          <div class="header">
            <div class="logo-badge">Watlys Hydration</div>
            <h1>Thank You for Your Order!</h1>
            <p>Your order has been placed successfully and is being processed.</p>
          </div>

          <!-- Content -->
          <div class="content">
            <!-- Order Details Card -->
            <div class="card">
              <div class="card-title">Order Information</div>
              <table style="width: 100%;">
                <tr>
                  <td class="detail-label" style="padding: 4px 0;">Order ID:</td>
                  <td class="detail-value" style="padding: 4px 0;"><strong>${orderData.orderNumber}</strong></td>
                </tr>
                <tr>
                  <td class="detail-label" style="padding: 4px 0;">Order Date:</td>
                  <td class="detail-value" style="padding: 4px 0;">${orderDateStr}</td>
                </tr>
                <tr>
                  <td class="detail-label" style="padding: 4px 0;">Customer Name:</td>
                  <td class="detail-value" style="padding: 4px 0;">${orderData.customerName}</td>
                </tr>
                <tr>
                  <td class="detail-label" style="padding: 4px 0;">Phone Number:</td>
                  <td class="detail-value" style="padding: 4px 0;">${orderData.phone}</td>
                </tr>
                <tr>
                  <td class="detail-label" style="padding: 4px 0;">Delivery Address:</td>
                  <td class="detail-value" style="padding: 4px 0;">${orderData.deliveryAddress}, ${orderData.city || 'Islamabad/Rawalpindi'}</td>
                </tr>
              </table>
            </div>

            <!-- Pricing Breakdown -->
            <div style="margin-bottom: 24px;">
              <div class="card-title">Pricing & Items Breakdown</div>
              <table class="table">
                <thead>
                  <tr>
                    <th>Item / Description</th>
                    <th style="text-align: center;">Qty</th>
                    <th style="text-align: right;">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  ${
                    orderData.items && orderData.items.length > 0
                      ? orderData.items
                          .map(
                            (item) => `
                        <tr>
                          <td><strong>${item.title}</strong></td>
                          <td style="text-align: center;">${item.quantity}</td>
                          <td style="text-align: right;">PKR ${(item.price * item.quantity).toLocaleString()}</td>
                        </tr>
                      `
                          )
                          .join('')
                      : `
                        <tr>
                          <td><strong>19L Refill Mineral Water Bottle</strong><br><span style="font-size: 11px; color: #64748b;">Rate: PKR ${basePrice} per bottle</span></td>
                          <td style="text-align: center;">${bottleQty}</td>
                          <td style="text-align: right;">PKR ${subtotal.toLocaleString()}</td>
                        </tr>
                      `
                  }
                  <tr>
                    <td colspan="2" style="text-align: right; color: #64748b;">Subtotal:</td>
                    <td style="text-align: right; font-weight: 600;">PKR ${subtotal.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td colspan="2" style="text-align: right; color: #64748b;">Delivery Fee:</td>
                    <td style="text-align: right; font-weight: 600;">PKR ${deliveryFee.toLocaleString()}</td>
                  </tr>
                  ${
                    discountPct > 0 || couponDiscount > 0
                      ? `
                    <tr>
                      <td colspan="2" style="text-align: right; color: #16a34a;">Applied Discount ${couponCode ? `(${couponCode})` : ''}:</td>
                      <td style="text-align: right; font-weight: 600; color: #16a34a;">- PKR ${(couponDiscount || Math.round(subtotal * (discountPct / 100))).toLocaleString()}</td>
                    </tr>
                  `
                      : ''
                  }
                  <tr class="total-row">
                    <td colspan="2" style="text-align: right;">Grand Total (PKR):</td>
                    <td style="text-align: right;">PKR ${grandTotal.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Action Button -->
            <div class="btn-container">
              <a href="${trackingUrl}" class="btn">Track Your Order</a>
            </div>
          </div>

          <!-- Footer -->
          <div class="footer">
            <p style="margin: 0 0 8px 0;"><strong>Pure Mineral Water Delivered To Your Doorstep</strong></p>
            <p style="margin: 0; font-size: 12px;">Need assistance? Contact support at support@watlys.com | +92 300 1234567</p>
            <p style="margin: 12px 0 0 0; font-size: 11px; opacity: 0.6;">© ${new Date().getFullYear()} Watlys Ultra-Pure Water. All rights reserved.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: customerEmail,
      subject: `Order Confirmation - #${orderData.orderNumber}`,
      html: htmlContent,
    })

    if (error) {
      console.warn(`[Resend API Error for ${customerEmail}]:`, error)
      // Resend free/testing tier only allows sending to the account owner's email address
      if (error.message?.includes('only send testing emails to your own email address') || (error as any).statusCode === 403) {
        const adminFallback = process.env.ADMIN_EMAIL || 'i222499@nu.edu.pk'
        console.log(`[Email Dispatch Test Fallback] Retrying customer email dispatch to owner email (${adminFallback})...`)
        const fallbackRes = await resend.emails.send({
          from: fromEmail,
          to: adminFallback,
          subject: `[TEST MODE - Customer Copy for ${customerEmail}] Order Confirmation - #${orderData.orderNumber}`,
          html: htmlContent,
        })
        if (fallbackRes.data) {
          return { success: true, id: fallbackRes.data.id, note: 'Redirected to admin email due to Resend testing tier domain restrictions' }
        }
      }
      return { success: false, error: error.message }
    }

    console.log(`[Email Dispatch] Successfully sent order confirmation email to ${customerEmail}. Resend ID: ${data?.id || 'OK'}`)
    return { success: true, id: data?.id }
  } catch (err: any) {
    console.error(`[Email Dispatch Error] Failed to send customer confirmation email to ${customerEmail}:`, err.message || err)
    return { success: false, error: err.message || 'Resend provider error' }
  }
}

/**
 * Sends a high-visibility Admin Notification Alert to the Watlys fulfillment team via Resend.
 */
export async function sendAdminOrderNotification(orderData: OrderEmailData) {
  const adminEmail = process.env.ADMIN_EMAIL || 'orders@watlys.com'
  const fromEmail = process.env.EMAIL_FROM || 'Watlys Hydration <onboarding@resend.dev>'

  const bottleQty = orderData.packageDetails?.bottleQty || (orderData.items ? orderData.items.reduce((s, i) => s + i.quantity, 0) : 1)
  const frequency = orderData.packageDetails?.frequency || 'Standard Delivery'
  const grandTotal = orderData.pricingSummary?.grandTotal || 0
  const paymentMethod = orderData.paymentMethod || 'Cash on Delivery'

  const subject = `🚨 [NEW ORDER] - Order #${orderData.orderNumber} (${orderData.customerName})`

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>New Order Alert - Watlys Fulfillments</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif; background-color: #0f172a; color: #f8fafc; padding: 20px; }
        .card { max-width: 580px; margin: 0 auto; background-color: #1e293b; border: 2px solid #0066FF; border-radius: 12px; overflow: hidden; }
        .banner { background-color: #0066FF; color: #ffffff; padding: 16px 20px; font-size: 18px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; }
        .body { padding: 24px; }
        .row { margin-bottom: 14px; border-bottom: 1px solid #334155; padding-bottom: 10px; }
        .row:last-child { border-bottom: none; }
        .label { color: #94a3b8; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
        .value { color: #f8fafc; font-size: 15px; font-weight: 600; }
        .highlight { color: #38bdf8; font-size: 18px; font-weight: 800; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="banner">🚨 NEW ORDER ALERT: #${orderData.orderNumber}</div>
        <div class="body">
          <div class="row">
            <div class="label">Customer Name</div>
            <div class="value">${orderData.customerName}</div>
          </div>
          <div class="row">
            <div class="label">Contact Phone</div>
            <div class="value"><a href="tel:${orderData.phone}" style="color: #38bdf8; text-decoration: none;">${orderData.phone}</a> ${orderData.email ? `(${orderData.email})` : ''}</div>
          </div>
          <div class="row">
            <div class="label">Full Delivery Address</div>
            <div class="value">${orderData.deliveryAddress}, ${orderData.city || 'Islamabad/Rawalpindi'}</div>
          </div>
          <div class="row">
            <div class="label">Order Package Specs</div>
            <div class="value"><strong>${bottleQty} × 19L Bottles</strong> (${frequency})</div>
          </div>
          <div class="row">
            <div class="label">Payment Method</div>
            <div class="value" style="color: #f59e0b;">${paymentMethod} (${orderData.paymentStatus || 'Pending'})</div>
          </div>
          <div class="row">
            <div class="label">Grand Total Amount</div>
            <div class="value highlight">PKR ${grandTotal.toLocaleString()}</div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: adminEmail,
      subject: subject,
      html: htmlContent,
    })

    if (error) {
      console.error(`[Admin Alert Error] Failed to send admin alert to ${adminEmail}:`, error.message || error)
      return { success: false, error: error.message }
    }

    console.log(`[Admin Alert] Successfully dispatched order alert to admin (${adminEmail}). Resend ID: ${data?.id || 'OK'}`)
    return { success: true, id: data?.id }
  } catch (err: any) {
    console.error(`[Admin Alert Error] Failed to send admin alert to ${adminEmail}:`, err.message || err)
    return { success: false, error: err.message || 'Resend admin notification error' }
  }
}
