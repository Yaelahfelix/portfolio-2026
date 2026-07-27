'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { AdditiveBlending, BackSide, Color, Group, Vector3 } from 'three'
import {
  glowFragment,
  glowVertex,
  liquidFragment,
  liquidVertex,
} from '@/lib/three/shaders/liquid'
import type { LiveRef } from './types'

interface SceneProps {
  detail: number
  live: LiveRef
  wireframe: boolean
}

/** Metaball-ish crystal driven directly by the slider values. */
export function LiquidScene({ detail, live, wireframe }: SceneProps) {
  const groupRef = useRef<Group>(null)
  const pointer = useMemo(() => new Vector3(0, 0, 1), [])

  const coreUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDistort: { value: 0.35 },
      uSpeed: { value: 1 },
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
    const config = live.current

    coreUniforms.uTime.value += dt
    coreUniforms.uSpeed.value = config.speed
    coreUniforms.uDistort.value += (config.intensity * 0.62 - coreUniforms.uDistort.value) * 0.1
    coreUniforms.uPulse.value += (config.pulse * 0.5 - coreUniforms.uPulse.value) * 0.12
    coreUniforms.uHue.value += (config.hue - coreUniforms.uHue.value) * 0.06
    coreUniforms.uOpacity.value += (config.opacity - coreUniforms.uOpacity.value) * 0.08
    glowUniforms.uHue.value = coreUniforms.uHue.value
    glowUniforms.uIntensity.value = coreUniforms.uOpacity.value

    pointer.set(state.pointer.x * 1.8, state.pointer.y * 1.2, 1).normalize()
    coreUniforms.uPointer.value.lerp(pointer, 0.1)

    if (groupRef.current) {
      groupRef.current.rotation.y += dt * 0.12 * config.speed
    }
  })

  return (
    <group ref={groupRef} scale={1.55}>
      <mesh>
        <icosahedronGeometry args={[1, detail]} />
        <shaderMaterial
          uniforms={coreUniforms}
          vertexShader={liquidVertex}
          fragmentShader={liquidFragment}
          wireframe={wireframe}
          transparent
          depthWrite={false}
        />
      </mesh>

      <mesh scale={1.5}>
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
    </group>
  )
}
