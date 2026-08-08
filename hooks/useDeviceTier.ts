'use client'

import { useEffect, useState } from 'react'

export type Tier = 'low' | 'mid' | 'high'

export interface DeviceTier {
  /** Resolved after mount — false during SSR/first paint. */
  ready: boolean
  isTouch: boolean
  reducedMotion: boolean
  tier: Tier
  /**
   * Canvas pixel ratio. Fixed for the session — see `StageCanvas` for why this
   * must not adapt at runtime.
   */
  dpr: number
  /** Convenience: skip WebGL entirely and show the CSS fallback. */
  skip3D: boolean
}

const INITIAL: DeviceTier = {
  ready: false,
  isTouch: false,
  reducedMotion: false,
  tier: 'high',
  dpr: 1,
  skip3D: false,
}

/**
 * These scenes are fragment-bound, so pixel count is the single biggest lever —
 * cost scales with the square of this number.
 *
 * Deliberately below 1. The backdrop is out-of-focus particles and bloom sitting
 * behind a dark scrim, and bloom throws away high-frequency detail anyway, so
 * upscaling a smaller buffer is close to invisible. All the text and UI is DOM,
 * which stays pixel-sharp regardless of what happens here.
 */
const TIER_DPR: Record<Tier, number> = { low: 0.7, mid: 0.85, high: 1 }

function detect(): DeviceTier {
  const isTouch = window.matchMedia('(pointer: coarse)').matches
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const cores = navigator.hardwareConcurrency ?? 4
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8
  const narrow = window.innerWidth < 768

  let tier: Tier = 'high'
  if (narrow || cores <= 4 || memory <= 4) tier = 'low'
  else if (cores <= 8 || isTouch || memory <= 8) tier = 'mid'

  return {
    ready: true,
    isTouch,
    reducedMotion,
    tier,
    dpr: TIER_DPR[tier],
    skip3D: reducedMotion,
  }
}

function same(a: DeviceTier, b: DeviceTier) {
  return (
    a.ready === b.ready &&
    a.isTouch === b.isTouch &&
    a.reducedMotion === b.reducedMotion &&
    a.tier === b.tier &&
    a.skip3D === b.skip3D
  )
}

/**
 * Resolves render quality once on mount and re-resolves when the viewport or
 * the reduced-motion preference changes. Never runs during SSR.
 *
 * Resize is debounced and the result is compared field-by-field: mobile address
 * bars fire `resize` continuously while scrolling, and every state change here
 * re-renders the whole WebGL tree.
 */
export function useDeviceTier(): DeviceTier {
  const [state, setState] = useState<DeviceTier>(INITIAL)

  useEffect(() => {
    const apply = () => setState((prev) => {
      const next = detect()
      return same(prev, next) ? prev : next
    })
    apply()

    let timer: ReturnType<typeof setTimeout>
    const onResize = () => {
      clearTimeout(timer)
      timer = setTimeout(apply, 250)
    }

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    motionQuery.addEventListener('change', apply)
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      clearTimeout(timer)
      motionQuery.removeEventListener('change', apply)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return state
}

/** Particle counts scaled per tier so low-end devices stay at 60fps. */
export function scaleCount(tier: Tier, high: number): number {
  if (tier === 'low') return Math.round(high * 0.3)
  if (tier === 'mid') return Math.round(high * 0.6)
  return high
}
