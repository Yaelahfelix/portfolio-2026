import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { HeroSection } from '@/components/sections/HeroSection'
import { SkillsSection } from '@/components/sections/SkillsSection'
import { WorkExperienceSection } from '@/components/sections/WorkExperienceSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import EducationSection from '@/components/sections/EducationSection'
import AchievementSection from '@/components/sections/AchievementSection'
import { getSkills, getWorkExperience, getProjects } from '@/lib/sanity.queries'
import { GlowCursor } from '@/components/interactive/GlowCursor'
import { ParallaxText } from '@/components/interactive/ParallaxText'
import { SectionTransition } from '@/components/interactive/SectionTransition'

export const metadata = {
  title: 'Yaelahfelix',
  description: 'Interactive portfolio showcasing full-stack development projects, skills, education, and achievements. Built with passion and modern web technologies.',
}

export default async function Home() {
  const [skills, experiences, projects] = await Promise.all([
    getSkills(),
    getWorkExperience(),
    getProjects(),
  ])

  return (
    <main className="bg-[#050505] min-h-screen">
      <GlowCursor />
      <Navbar />
      <HeroSection />

      <ParallaxText baseVelocity={1.5}>SKILLS & EXPERTISE</ParallaxText>
      <SkillsSection skills={skills} />

      <SectionTransition />
      <ParallaxText baseVelocity={-1.5}>WORK EXPERIENCE</ParallaxText>
      <WorkExperienceSection experiences={experiences} />

      <SectionTransition />
      <EducationSection />

      <ParallaxText baseVelocity={2}>FEATURED PROJECTS</ParallaxText>
      <ProjectsSection projects={projects} />

      <SectionTransition />
      <AchievementSection />

      <SectionTransition />
      <Footer />
    </main>
  )
}
