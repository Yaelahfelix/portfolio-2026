// Sanity Schema Index
// This file exports all schema definitions for the portfolio CMS

import skill from './schemas/skill'
import workExperience from './schemas/workExperience'
import project from './schemas/project'
import education from './schemas/education'
import achievement from './schemas/achievement'

export const schemaTypes = [skill, workExperience, project, education, achievement]
