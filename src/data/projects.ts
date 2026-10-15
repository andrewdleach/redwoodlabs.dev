export type ProjectStatus = 'Live' | 'Beta' | 'In progress'

export interface Project {
  name: string
  url: string
  tagline: string
  status: ProjectStatus
}

export const projects: Project[] = [
  {
    name: 'Family Connect',
    url: 'https://familyconnect.dev',
    tagline: 'Keep your whole family in the loop — no app required.',
    status: 'Live'
  }
]
