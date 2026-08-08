'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { ArrowDown } from 'lucide-react'
import { MagneticButton } from '../interactive/MagneticButton'
import { useLanguage } from '@/contexts/LanguageContext'

const LINE_VARIANTS = {
  hidden: { y: '110%', opacity: 0 },
  visible: (index: number) => ({
    y: '0%',
    opacity: 1,
    transition: { duration: 1, delay: 0.35 + index * 0.12, ease: [0.16, 1, 0.3, 1] as const },
  }),
}

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()
  const roles = t.hero.roles

  const [currentRole, setCurrentRole] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.8], [0, -120])
  const contentBlur = useTransform(scrollYProgress, [0, 0.7], ['blur(0px)', 'blur(9px)'])

  useEffect(() => {
    const currentWord = roles[currentRole]
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentWord.length) {
            setDisplayText(currentWord.slice(0, displayText.length + 1))
          } else {
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else if (displayText.length > 0) {
          setDisplayText(currentWord.slice(0, displayText.length - 1))
        } else {
          setIsDeleting(false)
          setCurrentRole((prev) => (prev + 1) % roles.length)
        }
      },
      isDeleting ? 40 : 80
    )

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentRole, roles])

  const headingLines = [
    { text: t.hero.heading1, gradient: false },
    { text: t.hero.heading2, gradient: true },
    { text: t.hero.heading3, gradient: false },
  ]

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Legibility scrim + grid */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,5,5,0.88)_0%,rgba(5,5,5,0.45)_42%,rgba(5,5,5,0.15)_70%,transparent_88%)]" />
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-40" />

      <motion.div
        className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8"
        style={{ opacity: contentOpacity, y: contentY, filter: contentBlur }}
      >
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-8 inline-block"
        >
          {/* No backdrop-filter on anything sitting over the hero canvas — the
              canvas repaints every frame, so each blurred pane is re-sampled
              every frame too. Slightly denser fills read the same over black. */}
          <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.06)] px-4 py-2 text-sm font-medium text-[rgba(255,255,255,0.65)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#06d6a0] opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#06d6a0]" />
            </span>
            {t.hero.badge}
          </span>
        </motion.div>

        {/* Headline — each line rises out of its own mask */}
        <h1 className="mb-6 text-5xl font-bold leading-[0.92] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
          {headingLines.map((line, index) => (
            <span key={line.text} className="block overflow-hidden py-[0.06em]">
              <motion.span
                className={`block ${line.gradient ? 'gradient-text animate-gradient' : 'text-white'}`}
                custom={index}
                variants={LINE_VARIANTS}
                initial="hidden"
                animate="visible"
              >
                {line.text}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Typed role */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mb-8 font-mono text-lg text-[rgba(255,255,255,0.4)] sm:text-xl"
        >
          {'<'}
          <span className="text-[#06d6a0]">{displayText}</span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="text-[#06d6a0]"
          >
            |
          </motion.span>
          {' />'}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.05 }}
          className="mx-auto mb-9 max-w-xl text-pretty text-base leading-relaxed text-[rgba(255,255,255,0.5)] sm:text-lg"
        >
          {t.hero.description}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <MagneticButton
            as="a"
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition-all hover:bg-[rgba(255,255,255,0.9)]"
            strength={0.3}
          >
            {t.hero.viewWork}
            <motion.span
              className="inline-block"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </MagneticButton>

          <MagneticButton
            as="a"
            href="#contact"
            className="rounded-full border border-white/20 bg-white/[0.03] px-8 py-4 text-sm font-semibold text-white transition-all hover:border-[#06d6a0]/60 hover:bg-[#06d6a0]/10"
            strength={0.3}
          >
            {t.hero.getInTouch}
          </MagneticButton>
        </motion.div>

        {/* Stats */}
        <motion.dl
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.45 }}
          className="mx-auto mt-11 grid max-w-lg grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06]"
        >
          {t.hero.stats.map((stat) => (
            <div key={stat.label} className="bg-[#08080b]/90 px-4 py-4">
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/30">
                {stat.label}
              </dt>
              <dd className="mt-1.5 text-2xl font-bold text-white">{stat.value}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#skills"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{ opacity: contentOpacity }}
        className="absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 sm:block [@media(max-height:880px)]:!hidden"
        aria-label={t.hero.scroll}
        data-hover
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-[rgba(255,255,255,0.3)] transition-colors hover:text-[#06d6a0]"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.3em]">
            {t.hero.scroll}
          </span>
          <ArrowDown className="h-3.5 w-3.5" />
        </motion.span>
      </motion.a>
    </section>
  )
}
