import type { LinkVariant } from './Nav.types'

const skillsSection = document.getElementById('skills')
const contactSection = document.getElementById('contact')

export const elements: Record<LinkVariant, HTMLElement | null> = {
  skills: skillsSection,
  contact: contactSection,
}
