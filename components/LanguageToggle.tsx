'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export function LanguageToggle() {
  const { locale, setLocale } = useLanguage()

  return (
    <motion.button
      onClick={() => setLocale(locale === 'en' ? 'id' : 'en')}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.08)] transition-colors text-xs font-medium"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      data-hover
      aria-label={`Switch to ${locale === 'en' ? 'Indonesian' : 'English'}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={locale}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.15 }}
          className="flex items-center gap-1.5 text-[rgba(255,255,255,0.7)]"
        >
          <span>{locale === 'en' ? '🇺🇸' : '🇮🇩'}</span>
          <span>{locale === 'en' ? 'EN' : 'ID'}</span>
        </motion.span>
      </AnimatePresence>
      <span className="text-[rgba(255,255,255,0.2)] select-none">|</span>
      <span className="text-[rgba(255,255,255,0.3)]">{locale === 'en' ? 'ID' : 'EN'}</span>
    </motion.button>
  )
}
