'use client'

import { motion } from 'framer-motion'
import { getAchievements } from '@/lib/sanity.queries'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface AchievementItem {
  _id: string
  title: string
  category: string
  issuer?: string
  date: string
  description?: string
  icon?: string
  link?: string
  featured?: boolean
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
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

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  award: { bg: 'from-yellow-950/30 to-orange-950/30', text: 'text-yellow-300', border: 'border-yellow-500/30' },
  certification: { bg: 'from-green-950/30 to-emerald-950/30', text: 'text-green-300', border: 'border-green-500/30' },
  publication: { bg: 'from-blue-950/30 to-cyan-950/30', text: 'text-blue-300', border: 'border-blue-500/30' },
  speaking: { bg: 'from-purple-950/30 to-pink-950/30', text: 'text-purple-300', border: 'border-purple-500/30' },
  recognition: { bg: 'from-red-950/30 to-rose-950/30', text: 'text-red-300', border: 'border-red-500/30' },
  other: { bg: 'from-gray-950/30 to-slate-950/30', text: 'text-gray-300', border: 'border-gray-500/30' },
}

export default function AchievementSection() {
  const [achievements, setAchievements] = useState<AchievementItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const data = await getAchievements()
        setAchievements(data)
      } catch (error) {
        console.error('Error fetching achievements:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAchievements()
  }, [])

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    })
  }

  const featuredAchievements = achievements.filter((a) => a.featured)
  const regularAchievements = achievements.filter((a) => !a.featured)
  const categories = Array.from(new Set(achievements.map((a) => a.category)))

  const filteredAchievements = selectedCategory
    ? achievements.filter((a) => a.category === selectedCategory)
    : achievements

  if (loading) {
    return (
      <section id="achievements" className="py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg animate-pulse w-40 mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-40 bg-gray-700 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (!achievements.length) {
    return null
  }

  return (
    <section id="achievements" className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-background/50 via-background to-background">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.div
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
            Achievements & Awards
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mt-4" />
        </motion.div>

        {/* Featured Achievements */}
        {featuredAchievements.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            className="mb-16"
          >
            <h3 className="text-xl font-semibold text-gray-300 mb-6">Featured</h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
            >
              {featuredAchievements.map((achievement) => (
                <FeaturedAchievementCard key={achievement._id} achievement={achievement} />
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* Category Filter */}
        {categories.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="mb-8 flex flex-wrap gap-3"
          >
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === null
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all capitalize ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        )}

        {/* Achievements Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredAchievements.map((achievement) => (
            <AchievementCard key={achievement._id} achievement={achievement} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function FeaturedAchievementCard({ achievement }: { achievement: AchievementItem }) {
  const colors = categoryColors[achievement.category] || categoryColors.other
  const href = achievement.link && achievement.link.startsWith('http') ? achievement.link : '#'

  return (
    <motion.div variants={itemVariants}>
      <div className={`bg-gradient-to-br ${colors.bg} backdrop-blur-md border ${colors.border} rounded-xl p-8 h-full hover:scale-105 transition-transform duration-300 cursor-pointer group`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            {achievement.icon && (
              <div className="text-4xl mb-3">{achievement.icon}</div>
            )}
            <h3 className="text-xl font-bold text-white group-hover:text-yellow-300 transition-colors">
              {achievement.title}
            </h3>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${colors.text}`}>
            {achievement.category}
          </div>
        </div>

        {achievement.issuer && (
          <p className="text-gray-400 text-sm mb-2">
            <span className="font-semibold">By:</span> {achievement.issuer}
          </p>
        )}

        <p className={`text-sm font-semibold mb-4 ${colors.text}`}>
          {formatDate(achievement.date)}
        </p>

        {achievement.description && (
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            {achievement.description}
          </p>
        )}

        {achievement.link && (
          <Link
            href={achievement.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-blue-400 hover:text-blue-300 text-sm font-semibold transition-colors"
          >
            View Certificate →
          </Link>
        )}
      </div>
    </motion.div>
  )
}

function AchievementCard({ achievement }: { achievement: AchievementItem }) {
  const colors = categoryColors[achievement.category] || categoryColors.other
  const href = achievement.link && achievement.link.startsWith('http') ? achievement.link : '#'

  return (
    <motion.div variants={itemVariants}>
      <div className={`bg-gradient-to-br ${colors.bg} backdrop-blur-md border ${colors.border} rounded-lg p-6 h-full hover:border-opacity-100 hover:scale-105 transition-all duration-300 group cursor-pointer`}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            {achievement.icon && (
              <div className="text-2xl mb-2">{achievement.icon}</div>
            )}
            <h3 className="text-lg font-bold text-white group-hover:text-yellow-300 transition-colors line-clamp-2">
              {achievement.title}
            </h3>
          </div>
        </div>

        <div className={`inline-block px-2 py-1 rounded text-xs font-bold capitalize ${colors.text} mb-3`}>
          {achievement.category}
        </div>

        {achievement.issuer && (
          <p className="text-gray-400 text-xs mb-2 truncate">
            {achievement.issuer}
          </p>
        )}

        <p className={`text-xs font-semibold ${colors.text}`}>
          {formatDate(achievement.date)}
        </p>

        {achievement.description && (
          <p className="text-gray-400 text-xs mt-2 line-clamp-2">
            {achievement.description}
          </p>
        )}

        {achievement.link && (
          <div className="mt-3 pt-3 border-t border-gray-700">
            <Link
              href={achievement.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 text-xs font-semibold transition-colors inline-flex items-center gap-1"
            >
              View ↗
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  )
}
