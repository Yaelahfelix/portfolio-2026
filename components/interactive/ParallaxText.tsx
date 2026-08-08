'use client'

import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useScroll,
} from 'framer-motion'
import { useEffect, useRef } from 'react'

interface ParallaxTextProps {
  children: string
  baseVelocity?: number
  className?: string
}

/**
 * Marquee whose speed picks up with scroll velocity.
 *
 * The offset is written to a MotionValue, never to React state. Calling
 * `setState` from an animation frame re-renders the component sixty times a
 * second — three of these live on the page, each re-rendering a long repeated
 * string — and React's work lands on the same main thread the WebGL backdrop
 * needs. A MotionValue writes the transform straight to the DOM node instead.
 */
export function ParallaxText({ children, baseVelocity = 2, className = '' }: ParallaxTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const baseX = useRef(0)
  const percent = useMotionValue(0)
  const x = useMotionTemplate`${percent}%`

  const { scrollY } = useScroll()
  const prevScrollY = useRef(0)

  // The marquee is decorative; there is no reason to animate it while it is
  // nowhere near the viewport.
  const onScreen = useRef(false)
  useEffect(() => {
    const node = containerRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen.current = entry.isIntersecting
      },
      { rootMargin: '200px' }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useAnimationFrame((_, delta) => {
    const currentScroll = scrollY.get()
    const velocity = currentScroll - prevScrollY.current
    prevScrollY.current = currentScroll

    if (!onScreen.current) return

    const velocityFactor = 1 + Math.min(Math.abs(velocity) * 0.005, 3)
    baseX.current += baseVelocity * velocityFactor * (delta / 1000) * 60

    if (baseX.current > 100) baseX.current = 0
    if (baseX.current < -100) baseX.current = 0

    percent.set(-baseX.current)
  })

  const repeatedText = `${children} · `.repeat(8)

  return (
    <div ref={containerRef} className="overflow-hidden py-6 relative">
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10" />

      <motion.div
        className={`whitespace-nowrap text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-wider opacity-[0.07] ${className}`}
        style={{ x }}
      >
        {repeatedText}
      </motion.div>
    </div>
  )
}
