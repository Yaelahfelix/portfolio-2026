'use client'

import { motion, useInView } from 'framer-motion'
import { getAchievements } from '@/lib/sanity.queries'
import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { TextReveal } from '../interactive/TextReveal'
import { TiltCard } from '../interactive/TiltCard'
import { SpotlightCard } from '../interactive/SpotlightCard'
import { useLanguage, type Locale } from '@/contexts/LanguageContext'

interface AchievementItem {
  _id: string
  title: string
  title_id?: string
  category: string
  issuer?: string
  date: string
  description?: string
  description_id?: string
  icon?: string
  link?: string
  featured?: boolean
}

const catColors: Record<string, { color: string; glow: string }> = {
  award: { color: '#f97316', glow: 'rgba(249,115,22,0.2)' },
  certification: { color: '#06d6a0', glow: 'rgba(6,214,160,0.2)' },
  publication: { color: '#3b82f6', glow: 'rgba(59,130,246,0.2)' },
  speaking: { color: '#7c3aed', glow: 'rgba(124,58,237,0.2)' },
  recognition: { color: '#ec4899', glow: 'rgba(236,72,153,0.2)' },
  other: { color: '#888888', glow: 'rgba(136,136,136,0.2)' },
}

function formatDate(date: string, locale: Locale) {
  return new Date(date).toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', {
    year: 'numeric',
    month: 'short',
  })
}

export default function AchievementSection() {
  const [achievements, setAchievements] = useState<AchievementItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const { t } = useLanguage()

  useEffect(() => {
    getAchievements()
      .then(setAchievements)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const categories = Array.from(new Set(achievements.map((a) => a.category)))
  const filtered = selectedCategory
    ? achievements.filter((a) => a.category === selectedCategory)
    : achievements

  if (loading) {
    return (
      <section id="achievements" className="section-padding">
        <div className="max-w-6xl mx-auto">
          <div className="h-12 w-56 bg-[rgba(255,255,255,0.04)] rounded-lg animate-pulse mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-40 bg-[rgba(255,255,255,0.04)] rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (!achievements.length) return null

  return (
    <section id="achievements" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="max-w-6xl mx-auto relative z-10">
        <TextReveal as="h2" className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight">
          {t.achievements.title}
        </TextReveal>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-[rgba(255,255,255,0.4)] text-lg mb-12 max-w-lg"
        >
          {t.achievements.description}
        </motion.p>

        {/* Category filter */}
        {categories.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-2 mb-10"
          >
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                selectedCategory === null
                  ? 'bg-white text-black'
                  : 'bg-[rgba(255,255,255,0.04)] text-[rgba(255,255,255,0.5)] border border-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.08)]'
              }`}
              data-hover
            >
              {t.achievements.all}
            </button>
            {categories.map((cat) => {
              const c = catColors[cat] || catColors.other
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-medium capitalize transition-all ${
                    selectedCategory === cat
                      ? 'text-black'
                      : 'bg-[rgba(255,255,255,0.04)] text-[rgba(255,255,255,0.5)] border border-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.08)]'
                  }`}
                  style={selectedCategory === cat ? { backgroundColor: c.color } : {}}
                  data-hover
                >
                  {cat}
                </button>
              )
            })}
          </motion.div>
        )}

        {/* Grid */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" layout>
          {filtered.map((achievement, index) => (
            <AchievementCard key={achievement._id} item={achievement} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function AchievementCard({ item, index }: { item: AchievementItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const c = catColors[item.category] || catColors.other
  const { t, locale } = useLanguage()

  const title = locale === 'id' && item.title_id ? item.title_id : item.title
  const description = locale === 'id' && item.description_id ? item.description_id : item.description

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <TiltCard tiltAmount={5} scale={1.02}>
        <SpotlightCard color={c.color} radius={300}>
        <div className="group h-full p-5" data-hover>
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0">
              {item.icon && <div className="text-2xl mb-2">{item.icon}</div>}
              <h3 className="text-base font-semibold text-white line-clamp-2">{title}</h3>
            </div>
            <span
              className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider flex-shrink-0 ml-2"
              style={{ color: c.color, backgroundColor: c.glow }}
            >
              {item.category}
            </span>
          </div>

          {item.issuer && (
            <p className="text-[rgba(255,255,255,0.3)] text-xs mb-1">{item.issuer}</p>
          )}
          <p className="text-xs font-mono mb-2" style={{ color: c.color }}>
            {formatDate(item.date, locale)}
          </p>

          {description && (
            <p className="text-[rgba(255,255,255,0.4)] text-xs leading-relaxed line-clamp-2 mb-3">
              {description}
            </p>
          )}

          {item.link && (
            <Link
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium transition-colors hover:opacity-80"
              style={{ color: c.color }}
              data-hover
            >
              {t.achievements.view}
            </Link>
          )}
        </div>
        </SpotlightCard>
      </TiltCard>
    </motion.div>
  )
}
