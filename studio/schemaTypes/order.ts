import { defineField, defineType, defineArrayMember } from 'sanity'
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
    }),
    defineField({
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'customerEmail',
      title: 'Customer Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'items',
      title: 'Ordered Items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'productId', type: 'string', title: 'Product ID' }),
            defineField({ name: 'title', type: 'string', title: 'Product Title' }),
            defineField({ name: 'quantity', type: 'number', title: 'Quantity' }),
            defineField({ name: 'price', type: 'number', title: 'Price Per Item' }),
          ],
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'total',
      title: 'Total Paid ($)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'paymentStatus',
      title: 'Payment Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Paid', value: 'paid' },
          { title: 'Failed', value: 'failed' },
        ],
      },
      initialValue: 'pending',
    }),
    defineField({
      name: 'status',
      title: 'Order Status',
      type: 'string',
      options: {
        list: [
          { title: 'Placed', value: 'placed' },
          { title: 'Packed', value: 'packed' },
          { title: 'Out for Delivery', value: 'out_for_delivery' },
          { title: 'Delivered', value: 'delivered' },
          { title: 'Cancelled', value: 'cancelled' },
          { title: 'Refunded', value: 'refunded' },
        ],
      },
      initialValue: 'placed',
    }),
    defineField({
      name: 'shippingAddress',
      title: 'Shipping Address',
      type: 'object',
      fields: [
        defineField({ name: 'line1', type: 'string', title: 'Address Line 1' }),
        defineField({ name: 'line2', type: 'string', title: 'Address Line 2' }),
        defineField({ name: 'city', type: 'string', title: 'City' }),
        defineField({ name: 'state', type: 'string', title: 'State' }),
        defineField({ name: 'postalCode', type: 'string', title: 'Postal Code' }),
        defineField({ name: 'country', type: 'string', title: 'Country' }),
      ],
    }),
    defineField({
      name: 'paymentMethod',
      title: 'Payment Method',
      type: 'string',
      options: {
        list: [
          { title: 'Stripe', value: 'stripe' },
          { title: 'JazzCash', value: 'jazzcash' },
          { title: 'EasyPaisa', value: 'easypaisa' },
        ],
      },
    }),
  ],
})
