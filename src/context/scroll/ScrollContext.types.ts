export type ScrollDispatch = {
  scrollToComponent: (component: string) => void
}

export type ScrollState = {
  skillsSection: React.RefObject<HTMLElement>
  projectsSection: React.RefObject<HTMLElement>
  contactSection: React.RefObject<HTMLElement>
}