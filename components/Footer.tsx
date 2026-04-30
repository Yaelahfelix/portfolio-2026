'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { MagneticButton } from './interactive/MagneticButton'
import { TextReveal } from './interactive/TextReveal'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const socials = [
    {
      name: 'GitHub',
      href: 'https://github.com/yaelahfelix',
      icon: 'M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.544 2.914 1.186.092-.924.35-1.554.636-1.911-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.578 9.578 0 0110 4.836c.85.004 1.705.114 2.504.336 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.578.688.48C17.137 18.195 20 14.44 20 10.017 20 4.484 15.522 0 10 0z',
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/yaelahfelix',
      icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
    },
    {
      name: 'Twitter',
      href: 'https://wa.me/6285157308533',
      icon: 'M20.52 3.48A11.92 11.92 0 0012.06 0C5.49 0 .15 5.34.15 11.91c0 2.1.55 4.14 1.6 5.94L0 24l6.34-1.66a11.9 11.9 0 005.72 1.46h.01c6.57 0 11.91-5.34 11.91-11.91 0-3.18-1.24-6.17-3.46-8.41zM12.07 21.3h-.01a9.4 9.4 0 01-4.78-1.3l-.34-.2-3.76.99 1-3.66-.22-.37a9.4 9.4 0 01-1.45-5.04c0-5.2 4.23-9.43 9.44-9.43 2.52 0 4.88.98 6.65 2.76a9.37 9.37 0 012.76 6.66c0 5.2-4.23 9.43-9.43 9.43zm5.17-7.03c-.28-.14-1.66-.82-1.92-.92-.26-.1-.45-.14-.64.14-.19.28-.73.92-.9 1.11-.17.19-.33.21-.61.07-.28-.14-1.18-.44-2.24-1.4-.83-.74-1.39-1.66-1.55-1.94-.16-.28-.02-.43.12-.57.12-.12.28-.31.42-.47.14-.16.19-.28.28-.47.09-.19.05-.36-.02-.5-.07-.14-.64-1.54-.88-2.12-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.5.07-.76.36-.26.28-1 1-1 2.43s1.03 2.81 1.17 3c.14.19 2.03 3.1 4.92 4.34.69.3 1.23.48 1.65.61.69.22 1.32.19 1.82.12.56-.08 1.66-.68 1.9-1.34.23-.66.23-1.22.16-1.34-.07-.12-.26-.19-.54-.33z'
    },
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer id="contact" className="relative border-t border-[rgba(255,255,255,0.05)]">
      {/* Gradient border effect */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#06d6a0]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* CTA */}
          <motion.div
            className="md:col-span-7"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <TextReveal as="h2" className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Let&apos;s build something amazing
            </TextReveal>
            <p className="text-[rgba(255,255,255,0.4)] text-lg mb-8 max-w-md">
              Open to collaborations, freelance opportunities, and exciting projects.
            </p>
            <MagneticButton
              as="a"
              href="mailto:ffelixhermawan@gmail.com"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-semibold text-sm hover:bg-[rgba(255,255,255,0.9)] transition-colors"
              strength={0.3}
            >
              Get In Touch
              <span>→</span>
            </MagneticButton>
          </motion.div>

          {/* Links & Social */}
          <motion.div
            className="md:col-span-5 flex flex-col sm:flex-row gap-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Quick Links */}
            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] text-[rgba(255,255,255,0.4)] font-semibold mb-4">Navigate</h3>
              <nav className="space-y-3">
                {['Skills', 'Experience', 'Projects'].map((name) => (
                  <Link key={name} href={`#${name.toLowerCase()}`}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      className="text-[rgba(255,255,255,0.5)] hover:text-white text-sm transition-colors"
                      data-hover
                    >
                      {name}
                    </motion.div>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Social */}
            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] text-[rgba(255,255,255,0.4)] font-semibold mb-4">Connect</h3>
              <div className="flex gap-3">
                {socials.map((social) => (
                  <MagneticButton
                    key={social.name}
                    as="a"
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-lg text-[rgba(255,255,255,0.5)] hover:text-white hover:bg-[rgba(255,255,255,0.08)] transition-all"
                    strength={0.4}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.icon} />
                    </svg>
                  </MagneticButton>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[rgba(255,255,255,0.05)]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-[rgba(255,255,255,0.2)] text-xs">&copy; {currentYear} Portfolio. All rights reserved.</p>
          <button
            onClick={scrollToTop}
            className="text-[rgba(255,255,255,0.2)] hover:text-[rgba(255,255,255,0.6)] text-xs transition-colors flex items-center gap-1"
            data-hover
          >
            Back to top ↑
          </button>
        </motion.div>
      </div>
    </footer>
  )
}
