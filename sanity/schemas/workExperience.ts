import { defineType, defineField } from 'sanity'
import { BriefcaseIcon } from '@sanity/icons'

export const workExperience = defineType({
  name: 'workExperience',
  title: 'Work Experience',
  type: 'document',
  icon: BriefcaseIcon,
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
      title: 'Description',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'responsibilities',
      title: 'Responsibilities',
      type: 'array',
      of: [{ type: 'string' }],
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
