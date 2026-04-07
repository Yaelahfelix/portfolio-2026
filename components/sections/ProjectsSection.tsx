'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface Project {
  _id: string
  title: string
  slug: string
  description: string
  image: {
    asset: {
      url: string
    }
  }
  technologies?: string[]
  liveUrl?: string
  githubUrl?: string
  caseStudy?: string
  featured?: boolean
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

interface ProjectsSectionProps {
  projects: Project[]
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [filter, setFilter] = useState<string | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  // Get all unique technologies
  const allTechs = Array.from(
    new Set(projects.flatMap((p) => p.technologies || []))
  ).sort()

  // Filter projects based on selected technology
  const filteredProjects = filter
    ? projects.filter((p) => p.technologies?.includes(filter))
    : projects

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Showcasing some of my best work and technical achievements
          </p>
        </motion.div>

        {/* Filter buttons */}
        {allTechs.length > 0 && (
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <button
              onClick={() => setFilter(null)}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                filter === null
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 hover:border-blue-600'
              }`}
            >
              All Projects
            </button>
            {allTechs.map((tech) => (
              <motion.button
                key={tech}
                onClick={() => setFilter(tech)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  filter === tech
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 hover:border-blue-600'
                }`}
              >
                {tech}
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Projects grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project._id}
              variants={itemVariants}
              onMouseEnter={() => setHoveredId(project._id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow h-full flex flex-col group"
                whileHover={{ y: -8 }}
              >
                {/* Image container */}
                <div className="relative h-48 sm:h-56 overflow-hidden bg-gray-200 dark:bg-gray-700">
                  {project.image?.asset?.url && (
                    <Image
                      src={project.image.asset.url}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  )}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/0 to-transparent opacity-0 group-hover:opacity-100 flex items-end p-4 gap-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredId === project._id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
                        title="Live Link"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M11 3a1 1 0 100 2h3.586L9.293 9.293a1 1 0 001.414 1.414L16 6.414V10a1 1 0 102 0V4a1 1 0 00-1-1h-6z" />
                          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                        </svg>
                      </motion.a>
                    )}
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        className="p-2 bg-gray-700 hover:bg-gray-800 rounded-lg text-white transition-colors"
                        title="GitHub"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.463-1.11-1.463-.908-.620.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.544 2.914 1.186.092-.924.35-1.554.636-1.911-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.578 9.578 0 0110 4.836c.85.004 1.705.114 2.504.336 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.578.688.48C17.137 18.195 20 14.44 20 10.017 20 4.484 15.522 0 10 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </motion.a>
                    )}
                  </motion.div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 flex flex-col">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-1">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((tech, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded-full font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full font-medium">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Case study link */}
                  {project.caseStudy && (
                    <motion.button
                      whileHover={{ x: 4 }}
                      className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:gap-3 transition-all gap-2 text-sm mt-auto"
                    >
                      Read Case Study
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.button>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* No results message */}
        {filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-gray-600 dark:text-gray-400">
              No projects found with the selected technology.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
