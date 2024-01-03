/** @jsxImportSource react */
import * as React from 'react'

import {
  section,
  description as descriptionStyles,
  heading,
  sectionDefault,
  sectionContact,
  sectionProjects,
} from './Section.module.css'
import type { Props } from './Section.types'

export const Section = React.forwardRef(
  ({ children, header, description, type = 'default', id }: Props) => {
    const currentSectionClass = () => {
      if (type === 'contact') {
        return `${section} ${sectionContact}`
      }
      if (type === 'projects') {
        return `${section} ${sectionProjects}`
      }
      return `${section} ${sectionDefault}`
    }
    return (
      <div className={currentSectionClass()} id={id}>
        <h2 className={heading}>{header}</h2>
        <p className={descriptionStyles}>{description}</p>
        {children}
      </div>
    )
  }
)
