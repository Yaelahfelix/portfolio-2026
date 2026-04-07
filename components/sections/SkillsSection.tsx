'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Skill {
  _id: string
  name: string
  category: string
  proficiency: number
  icon?: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const skillBarVariants = {
  hidden: { width: 0 },
  visible: (proficiency: number) => ({
    width: `${proficiency}%`,
    transition: { duration: 1.5, ease: 'easeOut' },
  }),
}

interface SkillsSectionProps {
  skills: Skill[]
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const [inView, setInView] = useState(false)
  const categories = ['frontend', 'backend', 'tools', 'database']

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Skills & Expertise
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and proficiency levels
          </p>
        </motion.div>

        {/* Skills by category */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categories.map((category) => {
            const categorySkills = skills.filter((s) => s.category === category)
            if (categorySkills.length === 0) return null

            const categoryLabel = {
              frontend: 'Frontend Development',
              backend: 'Backend Development',
              tools: 'Tools & DevOps',
              database: 'Database & Storage',
            }[category]

            return (
              <motion.div
                key={category}
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  {categoryLabel}
                </h3>
                <div className="space-y-5">
                  {categorySkills.map((skill) => (
                    <motion.div
                      key={skill._id}
                      whileHover={{ scale: 1.02 }}
                      className="group"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          {skill.name}
                        </span>
                        <motion.span
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="text-sm text-blue-600 dark:text-blue-400 font-semibold"
                        >
                          {skill.proficiency}%
                        </motion.span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-blue-600 to-blue-400"
                          custom={skill.proficiency}
                          variants={skillBarVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
