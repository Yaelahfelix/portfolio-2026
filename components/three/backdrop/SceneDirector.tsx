'use client'

import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { easing } from 'maath'
import { HeroScene } from '../hero/HeroScene'
import { NebulaScene } from '../scenes/NebulaScene'
import { LiquidScene } from '../scenes/LiquidScene'
import { TerrainScene } from '../scenes/TerrainScene'
import { VortexScene } from '../scenes/VortexScene'
import { Effects } from '../Effects'
import { SCENE_OFFSETS, SCENE_SCALES, type LiveRef, type SceneKey } from '../scenes/types'
import { scaleCount, type Tier } from '@/hooks/useDeviceTier'

/** Where the camera sits for each scene, before pointer parallax. */
const CAMERA_TARGETS: Record<SceneKey, [number, number, number]> = {
  hero: [0, 0, 6.2],
  skills: [0, 0.4, 7.8],
  experience: [0, 2.2, 8.4],
  education: [0, 3.2, 9.2],
  projects: [0, 0, 7],
  achievements: [0, 0.2, 7.6],
}

/**
 * The canvas is `pointer-events: none` so the page stays clickable, which means
 * R3F never receives pointer events. Feed it the window pointer instead so every
 * scene keeps reacting to the cursor.
 */
function GlobalPointer() {
  const pointer = useThree((state) => state.pointer)

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointer.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      )
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [pointer])

  return null
}

/** Eases the camera between scene framings and adds cursor parallax. */
function Rig({ scene, scrollRef }: { scene: SceneKey; scrollRef: { current: number } }) {
  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05)
    const [x, y, z] = CAMERA_TARGETS[scene]
    const heroPush = scene === 'hero' ? scrollRef.current * 2.2 : 0

    easing.damp3(
      state.camera.position,
      [x + state.pointer.x * 0.5, y + state.pointer.y * 0.35, z + heroPush],
      0.6,
      dt
    )
    state.camera.lookAt(0, scene === 'education' ? -0.6 : 0, 0)
  })

  return null
}

/** Decays the shared click impulse so every scene reacts the same way. */
function PulseDecay({ live }: { live: LiveRef }) {
  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05)
    live.current.pulse *= 1 - Math.min(dt * 2.2, 1)
    if (live.current.pulse < 0.001) live.current.pulse = 0
  })
  return null
}

interface SceneDirectorProps {
  scene: SceneKey
  live: LiveRef
  tier: Tier
  scrollRef: { current: number }
  burstRef: { current: number }
}

export function SceneDirector({ scene, live, tier, scrollRef, burstRef }: SceneDirectorProps) {
  // These are the three knobs that decide the frame budget. The particle clouds
  // are additive and full-screen, so their real cost is overdraw, not vertex
  // count — past ~10k the extra points land on pixels that are already white.
  const particles = scaleCount(tier, 9000)
  const detail = tier === 'low' ? 2 : tier === 'mid' ? 3 : 4
  // The terrain grid *is* the visual, so it keeps more of its density than the
  // others — its vertex shader got 1.6x cheaper, which pays for the resolution.
  const segments = tier === 'low' ? 72 : tier === 'mid' ? 112 : 160

  return (
    <>
      <GlobalPointer />
      <Rig scene={scene} scrollRef={scrollRef} />
      <PulseDecay live={live} />

      {/*
        Every scene stays mounted and is hidden with `visible`, rather than being
        conditionally rendered.

        Unmounting disposed the geometry and the material, so scrolling back into
        a section had to re-upload its buffers and, far worse, compile and link
        its shader program again — a synchronous GPU driver call that lands as a
        freeze in the middle of a scroll. Hidden objects are skipped when the
        render list is built, so the only ongoing cost is each scene's `useFrame`
        doing a handful of lerps.
      */}
      <group position={SCENE_OFFSETS[scene]} scale={SCENE_SCALES[scene]}>
        <group visible={scene === 'hero'}>
          <HeroScene tier={tier} scrollRef={scrollRef} burstRef={burstRef} live={live} />
        </group>
        <group visible={scene === 'skills' || scene === 'achievements'}>
          <NebulaScene count={particles} live={live} />
        </group>
        <group visible={scene === 'experience'}>
          <VortexScene count={particles} live={live} />
        </group>
        <group visible={scene === 'education'}>
          <TerrainScene segments={segments} live={live} wireframe />
        </group>
        <group visible={scene === 'projects'}>
          <LiquidScene detail={detail} live={live} wireframe={false} />
        </group>
      </group>

      {/* No per-scene props — see Effects for why they must not change. */}
      <Effects tier={tier} />
    </>
  )
}
