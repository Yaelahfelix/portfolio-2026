'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Color, DoubleSide, Mesh, ShaderMaterial, Vector3 } from 'three'
import { FBM, SIMPLEX_3D, UTILS } from '@/lib/three/glsl'
import type { LiveRef } from './types'

const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uSpeed;
uniform float uIntensity;
uniform float uPulse;
uniform vec3 uPointer;

varying float vHeight;
varying vec2 vUv;
varying vec3 vWorldPos;

${SIMPLEX_3D}
${FBM}

void main() {
  vUv = uv;
  vec3 p = position;

  // Terrain scrolls toward the camera so it reads as flying over a landscape
  float drift = uTime * uSpeed * 0.42;
  float h = fbm(vec3(p.x * 0.17, p.y * 0.17 + drift, 0.0));
  h += fbm(vec3(p.x * 0.55, p.y * 0.55 + drift * 1.6, 3.0)) * 0.35;

  // Pointer lifts a bump under the cursor
  float pointerDist = distance(vec2(p.x, p.y), vec2(uPointer.x, -uPointer.z));
  h += smoothstep(3.2, 0.0, pointerDist) * 0.45 * uIntensity;

  p.z += h * uIntensity * 2.6 + uPulse * 0.6;

  vHeight = h;
  vec4 world = modelMatrix * vec4(p, 1.0);
  vWorldPos = world.xyz;
  gl_Position = projectionMatrix * viewMatrix * world;
}
`

const fragmentShader = /* glsl */ `
uniform vec3 uColorLow;
uniform vec3 uColorMid;
uniform vec3 uColorHigh;
uniform float uHue;
uniform float uOpacity;
uniform float uFogNear;
uniform float uFogFar;

varying float vHeight;
varying vec2 vUv;
varying vec3 vWorldPos;

${UTILS}

void main() {
  float h = clamp(vHeight * 0.5 + 0.5, 0.0, 1.0);

  vec3 color = mix(uColorLow, uColorMid, smoothstep(0.15, 0.6, h));
  color = mix(color, uColorHigh, smoothstep(0.6, 0.98, h));
  // Keep the ridges from blowing out once bloom is applied on top
  color *= 0.55;
  color += pow(h, 6.0) * 0.35;

  // Depth fade into the void
  float dist = length(vWorldPos - cameraPosition);
  float fog = 1.0 - smoothstep(uFogNear, uFogFar, dist);

  // Fade the outer edges of the plane so it has no visible border
  float edge = smoothstep(0.0, 0.12, vUv.x) * smoothstep(1.0, 0.88, vUv.x)
             * smoothstep(0.0, 0.10, vUv.y) * smoothstep(1.0, 0.90, vUv.y);

  gl_FragColor = vec4(hueShift(color, uHue), fog * edge * uOpacity);
}
`

interface SceneProps {
  segments: number
  live: LiveRef
  wireframe: boolean
}

/** Endless noise landscape. Reads best as a wireframe grid. */
export function TerrainScene({ segments, live, wireframe }: SceneProps) {
  const meshRef = useRef<Mesh>(null)
  const materialRef = useRef<ShaderMaterial>(null)
  const pointerTarget = useMemo(() => new Vector3(), [])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSpeed: { value: 1 },
      uIntensity: { value: 0.75 },
      uPulse: { value: 0 },
      uHue: { value: 0 },
      uOpacity: { value: 0 },
      uPointer: { value: new Vector3(0, 0, 0) },
      uColorLow: { value: new Color('#0b1f2a') },
      uColorMid: { value: new Color('#06d6a0') },
      uColorHigh: { value: new Color('#7c3aed') },
      uFogNear: { value: 6 },
      uFogFar: { value: 26 },
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
    uniforms.uPulse.value += (config.pulse - uniforms.uPulse.value) * 0.12

    pointerTarget.set(
      state.pointer.x * 11,
      0,
      state.pointer.y * 11
    )
    uniforms.uPointer.value.lerp(pointerTarget, 0.08)
  })

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.6, 0]}>
      <planeGeometry args={[26, 26, segments, segments]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        wireframe={wireframe}
        transparent
        depthWrite={!wireframe}
        side={DoubleSide}
      />
    </mesh>
  )
}
