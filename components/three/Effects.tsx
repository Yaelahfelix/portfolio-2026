'use client'

import { Bloom, EffectComposer } from '@react-three/postprocessing'
import type { Tier } from '@/hooks/useDeviceTier'

interface EffectsProps {
  tier: Tier
}

/**
 * Shared post stack — bloom only.
 *
 * Grain and vignette used to live here as two extra full-screen passes. They are
 * static overlays, so they now render once as CSS (see `BackdropCanvas`) instead
 * of being recomputed at 60fps.
 *
 * Every prop here must stay constant for the lifetime of the canvas.
 * `@react-three/postprocessing` memoises an effect's constructor `args` on
 * `JSON.stringify(props)`, so changing *any* prop rebuilds the effect object,
 * which makes the composer relink its shader — a synchronous driver call that
 * lands as a freeze. Bloom intensity used to be tuned per section, so the page
 * paid that stall on every scroll between sections. It is a fixed value now.
 *
 * `levels` is the mipmap chain depth — each level is a downsample plus an
 * upsample pass, so trimming it from the default 8 is the cheapest real saving
 * bloom has to offer. The glow gets slightly tighter, nothing more.
 *
 * Skipped entirely on low-tier devices.
 */
export function Effects({ tier }: EffectsProps) {
  if (tier === 'low') return null

  const mid = tier === 'mid'

  return (
    <EffectComposer multisampling={0} enableNormalPass={false}>
      <Bloom
        mipmapBlur
        levels={mid ? 5 : 6}
        intensity={mid ? 0.62 : 0.95}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.5}
        radius={0.78}
      />
    </EffectComposer>
  )
}
