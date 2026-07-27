'use client'

import { Bloom, EffectComposer, Noise, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import type { Tier } from '@/hooks/useDeviceTier'

interface EffectsProps {
  tier: Tier
  /** Bloom strength. 0 disables the whole composer. */
  intensity?: number
  vignette?: boolean
  grain?: boolean
}

/**
 * Shared post stack. Skipped entirely on low-tier devices — mipmap bloom is the
 * most expensive thing in these scenes by a wide margin.
 */
export function Effects({ tier, intensity = 1, vignette = true, grain = true }: EffectsProps) {
  if (tier === 'low' || intensity <= 0) return null

  const passes = [
    <Bloom
      key="bloom"
      mipmapBlur
      intensity={intensity * (tier === 'mid' ? 0.7 : 1.1)}
      luminanceThreshold={0.2}
      luminanceSmoothing={0.5}
      radius={0.78}
    />,
  ]

  if (grain) {
    passes.push(
      <Noise key="noise" premultiply blendFunction={BlendFunction.SOFT_LIGHT} opacity={0.28} />
    )
  }

  if (vignette) {
    passes.push(<Vignette key="vignette" eskil={false} offset={0.25} darkness={0.8} />)
  }

  return (
    <EffectComposer multisampling={0} enableNormalPass={false}>
      {passes}
    </EffectComposer>
  )
}
