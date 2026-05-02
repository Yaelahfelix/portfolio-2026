import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'education',
  title: 'Education',
  type: 'document',
  fields: [
    defineField({
      name: 'school',
      title: 'School / University',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'degree',
      title: 'Degree',
      type: 'string',
      description: 'e.g., Bachelor of Science, Master of Technology',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'field',
      title: 'Field of Study',
      type: 'string',
      description: 'e.g., Computer Science, Information Technology',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      description: 'Leave empty if still studying',
    }),
    defineField({
      name: 'description',
      title: 'Description (English)',
      type: 'text',
      description: 'Highlights, GPA, relevant coursework, etc.',
    }),
    defineField({
      name: 'description_id',
      title: 'Description (Indonesian)',
      type: 'text',
      description: 'Terjemahan deskripsi dalam Bahasa Indonesia',
    }),
    defineField({
      name: 'gpa',
      title: 'GPA',
      type: 'string',
      description: 'e.g., 3.8/4.0',
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
      title: 'degree',
      subtitle: 'school',
    },
  },
})
