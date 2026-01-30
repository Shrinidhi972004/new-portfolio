// Types for the portfolio

export interface Project {
  id: number
  title: string
  badges: {
    live: string
    tech: string
  }
  architecture: {
    nodes: string[]
    arrows: string[]
  }
  description: string
  challenges: string[]
  techStack: string[]
  github?: string
}

export interface Skill {
  id: string
  icon: string
  title: string
  status?: string
  tags: string[]
  size: 'small' | 'medium' | 'large'
  metric?: {
    value: string
    label: string
  }
  cloudBadges?: Array<{
    name: string
    type: 'aws' | 'gcp' | 'azure'
  }>
  showChart?: boolean
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface ContactMessage extends ContactFormData {
  _id: string
  createdAt: string
  read: boolean
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}
