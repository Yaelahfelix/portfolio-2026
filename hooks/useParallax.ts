'use client'

import { useScroll, useTransform, useSpring, MotionValue } from 'framer-motion'
import { useRef } from 'react'

interface ParallaxOptions {
  offset?: number
  clamp?: boolean
}

export function useParallax(range: number = 100, options: ParallaxOptions = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const { offset = 0, clamp = true } = options

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [range + offset, -range + offset],
    { clamp }
  )

  const smoothY = useSpring(y, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return { ref, y: smoothY, scrollYProgress }
}

export function useScrollProgress() {
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return smoothProgress
}
