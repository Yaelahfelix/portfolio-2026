import { client } from './sanity.client'

export async function getSkills() {
  const skills = await client.fetch(`
    *[_type == "skill"] | order(order asc) {
      _id,
      name,
      category,
      proficiency,
      icon,
    }
  `)
  return skills
}

export async function getWorkExperience() {
  const experience = await client.fetch(`
    *[_type == "workExperience"] | order(order desc) {
      _id,
      company,
      position,
      startDate,
      endDate,
      isCurrent,
      description,
      responsibilities,
      technologies,
    }
  `)
  return experience
}

export async function getProjects() {
  const projects = await client.fetch(`
    *[_type == "project"] | order(order asc) {
      _id,
      title,
      slug,
      description,
      image {
        asset -> {
          url
        }
      },
      technologies,
      liveUrl,
      githubUrl,
      caseStudy,
      featured,
    }
  `)
  return projects
}

export async function getEducation() {
  const education = await client.fetch(`
    *[_type == "education"] | order(order asc) {
      _id,
      school,
      degree,
      field,
      startDate,
      endDate,
      description,
      gpa,
    }
  `)
  return education
}

export async function getAchievements() {
  const achievements = await client.fetch(`
    *[_type == "achievement"] | order(order asc) {
      _id,
      title,
      category,
      issuer,
      date,
      description,
      icon,
      link,
      featured,
    }
  `)
  return achievements
}
