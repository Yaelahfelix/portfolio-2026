import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { HeroSection } from '@/components/sections/HeroSection'
import { SkillsSection } from '@/components/sections/SkillsSection'
import { WorkExperienceSection } from '@/components/sections/WorkExperienceSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import EducationSection from '@/components/sections/EducationSection'
import AchievementSection from '@/components/sections/AchievementSection'
import { getSkills, getWorkExperience, getProjects } from '@/lib/sanity.queries'

export const metadata = {
  title: 'Full-Stack Developer Portfolio | Interactive & Animated',
  description: 'Explore my portfolio showcasing full-stack development projects, skills, education, professional experience, and achievements. Built with React, Next.js, and modern web technologies.',
  keywords: 'portfolio, developer, full-stack, react, nextjs, web development, achievements, education',
}

export default async function Home() {
  const [skills, experiences, projects] = await Promise.all([
    getSkills(),
    getWorkExperience(),
    getProjects(),
  ])

  return (
    <main className="bg-white dark:bg-gray-900 transition-colors">
      <Navbar />
      <HeroSection />
      <SkillsSection skills={skills} />
      <WorkExperienceSection experiences={experiences} />
      <EducationSection />
      <ProjectsSection projects={projects} />
      <AchievementSection />
      <Footer />
    </main>
  )
}
