'use client'

import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

const SECTIONS = ['hero', 'skills', 'experience', 'education', 'projects', 'achievements']

/** Thin gradient rail at the top plus a dot ladder tracking the active section. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.4 })
  const glow = useTransform(scrollYProgress, [0, 1], [0.4, 1])

  return (
    <>
      <motion.div
        className="fixed left-0 top-0 z-[120] h-[2px] w-full origin-left"
        style={{
          scaleX,
          opacity: glow,
          background:
            'linear-gradient(90deg, #06d6a0 0%, #3b82f6 45%, #7c3aed 75%, #ec4899 100%)',
          boxShadow: '0 0 12px rgba(6,214,160,0.6)',
        }}
      />

      <nav
        className="fixed right-5 top-1/2 z-[110] hidden -translate-y-1/2 flex-col gap-3 lg:flex"
        aria-label="Section progress"
      >
        {SECTIONS.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            className="group relative flex items-center justify-end"
            aria-label={id}
            data-hover
            data-cursor-label={id}
          >
            <span className="pointer-events-none absolute right-6 whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.18em] text-white/0 transition-all duration-300 group-hover:text-white/60">
              {id}
            </span>
            <span className="block h-[6px] w-[6px] rounded-full bg-white/20 transition-all duration-300 group-hover:scale-150 group-hover:bg-[#06d6a0]" />
          </a>
        ))}
      </nav>
    </>
  )
}
