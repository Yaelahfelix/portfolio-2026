import { defineType, defineField } from 'sanity'

const workExperience = defineType({
  name: 'workExperience',
  title: 'Work Experience',
  type: 'document',
  fields: [
    defineField({
      name: 'company',
      title: 'Company Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'position',
      title: 'Position',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
    }),
    defineField({
      name: 'isCurrent',
      title: 'Currently Working Here',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'description',
      title: 'Description (English)',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description_id',
      title: 'Description (Indonesian)',
      type: 'text',
      description: 'Terjemahan deskripsi dalam Bahasa Indonesia',
    }),
    defineField({
      name: 'responsibilities',
      title: 'Responsibilities (English)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'responsibilities_id',
      title: 'Responsibilities (Indonesian)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Terjemahan tanggung jawab dalam Bahasa Indonesia',
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies Used',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'position',
      subtitle: 'company',
    },
  },
})

export default workExperience
