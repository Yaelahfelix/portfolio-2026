'use client'

import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { TextReveal } from '../interactive/TextReveal'

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

interface WorkExperienceSectionProps {
  experiences: WorkExp[]
}

export function WorkExperienceSection({ experiences }: WorkExperienceSectionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%'])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  return (
    <section id="experience" ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section heading */}
        <TextReveal
          as="h2"
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight"
        >
          Work Experience
        </TextReveal>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-[rgba(255,255,255,0.4)] text-lg mb-16 max-w-lg"
        >
          My professional journey through the tech industry
        </motion.p>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Animated timeline line */}
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
                formatDate={formatDate}
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
  formatDate,
}: {
  exp: WorkExp & { _id: string }
  index: number
  isExpanded: boolean
  onToggle: () => void
  formatDate: (d: string) => string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative pl-12 md:pl-20"
    >
      {/* Timeline dot */}
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
      <motion.div
        className="glass-card p-6 cursor-pointer group"
        onClick={onToggle}
        whileHover={{ borderColor: 'rgba(255,255,255,0.1)' }}
        data-hover
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
                Current
              </span>
            )}
            <span className="text-xs text-[rgba(255,255,255,0.3)] font-mono">
              {formatDate(exp.startDate)} — {exp.isCurrent ? 'Present' : formatDate(exp.endDate || '')}
            </span>
          </div>
        </div>

        <p className="text-[rgba(255,255,255,0.5)] text-sm leading-relaxed mb-3">{exp.description}</p>

        {/* Expand indicator */}
        <motion.div
          className="flex items-center gap-1 text-xs text-[rgba(255,255,255,0.3)]"
          animate={{ opacity: isExpanded ? 0 : 1 }}
        >
          <motion.span
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            →
          </motion.span>
          Click to {isExpanded ? 'collapse' : 'expand'}
        </motion.div>

        {/* Expanded content */}
        <motion.div
          initial={false}
          animate={{
            height: isExpanded ? 'auto' : 0,
            opacity: isExpanded ? 1 : 0,
          }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div className="pt-4 border-t border-[rgba(255,255,255,0.06)] mt-4">
            {exp.responsibilities && exp.responsibilities.length > 0 && (
              <div className="mb-4">
                <p className="text-xs uppercase tracking-wider text-[rgba(255,255,255,0.4)] font-semibold mb-3">
                  Key Responsibilities
                </p>
                <ul className="space-y-2">
                  {exp.responsibilities.map((resp, i) => (
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
                  Technologies
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
    </motion.div>
  )
}
