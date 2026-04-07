'use client'

import { motion } from 'framer-motion'
import { getEducation } from '@/lib/sanity.queries'
import { useEffect, useState } from 'react'

interface EducationItem {
  _id: string
  school: string
  degree: string
  field: string
  startDate: string
  endDate?: string
  description?: string
  gpa?: string
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
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

const titleVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

export default function EducationSection() {
  const [education, setEducation] = useState<EducationItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const data = await getEducation()
        setEducation(data)
      } catch (error) {
        console.error('Error fetching education:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEducation()
  }, [])

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    })
  }

  if (loading) {
    return (
      <section id="education" className="py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg animate-pulse w-32 mb-12" />
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-700 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (!education.length) {
    return null
  }

  return (
    <section id="education" className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-background via-background to-background/50">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.div
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Education
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-4" />
        </motion.div>

        {/* Education Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-8"
        >
          {education.map((edu, index) => (
            <motion.div
              key={edu._id}
              variants={itemVariants}
              className="group relative"
            >
              {/* Timeline connector */}
              <div className="absolute left-0 md:left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 transform -translate-x-1/2 hidden md:block" />

              <div className="md:ml-24 bg-gradient-to-br from-blue-950/30 to-purple-950/30 backdrop-blur-md border border-blue-500/20 rounded-xl p-6 hover:border-blue-400/50 transition-all duration-300">
                {/* Timeline dot */}
                <motion.div
                  className="absolute left-0 top-6 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full hidden md:block transform -translate-x-1.5 group-hover:scale-125 transition-transform"
                  whileHover={{ scale: 1.3 }}
                />

                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{edu.degree}</h3>
                    <p className="text-lg text-blue-300 font-semibold">{edu.school}</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Field: <span className="text-purple-300">{edu.field}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-300 text-sm">
                      <span className="text-blue-300 font-semibold">
                        {formatDate(edu.startDate)}
                      </span>
                      {' - '}
                      <span className="text-purple-300 font-semibold">
                        {edu.endDate ? formatDate(edu.endDate) : 'Present'}
                      </span>
                    </p>
                    {edu.gpa && (
                      <p className="text-sm text-gray-400 mt-2">
                        GPA: <span className="text-green-400 font-semibold">{edu.gpa}</span>
                      </p>
                    )}
                  </div>
                </div>

                {edu.description && (
                  <p className="text-gray-300 leading-relaxed text-sm">{edu.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
