'use client'

import type { ReactNode } from 'react'
import dynamic from 'next/dynamic'
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
import { SmoothScroll } from './interactive/SmoothScroll'
import { ScrollProgress } from './interactive/ScrollProgress'
import { useLanguage } from '@/contexts/LanguageContext'
import type { SceneKey } from './three/scenes/types'

/**
 * three + @react-three/fiber + drei + postprocessing is by far the largest
 * dependency on the page. Statically imported it lands in the same bundle as the
 * copy and has to be parsed and executed before the page can hydrate, which is
 * time the reader spends looking at unresponsive text. Split out, the content
 * hydrates on its own and the backdrop fades in behind it a moment later.
 */
const BackdropCanvas = dynamic(
  () => import('./three/backdrop/BackdropCanvas').then((m) => m.BackdropCanvas),
  { ssr: false }
)

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

/**
 * Claims a slice of the page for one WebGL scene. The backdrop's observer picks
 * whichever `data-scene` block owns the viewport; the scrim keeps the copy
 * readable over whatever is rendering behind it.
 */
function Scene({
  name,
  children,
  scrim = true,
}: {
  name: SceneKey
  children: ReactNode
  scrim?: boolean
}) {
  return (
    <div data-scene={name} className="relative">
      {scrim && (
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.94)_0%,rgba(5,5,5,0.5)_12%,rgba(5,5,5,0.5)_88%,rgba(5,5,5,0.94)_100%)]" />
      )}
      <div className="relative">{children}</div>
    </div>
  )
}

export function HomeContent({ skills, experiences, projects }: HomeContentProps) {
  const { t } = useLanguage()

  return (
    <>
      <SmoothScroll />
      <GlowCursor />
      <ScrollProgress />
      <BackdropCanvas />

      <main className="relative min-h-screen">
        <Navbar />

        <Scene name="hero" scrim={false}>
          <HeroSection />
        </Scene>

        <Scene name="skills">
          <ParallaxText baseVelocity={1.5}>{t.parallax.skills}</ParallaxText>
          <SkillsSection skills={skills} />
        </Scene>

        <SectionTransition />

        <Scene name="experience">
          <ParallaxText baseVelocity={-1.5}>{t.parallax.experience}</ParallaxText>
          <WorkExperienceSection experiences={experiences} />
        </Scene>

        <SectionTransition />

        <Scene name="education">
          <EducationSection />
        </Scene>

        <Scene name="projects">
          <ParallaxText baseVelocity={2}>{t.parallax.projects}</ParallaxText>
          <ProjectsSection projects={projects} />
        </Scene>

        <SectionTransition />

        <Scene name="achievements">
          <AchievementSection />
        </Scene>

        <SectionTransition />

        <div className="relative">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.9)_0%,rgba(5,5,5,0.98)_45%,#050505_100%)]" />
          <div className="relative">
            <Footer />
          </div>
        </div>
      </main>
    </>
  )
}
