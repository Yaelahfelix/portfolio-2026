import { defineType, defineField } from 'sanity'
import { TagIcon } from '@sanity/icons'

const skill = defineType({
  name: 'skill',
  title: 'Skill',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Skill Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Frontend', value: 'frontend' },
          { title: 'Backend', value: 'backend' },
          { title: 'Fullstack', value: 'fullstack' },
          { title: 'Tools & DevOps', value: 'tools' },
          { title: 'Database', value: 'database' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'proficiency',
      title: 'Proficiency Level',
      type: 'number',
      validation: (rule) => rule.required().min(0).max(100),
    }),
    defineField({
      name: 'icon',
      title: 'Icon URL',
      type: 'string',
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
      title: 'name',
      subtitle: 'category',
    },
  },
})

export default skill
