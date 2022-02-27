import * as React from "react"

import { ScrollDispatchContext, ScrollStateContext } from "../../context/scroll/ScrollContext"

import type { Props } from "./ScrollProvider.types"

export const ScrollProvider = ({ children }: Props) => {
  const skillsSection = React.useRef<HTMLElement>(null)
  const projectsSection = React.useRef<HTMLElement>(null)
  const contactSection = React.useRef<HTMLElement>(null)

  const scrollToComponent = (component: string) => {
    if (skillsSection.current && projectsSection.current && contactSection.current) {
      switch (component) {
        case 'skills':
          skillsSection.current.scrollIntoView({
            inline: 'nearest',
            block: 'start',
            behavior: 'smooth',
          })
          break
        case 'projects':
          projectsSection.current.scrollIntoView({
            inline: 'nearest',
            block: 'start',
            behavior: 'smooth',
          })
          break
        case 'contact':
          contactSection.current.scrollIntoView({
            inline: 'nearest',
            block: 'start',
            behavior: 'smooth',
          })
          break
        default:
          skillsSection.current.scrollIntoView({
            inline: 'nearest',
            block: 'start',
            behavior: 'smooth',
          })
          break
      }
    }
  }

  return <ScrollStateContext.Provider value={{ skillsSection, projectsSection, contactSection }}><ScrollDispatchContext.Provider value={{ scrollToComponent }}>{children}</ScrollDispatchContext.Provider></ScrollStateContext.Provider>
}