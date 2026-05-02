import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'achievement',
  title: 'Achievement',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Achievement Title (English)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title_id',
      title: 'Achievement Title (Indonesian)',
      type: 'string',
      description: 'Terjemahan judul pencapaian dalam Bahasa Indonesia',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'e.g., Award, Certification, Publication, Speaking',
      options: {
        list: [
          { title: 'Award', value: 'award' },
          { title: 'Certification', value: 'certification' },
          { title: 'Publication', value: 'publication' },
          { title: 'Speaking', value: 'speaking' },
          { title: 'Recognition', value: 'recognition' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'issuer',
      title: 'Issuing Organization',
      type: 'string',
      description: 'Organization that issued the award/certification',
    }),
    defineField({
      name: 'date',
      title: 'Date Achieved',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description (English)',
      type: 'text',
      description: 'Details about the achievement',
    }),
    defineField({
      name: 'description_id',
      title: 'Description (Indonesian)',
      type: 'text',
      description: 'Terjemahan deskripsi dalam Bahasa Indonesia',
    }),
    defineField({
      name: 'icon',
      title: 'Icon / Emoji',
      type: 'string',
      description: 'Optional icon or emoji to represent this achievement',
    }),
    defineField({
      name: 'link',
      title: 'External Link',
      type: 'url',
      description: 'Link to certificate or more details',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Achievement',
      type: 'boolean',
      description: 'Show this achievement prominently',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      validation: (Rule) => Rule.min(0),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'issuer',
    },
  },
})
