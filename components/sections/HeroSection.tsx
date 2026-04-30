'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { useRef, useState, useEffect } from 'react'
import { MagneticButton } from '../interactive/MagneticButton'
import { useMousePosition } from '@/hooks/useMousePosition'

const roles = ['Full-Stack Developer', 'NextJS Developer', 'SQL Developer', 'Mobile Developer']

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouse = useMousePosition()
  const [currentRole, setCurrentRole] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.8], [0, -100])
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95])

  // Typing animation
  useEffect(() => {
    const currentWord = roles[currentRole]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.slice(0, displayText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentWord.slice(0, displayText.length - 1))
        } else {
          setIsDeleting(false)
          setCurrentRole((prev) => (prev + 1) % roles.length)
        }
      }
    }, isDeleting ? 40 : 80)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentRole])

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] opacity-30"
          style={{
            background: `
              radial-gradient(circle at 30% 20%, rgba(6, 214, 160, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 70% 60%, rgba(124, 58, 237, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)
            `,
          }}
        />
        {/* Mouse-tracking spotlight */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            x: mouse.x - 300,
            y: mouse.y - 300,
            background: 'radial-gradient(circle, rgba(6, 214, 160, 0.06) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.5,
            }}
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              transform: `translate(${mouse.normalizedX * (10 + i * 5)}px, ${mouse.normalizedY * (10 + i * 5)}px)`,
            }}
          >
            <div
              className={`${i % 3 === 0
                ? 'w-2 h-2 rounded-full'
                : i % 3 === 1
                  ? 'w-3 h-3 rotate-45'
                  : 'w-4 h-[1px]'
                } ${i % 2 === 0 ? 'bg-[#06d6a0]/20' : 'bg-[#7c3aed]/20'
                }`}
            />
          </motion.div>
        ))}
      </div>

      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-50" />

      {/* Main content */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 inline-block"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.6)] text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-[#06d6a0] animate-pulse-glow" />
            Available for work
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] mb-6">
            <span className="block text-white">Dev with</span>
            <span className="block gradient-text mt-2">4+ Years</span>
            <span className="block text-white mt-2">experiences</span>
          </h1>
        </motion.div>

        {/* Typing role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-8"
        >
          <p className="text-lg sm:text-xl text-[rgba(255,255,255,0.4)] font-mono">
            {'<'}
            <span className="text-[#06d6a0]">{displayText}</span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="text-[#06d6a0]"
            >
              |
            </motion.span>
            {' />'}
          </p>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-base sm:text-lg text-[rgba(255,255,255,0.5)] max-w-xl mx-auto mb-12 text-pretty leading-relaxed"
        >
          Crafting beautiful, performant web experiences with modern technologies.
          Specialized in React, Next.js, and full-stack development.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <MagneticButton
            as="a"
            href="#projects"
            className="group px-8 py-4 bg-white text-black rounded-full font-semibold text-sm hover:bg-[rgba(255,255,255,0.9)] transition-all inline-flex items-center gap-2"
            strength={0.3}
          >
            View My Work
            <motion.span
              className="inline-block"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </MagneticButton>

          <MagneticButton
            as="a"
            href="#contact"
            className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-semibold text-sm hover:bg-[rgba(255,255,255,0.04)] hover:border-white/30 transition-all"
            strength={0.3}
          >
            Get In Touch
          </MagneticButton>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-[rgba(255,255,255,0.3)] font-medium">Scroll</span>
            <div className="w-[1px] h-8 bg-gradient-to-b from-white/30 to-transparent" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
