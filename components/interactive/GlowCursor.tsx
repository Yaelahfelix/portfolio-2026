'use client'

import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

type CursorMode = 'default' | 'hover' | 'drag' | 'text'

const RING_SIZE: Record<CursorMode, number> = {
  default: 34,
  hover: 62,
  drag: 78,
  text: 4,
}

/**
 * Three-layer cursor: a hard dot, a lagging ring that reads context from
 * `data-cursor` / `data-cursor-label`, and a wide ambient glow.
 */
export function GlowCursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)

  const dotX = useSpring(x, { damping: 30, stiffness: 900, mass: 0.25 })
  const dotY = useSpring(y, { damping: 30, stiffness: 900, mass: 0.25 })
  const ringX = useSpring(x, { damping: 26, stiffness: 250, mass: 0.6 })
  const ringY = useSpring(y, { damping: 26, stiffness: 250, mass: 0.6 })
  const glowX = useSpring(x, { damping: 40, stiffness: 60, mass: 1.2 })
  const glowY = useSpring(y, { damping: 40, stiffness: 60, mass: 1.2 })

  const [mode, setMode] = useState<CursorMode>('default')
  const [label, setLabel] = useState<string | null>(null)
  const [pressed, setPressed] = useState(false)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    setEnabled(fine)
    if (!fine) return

    const onMove = (event: MouseEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)
    }

    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      if (!target) return

      const labelled = target.closest<HTMLElement>('[data-cursor-label]')
      const explicit = target.closest<HTMLElement>('[data-cursor]')
      const interactive = target.closest('a, button, [role="button"], [data-hover]')
      const editable = target.closest('input, textarea, [contenteditable="true"]')

      setLabel(labelled?.dataset.cursorLabel ?? null)

      if (explicit?.dataset.cursor === 'drag') setMode('drag')
      else if (editable) setMode('text')
      else if (interactive || labelled) setMode('hover')
      else setMode('default')
    }

    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)
    const onLeave = () => x.set(-200)

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.addEventListener('mouseleave', onLeave)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [x, y])

  if (!enabled) return null

  const ringSize = RING_SIZE[mode] * (pressed ? 0.78 : 1)

  return (
    <>
      {/* Ambient glow */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[1]"
        style={{ x: glowX, y: glowY, translateX: '-50%', translateY: '-50%' }}
      >
        <div
          className="h-[460px] w-[460px] rounded-full opacity-[0.06]"
          style={{
            background:
              'radial-gradient(circle, rgba(6,214,160,0.9) 0%, rgba(124,58,237,0.45) 32%, transparent 70%)',
          }}
        />
      </motion.div>

      {/* Lagging ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998]"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
      >
        <motion.div
          className="flex items-center justify-center rounded-full border backdrop-blur-[1px]"
          animate={{
            width: ringSize,
            height: ringSize,
            borderColor: mode === 'default' ? 'rgba(255,255,255,0.28)' : 'rgba(6,214,160,0.85)',
            backgroundColor:
              mode === 'hover' || mode === 'drag' ? 'rgba(6,214,160,0.08)' : 'rgba(0,0,0,0)',
          }}
          transition={{ type: 'spring', stiffness: 320, damping: 24 }}
        >
          <AnimatePresence>
            {label && (mode === 'hover' || mode === 'drag') && (
              <motion.span
                key={label}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                className="select-none whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.14em] text-[#06d6a0]"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Hard dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
      >
        <motion.div
          className="rounded-full bg-white"
          animate={{
            width: mode === 'text' ? 2 : label ? 0 : 7,
            height: mode === 'text' ? 22 : label ? 0 : 7,
            borderRadius: mode === 'text' ? 2 : 999,
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 28 }}
        />
      </motion.div>
    </>
  )
}
