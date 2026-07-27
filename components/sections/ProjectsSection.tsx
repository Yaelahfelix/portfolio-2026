'use client'

import { motion, AnimatePresence, useInView } from 'framer-motion'
import Image from 'next/image'
import { useState, useRef, useEffect, useCallback } from 'react'
import { TextReveal } from '../interactive/TextReveal'
import { TiltCard } from '../interactive/TiltCard'
import { SpotlightCard } from '../interactive/SpotlightCard'
import { startScroll, stopScroll } from '../interactive/SmoothScroll'
import { useLanguage } from '@/contexts/LanguageContext'

interface Project {
  _id: string
  title: string
  slug: string
  description: string
  description_id?: string
  image: { asset: { url: string } }
  technologies?: string[]
  liveUrl?: string
  githubUrl?: string
  caseStudy?: string
  caseStudy_id?: string
  featured?: boolean
}

interface ProjectsSectionProps {
  projects: Project[]
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [filter, setFilter] = useState<string | null>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const { t } = useLanguage()

  const allTechs = Array.from(
    new Set(projects.flatMap((p) => p.technologies ?? []).map((tech) => tech.trim()).filter(Boolean))
  ).sort()
  const filteredProjects = filter ? projects.filter((p) => p.technologies?.includes(filter)) : projects

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="max-w-7xl mx-auto relative z-10">
        <TextReveal as="h2" className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight">
          {t.projects.title}
        </TextReveal>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-[rgba(255,255,255,0.4)] text-lg mb-12 max-w-lg"
        >
          {t.projects.description}
        </motion.p>

        {/* Filter */}
        {allTechs.length > 0 && (
          <motion.div
            className="flex flex-wrap gap-2 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <button
              onClick={() => setFilter(null)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                filter === null
                  ? 'bg-white text-black'
                  : 'bg-[rgba(255,255,255,0.04)] text-[rgba(255,255,255,0.5)] border border-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.08)]'
              }`}
              data-hover
            >
              {t.projects.all}
            </button>
            {allTechs.map((tech) => (
              <button
                key={tech}
                onClick={() => setFilter(tech)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  filter === tech
                    ? 'bg-white text-black'
                    : 'bg-[rgba(255,255,255,0.04)] text-[rgba(255,255,255,0.5)] border border-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.08)]'
                }`}
                data-hover
              >
                {tech}
              </button>
            ))}
          </motion.div>
        )}

        {/* Projects grid */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" layout>
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project._id}
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-[rgba(255,255,255,0.4)] py-12"
          >
            {t.projects.noProjects}
          </motion.p>
        )}
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  )
}

function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: Project
  index: number
  onClick: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [isHovered, setIsHovered] = useState(false)
  const { t, locale } = useLanguage()

  const description = locale === 'id' && project.description_id ? project.description_id : project.description

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick()
      }}
      style={{ cursor: 'none' }}
    >
      <TiltCard tiltAmount={5} scale={1.02}>
        <SpotlightCard color="#06d6a0" radius={420}>
        <div
          className="group relative h-full cursor-none overflow-hidden rounded-[15px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          data-hover
          data-cursor-label={t.projects.viewDetails}
        >
          {/* Image */}
          <div className="relative h-48 sm:h-56 overflow-hidden bg-[rgba(255,255,255,0.02)]">
            {project.image?.asset?.url && (
              <Image
                src={project.image.asset.url}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            )}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent flex items-end p-5 gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 bg-[rgba(255,255,255,0.1)] backdrop-blur-md rounded-lg text-white text-xs font-medium border border-[rgba(255,255,255,0.1)]"
              >
                {t.projects.viewDetails}
              </motion.span>
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-5">
            {project.featured && (
              <span className="mb-2 inline-block rounded-full border border-[#f97316]/25 bg-[#f97316]/10 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-[#f97316]">
                {t.projects.featured}
              </span>
            )}
            <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
            <p className="text-[rgba(255,255,255,0.4)] text-sm mb-4 line-clamp-2">{description}</p>
            {project.technologies && project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.slice(0, 4).map((tech, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] rounded-full text-[10px] text-[rgba(255,255,255,0.5)] font-medium"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="px-2.5 py-1 text-[10px] text-[rgba(255,255,255,0.3)] font-medium">
                    +{project.technologies.length - 4}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Light sweep on hover */}
          <motion.span
            className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(105deg,transparent_35%,rgba(255,255,255,0.10)_50%,transparent_65%)]"
            animate={{ x: isHovered ? '100%' : '-100%' }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
          />
        </div>
        </SpotlightCard>
      </TiltCard>
    </motion.div>
  )
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null
  onClose: () => void
}) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const { t, locale } = useLanguage()

  useEffect(() => {
    if (project) {
      stopScroll()
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      startScroll()
    }
    return () => {
      document.body.style.overflow = ''
      startScroll()
    }
  }, [project])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (project) window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [project, onClose])

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlayRef.current) onClose()
    },
    [onClose],
  )

  const description = project
    ? locale === 'id' && project.description_id
      ? project.description_id
      : project.description
    : ''

  const caseStudy = project
    ? locale === 'id' && project.caseStudy_id
      ? project.caseStudy_id
      : project.caseStudy
    : ''

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleOverlayClick}
          style={{ cursor: 'auto' }}
        >
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0a0a0a] shadow-2xl"
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(6, 214, 160, 0.3) transparent' }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.12)] transition-colors group"
              data-hover
              style={{ cursor: 'none' }}
            >
              <svg
                className="w-5 h-5 text-[rgba(255,255,255,0.6)] group-hover:text-white transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Hero Image */}
            {project.image?.asset?.url && (
              <div className="relative w-full h-56 sm:h-72 md:h-80 overflow-hidden rounded-t-2xl">
                <Image
                  src={project.image.asset.url}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                {project.featured && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 rounded-full text-[11px] font-semibold bg-gradient-to-r from-[#06d6a0] to-[#3b82f6] text-white shadow-lg">
                      {t.projects.featured}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Content */}
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
                {project.title}
              </h2>

              {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-full text-xs text-[rgba(255,255,255,0.6)] font-medium hover:bg-[rgba(255,255,255,0.08)] transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              <div className="h-px w-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.08)] to-transparent mb-6" />

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-[rgba(255,255,255,0.3)] uppercase tracking-wider mb-3">
                  {t.projects.descriptionLabel}
                </h3>
                <p className="text-[rgba(255,255,255,0.7)] text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {description}
                </p>
              </div>

              {caseStudy && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-[rgba(255,255,255,0.3)] uppercase tracking-wider mb-3">
                    {t.projects.caseStudy}
                  </h3>
                  <div className="p-4 sm:p-5 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)]">
                    <p className="text-[rgba(255,255,255,0.6)] text-sm leading-relaxed whitespace-pre-line">
                      {caseStudy}
                    </p>
                  </div>
                </div>
              )}

              <div className="h-px w-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.08)] to-transparent mb-6" />

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#06d6a0] to-[#3b82f6] text-white text-sm font-semibold hover:shadow-[0_0_24px_rgba(6,214,160,0.3)] transition-shadow"
                    data-hover
                    style={{ cursor: 'none' }}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M11 3a1 1 0 100 2h3.586L9.293 9.293a1 1 0 001.414 1.414L16 6.414V10a1 1 0 102 0V4a1 1 0 00-1-1h-6z" />
                      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                    </svg>
                    {t.projects.livePreview}
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] text-white text-sm font-semibold hover:bg-[rgba(255,255,255,0.1)] transition-colors"
                    data-hover
                    style={{ cursor: 'none' }}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.544 2.914 1.186.092-.924.35-1.554.636-1.911-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.578 9.578 0 0110 4.836c.85.004 1.705.114 2.504.336 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.578.688.48C17.137 18.195 20 14.44 20 10.017 20 4.484 15.522 0 10 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {t.projects.sourceCode}
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
