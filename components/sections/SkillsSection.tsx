'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useMemo, useRef, useState } from 'react'
import { TextReveal } from '../interactive/TextReveal'
import { SkillSphere, type SphereItem } from '../interactive/SkillSphere'
import { SpotlightCard } from '../interactive/SpotlightCard'
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

const CATEGORIES = ['frontend', 'backend', 'tools', 'database', 'fullstack']

export function SkillsSection({ skills }: SkillsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], [100, -100])

  const filteredSkills = useMemo(
    () => (activeCategory ? skills.filter((skill) => skill.category === activeCategory) : skills),
    [skills, activeCategory]
  )

  const sphereItems: SphereItem[] = useMemo(
    () =>
      filteredSkills.map((skill) => ({
        id: skill._id,
        label: skill.name,
        color: (categoryColors[skill.category] ?? categoryColors.frontend).color,
        weight: skill.proficiency / 100,
      })),
    [filteredSkills]
  )

  const selected = useMemo(
    () => filteredSkills.find((skill) => skill._id === selectedId) ?? null,
    [filteredSkills, selectedId]
  )

  return (
    <section id="skills" ref={sectionRef} className="section-padding relative overflow-hidden">
      <motion.div className="dot-bg absolute inset-0" style={{ y: bgY }} />

      <div className="relative z-10 mx-auto max-w-6xl">
        <TextReveal
          as="h2"
          className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
        >
          {t.skills.title}
        </TextReveal>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-10 max-w-lg text-lg text-[rgba(255,255,255,0.4)]"
        >
          {t.skills.description}
        </motion.p>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12 flex flex-wrap gap-2"
        >
          <FilterChip
            active={activeCategory === null}
            onClick={() => {
              setActiveCategory(null)
              setSelectedId(null)
            }}
          >
            {t.skills.all}
          </FilterChip>

          {CATEGORIES.map((category) => {
            if (!skills.some((skill) => skill.category === category)) return null
            const config = categoryColors[category]
            const label =
              t.skills.categories[category as keyof typeof t.skills.categories] ?? category

            return (
              <FilterChip
                key={category}
                active={activeCategory === category}
                color={config.color}
                onClick={() => {
                  setActiveCategory(category)
                  setSelectedId(null)
                }}
              >
                {label}
              </FilterChip>
            )
          })}
        </motion.div>

        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_440px]">
          {/* Skill cards */}
          <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {filteredSkills.map((skill, index) => {
              const config = categoryColors[skill.category] ?? categoryColors.frontend
              const label =
                t.skills.categories[skill.category as keyof typeof t.skills.categories] ??
                skill.category
              const isSelected = selectedId === skill._id

              return (
                <motion.div
                  key={skill._id}
                  layout
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.4) }}
                  viewport={{ once: true }}
                  onMouseEnter={() => setSelectedId(skill._id)}
                >
                  <SpotlightCard
                    color={config.color}
                    className={isSelected ? 'scale-[1.015]' : ''}
                  >
                    <div className="p-5">
                      <div className="mb-4 flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="truncate text-base font-semibold text-white">
                            {skill.name}
                          </h3>
                          <span
                            className="mt-1 inline-block text-xs font-medium"
                            style={{ color: config.color }}
                          >
                            {label}
                          </span>
                        </div>

                        <div className="relative h-12 w-12 flex-shrink-0">
                          <svg className="h-12 w-12 -rotate-90" viewBox="0 0 48 48">
                            <circle
                              cx="24"
                              cy="24"
                              r="20"
                              fill="none"
                              stroke="rgba(255,255,255,0.06)"
                              strokeWidth="3"
                            />
                            <motion.circle
                              cx="24"
                              cy="24"
                              r="20"
                              fill="none"
                              stroke={config.color}
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeDasharray={2 * Math.PI * 20}
                              initial={{ strokeDashoffset: 2 * Math.PI * 20 }}
                              whileInView={{
                                strokeDashoffset: 2 * Math.PI * 20 * (1 - skill.proficiency / 100),
                              }}
                              transition={{
                                duration: 1.4,
                                ease: 'easeOut',
                                delay: Math.min(index * 0.04, 0.4),
                              }}
                              viewport={{ once: true }}
                              style={{
                                filter: isSelected ? `drop-shadow(0 0 6px ${config.glow})` : 'none',
                              }}
                            />
                          </svg>
                          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-[rgba(255,255,255,0.8)]">
                            {skill.proficiency}
                          </span>
                        </div>
                      </div>

                      <div className="h-[2px] overflow-hidden rounded-full bg-[rgba(255,255,255,0.06)]">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: config.color }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.proficiency}%` }}
                          transition={{
                            duration: 1.2,
                            ease: 'easeOut',
                            delay: Math.min(index * 0.04, 0.4),
                          }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Interactive sphere */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="sticky top-28 hidden flex-col items-center lg:flex"
          >
            <SkillSphere
              items={sphereItems}
              size={430}
              activeId={selectedId}
              onSelect={setSelectedId}
            />

            <div className="mt-2 min-h-[76px] w-full max-w-[360px] text-center">
              {selected ? (
                <motion.div
                  key={selected._id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-white/[0.07] bg-white/[0.02] px-5 py-4 backdrop-blur-sm"
                >
                  <p className="text-sm font-semibold text-white">{selected.name}</p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-white/35">
                    {t.skills.categories[
                      selected.category as keyof typeof t.skills.categories
                    ] ?? selected.category}
                    {' · '}
                    <span
                      style={{
                        color: (categoryColors[selected.category] ?? categoryColors.frontend).color,
                      }}
                    >
                      {selected.proficiency}%
                    </span>
                  </p>
                </motion.div>
              ) : (
                <p className="pt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-white/25">
                  {t.skills.sphereHint}
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function FilterChip({
  children,
  active,
  color,
  onClick,
}: {
  children: React.ReactNode
  active: boolean
  color?: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
        active
          ? 'text-black'
          : 'border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] text-[rgba(255,255,255,0.5)] hover:bg-[rgba(255,255,255,0.08)]'
      }`}
      style={active ? { backgroundColor: color ?? '#ffffff' } : undefined}
      data-hover
    >
      {children}
    </button>
  )
}
