import * as React from "react"

import { section, description as descriptionStyles, heading, sectionDefault, sectionContact, sectionProjects } from "./Section.module.css"
import type { Props } from "./Section.types"

export const Section = React.forwardRef(({ children, header, description, type = "default" }: Props, ref: React.ForwardedRef<HTMLElement>) => {
  const currentSectionClass = () => {
    if(type === 'contact') {
      return `${section} ${sectionContact}`
    }
    if(type === 'projects') {
      return `${section} ${sectionProjects}`
    }
    return `${section} ${sectionDefault}`
  }
  return <div className={currentSectionClass()} ref={ref}>
    <h2 className={heading}>{header}</h2>
    <p className={descriptionStyles}>{description}</p>
    {children}
  </div>
})