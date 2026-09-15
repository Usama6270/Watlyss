import { defineField, defineType } from 'sanity'
import { DocumentIcon } from '@sanity/icons/Document'

export const order = defineType({
  name: 'order',
  title: 'Order',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'orderNumber',
      title: 'Order Number',
      type: 'string',
      validation: (Rule) => Rule.required(),
      readOnly: false,
    }),
    defineField({
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
    }),
    defineField({
      name: 'deliveryAddress',
      title: 'Delivery Address',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      initialValue: 'Islamabad / Rawalpindi',
    }),
    defineField({
      name: 'packageDetails',
      title: 'Package Details',
      type: 'object',
      fields: [
        defineField({
          name: 'bottleQty',
          title: 'Bottle Quantity (19L)',
          type: 'number',
        }),
        defineField({
          name: 'frequency',
          title: 'Delivery Frequency',
          type: 'string',
          options: {
            list: [
              { title: 'Weekly', value: 'Weekly' },
              { title: 'Bi-Weekly', value: 'Bi-Weekly' },
              { title: 'Monthly', value: 'Monthly' },
              { title: 'One-Time', value: 'One-Time' },
            ],
          },
        }),
        defineField({
          name: 'customerSegment',
          title: 'Customer Segment',
          type: 'string',
          options: {
            list: [
              { title: 'Student', value: 'Student' },
              { title: 'Individual', value: 'Individual' },
              { title: 'Family', value: 'Family' },
              { title: 'Corporate', value: 'Corporate' },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'pricingSummary',
      title: 'Pricing Summary',
      type: 'object',
      fields: [
        defineField({
          name: 'basePrice',
          title: 'Base Price (PKR)',
          type: 'number',
          initialValue: 320,
        }),
        defineField({
          name: 'subtotal',
          title: 'Subtotal (PKR)',
          type: 'number',
        }),
        defineField({
          name: 'appliedDiscountPercentage',
          title: 'Applied Discount Percentage (%)',
          type: 'number',
        }),
        defineField({
          name: 'appliedCoupon',
          title: 'Applied Coupon Code',
          type: 'string',
        }),
        defineField({
          name: 'couponDiscountAmount',
          title: 'Coupon Discount Amount (PKR)',
          type: 'number',
        }),
        defineField({
          name: 'deliveryFee',
          title: 'Delivery Fee (PKR)',
          type: 'number',
          initialValue: 100,
        }),
        defineField({
          name: 'grandTotal',
          title: 'Grand Total (PKR)',
          type: 'number',
        }),
      ],
    }),
    defineField({
      name: 'paymentMethod',
      title: 'Payment Method',
      type: 'string',
      options: {
        list: [
          { title: 'Cash on Delivery', value: 'Cash on Delivery' },
          { title: 'Bank Transfer', value: 'Bank Transfer' },
          { title: 'Credit/Debit Card', value: 'Credit/Debit Card' },
        ],
      },
      initialValue: 'Cash on Delivery',
    }),
    defineField({
      name: 'paymentStatus',
      title: 'Payment Status',
      type: 'string',
      options: {
        list: [
          { title: 'Unpaid', value: 'Unpaid' },
          { title: 'Paid', value: 'Paid' },
          { title: 'Verification Pending', value: 'Verification Pending' },
          { title: 'Paused (No Charge)', value: 'PAUSED_NO_CHARGE' },
        ],
      },
      initialValue: 'Unpaid',
    }),
    defineField({
      name: 'subscriptionStatus',
      title: 'Subscription Status',
      type: 'string',
      options: {
        list: [
          { title: 'ACTIVE', value: 'ACTIVE' },
          { title: 'PAUSED', value: 'PAUSED' },
          { title: 'CANCELLED', value: 'CANCELLED' },
        ],
      },
      initialValue: 'ACTIVE',
    }),
    defineField({
      name: 'pauseStartDate',
      title: 'Pause Start Date',
      type: 'datetime',
    }),
    defineField({
      name: 'nextBillingDate',
      title: 'Next Billing Date',
      type: 'datetime',
    }),
    defineField({
      name: 'transactionReference',
      title: 'Transaction Reference / TRX ID',
      type: 'string',
    }),
    defineField({
      name: 'orderStatus',
      title: 'Order Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'Pending' },
          { title: 'Confirmed', value: 'Confirmed' },
          { title: 'Out for Delivery', value: 'Out for Delivery' },
          { title: 'Delivered', value: 'Delivered' },
          { title: 'Cancelled', value: 'Cancelled' },
        ],
      },
      initialValue: 'Pending',
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'orderNumber',
      subtitle: 'customerName',
      status: 'orderStatus',
      total: 'pricingSummary.grandTotal',
    },
    prepare(selection) {
      const { title, subtitle, status, total } = selection
      return {
        title: `${title || 'No Order #'} - ${subtitle || 'Anonymous'}`,
        subtitle: `Status: ${status || 'Pending'} | PKR ${total || 0}`,
      }
    },
  },
})
