/**
 * Point-cloud shape generators. Every generator returns a flat Float32Array of
 * `count * 3` values so they can be swapped into the same buffer attribute and
 * morphed between on the GPU.
 */

export type ShapeGenerator = (count: number) => Float32Array

/** Evenly distributed shell using the Fibonacci spiral. */
export const sphereShape: ShapeGenerator = (count) => {
  const out = new Float32Array(count * 3)
  const golden = Math.PI * (3 - Math.sqrt(5))
  const radius = 2.05

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / Math.max(count - 1, 1)) * 2
    const ring = Math.sqrt(Math.max(1 - y * y, 0))
    const theta = golden * i
    const jitter = 0.94 + Math.random() * 0.12

    out[i * 3] = Math.cos(theta) * ring * radius * jitter
    out[i * 3 + 1] = y * radius * jitter
    out[i * 3 + 2] = Math.sin(theta) * ring * radius * jitter
  }
  return out
}

/** (2,3) torus knot with particles scattered in a tube around the curve. */
export const torusKnotShape: ShapeGenerator = (count) => {
  const out = new Float32Array(count * 3)
  const R = 1.35
  const r = 0.46
  const p = 2
  const q = 3

  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 2
    const cq = Math.cos(q * t)
    const base = R + r * cq

    const tube = 0.26 * Math.cbrt(Math.random())
    const a = Math.random() * Math.PI * 2
    const b = Math.acos(2 * Math.random() - 1)

    out[i * 3] = base * Math.cos(p * t) + tube * Math.sin(b) * Math.cos(a)
    out[i * 3 + 1] = base * Math.sin(p * t) + tube * Math.sin(b) * Math.sin(a)
    out[i * 3 + 2] = r * Math.sin(q * t) * 1.6 + tube * Math.cos(b)
  }
  return out
}

/** Points scattered across the six faces of a cube. */
export const cubeShape: ShapeGenerator = (count) => {
  const out = new Float32Array(count * 3)
  const half = 1.62

  for (let i = 0; i < count; i++) {
    const axis = i % 3
    const sign = Math.random() < 0.5 ? -1 : 1
    const u = (Math.random() * 2 - 1) * half
    const v = (Math.random() * 2 - 1) * half

    if (axis === 0) {
      out[i * 3] = half * sign
      out[i * 3 + 1] = u
      out[i * 3 + 2] = v
    } else if (axis === 1) {
      out[i * 3] = u
      out[i * 3 + 1] = half * sign
      out[i * 3 + 2] = v
    } else {
      out[i * 3] = u
      out[i * 3 + 1] = v
      out[i * 3 + 2] = half * sign
    }
  }
  return out
}

/** Four-armed spiral disc with a dense bulge in the middle. */
export const galaxyShape: ShapeGenerator = (count) => {
  const out = new Float32Array(count * 3)
  const arms = 4
  const maxRadius = 2.9

  for (let i = 0; i < count; i++) {
    const radius = Math.pow(Math.random(), 0.62) * maxRadius
    const armOffset = ((i % arms) / arms) * Math.PI * 2
    const spin = radius * 1.15
    const spread = (Math.random() - 0.5) * 0.42 * (1 - radius / maxRadius + 0.25)
    const angle = armOffset + spin + spread

    out[i * 3] = Math.cos(angle) * radius
    out[i * 3 + 1] = (Math.random() - 0.5) * 0.34 * (1 - radius / maxRadius) + spread * 0.4
    out[i * 3 + 2] = Math.sin(angle) * radius
  }
  return out
}

export const SHAPES: { key: string; generate: ShapeGenerator }[] = [
  { key: 'sphere', generate: sphereShape },
  { key: 'knot', generate: torusKnotShape },
  { key: 'cube', generate: cubeShape },
  { key: 'galaxy', generate: galaxyShape },
]
