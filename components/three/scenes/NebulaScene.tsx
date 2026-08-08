'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { AdditiveBlending, Color, Points, Vector3, Vector4 } from 'three'
import { SIMPLEX_3D, UTILS } from '@/lib/three/glsl'
import { SHAPES } from '@/lib/three/shapes'
import type { LiveRef } from './types'

const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uSpeed;
uniform float uIntensity;
uniform float uPulse;
uniform float uSize;
uniform vec4 uWeights;
uniform vec3 uPointer;

attribute vec3 aShape1;
attribute vec3 aShape2;
attribute vec3 aShape3;
attribute float aScale;
attribute float aRandom;

varying float vGlow;
varying float vRandom;

${SIMPLEX_3D}

void main() {
  // Blend the four target shapes on the GPU
  vec3 pos = position * uWeights.x
           + aShape1 * uWeights.y
           + aShape2 * uWeights.z
           + aShape3 * uWeights.w;

  float t = uTime * uSpeed;
  vec3 turbulence = vec3(
    snoise(pos * 0.68 + vec3(t * 0.28, 0.0, 0.0)),
    snoise(pos * 0.68 + vec3(0.0, t * 0.28, 11.7)),
    snoise(pos * 0.68 + vec3(23.4, 0.0, t * 0.28))
  );
  pos += turbulence * uIntensity * 0.62;

  // Pointer shoves particles aside
  vec3 toPointer = pos - uPointer;
  float dist = length(toPointer);
  pos += normalize(toPointer + 0.0001) * (1.1 / (dist * dist + 0.5)) * 0.55;

  // Click impulse
  pos += normalize(pos + 0.0001) * uPulse;

  vGlow = clamp(length(turbulence) * 0.55, 0.0, 1.0);
  vRandom = aRandom;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = uSize * aScale * (1.0 / max(-mvPosition.z, 0.1));
}
`

const fragmentShader = /* glsl */ `
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
uniform float uHue;
uniform float uOpacity;

varying float vGlow;
varying float vRandom;

${UTILS}

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  if (d > 0.5) discard;

  float alpha = pow(smoothstep(0.5, 0.0, d), 2.2);
  vec3 color = mix(uColorA, uColorB, vGlow);
  color = mix(color, uColorC, step(0.97, vRandom));
  color += smoothstep(0.15, 0.0, d) * 0.5;

  gl_FragColor = vec4(hueShift(color, uHue), alpha * 0.92 * uOpacity);
}
`

interface SceneProps {
  count: number
  live: LiveRef
}

type NebulaBuffers = {
  shapes: Float32Array[]
  scales: Float32Array
  randoms: Float32Array
}

/**
 * Four full point clouds plus two scalar streams. This scene is mounted by both
 * the skills and achievements sections and is torn down between them, so the
 * generators would otherwise run several times per visit — each run is a
 * blocking loop over `count` that lands as a scroll stutter.
 */
const cache = new Map<number, NebulaBuffers>()

function buildNebula(count: number): NebulaBuffers {
  const hit = cache.get(count)
  if (hit) return hit

  const shapes = SHAPES.map((shape) => shape.generate(count))
  const scales = new Float32Array(count)
  const randoms = new Float32Array(count)
  for (let i = 0; i < count; i++) {
    scales[i] = 0.4 + Math.random() * 1.5
    randoms[i] = Math.random()
  }

  const built = { shapes, scales, randoms }
  cache.set(count, built)
  return built
}

/** Particle cloud that morphs between sphere, knot, cube and galaxy. */
export function NebulaScene({ count, live }: SceneProps) {
  const pointsRef = useRef<Points>(null)
  const pointerTarget = useMemo(() => new Vector3(), [])
  const weightTarget = useMemo(() => new Vector4(1, 0, 0, 0), [])

  const attributes = useMemo(() => buildNebula(count), [count])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSpeed: { value: 1 },
      uIntensity: { value: 0.75 },
      uPulse: { value: 0 },
      // Nudged up to keep the cloud reading as dense with fewer sprites
      uSize: { value: 26 },
      uHue: { value: 0 },
      uOpacity: { value: 0 },
      uWeights: { value: new Vector4(1, 0, 0, 0) },
      uPointer: { value: new Vector3(99, 99, 99) },
      uColorA: { value: new Color('#06d6a0') },
      uColorB: { value: new Color('#7c3aed') },
      uColorC: { value: new Color('#ffffff') },
    }),
    []
  )

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05)
    const config = live.current

    uniforms.uTime.value += dt
    uniforms.uSpeed.value = config.speed
    uniforms.uIntensity.value = config.intensity
    uniforms.uHue.value += (config.hue - uniforms.uHue.value) * 0.06
    uniforms.uOpacity.value += (config.opacity - uniforms.uOpacity.value) * 0.08
    uniforms.uPulse.value += (config.pulse * 0.9 - uniforms.uPulse.value) * 0.14

    // Ease the one-hot weight vector toward the selected shape
    const index = Math.max(0, Math.min(3, Math.round(config.shape)))
    weightTarget.set(
      index === 0 ? 1 : 0,
      index === 1 ? 1 : 0,
      index === 2 ? 1 : 0,
      index === 3 ? 1 : 0
    )
    uniforms.uWeights.value.lerp(weightTarget, 0.055)

    pointerTarget.set(
      state.pointer.x * state.viewport.width * 0.5,
      state.pointer.y * state.viewport.height * 0.5,
      0.3
    )
    uniforms.uPointer.value.lerp(pointerTarget, 0.08)

    if (pointsRef.current) {
      pointsRef.current.rotation.y += dt * 0.09 * config.speed
    }
  })

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[attributes.shapes[0], 3]} />
        <bufferAttribute attach="attributes-aShape1" args={[attributes.shapes[1], 3]} />
        <bufferAttribute attach="attributes-aShape2" args={[attributes.shapes[2], 3]} />
        <bufferAttribute attach="attributes-aShape3" args={[attributes.shapes[3], 3]} />
        <bufferAttribute attach="attributes-aScale" args={[attributes.scales, 1]} />
        <bufferAttribute attach="attributes-aRandom" args={[attributes.randoms, 1]} />
      </bufferGeometry>
      <shaderMaterial
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
