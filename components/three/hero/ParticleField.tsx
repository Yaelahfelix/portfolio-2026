'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { AdditiveBlending, Color, Points, ShaderMaterial, Vector3 } from 'three'
import { SIMPLEX_3D } from '@/lib/three/glsl'
import { scaleCount, type Tier } from '@/hooks/useDeviceTier'
import type { LiveRef } from '../scenes/types'

const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uSize;
uniform float uAmp;
uniform float uScroll;
uniform float uBurst;
uniform vec3 uMouse;

attribute float aScale;
attribute float aRandom;

varying float vDisp;
varying float vRandom;
varying float vFade;

${SIMPLEX_3D}

void main() {
  vec3 pos = position;
  vec3 dir = normalize(pos + 0.0001);

  // Slow organic breathing of the whole cloud
  float n = snoise(pos * 0.42 + vec3(0.0, uTime * 0.11, 0.0));
  float n2 = snoise(pos * 1.15 - vec3(uTime * 0.08, 0.0, uTime * 0.05));

  pos += dir * n * uAmp;
  pos.x += n2 * 0.22;
  pos.y += n * 0.18;

  // Pointer pushes particles out of the way
  vec3 toMouse = pos - uMouse;
  float dist = length(toMouse);
  float push = 1.35 / (dist * dist + 0.55);
  pos += normalize(toMouse + 0.0001) * push * 0.55;

  // Click burst — everything blows outward then settles
  pos += dir * uBurst * (0.6 + aRandom * 1.4);

  // Scroll disperses the cloud upward and outward
  pos *= 1.0 + uScroll * 0.55;
  pos.y -= uScroll * 1.6;

  vDisp = n;
  vRandom = aRandom;
  vFade = 1.0 - smoothstep(0.55, 1.0, uScroll);

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = uSize * aScale * (1.0 / max(-mvPosition.z, 0.1));
}
`

const fragmentShader = /* glsl */ `
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
uniform float uOpacity;

varying float vDisp;
varying float vRandom;
varying float vFade;

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  if (d > 0.5) discard;

  // Soft round sprite with a hot centre
  float alpha = smoothstep(0.5, 0.0, d);
  alpha = pow(alpha, 2.4);
  float core = smoothstep(0.16, 0.0, d);

  vec3 color = mix(uColorA, uColorB, smoothstep(-0.7, 0.7, vDisp));
  color = mix(color, uColorC, step(0.965, vRandom));
  color += core * 0.6;

  gl_FragColor = vec4(color, alpha * uOpacity * vFade);
}
`

interface ParticleFieldProps {
  tier: Tier
  scrollRef: { current: number }
  burstRef: { current: number }
  live: LiveRef
}

export function ParticleField({ tier, scrollRef, burstRef, live }: ParticleFieldProps) {
  const pointsRef = useRef<Points>(null)
  const materialRef = useRef<ShaderMaterial>(null)
  const target = useMemo(() => new Vector3(), [])

  const count = scaleCount(tier, 26000)

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const scales = new Float32Array(count)
    const randoms = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      // Bias toward the shell so the middle stays readable behind the headline
      const radius = 1.45 + Math.pow(Math.random(), 0.65) * 2.75
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.cos(phi) * 0.74
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta)

      scales[i] = 0.35 + Math.random() * 1.5
      randoms[i] = Math.random()
    }

    return { positions, scales, randoms }
  }, [count])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 20 },
      uAmp: { value: 0.34 },
      uScroll: { value: 0 },
      uBurst: { value: 0 },
      uMouse: { value: new Vector3(99, 99, 99) },
      uColorA: { value: new Color('#06d6a0') },
      uColorB: { value: new Color('#7c3aed') },
      uColorC: { value: new Color('#ffffff') },
      uOpacity: { value: 0 },
    }),
    []
  )

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05)
    uniforms.uTime.value += dt
    uniforms.uScroll.value += (scrollRef.current - uniforms.uScroll.value) * 0.08
    uniforms.uOpacity.value += (live.current.opacity * 0.95 - uniforms.uOpacity.value) * 0.08

    // Decay the click impulse back to rest
    burstRef.current *= 1 - Math.min(dt * 2.4, 1)
    uniforms.uBurst.value += (burstRef.current - uniforms.uBurst.value) * 0.12

    target.set(
      state.pointer.x * state.viewport.width * 0.5,
      state.pointer.y * state.viewport.height * 0.5,
      0.4
    )
    uniforms.uMouse.value.lerp(target, 0.07)

    if (pointsRef.current) {
      pointsRef.current.rotation.y += dt * 0.042
      pointsRef.current.rotation.x = Math.sin(uniforms.uTime.value * 0.12) * 0.08
    }
  })

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[geometry.positions, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[geometry.scales, 1]} />
        <bufferAttribute attach="attributes-aRandom" args={[geometry.randoms, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  )
}
