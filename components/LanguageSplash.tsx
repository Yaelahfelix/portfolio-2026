'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useLanguage, type Locale } from '@/contexts/LanguageContext'

export function LanguageSplash() {
  const { setLocale } = useLanguage()
  const [show, setShow] = useState(true)
  const [selecting, setSelecting] = useState<Locale | null>(null)

  const handleSelect = (locale: Locale) => {
    if (selecting) return
    setSelecting(locale)
    setTimeout(() => {
      setLocale(locale)
      setShow(false)
      setSelecting(null)
    }, 700)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#050505]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {/* Background gradient */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background:
                  'radial-gradient(circle at 30% 40%, rgba(6,214,160,0.25) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(124,58,237,0.2) 0%, transparent 50%)',
              }}
            />
            <div className="absolute inset-0 grid-bg opacity-30" />
          </div>

          <div className="relative z-10 text-center px-6 max-w-lg w-full">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="mb-10"
            >
              <span className="text-2xl font-bold tracking-tight">
                <span className="gradient-text">Yaelahfelix</span>
                <span className="text-[rgba(255,255,255,0.4)]">.</span>
                <span className="text-white">dev</span>
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-3xl sm:text-4xl font-bold text-white mb-3 tracking-tight"
            >
              Choose Your Language
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="text-[rgba(255,255,255,0.4)] text-sm mb-10"
            >
              Pilih bahasa yang Anda inginkan &nbsp;/&nbsp; Select your preferred language
            </motion.p>

            {/* Language Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <LanguageCard
                locale="en"
                flag="🇺🇸"
                name="English"
                subtitle="Continue in English"
                selecting={selecting}
                onSelect={handleSelect}
                color="#3b82f6"
              />
              <LanguageCard
                locale="id"
                flag="🇮🇩"
                name="Indonesia"
                subtitle="Lanjutkan dalam Bahasa Indonesia"
                selecting={selecting}
                onSelect={handleSelect}
                color="#06d6a0"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function LanguageCard({
  locale,
  flag,
  name,
  subtitle,
  selecting,
  onSelect,
  color,
}: {
  locale: Locale
  flag: string
  name: string
  subtitle: string
  selecting: Locale | null
  onSelect: (l: Locale) => void
  color: string
}) {
  const isSelected = selecting === locale
  const isDimmed = selecting !== null && !isSelected

  return (
    <motion.button
      onClick={() => onSelect(locale)}
      disabled={selecting !== null}
      className="relative group flex-1 sm:max-w-[220px] p-6 rounded-2xl border text-left transition-all cursor-pointer"
      style={{
        backgroundColor: isSelected ? `${color}18` : 'rgba(255,255,255,0.03)',
        borderColor: isSelected ? color : 'rgba(255,255,255,0.08)',
        opacity: isDimmed ? 0.35 : 1,
        boxShadow: isSelected ? `0 0 32px ${color}30` : 'none',
      }}
      whileHover={!selecting ? { scale: 1.03, borderColor: color } : {}}
      whileTap={!selecting ? { scale: 0.97 } : {}}
    >
      {/* Check badge */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center"
            style={{ backgroundColor: color }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <svg
              className="w-3 h-3 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-4xl mb-4">{flag}</div>
      <h3 className="text-lg font-bold text-white mb-1">{name}</h3>
      <p className="text-[rgba(255,255,255,0.35)] text-xs leading-relaxed">{subtitle}</p>
    </motion.button>
  )
}
