import * as React from "react";

import type { InputProps } from "./Input.types";
import { input, inputError } from "./Input.module.css"

export const Input = ({ error, value, name, type, placeholder, className, onInput }: InputProps) => {

  const generateClassName = () => {
    if (error) {
      return [input, inputError, className].join(" ")
    }
    return [input, className].join(" ")
  }

  return <input
    className={generateClassName()}
    type={type}
    name={name}
    placeholder={placeholder}
    value={value}
    onInput={(e) => onInput(e)}
  />
}