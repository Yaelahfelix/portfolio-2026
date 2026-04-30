'use client'

import { motion, useScroll, useTransform, useSpring, useAnimationFrame } from 'framer-motion'
import { useRef, useState } from 'react'

interface ParallaxTextProps {
  children: string
  baseVelocity?: number
  className?: string
}

export function ParallaxText({ children, baseVelocity = 2, className = '' }: ParallaxTextProps) {
  const baseX = useRef(0)
  const [position, setPosition] = useState(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useRef(0)
  const prevScrollY = useRef(0)

  useAnimationFrame((_, delta) => {
    const currentScroll = scrollY.get()
    scrollVelocity.current = currentScroll - prevScrollY.current
    prevScrollY.current = currentScroll

    const velocityFactor = 1 + Math.min(Math.abs(scrollVelocity.current) * 0.005, 3)
    baseX.current += baseVelocity * velocityFactor * (delta / 1000) * 60

    if (baseX.current > 100) baseX.current = 0
    if (baseX.current < -100) baseX.current = 0

    setPosition(-baseX.current)
  })

  const repeatedText = `${children} · `.repeat(8)

  return (
    <div className="overflow-hidden py-6 relative">
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10" />

      <motion.div
        className={`whitespace-nowrap text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-wider opacity-[0.07] ${className}`}
        style={{ x: `${position}%` }}
      >
        {repeatedText}
      </motion.div>
    </div>
  )
}
