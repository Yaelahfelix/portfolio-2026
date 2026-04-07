'use client'

import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'

function ParticlesCore() {
  const ref = useRef<any>(null)

  useEffect(() => {
    if (!ref.current) return
    const sphere = random.inSphere(new Float32Array(5000), { radius: 1.2 })
    ref.current.geometry.setAttribute('position', new THREE.BufferAttribute(sphere, 3))
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x -= 0.0001
    ref.current.rotation.y -= 0.0001
  })

  return (
    <group rotation={[0, 0, 0]}>
      <Points ref={ref} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#3b82f6"
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  )
}

export function FloatingParticles() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 2]}>
        <ParticlesCore />
      </Canvas>
    </div>
  )
}

// Add THREE import at module level
import * as THREE from 'three'
