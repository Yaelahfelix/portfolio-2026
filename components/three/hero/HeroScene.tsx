'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import { AdditiveBlending, Group } from 'three'
import { ParticleField } from './ParticleField'
import { LiquidCore } from './LiquidCore'
import type { LiveRef } from '../scenes/types'
import type { Tier } from '@/hooks/useDeviceTier'

function OrbitRings({ scrollRef, live }: { scrollRef: { current: number }; live: LiveRef }) {
  const groupRef = useRef<Group>(null)

  const rings = useMemo(
    () => [
      { radius: 2.3, tube: 0.004, tilt: [1.15, 0.2, 0.4], speed: 0.18, color: '#06d6a0' },
      { radius: 2.8, tube: 0.003, tilt: [0.4, 0.9, -0.3], speed: -0.12, color: '#7c3aed' },
      { radius: 3.3, tube: 0.0025, tilt: [1.6, -0.4, 0.9], speed: 0.08, color: '#3b82f6' },
    ],
    []
  )

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05)
    const group = groupRef.current
    if (!group) return

    group.children.forEach((child, index) => {
      child.rotation.z += dt * rings[index].speed
      const material = (child as never as { material: { opacity: number } }).material
      material.opacity += (live.current.opacity * 0.32 - material.opacity) * 0.08
    })
    group.scale.setScalar(1 + scrollRef.current * 0.5)
  })

  return (
    <group ref={groupRef}>
      {rings.map((ring, index) => (
        <mesh key={index} rotation={ring.tilt as [number, number, number]}>
          <torusGeometry args={[ring.radius, ring.tube, 3, 128]} />
          <meshBasicMaterial
            color={ring.color}
            transparent
            opacity={0}
            blending={AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}

interface HeroSceneProps {
  tier: Tier
  scrollRef: { current: number }
  burstRef: { current: number }
  live: LiveRef
}

/** The landing scene: liquid crystal core inside a reactive particle nebula. */
export function HeroScene({ tier, scrollRef, burstRef, live }: HeroSceneProps) {
  return (
    <>
      <LiquidCore tier={tier} scrollRef={scrollRef} burstRef={burstRef} live={live} />
      <ParticleField tier={tier} scrollRef={scrollRef} burstRef={burstRef} live={live} />
      <OrbitRings scrollRef={scrollRef} live={live} />
      {tier === 'high' && (
        <Sparkles count={70} scale={9} size={2.4} speed={0.32} opacity={0.4} color="#9ae6ff" />
      )}
    </>
  )
}
