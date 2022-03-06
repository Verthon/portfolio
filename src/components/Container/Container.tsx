import * as React from "react"

import type { ContainerProps } from "./Container.types"
import { container } from "./Container.module.css"

export const Container = ({ children }: ContainerProps) => {
  return (
    <div className={container}>{children}</div>
  )
}