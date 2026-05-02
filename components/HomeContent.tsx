'use client'

import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { HeroSection } from './sections/HeroSection'
import { SkillsSection } from './sections/SkillsSection'
import { WorkExperienceSection } from './sections/WorkExperienceSection'
import { ProjectsSection } from './sections/ProjectsSection'
import EducationSection from './sections/EducationSection'
import AchievementSection from './sections/AchievementSection'
import { GlowCursor } from './interactive/GlowCursor'
import { ParallaxText } from './interactive/ParallaxText'
import { SectionTransition } from './interactive/SectionTransition'
import { useLanguage } from '@/contexts/LanguageContext'

interface Skill {
  _id: string
  name: string
  category: string
  proficiency: number
  icon?: string
}

interface WorkExp {
  _id: string
  company: string
  position: string
  startDate: string
  endDate?: string
  isCurrent: boolean
  description: string
  description_id?: string
  responsibilities?: string[]
  responsibilities_id?: string[]
  technologies?: string[]
}

interface Project {
  _id: string
  title: string
  slug: string
  description: string
  description_id?: string
  image: { asset: { url: string } }
  technologies?: string[]
  liveUrl?: string
  githubUrl?: string
  caseStudy?: string
  caseStudy_id?: string
  featured?: boolean
}

interface HomeContentProps {
  skills: Skill[]
  experiences: WorkExp[]
  projects: Project[]
}

export function HomeContent({ skills, experiences, projects }: HomeContentProps) {
  const { t } = useLanguage()

  return (
    <main className="bg-[#050505] min-h-screen">
      <GlowCursor />
      <Navbar />
      <HeroSection />

      <ParallaxText baseVelocity={1.5}>{t.parallax.skills}</ParallaxText>
      <SkillsSection skills={skills} />

      <SectionTransition />
      <ParallaxText baseVelocity={-1.5}>{t.parallax.experience}</ParallaxText>
      <WorkExperienceSection experiences={experiences} />

      <SectionTransition />
      <EducationSection />

      <ParallaxText baseVelocity={2}>{t.parallax.projects}</ParallaxText>
      <ProjectsSection projects={projects} />

      <SectionTransition />
      <AchievementSection />

      <SectionTransition />
      <Footer />
    </main>
  )
}
