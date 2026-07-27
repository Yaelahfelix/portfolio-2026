'use client'

import { useEffect, useRef, useState } from 'react'
import { StageCanvas } from '../StageCanvas'
import { SceneDirector } from './SceneDirector'
import { DEFAULT_LIVE, SCENE_PRESETS, type SceneKey, type SceneLive } from '../scenes/types'
import { useDeviceTier } from '@/hooks/useDeviceTier'

/** ms the outgoing scene gets to fade out before it is swapped. */
const CROSSFADE_MS = 420

function GradientFallback() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute left-1/2 top-[22vh] h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(6,214,160,0.20)_0%,rgba(124,58,237,0.14)_45%,transparent_70%)] blur-3xl" />
    </div>
  )
}

/**
 * One WebGL surface for the whole page. Sections declare `data-scene="..."` and
 * the director swaps what is rendered as they come into view, so every section
 * gets its own living backdrop without paying for a second GL context.
 */
export function BackdropCanvas() {
  const { ready, tier, skip3D } = useDeviceTier()

  const live = useRef<SceneLive>({ ...DEFAULT_LIVE, opacity: 0 })
  const scrollRef = useRef(0)
  const burstRef = useRef(0)

  // `active` is what the page is looking at; `mounted` is what WebGL is drawing.
  // They diverge for one crossfade so the outgoing scene can dissolve first.
  const [active, setActive] = useState<SceneKey>('hero')
  const [mounted, setMounted] = useState<SceneKey>('hero')
  const [failed, setFailed] = useState(false)

  // Track which section owns the viewport
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-scene]'))
    if (sections.length === 0) return

    const ratios = new Map<SceneKey, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const key = (entry.target as HTMLElement).dataset.scene as SceneKey
          ratios.set(key, entry.intersectionRatio)
        }

        let best: SceneKey | null = null
        let bestRatio = 0
        ratios.forEach((ratio, key) => {
          if (ratio > bestRatio) {
            bestRatio = ratio
            best = key
          }
        })

        if (best && bestRatio > 0.08) setActive(best)
      },
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [ready])

  // Hero-only scroll progress, drives the dispersal of the landing scene
  useEffect(() => {
    const onScroll = () => {
      scrollRef.current = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1.4)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Clicking anywhere that is not a control sends an impulse through the scene
  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null
      if (target?.closest('a, button, input, textarea, select, [role="button"]')) return
      live.current.pulse = 1
      burstRef.current = 1
    }
    window.addEventListener('pointerdown', onPointerDown)
    return () => window.removeEventListener('pointerdown', onPointerDown)
  }, [])

  // Crossfade: dissolve the current scene, swap it, then bring the new one up
  useEffect(() => {
    if (active === mounted) {
      const preset = SCENE_PRESETS[active]
      Object.assign(live.current, preset)
      return
    }

    live.current.opacity = 0
    const timer = setTimeout(() => {
      Object.assign(live.current, SCENE_PRESETS[active], { opacity: 0 })
      setMounted(active)
    }, CROSSFADE_MS)

    return () => clearTimeout(timer)
  }, [active, mounted])

  if (!ready) return null
  if (skip3D || failed) return <GradientFallback />

  return (
    <StageCanvas
      className="pointer-events-none fixed inset-0 -z-10"
      pauseOffscreen={false}
      camera={{ position: [0, 0, 6.2], fov: 46, near: 0.1, far: 120 }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener('webglcontextlost', () => setFailed(true), { once: true })
      }}
    >
      <SceneDirector
        scene={mounted}
        live={live}
        tier={tier}
        scrollRef={scrollRef}
        burstRef={burstRef}
      />
    </StageCanvas>
  )
}
