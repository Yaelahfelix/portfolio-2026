'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface TextRevealProps {
  children: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

export function TextReveal({ children, className = '', as: Tag = 'h2' }: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.3'],
  })

  const words = children.split(' ')

  return (
    <div ref={ref} className={className}>
      <Tag className="flex flex-wrap">
        {words.map((word, i) => {
          const start = i / words.length
          const end = start + 1 / words.length
          return (
            <Word key={i} range={[start, end]} progress={scrollYProgress}>
              {word}
            </Word>
          )
        })}
      </Tag>
    </div>
  )
}

function Word({
  children,
  range,
  progress,
}: {
  children: string
  range: [number, number]
  progress: any
}) {
  const opacity = useTransform(progress, range, [0.15, 1])
  const y = useTransform(progress, range, [10, 0])

  return (
    <motion.span
      style={{ opacity, y }}
      className="mr-2 md:mr-3 inline-block transition-colors"
    >
      {children}
    </motion.span>
  )
}
