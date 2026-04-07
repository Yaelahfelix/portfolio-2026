'use client'

import { motion } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export default function DemoPage() {
  const demoSkills = [
    { _id: '1', name: 'React', category: 'frontend', proficiency: 95, icon: undefined },
    { _id: '2', name: 'Next.js', category: 'frontend', proficiency: 90, icon: undefined },
    { _id: '3', name: 'TypeScript', category: 'frontend', proficiency: 88, icon: undefined },
    { _id: '4', name: 'Node.js', category: 'backend', proficiency: 92, icon: undefined },
    { _id: '5', name: 'PostgreSQL', category: 'database', proficiency: 85, icon: undefined },
    { _id: '6', name: 'Docker', category: 'tools', proficiency: 80, icon: undefined },
  ]

  const demoExperience = [
    {
      _id: '1',
      company: 'Tech Company',
      position: 'Senior Developer',
      startDate: '2023-01-15',
      endDate: undefined,
      isCurrent: true,
      description: 'Building scalable applications with React and Node.js',
      responsibilities: ['Led frontend development', 'Mentored junior developers', 'Optimized performance'],
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
    },
  ]

  const demoProjects = [
    {
      _id: '1',
      title: 'E-commerce Platform',
      slug: 'ecommerce-platform',
      description: 'A full-stack e-commerce platform with real-time inventory management',
      image: {
        asset: {
          url: 'https://images.unsplash.com/photo-1460925895917-adf4e565db18?w=500&h=400&fit=crop',
        },
      },
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      caseStudy: 'Built a complete e-commerce solution',
      featured: true,
    },
  ]

  return (
    <main className="bg-white dark:bg-gray-900">
      <Navbar />
      <div className="pt-20">
        <section className="max-w-6xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              🎨 Demo Page
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              This page tests all portfolio components with demo data.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {demoSkills.slice(0, 2).map((skill) => (
                <motion.div
                  key={skill._id}
                  className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {skill.name}
                  </p>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-2">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.proficiency}%` }}
                      transition={{ delay: 0.3, duration: 1 }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {skill.proficiency}%
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg mb-8"
              whileHover={{ y: -4 }}
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {demoExperience[0].position}
              </h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">
                {demoExperience[0].company}
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                {demoExperience[0].description}
              </p>
              <div className="flex flex-wrap gap-2">
                {demoExperience[0].technologies?.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            <p className="text-gray-600 dark:text-gray-400">
              To use real data, configure Sanity CMS with your content.
            </p>
          </motion.div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
