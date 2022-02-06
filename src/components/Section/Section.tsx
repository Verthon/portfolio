import * as React from "react"

import { section, description as descriptionStyles, heading, sectionDefault, sectionContact, sectionProjects } from "./Section.module.css"
import type { Props } from "./Section.types"

export const Section = ({ children, header, description, type = "default" }: Props) => {
  const currentSectionClass = () => {
    if(type === 'contact') {
      return `${section} ${sectionContact}`
    }
    if(type === 'projects') {
      return `${section} ${sectionProjects}`
    }
    return `${section} ${sectionDefault}`
  }
  return <div className={currentSectionClass()}>
    <h2 className={heading}>{header}</h2>
    <p className={descriptionStyles}>{description}</p>
    {children}
  </div>
} 