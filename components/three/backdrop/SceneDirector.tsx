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
  const particles = scaleCount(tier, 24000)
  const detail = tier === 'low' ? 3 : tier === 'mid' ? 4 : 5
  const segments = tier === 'low' ? 110 : tier === 'mid' ? 170 : 230

  return (
    <>
      <GlobalPointer />
      <Rig scene={scene} scrollRef={scrollRef} />
      <PulseDecay live={live} />

      <group position={SCENE_OFFSETS[scene]} scale={SCENE_SCALES[scene]}>
        {scene === 'hero' && (
          <HeroScene tier={tier} scrollRef={scrollRef} burstRef={burstRef} live={live} />
        )}
        {(scene === 'skills' || scene === 'achievements') && (
          <NebulaScene count={particles} live={live} />
        )}
        {scene === 'experience' && <VortexScene count={particles} live={live} />}
        {scene === 'education' && <TerrainScene segments={segments} live={live} wireframe />}
        {scene === 'projects' && <LiquidScene detail={detail} live={live} wireframe={false} />}
      </group>

      <Effects tier={tier} intensity={scene === 'hero' ? 1.05 : 0.8} />
    </>
  )
}
