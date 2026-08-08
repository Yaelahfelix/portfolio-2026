'use client'

import { Suspense, useEffect, useRef, useState, type ReactNode } from 'react'
import { Canvas, type CanvasProps } from '@react-three/fiber'
import { Preload } from '@react-three/drei'

interface StageCanvasProps extends Omit<CanvasProps, 'children'> {
  children: ReactNode
  className?: string
  /** Rendering halts while the canvas is scrolled out of view. */
  pauseOffscreen?: boolean
  /** Pixel ratio for this surface. Fixed for the lifetime of the canvas. */
  dpr?: number
}

/**
 * Every WebGL surface on the site goes through here so the perf policy lives in
 * one place: a fixed per-tier DPR, no antialias (bloom hides the aliasing), a
 * hard stop when the canvas leaves the viewport, and a hard stop whenever the
 * tab is in the background.
 *
 * The pixel ratio is deliberately *not* adaptive. Changing it at runtime calls
 * `WebGLRenderer.setSize`, which reallocates every render target and forces the
 * post-processing chain to relink its shaders — a stall of several hundred
 * milliseconds. A resolution controller that reacts to frame times therefore
 * spends its life causing the drops it is trying to fix. A stable, slightly
 * conservative resolution beats a clever oscillating one.
 */
export function StageCanvas({
  children,
  className = '',
  pauseOffscreen = true,
  dpr = 1.25,
  gl,
  ...rest
}: StageCanvasProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [onScreen, setOnScreen] = useState(!pauseOffscreen)
  const [tabVisible, setTabVisible] = useState(true)

  // A background tab still runs rAF in some browsers, and always burns GPU on
  // the compositor. Stop the loop outright.
  useEffect(() => {
    const onVisibilityChange = () => setTabVisible(!document.hidden)
    onVisibilityChange()
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => document.removeEventListener('visibilitychange', onVisibilityChange)
  }, [])

  useEffect(() => {
    if (!pauseOffscreen) return
    const node = wrapperRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { rootMargin: '160px' }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [pauseOffscreen])

  const running = onScreen && tabVisible

  return (
    <div ref={wrapperRef} className={className}>
      <Canvas
        dpr={dpr}
        frameloop={running ? 'always' : 'never'}
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
        {/* Compiles every material up front — including the ones currently
            hidden — so no scene change ever links a shader mid-scroll. */}
        <Preload all />
      </Canvas>
    </div>
  )
}
