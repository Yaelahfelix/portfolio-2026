'use client'

import { useRef, type CSSProperties, type ReactNode } from 'react'

interface SpotlightCardProps {
  children: ReactNode
  className?: string
  /** Accent used for both the border trace and the inner bloom. */
  color?: string
  radius?: number
}

/**
 * Card whose 1px border lights up under the cursor and whose surface picks up a
 * soft bloom. Coordinates are written straight to CSS vars so tracking the
 * pointer never triggers a React render.
 */
export function SpotlightCard({
  children,
  className = '',
  color = '#06d6a0',
  radius = 260,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const node = ref.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    node.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    node.style.setProperty('--my', `${event.clientY - rect.top}px`)
    node.style.setProperty('--spot-opacity', '1')
  }

  const handleMouseLeave = () => {
    ref.current?.style.setProperty('--spot-opacity', '0')
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative overflow-hidden rounded-2xl p-px transition-transform duration-500 ${className}`}
      style={
        {
          '--spot-color': color,
          '--spot-radius': `${radius}px`,
          '--spot-opacity': '0',
          background: 'rgba(255,255,255,0.07)',
        } as CSSProperties
      }
    >
      {/* Border trace */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          opacity: 'var(--spot-opacity)',
          background:
            'radial-gradient(var(--spot-radius) circle at var(--mx) var(--my), var(--spot-color), transparent 65%)',
        }}
      />

      {/* Card surface */}
      {/* Surface is already 95% opaque, so a 24px backdrop blur was buying a few
          percent of colour while forcing a compositor re-blur per card on every
          frame the backdrop canvas paints. */}
      <div className="relative h-full rounded-[15px] bg-[#0a0a0c]/95">
        {/* Inner bloom */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[15px] transition-opacity duration-300"
          style={{
            opacity: 'var(--spot-opacity)',
            background:
              'radial-gradient(calc(var(--spot-radius) * 0.8) circle at var(--mx) var(--my), color-mix(in srgb, var(--spot-color) 14%, transparent), transparent 70%)',
          }}
        />
        <div className="relative">{children}</div>
      </div>
    </div>
  )
}
