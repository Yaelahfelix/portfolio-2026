'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { AdditiveBlending, BackSide, Color, Group, Mesh, MeshBasicMaterial, Vector3 } from 'three'
import {
  glowFragment,
  glowVertex,
  liquidFragment,
  liquidVertex,
} from '@/lib/three/shaders/liquid'
import type { Tier } from '@/hooks/useDeviceTier'
import type { LiveRef } from '../scenes/types'

interface LiquidCoreProps {
  tier: Tier
  scrollRef: { current: number }
  burstRef: { current: number }
  live: LiveRef
}

/** The centrepiece: an iridescent liquid crystal that bulges toward the cursor. */
export function LiquidCore({ tier, scrollRef, burstRef, live }: LiquidCoreProps) {
  const groupRef = useRef<Group>(null)
  const cageRef = useRef<Mesh>(null)
  const cageMaterialRef = useRef<MeshBasicMaterial>(null)
  const pointer = useMemo(() => new Vector3(0, 0, 1), [])

  const detail = tier === 'low' ? 3 : tier === 'mid' ? 4 : 5

  const coreUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDistort: { value: 0.3 },
      uSpeed: { value: 0.65 },
      uPulse: { value: 0 },
      uHue: { value: 0 },
      uOpacity: { value: 0 },
      uPointer: { value: new Vector3(0, 0, 1) },
      uColorA: { value: new Color('#06d6a0') },
      uColorB: { value: new Color('#7c3aed') },
      uColorC: { value: new Color('#ffffff') },
    }),
    []
  )

  const glowUniforms = useMemo(
    () => ({
      uColorA: { value: new Color('#06d6a0') },
      uColorB: { value: new Color('#7c3aed') },
      uIntensity: { value: 1 },
      uHue: { value: 0 },
    }),
    []
  )

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05)
    coreUniforms.uTime.value += dt

    pointer.set(state.pointer.x * 1.7, state.pointer.y * 1.1, 1).normalize()
    coreUniforms.uPointer.value.lerp(pointer, 0.09)

    const targetPulse = burstRef.current * 0.45
    coreUniforms.uPulse.value += (targetPulse - coreUniforms.uPulse.value) * 0.12

    const fade = live.current.opacity
    coreUniforms.uOpacity.value += (fade - coreUniforms.uOpacity.value) * 0.08

    const scroll = scrollRef.current
    glowUniforms.uIntensity.value = Math.max(1 - scroll * 1.4, 0) * coreUniforms.uOpacity.value

    if (groupRef.current) {
      groupRef.current.rotation.y += dt * 0.16
      groupRef.current.rotation.z = Math.sin(coreUniforms.uTime.value * 0.22) * 0.09
      groupRef.current.scale.setScalar(Math.max(1 - scroll * 0.35, 0.4))
      groupRef.current.position.y = -scroll * 1.1
    }

    if (cageMaterialRef.current) {
      cageMaterialRef.current.opacity = coreUniforms.uOpacity.value * 0.12
    }

    if (cageRef.current) {
      cageRef.current.rotation.x -= dt * 0.22
      cageRef.current.rotation.y += dt * 0.13
    }
  })

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[1, detail]} />
        <shaderMaterial
          uniforms={coreUniforms}
          vertexShader={liquidVertex}
          fragmentShader={liquidFragment}
        />
      </mesh>

      {/* Atmosphere shell */}
      <mesh scale={1.55}>
        <sphereGeometry args={[1, 48, 48]} />
        <shaderMaterial
          uniforms={glowUniforms}
          vertexShader={glowVertex}
          fragmentShader={glowFragment}
          transparent
          depthWrite={false}
          side={BackSide}
          blending={AdditiveBlending}
        />
      </mesh>

      {/* Wireframe cage */}
      <mesh ref={cageRef} scale={1.9}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial
          ref={cageMaterialRef}
          color="#06d6a0"
          wireframe
          transparent
          opacity={0}
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </mesh>
    </group>
  )
}
