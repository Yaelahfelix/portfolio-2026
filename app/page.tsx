import { HomeContent } from '@/components/HomeContent'
import { getSkills, getWorkExperience, getProjects } from '@/lib/sanity.queries'

export const metadata = {
  title: 'Yaelahfelix',
  description:
    'Interactive portfolio showcasing full-stack development projects, skills, education, and achievements. Built with passion and modern web technologies.',
}

export default async function Home() {
  const [skills, experiences, projects] = await Promise.all([
    getSkills(),
    getWorkExperience(),
    getProjects(),
  ])

  return <HomeContent skills={skills} experiences={experiences} projects={projects} />
}
