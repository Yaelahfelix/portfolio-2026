'use client'

import { useCallback, useEffect, useMemo, useRef } from 'react'

export interface SphereItem {
  id: string
  label: string
  color: string
  weight: number
}

interface SkillSphereProps {
  items: SphereItem[]
  size?: number
  activeId?: string | null
  onSelect?: (id: string) => void
  className?: string
}

interface Point {
  x: number
  y: number
  z: number
}

/** Even distribution over a sphere — avoids the clumping of random placement. */
function fibonacciSphere(count: number): Point[] {
  const points: Point[] = []
  const offset = 2 / count
  const increment = Math.PI * (3 - Math.sqrt(5))

  for (let i = 0; i < count; i++) {
    const y = i * offset - 1 + offset / 2
    const r = Math.sqrt(Math.max(1 - y * y, 0))
    const phi = i * increment
    points.push({ x: Math.cos(phi) * r, y, z: Math.sin(phi) * r })
  }
  return points
}

/**
 * Rotating tag sphere in CSS 3D. Kept off the GPU-heavy WebGL path on purpose:
 * the labels stay crisp at any DPI and the page only pays for two GL contexts.
 */
export function SkillSphere({
  items,
  size = 420,
  activeId = null,
  onSelect,
  className = '',
}: SkillSphereProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const nodesRef = useRef<(HTMLButtonElement | null)[]>([])

  const rotation = useRef({ x: -0.2, y: 0 })
  const velocity = useRef({ x: 0, y: 0.0022 })
  const pointer = useRef({ x: 0, y: 0, inside: false })
  const drag = useRef({ active: false, lastX: 0, lastY: 0 })
  const paused = useRef(false)

  const points = useMemo(() => fibonacciSphere(items.length), [items.length])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const radius = size / 2 - 34
    let frame = 0

    const render = () => {
      if (!drag.current.active && !paused.current) {
        if (pointer.current.inside) {
          // Cursor position steers the spin like a trackball
          velocity.current.y += (pointer.current.x * 0.0055 - velocity.current.y) * 0.05
          velocity.current.x += (-pointer.current.y * 0.0045 - velocity.current.x) * 0.05
        } else {
          velocity.current.y += (0.0022 - velocity.current.y) * 0.02
          velocity.current.x += (0 - velocity.current.x) * 0.02
        }
      } else if (!drag.current.active) {
        velocity.current.x *= 0.94
        velocity.current.y *= 0.94
      }

      rotation.current.x += velocity.current.x
      rotation.current.y += velocity.current.y
      rotation.current.x = Math.max(-1.15, Math.min(1.15, rotation.current.x))

      const sinX = Math.sin(rotation.current.x)
      const cosX = Math.cos(rotation.current.x)
      const sinY = Math.sin(rotation.current.y)
      const cosY = Math.cos(rotation.current.y)

      for (let i = 0; i < points.length; i++) {
        const node = nodesRef.current[i]
        if (!node) continue
        const point = points[i]

        // Rotate around Y then X
        const x1 = point.x * cosY - point.z * sinY
        const z1 = point.x * sinY + point.z * cosY
        const y2 = point.y * cosX - z1 * sinX
        const z2 = point.y * sinX + z1 * cosX

        const depth = (z2 + 1) / 2
        const scale = 0.6 + depth * 0.55
        const opacity = 0.16 + depth * 0.84

        node.style.transform = `translate(-50%, -50%) translate3d(${x1 * radius}px, ${y2 * radius}px, 0) scale(${scale})`
        node.style.opacity = String(opacity)
        node.style.zIndex = String(Math.round(depth * 200))
        node.style.filter = depth < 0.35 ? `blur(${(0.35 - depth) * 4}px)` : 'none'
      }

      frame = requestAnimationFrame(render)
    }

    if (reduced) {
      // One static layout, no animation loop
      velocity.current = { x: 0, y: 0 }
      render()
      cancelAnimationFrame(frame)
    } else {
      frame = requestAnimationFrame(render)
    }

    return () => cancelAnimationFrame(frame)
  }, [points, size])

  const handlePointerMove = useCallback((event: React.PointerEvent) => {
    const container = containerRef.current
    if (!container) return
    const rect = container.getBoundingClientRect()
    pointer.current.x = (event.clientX - rect.left) / rect.width - 0.5
    pointer.current.y = (event.clientY - rect.top) / rect.height - 0.5
    pointer.current.inside = true

    if (drag.current.active) {
      velocity.current.y = (event.clientX - drag.current.lastX) * 0.00035
      velocity.current.x = -(event.clientY - drag.current.lastY) * 0.0003
      rotation.current.y += velocity.current.y * 8
      rotation.current.x -= (event.clientY - drag.current.lastY) * 0.0022
      drag.current.lastX = event.clientX
      drag.current.lastY = event.clientY
    }
  }, [])

  const handlePointerDown = useCallback((event: React.PointerEvent) => {
    drag.current = { active: true, lastX: event.clientX, lastY: event.clientY }
    ;(event.target as HTMLElement).setPointerCapture?.(event.pointerId)
  }, [])

  const endDrag = useCallback(() => {
    drag.current.active = false
  }, [])

  return (
    <div
      ref={containerRef}
      className={`relative select-none ${className}`}
      style={{ width: size, height: size, maxWidth: '100%' }}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={() => {
        pointer.current.inside = false
        endDrag()
      }}
      data-cursor="drag"
      data-cursor-label="drag"
    >
      {/* Depth cues behind the tags */}
      <div className="pointer-events-none absolute inset-[12%] rounded-full bg-[radial-gradient(circle,rgba(6,214,160,0.10)_0%,transparent_65%)] blur-2xl" />
      <div className="pointer-events-none absolute inset-[22%] rounded-full border border-white/[0.05]" />
      <div className="pointer-events-none absolute inset-[34%] rounded-full border border-white/[0.03]" />

      {items.map((item, index) => {
        const isActive = activeId === item.id
        return (
          <button
            key={item.id}
            ref={(node) => {
              nodesRef.current[index] = node
            }}
            onClick={() => onSelect?.(item.id)}
            onMouseEnter={() => {
              paused.current = true
            }}
            onMouseLeave={() => {
              paused.current = false
            }}
            className="absolute left-1/2 top-1/2 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition-colors duration-200 will-change-transform"
            style={{
              borderColor: isActive ? item.color : 'rgba(255,255,255,0.09)',
              backgroundColor: isActive ? `${item.color}1f` : 'rgba(255,255,255,0.03)',
              color: isActive ? item.color : 'rgba(255,255,255,0.75)',
              boxShadow: isActive ? `0 0 22px ${item.color}44` : 'none',
              fontSize: `${11 + item.weight * 3}px`,
            }}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}
