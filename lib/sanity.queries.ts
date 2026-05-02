import { client } from './sanity.client'

export async function getSkills() {
  return client.fetch(`
    *[_type == "skill"] | order(order asc) {
      _id,
      name,
      category,
      proficiency,
      icon,
    }
  `)
}

export async function getWorkExperience() {
  return client.fetch(`
    *[_type == "workExperience"] | order(order desc) {
      _id,
      company,
      position,
      startDate,
      endDate,
      isCurrent,
      description,
      description_id,
      responsibilities,
      responsibilities_id,
      technologies,
    }
  `)
}

export async function getProjects() {
  return client.fetch(`
    *[_type == "project"] | order(order asc) {
      _id,
      title,
      slug,
      description,
      description_id,
      image {
        asset -> {
          url
        }
      },
      technologies,
      liveUrl,
      githubUrl,
      caseStudy,
      caseStudy_id,
      featured,
    }
  `)
}

export async function getEducation() {
  return client.fetch(`
    *[_type == "education"] | order(order asc) {
      _id,
      school,
      degree,
      field,
      startDate,
      endDate,
      description,
      description_id,
      gpa,
    }
  `)
}

export async function getAchievements() {
  return client.fetch(`
    *[_type == "achievement"] | order(order asc) {
      _id,
      title,
      title_id,
      category,
      issuer,
      date,
      description,
      description_id,
      icon,
      link,
      featured,
    }
  `)
}
