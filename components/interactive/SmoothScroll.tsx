'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

let lenisInstance: Lenis | null = null

/** Lets any component drive the smooth scroller (navbar links, back-to-top). */
export function scrollTo(target: string | HTMLElement | number, offset = 0) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset, duration: 1.35 })
    return
  }
  // Reduced motion or Lenis disabled — fall back to the platform
  if (typeof target === 'number') {
    window.scrollTo({ top: target + offset })
    return
  }
  const node = typeof target === 'string' ? document.querySelector(target) : target
  node?.scrollIntoView({ block: 'start' })
}

export function stopScroll() {
  lenisInstance?.stop()
}

export function startScroll() {
  lenisInstance?.start()
}

/**
 * Inertial scrolling. Everything downstream (parallax, scroll-linked shaders)
 * inherits the eased motion because Lenis still drives real window scroll.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.8,
      lerp: 0.09,
    })
    lenisInstance = lenis

    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    // Route in-page anchors through Lenis so jumps are eased too
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return
      const anchor = (event.target as HTMLElement | null)?.closest('a')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href || !href.startsWith('#') || href === '#') return

      const node = document.querySelector(href)
      if (!node) return

      event.preventDefault()
      lenis.scrollTo(node as HTMLElement, { offset: -80, duration: 1.35 })
      history.replaceState(null, '', href)
    }
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      cancelAnimationFrame(frame)
      lenis.destroy()
      lenisInstance = null
    }
  }, [])

  return null
}
