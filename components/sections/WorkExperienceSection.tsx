'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface WorkExp {
  _id: string
  company: string
  position: string
  startDate: string
  endDate?: string
  isCurrent: boolean
  description: string
  responsibilities?: string[]
  technologies?: string[]
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6 },
  },
}

interface WorkExperienceSectionProps {
  experiences: WorkExp[]
}

export function WorkExperienceSection({ experiences }: WorkExperienceSectionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Work Experience
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Journey through my professional career
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 via-blue-400 to-transparent dark:from-blue-500 dark:to-blue-900/20" />

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp._id}
                variants={itemVariants}
                className={`md:flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Timeline dot */}
                <div className="flex-1 md:flex md:justify-center md:items-center">
                  <motion.div
                    className="absolute left-0 md:relative w-4 h-4 rounded-full bg-blue-600 border-4 border-white dark:border-gray-800 shadow-lg"
                    whileHover={{ scale: 1.3 }}
                    transition={{ duration: 0.3 }}
                    style={{ marginLeft: '-9px' }}
                  />
                </div>

                {/* Content */}
                <motion.div
                  className="flex-1 md:px-8 pl-12 md:pl-0"
                  onClick={() => setExpandedId(expandedId === exp._id ? null : exp._id)}
                >
                  <motion.div
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow"
                    whileHover={{ y: -4 }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {exp.position}
                        </h3>
                        <p className="text-blue-600 dark:text-blue-400 font-medium">
                          {exp.company}
                        </p>
                      </div>
                      {exp.isCurrent && (
                        <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold rounded-full">
                          Current
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                      {formatDate(exp.startDate)} -{' '}
                      {exp.isCurrent ? 'Present' : formatDate(exp.endDate || '')}
                    </p>

                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {exp.description}
                    </p>

                    {/* Expanded content */}
                    <motion.div
                      animate={{ height: expandedId === exp._id ? 'auto' : 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      {expandedId === exp._id && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          {exp.responsibilities && exp.responsibilities.length > 0 && (
                            <div className="mb-4">
                              <p className="font-semibold text-gray-900 dark:text-white mb-2">
                                Responsibilities:
                              </p>
                              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                                {exp.responsibilities.map((resp, i) => (
                                  <li key={i} className="flex items-center">
                                    <span className="w-2 h-2 rounded-full bg-blue-600 mr-2" />
                                    {resp}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {exp.technologies && exp.technologies.length > 0 && (
                            <div>
                              <p className="font-semibold text-gray-900 dark:text-white mb-2">
                                Technologies:
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {exp.technologies.map((tech, i) => (
                                  <span
                                    key={i}
                                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm rounded-full"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
