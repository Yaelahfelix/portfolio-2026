'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const GLYPHS = '!<>-_\\/[]{}—=+*^?#$%&01'

interface ScrambleTextProps {
  children: string
  className?: string
  /** ms per character before it locks into place */
  speed?: number
  /** 'view' decodes once on scroll-in, 'hover' re-decodes on every hover */
  trigger?: 'view' | 'hover' | 'both'
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p' | 'div'
}

/** Terminal-style decode: glyph noise resolving into the real string. */
export function ScrambleText({
  children,
  className = '',
  speed = 28,
  trigger = 'view',
  as: Tag = 'span',
}: ScrambleTextProps) {
  const ref = useRef<HTMLElement>(null)
  const frameRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const inView = useInView(ref, { once: trigger === 'view', margin: '-15% 0px' })
  const [output, setOutput] = useState(children)

  const run = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    const target = children
    const total = target.length
    frameRef.current = 0

    // Each character gets its own reveal moment, staggered left to right
    const reveals = Array.from({ length: total }, (_, i) => i * (speed / 16) + Math.random() * 8)

    const tick = () => {
      const frame = frameRef.current
      let done = 0
      let next = ''

      for (let i = 0; i < total; i++) {
        const char = target[i]
        if (char === ' ') {
          next += ' '
          done++
          continue
        }
        if (frame >= reveals[i]) {
          next += char
          done++
        } else {
          next += GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        }
      }

      setOutput(next)
      frameRef.current += 1

      if (done < total) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        rafRef.current = null
      }
    }

    rafRef.current = requestAnimationFrame(tick)
  }, [children, speed])

  useEffect(() => {
    if (trigger === 'hover') return
    if (inView) run()
  }, [inView, run, trigger])

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const hoverProps =
    trigger === 'hover' || trigger === 'both' ? { onMouseEnter: run } : {}

  return (
    <Tag ref={ref as never} className={className} {...hoverProps}>
      {output}
    </Tag>
  )
}
