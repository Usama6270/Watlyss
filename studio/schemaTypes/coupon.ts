import { defineField, defineType } from 'sanity'
import { DocumentIcon } from '@sanity/icons/Document'

export const coupon = defineType({
  name: 'coupon',
  title: 'Coupon',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'code',
      title: 'Coupon Code',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'discountType',
      title: 'Discount Type',
      type: 'string',
      options: {
        list: [
          { title: 'Percentage (%)', value: 'percentage' },
          { title: 'Fixed Amount ($)', value: 'fixed' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'value',
      title: 'Discount Value',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
    }),
  ],
})
