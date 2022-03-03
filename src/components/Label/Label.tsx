import * as React from "react";

import type { LabelProps } from "./Label.types"
import { label as labelClass } from "./Label.module.css"

export const Label = ({ children, className, label }: LabelProps) => {
  const generateClassName = () => {
    if (className) {
      return [labelClass, className].join(" ")
    }
    return [labelClass].join(" ")
  }

  return <label className={generateClassName()}>
    {label}
    {children}
  </label>
}