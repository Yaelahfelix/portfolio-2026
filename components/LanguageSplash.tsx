'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useLanguage, type Locale } from '@/contexts/LanguageContext'
import { startScroll, stopScroll } from './interactive/SmoothScroll'

const BOOT_LINES = [
  'init webgl context',
  'compiling glsl shaders',
  'seeding particle buffers',
  'warming post pipeline',
]

export function LanguageSplash() {
  const { setLocale, t } = useLanguage()
  const [show, setShow] = useState(true)
  const [selecting, setSelecting] = useState<Locale | null>(null)
  const [progress, setProgress] = useState(0)
  const booted = progress >= 100

  // Lock the page while the curtain is up
  useEffect(() => {
    if (!show) {
      startScroll()
      document.body.style.overflow = ''
      return
    }
    stopScroll()
    document.body.style.overflow = 'hidden'
    window.scrollTo(0, 0)
  }, [show])

  // Boot counter — eases to 100 and holds
  useEffect(() => {
    let frame = 0
    const start = performance.now()
    const duration = 1500

    const tick = (now: number) => {
      const linear = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - linear, 3)
      setProgress(Math.round(eased * 100))
      if (linear < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  const handleSelect = (locale: Locale) => {
    if (selecting || !booted) return
    setSelecting(locale)
    setLocale(locale)
    setTimeout(() => {
      setShow(false)
      setSelecting(null)
    }, 620)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-[#050505]"
          initial={{ opacity: 1 }}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)', opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Drifting aurora */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute -left-1/4 top-[-20%] h-[70vh] w-[70vh] rounded-full bg-[radial-gradient(circle,rgba(6,214,160,0.22)_0%,transparent_65%)] blur-3xl"
              animate={{ x: [0, 90, -40, 0], y: [0, 60, 120, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute -right-1/4 bottom-[-20%] h-[65vh] w-[65vh] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.22)_0%,transparent_65%)] blur-3xl"
              animate={{ x: [0, -70, 30, 0], y: [0, -50, -100, 0] }}
              transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="grid-bg absolute inset-0 opacity-30" />
          </div>

          <motion.div
            className="relative z-10 w-full max-w-lg px-6 text-center"
            animate={{ opacity: selecting ? 0 : 1, y: selecting ? -18 : 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Wordmark */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="mb-10"
            >
              <span className="text-2xl font-bold tracking-tight">
                <span className="gradient-text animate-gradient">Yaelahfelix</span>
                <span className="text-[rgba(255,255,255,0.4)]">.</span>
                <span className="text-white">dev</span>
              </span>
            </motion.div>

            {/* Boot sequence */}
            <AnimatePresence mode="wait">
              {!booted ? (
                <motion.div
                  key="boot"
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="mx-auto max-w-xs"
                >
                  <div className="mb-3 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
                    <span>{t.splash.booting}</span>
                    <span className="tabular-nums text-[#06d6a0]">{progress}%</span>
                  </div>

                  <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-[#06d6a0] to-[#7c3aed]"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <ul className="mt-4 space-y-1 text-left font-mono text-[10px] text-white/25">
                    {BOOT_LINES.map((line, index) => (
                      <li
                        key={line}
                        className={
                          progress > (index + 1) * 22 ? 'text-[#06d6a0]/70' : 'text-white/20'
                        }
                      >
                        {progress > (index + 1) * 22 ? '✓' : '›'} {line}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ) : (
                <motion.div
                  key="choose"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="mb-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    {t.splash.title}
                  </h1>
                  <p className="mb-10 text-sm text-[rgba(255,255,255,0.4)]">{t.splash.subtitle}</p>

                  <div className="flex flex-col justify-center gap-4 sm:flex-row">
                    <LanguageCard
                      locale="en"
                      flag="🇺🇸"
                      name={t.splash.enLabel}
                      subtitle={t.splash.enSubtitle}
                      selecting={selecting}
                      onSelect={handleSelect}
                      color="#3b82f6"
                    />
                    <LanguageCard
                      locale="id"
                      flag="🇮🇩"
                      name={t.splash.idLabel}
                      subtitle={t.splash.idSubtitle}
                      selecting={selecting}
                      onSelect={handleSelect}
                      color="#06d6a0"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
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
  onSelect: (locale: Locale) => void
  color: string
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const isSelected = selecting === locale
  const isDimmed = selecting !== null && !isSelected

  const handleMouseMove = (event: React.MouseEvent) => {
    const node = ref.current
    if (!node || selecting) return
    const rect = node.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    node.style.transform = `perspective(700px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale(1.03)`
  }

  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <button
      ref={ref}
      onClick={() => onSelect(locale)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      disabled={selecting !== null}
      className="group relative flex-1 rounded-2xl border p-6 text-left transition-[transform,background-color,border-color,box-shadow] duration-300 sm:max-w-[220px]"
      style={{
        backgroundColor: isSelected ? `${color}18` : 'rgba(255,255,255,0.03)',
        borderColor: isSelected ? color : 'rgba(255,255,255,0.08)',
        opacity: isDimmed ? 0.35 : 1,
        boxShadow: isSelected ? `0 0 40px ${color}40` : 'none',
      }}
      data-hover
    >
      <span className="mb-4 block text-4xl">{flag}</span>
      <span className="mb-1 block text-lg font-bold text-white">{name}</span>
      <span className="block text-xs leading-relaxed text-[rgba(255,255,255,0.35)]">
        {subtitle}
      </span>

      <span
        className="pointer-events-none absolute inset-x-6 bottom-0 h-px origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
        style={{ backgroundColor: color }}
      />
    </button>
  )
}
