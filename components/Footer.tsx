'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <footer id="contact" className="bg-gray-900 dark:bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand */}
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent mb-4">
              Let&apos;s Connect
            </h2>
            <p className="text-gray-400">
              Open to collaborations and exciting opportunities. Let&apos;s build something amazing together.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <nav className="space-y-3">
              {[
                { name: 'Skills', href: '#skills' },
                { name: 'Experience', href: '#experience' },
                { name: 'Projects', href: '#projects' },
              ].map((link) => (
                <Link key={link.name} href={link.href}>
                  <motion.div
                    whileHover={{ x: 4, color: '#3b82f6' }}
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </motion.div>
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              {[
                {
                  name: 'GitHub',
                  icon: 'M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.544 2.914 1.186.092-.924.35-1.554.636-1.911-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.578 9.578 0 0110 4.836c.85.004 1.705.114 2.504.336 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.578.688.48C17.137 18.195 20 14.44 20 10.017 20 4.484 15.522 0 10 0z',
                  href: 'https://github.com',
                },
                {
                  name: 'LinkedIn',
                  icon: 'M4.5 2a2.5 2.5 0 015 0 2.5 2.5 0 015 0 2.5 2.5 0 015 0v13a2.5 2.5 0 01-2.5 2.5h-1a2.5 2.5 0 01-2.5-2.5v-5a1 1 0 10-2 0v5a2.5 2.5 0 01-2.5 2.5h-1a2.5 2.5 0 01-2.5-2.5V2z',
                  href: 'https://linkedin.com',
                },
                {
                  name: 'Twitter',
                  icon: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z',
                  href: 'https://twitter.com',
                },
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-gray-800 hover:bg-blue-600 rounded-lg transition-colors"
                  title={social.name}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d={social.icon} />
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          className="border-t border-gray-800 pt-8 text-center text-gray-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p>&copy; {currentYear} My Portfolio. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}
