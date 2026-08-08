'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { AdditiveBlending, BackSide, Color, Points, Vector3 } from 'three'
import { SIMPLEX_3D, UTILS } from '@/lib/three/glsl'
import type { LiveRef } from './types'

const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uSpeed;
uniform float uIntensity;
uniform float uPulse;
uniform float uSize;
uniform vec3 uPointer;

attribute float aRadius;
attribute float aAngle;
attribute float aHeight;
attribute float aRate;
attribute float aScale;

varying float vRadius;
varying float vSpark;

${SIMPLEX_3D}

void main() {
  // Inner particles orbit faster — reads as a real accretion disc
  float orbit = uTime * uSpeed * (0.35 + aRate * 0.5) / (aRadius * 0.32 + 0.35);
  float angle = aAngle + orbit;

  float wobble = snoise(vec3(aRadius * 1.6, aAngle * 0.8, uTime * uSpeed * 0.25));
  float radius = aRadius * (1.0 + wobble * 0.06 * uIntensity) + uPulse * 0.9;

  vec3 pos = vec3(
    cos(angle) * radius,
    aHeight * (0.35 + uIntensity * 0.9) + wobble * 0.22 * uIntensity,
    sin(angle) * radius
  );

  // Pointer bends the disc like a mass dropped on a sheet
  vec3 toPointer = uPointer - pos;
  float dist = length(toPointer);
  pos += normalize(toPointer + 0.0001) * (0.85 / (dist * dist + 0.7)) * uIntensity;

  vRadius = clamp(radius / 3.4, 0.0, 1.0);
  vSpark = smoothstep(0.9, 0.25, radius);

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

varying float vRadius;
varying float vSpark;

${UTILS}

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  if (d > 0.5) discard;

  float alpha = pow(smoothstep(0.5, 0.0, d), 2.0);
  vec3 color = mix(uColorC, uColorA, smoothstep(0.0, 0.45, vRadius));
  color = mix(color, uColorB, smoothstep(0.45, 1.0, vRadius));
  color += vSpark * 0.8;

  gl_FragColor = vec4(hueShift(color, uHue), alpha * 0.9 * uOpacity);
}
`

interface SceneProps {
  count: number
  live: LiveRef
}

type DiscBuffers = {
  positions: Float32Array
  radius: Float32Array
  angle: Float32Array
  height: Float32Array
  rate: Float32Array
  scale: Float32Array
}

/** Survives unmount so scrolling past the experience section twice is free. */
const cache = new Map<number, DiscBuffers>()

function buildDisc(count: number): DiscBuffers {
  const hit = cache.get(count)
  if (hit) return hit

  const positions = new Float32Array(count * 3)
  const radius = new Float32Array(count)
  const angle = new Float32Array(count)
  const height = new Float32Array(count)
  const rate = new Float32Array(count)
  const scale = new Float32Array(count)

  for (let i = 0; i < count; i++) {
    radius[i] = 0.35 + Math.pow(Math.random(), 0.55) * 3.1
    angle[i] = Math.random() * Math.PI * 2
    height[i] = (Math.random() - 0.5) * Math.exp(-radius[i] * 0.55) * 2.6
    rate[i] = Math.random()
    scale[i] = 0.35 + Math.random() * 1.4
  }

  const built = { positions, radius, angle, height, rate, scale }
  cache.set(count, built)
  return built
}

/** Accretion disc: particles spiral inward and bend around the pointer. */
export function VortexScene({ count, live }: SceneProps) {
  const pointsRef = useRef<Points>(null)
  const pointerTarget = useMemo(() => new Vector3(), [])

  const attributes = useMemo(() => buildDisc(count), [count])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSpeed: { value: 1 },
      uIntensity: { value: 0.75 },
      uPulse: { value: 0 },
      // Nudged up to keep the disc reading as dense with fewer sprites
      uSize: { value: 22 },
      uHue: { value: 0 },
      uOpacity: { value: 0 },
      uPointer: { value: new Vector3(99, 99, 99) },
      uColorA: { value: new Color('#3b82f6') },
      uColorB: { value: new Color('#7c3aed') },
      uColorC: { value: new Color('#06d6a0') },
    }),
    []
  )

  const glowUniforms = useMemo(
    () => ({
      uColorA: { value: new Color('#06d6a0') },
      uColorB: { value: new Color('#7c3aed') },
      uHue: { value: 0 },
      uOpacity: { value: 0 },
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
    uniforms.uPulse.value += (config.pulse - uniforms.uPulse.value) * 0.13
    glowUniforms.uHue.value = uniforms.uHue.value
    glowUniforms.uOpacity.value = uniforms.uOpacity.value

    pointerTarget.set(
      state.pointer.x * state.viewport.width * 0.5,
      state.pointer.y * state.viewport.height * 0.5,
      0
    )
    uniforms.uPointer.value.lerp(pointerTarget, 0.07)

    if (pointsRef.current) {
      pointsRef.current.rotation.x = 0.34 + Math.sin(uniforms.uTime.value * 0.12) * 0.05
    }
  })

  return (
    <group>
      <points ref={pointsRef} frustumCulled={false} rotation={[0.34, 0, 0]}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[attributes.positions, 3]} />
          <bufferAttribute attach="attributes-aRadius" args={[attributes.radius, 1]} />
          <bufferAttribute attach="attributes-aAngle" args={[attributes.angle, 1]} />
          <bufferAttribute attach="attributes-aHeight" args={[attributes.height, 1]} />
          <bufferAttribute attach="attributes-aRate" args={[attributes.rate, 1]} />
          <bufferAttribute attach="attributes-aScale" args={[attributes.scale, 1]} />
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

      {/* Event horizon */}
      <mesh>
        <sphereGeometry args={[0.34, 24, 16]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      <mesh scale={1.9}>
        <sphereGeometry args={[0.34, 24, 16]} />
        <shaderMaterial
          uniforms={glowUniforms}
          transparent
          depthWrite={false}
          side={BackSide}
          blending={AdditiveBlending}
          vertexShader={/* glsl */ `
            varying vec3 vNormalW;
            varying vec3 vWorldPos;
            void main() {
              vNormalW = normalize(mat3(modelMatrix) * normal);
              vec4 world = modelMatrix * vec4(position, 1.0);
              vWorldPos = world.xyz;
              gl_Position = projectionMatrix * viewMatrix * world;
            }
          `}
          fragmentShader={/* glsl */ `
            uniform vec3 uColorA;
            uniform vec3 uColorB;
            uniform float uHue;
            uniform float uOpacity;
            varying vec3 vNormalW;
            varying vec3 vWorldPos;
            ${UTILS}
            void main() {
              vec3 N = normalize(vNormalW);
              vec3 V = normalize(cameraPosition - vWorldPos);
              float depth = clamp(dot(-N, V), 0.0, 1.0);
              float falloff = pow(depth, 2.4);
              vec3 color = mix(uColorB, uColorA, depth);
              gl_FragColor = vec4(hueShift(color, uHue), falloff * uOpacity);
            }
          `}
        />
      </mesh>
    </group>
  )
}
