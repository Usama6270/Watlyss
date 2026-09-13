import { defineField, defineType, defineArrayMember } from 'sanity'
import { UserIcon } from '@sanity/icons/User'

export const customer = defineType({
  name: 'customer',
  title: 'Customer',
  type: 'document',
  icon: UserIcon,


  fields: [
    defineField({
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number (Primary Key / Unique ID)',
      type: 'string',
      description: 'Unique identifier for customer account & SMS verification',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'password',
      title: 'Account Password',
      type: 'string',
      hidden: false,
    }),

    defineField({
      name: 'addressList',
      title: 'Saved Delivery Addresses',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'savedAddress',
          title: 'Saved Address',
          fields: [
            defineField({ name: 'addressLabel', type: 'string', title: 'Address Label (e.g. Home, Office)' }),
            defineField({ name: 'street', type: 'string', title: 'Street Address' }),
            defineField({ name: 'city', type: 'string', title: 'City' }),
            defineField({ name: 'postalCode', type: 'string', title: 'Postal Code' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'activeSubscription',
      title: 'Active 19L Bottle Subscription',
      type: 'object',
      fields: [
        defineField({ name: 'packageType', type: 'string', title: 'Package Type (e.g., Student, Family, Corporate)' }),
        defineField({
          name: 'frequency',
          type: 'string',
          title: 'Delivery Frequency',
          options: {
            list: [
              { title: 'Weekly', value: 'weekly' },
              { title: 'Bi-Weekly', value: 'bi-weekly' },
              { title: 'Monthly', value: 'monthly' },
            ],
          },
        }),
        defineField({ name: 'bottleQty', type: 'number', title: '19L Bottle Quantity' }),
        defineField({
          name: 'status',
          type: 'string',
          title: 'Subscription Status',
          options: {
            list: [
              { title: 'Active', value: 'active' },
              { title: 'Paused', value: 'paused' },
              { title: 'Cancelled', value: 'cancelled' },
            ],
          },
          initialValue: 'active',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'fullName',
      subtitle: 'phone',
    },
  },
})
