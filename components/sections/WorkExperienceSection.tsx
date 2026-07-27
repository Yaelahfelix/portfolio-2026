'use client'

import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { TextReveal } from '../interactive/TextReveal'
import { SpotlightCard } from '../interactive/SpotlightCard'
import { useLanguage, type Locale } from '@/contexts/LanguageContext'

interface WorkExp {
  _id: string
  company: string
  position: string
  startDate: string
  endDate?: string
  isCurrent: boolean
  description: string
  description_id?: string
  responsibilities?: string[]
  responsibilities_id?: string[]
  technologies?: string[]
}

interface WorkExperienceSectionProps {
  experiences: WorkExp[]
}

function formatDate(dateString: string, locale: Locale) {
  return new Date(dateString).toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', {
    month: 'short',
    year: 'numeric',
  })
}

export function WorkExperienceSection({ experiences }: WorkExperienceSectionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const { t, locale } = useLanguage()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%'])

  return (
    <section id="experience" ref={sectionRef} className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="max-w-4xl mx-auto relative z-10">
        <TextReveal as="h2" className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight">
          {t.experience.title}
        </TextReveal>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-[rgba(255,255,255,0.4)] text-lg mb-16 max-w-lg"
        >
          {t.experience.description}
        </motion.p>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-[1px] bg-[rgba(255,255,255,0.06)]">
            <motion.div
              className="w-full origin-top"
              style={{
                height: lineHeight,
                background: 'linear-gradient(180deg, #06d6a0, #3b82f6, #7c3aed)',
              }}
            />
          </div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <TimelineEntry
                key={exp._id}
                exp={exp}
                index={index}
                isExpanded={expandedId === exp._id}
                onToggle={() => setExpandedId(expandedId === exp._id ? null : exp._id)}
                locale={locale}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TimelineEntry({
  exp,
  index,
  isExpanded,
  onToggle,
  locale,
}: {
  exp: WorkExp
  index: number
  isExpanded: boolean
  onToggle: () => void
  locale: Locale
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { t } = useLanguage()

  const description = locale === 'id' && exp.description_id ? exp.description_id : exp.description
  const responsibilities =
    locale === 'id' && exp.responsibilities_id?.length
      ? exp.responsibilities_id
      : exp.responsibilities

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative pl-12 md:pl-20"
    >
      {/* Timeline dot */}
      {exp.isCurrent && (
        <motion.span
          className="absolute left-4 top-6 h-[9px] w-[9px] -translate-x-1/2 rounded-full bg-[#06d6a0] md:left-8"
          animate={{ scale: [1, 3.2, 1], opacity: [0.55, 0, 0.55] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
        />
      )}
      <motion.div
        className="absolute left-4 md:left-8 top-6 w-[9px] h-[9px] rounded-full -translate-x-1/2 z-10"
        style={{
          backgroundColor: exp.isCurrent ? '#06d6a0' : '#3b82f6',
          boxShadow: isInView
            ? `0 0 12px ${exp.isCurrent ? 'rgba(6, 214, 160, 0.5)' : 'rgba(59, 130, 246, 0.5)'}`
            : 'none',
        }}
        animate={exp.isCurrent ? { scale: [1, 1.3, 1] } : {}}
        transition={exp.isCurrent ? { duration: 2, repeat: Infinity } : {}}
      />

      {/* Card */}
      <SpotlightCard color={exp.isCurrent ? '#06d6a0' : '#3b82f6'} radius={340}>
      <motion.div
        className="group cursor-pointer p-6"
        onClick={onToggle}
        data-hover
        data-cursor-label={isExpanded ? 'close' : 'open'}
      >
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
          <div>
            <h3 className="text-xl font-semibold text-white group-hover:gradient-text transition-all duration-300">
              {exp.position}
            </h3>
            <p className="text-[#06d6a0] font-medium text-sm">{exp.company}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {exp.isCurrent && (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#06d6a0]/10 text-[#06d6a0] border border-[#06d6a0]/20">
                {t.experience.current}
              </span>
            )}
            <span className="text-xs text-[rgba(255,255,255,0.3)] font-mono">
              {formatDate(exp.startDate, locale)} —{' '}
              {exp.isCurrent ? t.experience.present : formatDate(exp.endDate || '', locale)}
            </span>
          </div>
        </div>

        <p className="text-[rgba(255,255,255,0.5)] text-sm leading-relaxed mb-3">{description}</p>

        {/* Expand indicator */}
        <motion.div
          className="flex items-center gap-1 text-xs text-[rgba(255,255,255,0.3)]"
          animate={{ opacity: isExpanded ? 0 : 1 }}
        >
          <motion.span animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
            →
          </motion.span>
          {isExpanded ? t.experience.clickCollapse : t.experience.clickExpand}
        </motion.div>

        {/* Expanded content */}
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div className="pt-4 border-t border-[rgba(255,255,255,0.06)] mt-4">
            {responsibilities && responsibilities.length > 0 && (
              <div className="mb-4">
                <p className="text-xs uppercase tracking-wider text-[rgba(255,255,255,0.4)] font-semibold mb-3">
                  {t.experience.responsibilities}
                </p>
                <ul className="space-y-2">
                  {responsibilities.map((resp, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isExpanded ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-start gap-2 text-[rgba(255,255,255,0.6)] text-sm"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#06d6a0] mt-2 flex-shrink-0" />
                      {resp}
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}

            {exp.technologies && exp.technologies.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-wider text-[rgba(255,255,255,0.4)] font-semibold mb-3">
                  {t.experience.technologies}
                </p>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isExpanded ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: i * 0.05 }}
                      className="px-3 py-1 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-full text-xs text-[rgba(255,255,255,0.6)] font-medium"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
      </SpotlightCard>
    </motion.div>
  )
}
