import * as React from "react"

import { section, description as descriptionStyles, heading } from "./Section.module.css"
import type { Props } from "./Section.types"

export const Section = ({ children, header, description }: Props) => {
  return <div className={section}>
    <h2 className={heading}>{header}</h2>
    <p className={descriptionStyles}>{description}</p>
    {children}
  </div>
} 