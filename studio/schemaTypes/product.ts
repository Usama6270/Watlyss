import { defineField, defineType, defineArrayMember } from 'sanity'
import { DocumentIcon } from '@sanity/icons/Document'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'secondaryImage',
      title: 'Secondary Image (Hover)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'price',
      title: 'Price ($)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'stock',
      title: 'Stock Quantity',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
      initialValue: 100,
    }),
    defineField({
      name: 'pH',
      title: 'pH Level',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(14),
    }),
    defineField({
      name: 'capacity',
      title: 'Capacity',
      type: 'string',
      description: 'e.g. 500ml, 750ml, 1L',
    }),
    defineField({
      name: 'material',
      title: 'Material',
      type: 'string',
      description: 'e.g. Glass, BPA-Free Tritan, Stainless Steel',
    }),
    defineField({
      name: 'minerals',
      title: 'Mineral Content',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      description: 'e.g. Calcium (15mg/L), Magnesium (5mg/L)',
    }),
    defineField({
      name: 'idealUse',
      title: 'Ideal Use',
      type: 'string',
      options: {
        list: [
          { title: 'Daily hydration', value: 'daily' },
          { title: 'Sports & Active', value: 'sports' },
          { title: 'Kids & Family', value: 'kids' },
        ],
      },
    }),
    defineField({
      name: 'isComingSoon',
      title: 'Coming Soon Teaser',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'variants',
      title: 'Product Variants',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'name', type: 'string', title: 'Variant Name' }),
            defineField({ name: 'image', type: 'image', title: 'Variant Image' }),
            defineField({ name: 'price', type: 'number', title: 'Price' }),
            defineField({ name: 'capacity', type: 'string', title: 'Capacity' }),
            defineField({ name: 'pH', type: 'number', title: 'pH Level' }),
          ],
        }),
      ],
    }),
  ],
})
