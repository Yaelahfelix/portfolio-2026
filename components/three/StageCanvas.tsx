'use client'

import { Suspense, useEffect, useRef, useState, type ReactNode } from 'react'
import { Canvas, type CanvasProps } from '@react-three/fiber'
import { AdaptiveDpr, Preload } from '@react-three/drei'

interface StageCanvasProps extends Omit<CanvasProps, 'children'> {
  children: ReactNode
  className?: string
  /** Rendering halts while the canvas is scrolled out of view. */
  pauseOffscreen?: boolean
}

/**
 * Every WebGL surface on the site goes through here so the perf policy lives in
 * one place: capped DPR, no antialias (bloom hides the aliasing), adaptive
 * resolution under load, and a hard stop when the canvas leaves the viewport.
 */
export function StageCanvas({
  children,
  className = '',
  pauseOffscreen = true,
  gl,
  dpr = [1, 1.75],
  ...rest
}: StageCanvasProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(!pauseOffscreen)

  useEffect(() => {
    if (!pauseOffscreen) return
    const node = wrapperRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: '160px' }
    )
    observer.observe(node)

    const onVisibilityChange = () => {
      if (document.hidden) setVisible(false)
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [pauseOffscreen])

  return (
    <div ref={wrapperRef} className={className}>
      <Canvas
        dpr={dpr}
        frameloop={visible ? 'always' : 'never'}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
          ...gl,
        }}
        {...rest}
      >
        <Suspense fallback={null}>{children}</Suspense>
        <AdaptiveDpr pixelated={false} />
        <Preload all />
      </Canvas>
    </div>
  )
}
