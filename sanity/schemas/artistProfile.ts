import { defineType, defineField } from 'sanity';

export const artistProfile = defineType({
  name: 'artistProfile',
  title: 'Artist Profile',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'One-line artistic statement',
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
      rows: 8,
    }),
    defineField({
      name: 'processDescription',
      title: 'Process Description',
      type: 'text',
      rows: 6,
      description: 'How you create your art — your process and inspiration',
    }),
    defineField({
      name: 'photo',
      title: 'Artist Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'studioPhotos',
      title: 'Studio Photos',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook URL',
      type: 'url',
    }),
  ],
  preview: {
    select: { title: 'name', media: 'photo' },
  },
});
