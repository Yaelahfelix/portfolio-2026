'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { TextReveal } from '../interactive/TextReveal'
import { TiltCard } from '../interactive/TiltCard'
import { useLanguage } from '@/contexts/LanguageContext'

interface Skill {
  _id: string
  name: string
  category: string
  proficiency: number
  icon?: string
}

interface SkillsSectionProps {
  skills: Skill[]
}

const categoryColors: Record<string, { color: string; glow: string }> = {
  frontend: { color: '#06d6a0', glow: 'rgba(6, 214, 160, 0.2)' },
  backend: { color: '#3b82f6', glow: 'rgba(59, 130, 246, 0.2)' },
  tools: { color: '#7c3aed', glow: 'rgba(124, 58, 237, 0.2)' },
  database: { color: '#f97316', glow: 'rgba(249, 115, 22, 0.2)' },
  fullstack: { color: '#ec4899', glow: 'rgba(236, 72, 153, 0.2)' },
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()

  const categories = ['frontend', 'backend', 'tools', 'database', 'fullstack']

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], [100, -100])
  const filteredSkills = activeCategory ? skills.filter((s) => s.category === activeCategory) : skills

  return (
    <section id="skills" ref={sectionRef} className="section-padding relative overflow-hidden">
      <motion.div className="absolute inset-0 dot-bg" style={{ y: bgY }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <TextReveal as="h2" className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight">
          {t.skills.title}
        </TextReveal>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-[rgba(255,255,255,0.4)] text-lg mb-12 max-w-lg"
        >
          {t.skills.description}
        </motion.p>

        {/* Category filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-2 mb-12"
        >
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === null
                ? 'bg-white text-black'
                : 'bg-[rgba(255,255,255,0.04)] text-[rgba(255,255,255,0.5)] border border-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.08)]'
            }`}
            data-hover
          >
            {t.skills.all}
          </button>
          {categories.map((cat) => {
            const config = categoryColors[cat]
            const hasSkills = skills.some((s) => s.category === cat)
            if (!hasSkills) return null
            const label = t.skills.categories[cat as keyof typeof t.skills.categories] ?? cat

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? 'text-black'
                    : 'bg-[rgba(255,255,255,0.04)] text-[rgba(255,255,255,0.5)] border border-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.08)]'
                }`}
                style={activeCategory === cat ? { backgroundColor: config.color } : {}}
                data-hover
              >
                {label}
              </button>
            )
          })}
        </motion.div>

        {/* Skills grid */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" layout>
          {filteredSkills.map((skill, index) => {
            const config = categoryColors[skill.category] || categoryColors.frontend
            const label = t.skills.categories[skill.category as keyof typeof t.skills.categories] ?? skill.category

            return (
              <motion.div
                key={skill._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <TiltCard tiltAmount={5} scale={1.02}>
                  <motion.div
                    className="glass-card glass-card-hover p-5 h-full group"
                    onMouseEnter={() => setHoveredSkill(skill._id)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    data-hover
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-base group-hover:text-white transition-colors">
                          {skill.name}
                        </h3>
                        <span className="text-xs font-medium mt-1 inline-block" style={{ color: config.color }}>
                          {label}
                        </span>
                      </div>

                      {/* Circular progress */}
                      <div className="relative w-12 h-12 flex-shrink-0">
                        <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
                          <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
                          <motion.circle
                            cx="24"
                            cy="24"
                            r="20"
                            fill="none"
                            stroke={config.color}
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeDasharray={`${2 * Math.PI * 20}`}
                            initial={{ strokeDashoffset: 2 * Math.PI * 20 }}
                            whileInView={{
                              strokeDashoffset: 2 * Math.PI * 20 * (1 - skill.proficiency / 100),
                            }}
                            transition={{ duration: 1.5, ease: 'easeOut', delay: index * 0.05 }}
                            viewport={{ once: true }}
                            style={{
                              filter:
                                hoveredSkill === skill._id
                                  ? `drop-shadow(0 0 6px ${config.glow})`
                                  : 'none',
                            }}
                          />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-[rgba(255,255,255,0.8)]">
                          {skill.proficiency}
                        </span>
                      </div>
                    </div>

                    {/* Proficiency bar */}
                    <div className="h-[2px] bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: config.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        transition={{ duration: 1.2, ease: 'easeOut', delay: index * 0.05 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </motion.div>
                </TiltCard>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
