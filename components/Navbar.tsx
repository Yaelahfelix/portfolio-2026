'use client'

import { motion, useScroll, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { MagneticButton } from './interactive/MagneticButton'
import { LanguageToggle } from './LanguageToggle'
import { useLanguage } from '@/contexts/LanguageContext'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const lastScrollY = useRef(0)
  const { t } = useLanguage()

  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const sectionIds = ['skills', 'experience', 'education', 'projects', 'achievements', 'contact']
    const handleScroll = () => {
      const currentY = window.scrollY
      setScrolled(currentY > 50)
      setHidden(currentY > lastScrollY.current && currentY > 200)
      lastScrollY.current = currentY

      for (const section of [...sectionIds].reverse()) {
        const el = document.getElementById(section)
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveSection(section)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: t.nav.skills, href: '#skills', id: 'skills' },
    { name: t.nav.experience, href: '#experience', id: 'experience' },
    { name: t.nav.education, href: '#education', id: 'education' },
    { name: t.nav.projects, href: '#projects', id: 'projects' },
    { name: t.nav.achievements, href: '#achievements', id: 'achievements' },
  ]

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
        style={{
          scaleX: scrollYProgress,
          background: 'linear-gradient(90deg, #06d6a0, #3b82f6, #7c3aed)',
        }}
      />

      <motion.nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[rgba(5,5,5,0.8)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.05)]'
            : 'bg-transparent'
        }`}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo */}
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-xl font-bold tracking-tight"
                data-hover
              >
                <span className="gradient-text">Yaelahfelix</span>
                <span className="text-[rgba(255,255,255,0.6)]">.</span>
                <span className="text-white">dev</span>
              </motion.div>
            </Link>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link key={item.id} href={item.href}>
                  <motion.div
                    className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-full ${
                      activeSection === item.id
                        ? 'text-white'
                        : 'text-[rgba(255,255,255,0.4)] hover:text-[rgba(255,255,255,0.8)]'
                    }`}
                    data-hover
                    whileHover={{ scale: 1.05 }}
                  >
                    {activeSection === item.id && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-[rgba(255,255,255,0.08)] rounded-full border border-[rgba(255,255,255,0.08)]"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.name}</span>
                  </motion.div>
                </Link>
              ))}

              <div className="ml-2">
                <LanguageToggle />
              </div>

              <MagneticButton
                as="a"
                href="#contact"
                className="ml-2 px-5 py-2 text-sm font-medium bg-white text-black rounded-full hover:bg-[rgba(255,255,255,0.9)] transition-colors"
                strength={0.2}
              >
                {t.nav.contact}
              </MagneticButton>
            </div>

            {/* Mobile menu button */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[rgba(255,255,255,0.8)]"
              whileTap={{ scale: 0.9 }}
              data-hover
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <motion.span
                  className="block w-full h-[1.5px] bg-current origin-left"
                  animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? -1 : 0 }}
                />
                <motion.span
                  className="block w-full h-[1.5px] bg-current"
                  animate={{ opacity: mobileMenuOpen ? 0 : 1, x: mobileMenuOpen ? 20 : 0 }}
                />
                <motion.span
                  className="block w-full h-[1.5px] bg-current origin-left"
                  animate={{ rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? 1 : 0 }}
                />
              </div>
            </motion.button>
          </div>
        </div>

        {/* Mobile menu — fullscreen overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 top-16 bg-[rgba(5,5,5,0.95)] backdrop-blur-2xl md:hidden z-40"
            >
              <div className="flex flex-col items-center justify-center h-full gap-8 -mt-16">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: i * 0.08, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-3xl font-semibold transition-colors ${
                        activeSection === item.id
                          ? 'gradient-text'
                          : 'text-[rgba(255,255,255,0.5)] hover:text-white'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: navItems.length * 0.08, duration: 0.3 }}
                  className="flex flex-col items-center gap-4"
                >
                  <LanguageToggle />
                  <Link
                    href="#contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-8 py-3 bg-white text-black rounded-full text-lg font-medium"
                  >
                    {t.nav.contact}
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}
