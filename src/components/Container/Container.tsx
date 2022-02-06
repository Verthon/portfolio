import * as React from "react"

import type { Props } from "./Container.types"
import { container } from "./Container.module.css"

export const Container = ({ children }: Props) => {
  return (
    <div className={container}>{children}</div>
  )
}