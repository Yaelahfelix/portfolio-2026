'use client'

import { useEffect, useState } from 'react'

export type Tier = 'low' | 'mid' | 'high'

export interface DeviceTier {
  /** Resolved after mount — false during SSR/first paint. */
  ready: boolean
  isTouch: boolean
  reducedMotion: boolean
  tier: Tier
  /** Convenience: skip WebGL entirely and show the CSS fallback. */
  skip3D: boolean
}

const INITIAL: DeviceTier = {
  ready: false,
  isTouch: false,
  reducedMotion: false,
  tier: 'high',
  skip3D: false,
}

function detect(): DeviceTier {
  const isTouch = window.matchMedia('(pointer: coarse)').matches
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const cores = navigator.hardwareConcurrency ?? 4
  const narrow = window.innerWidth < 768

  let tier: Tier = 'high'
  if (narrow || cores <= 4) tier = 'low'
  else if (cores <= 8 || isTouch) tier = 'mid'

  return { ready: true, isTouch, reducedMotion, tier, skip3D: reducedMotion }
}

/**
 * Resolves render quality once on mount and re-resolves when the viewport or
 * the reduced-motion preference changes. Never runs during SSR.
 */
export function useDeviceTier(): DeviceTier {
  const [state, setState] = useState<DeviceTier>(INITIAL)

  useEffect(() => {
    const update = () => setState(detect())
    update()

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    motionQuery.addEventListener('change', update)
    window.addEventListener('resize', update)

    return () => {
      motionQuery.removeEventListener('change', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return state
}

/** Particle counts scaled per tier so low-end devices stay at 60fps. */
export function scaleCount(tier: Tier, high: number): number {
  if (tier === 'low') return Math.round(high * 0.28)
  if (tier === 'mid') return Math.round(high * 0.6)
  return high
}
