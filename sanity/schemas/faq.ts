import { defineType, defineField } from 'sanity';

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Purchasing', value: 'purchasing' },
          { title: 'Commissions', value: 'commissions' },
          { title: 'Shipping', value: 'shipping' },
          { title: 'About the Artist', value: 'about' },
          { title: 'General', value: 'general' },
        ],
      },
    }),
  ],
  preview: {
    select: { title: 'question', subtitle: 'category' },
  },
});
