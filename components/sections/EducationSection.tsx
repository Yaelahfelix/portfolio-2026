'use client'

import { motion, useInView } from 'framer-motion'
import { getEducation } from '@/lib/sanity.queries'
import { useEffect, useState, useRef } from 'react'
import { TextReveal } from '../interactive/TextReveal'
import { TiltCard } from '../interactive/TiltCard'

interface EducationItem {
  _id: string
  school: string
  degree: string
  field: string
  startDate: string
  endDate?: string
  description?: string
  gpa?: string
}

export default function EducationSection() {
  const [education, setEducation] = useState<EducationItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const data = await getEducation()
        setEducation(data)
      } catch (error) {
        console.error('Error fetching education:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchEducation()
  }, [])

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })

  if (loading) {
    return (
      <section id="education" className="section-padding">
        <div className="max-w-6xl mx-auto">
          <div className="h-12 w-48 bg-[rgba(255,255,255,0.04)] rounded-lg animate-pulse mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="h-48 bg-[rgba(255,255,255,0.04)] rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (!education.length) return null

  return (
    <section id="education" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 dot-bg opacity-30" />
      <div className="max-w-6xl mx-auto relative z-10">
        <TextReveal as="h2" className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight">
          Education
        </TextReveal>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-[rgba(255,255,255,0.4)] text-lg mb-12 max-w-lg"
        >
          My academic background and learning journey
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {education.map((edu, index) => (
            <EduCard key={edu._id} edu={edu} index={index} formatDate={formatDate} />
          ))}
        </div>
      </div>
    </section>
  )
}

function EduCard({ edu, index, formatDate }: { edu: EducationItem; index: number; formatDate: (d: string) => string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <TiltCard tiltAmount={6} scale={1.01}>
        <div className="glass-card glass-card-hover p-6 h-full group" data-hover>
          <div className="h-[2px] w-full bg-gradient-to-r from-[#06d6a0] via-[#3b82f6] to-[#7c3aed] rounded-full mb-5 opacity-50 group-hover:opacity-100 transition-opacity" />
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">{edu.degree}</h3>
              <p className="text-[#3b82f6] font-medium text-sm">{edu.school}</p>
              <p className="text-[rgba(255,255,255,0.3)] text-xs mt-1">
                Field: <span className="text-[#7c3aed]">{edu.field}</span>
              </p>
            </div>
            <div className="flex flex-col items-start sm:items-end gap-1 flex-shrink-0">
              <span className="text-xs text-[rgba(255,255,255,0.3)] font-mono">
                {formatDate(edu.startDate)} — {edu.endDate ? formatDate(edu.endDate) : 'Present'}
              </span>
              {edu.gpa && (
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#06d6a0]/10 text-[#06d6a0] border border-[#06d6a0]/20">
                  GPA: {edu.gpa}
                </span>
              )}
            </div>
          </div>
          {edu.description && <p className="text-[rgba(255,255,255,0.4)] text-sm leading-relaxed">{edu.description}</p>}
        </div>
      </TiltCard>
    </motion.div>
  )
}
