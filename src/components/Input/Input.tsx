import * as React from "react";

import type { InputProps } from "./Input.types";
import { input, inputError } from "./Input.module.css"

export const Input = ({ error, value, name, type, placeholder, className, handleChange, textarea = false }: InputProps) => {

  const generateClassName = () => {
    if (error) {
      return [input, inputError, className].join(" ")
    }
    return [input, className].join(" ")
  }

  if (textarea) {
    return <textarea
    className={generateClassName()}
    name={name}
    placeholder={placeholder}
    value={value}
    cols={30}
    rows={10}
    onChange={(e) => handleChange(e)}
  />
  }

  return <input
    className={generateClassName()}
    type={type}
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={(e) => handleChange(e)}
  />
}