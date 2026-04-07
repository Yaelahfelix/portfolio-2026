'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Box } from '@react-three/drei'
import * as THREE from 'three'

function CubeGeometry() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005
      meshRef.current.rotation.y += 0.008
      meshRef.current.rotation.z += 0.003
    }
  })

  return (
    <Box ref={meshRef} args={[1, 1, 1]}>
      <meshStandardMaterial
        color="#3b82f6"
        wireframe={false}
        emissive="#1e40af"
        emissiveIntensity={0.2}
      />
    </Box>
  )
}

export function RotatingCube() {
  return (
    <Canvas camera={{ position: [0, 0, 2.5] }} className="h-full w-full">
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <CubeGeometry />
    </Canvas>
  )
}
