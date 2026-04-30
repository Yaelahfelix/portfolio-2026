'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function SectionTransition() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const scaleX = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <div ref={ref} className="py-8 flex items-center justify-center">
      <motion.div
        className="h-[1px] w-full max-w-md mx-auto relative overflow-hidden"
        style={{ opacity }}
      >
        <motion.div
          className="h-full w-full"
          style={{
            scaleX,
            background: 'linear-gradient(90deg, transparent, rgba(6, 214, 160, 0.5), rgba(124, 58, 237, 0.5), transparent)',
            transformOrigin: 'center',
          }}
        />
      </motion.div>
    </div>
  )
}
