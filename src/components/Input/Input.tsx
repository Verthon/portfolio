/** @jsxImportSource react */
import * as React from 'react'

import type { InputProps } from './Input.types'
import { input, inputError } from './Input.module.css'

const isTextareaEvent = (
  event:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>
): event is React.ChangeEvent<HTMLTextAreaElement> =>
  event.target instanceof HTMLTextAreaElement

export const Input = ({
  error,
  value,
  name,
  type,
  placeholder,
  className,
  handleChange,
  textarea = false,
}: InputProps) => {
  const generateClassName = () => {
    if (error) {
      return [input, inputError, className].join(' ')
    }
    return [input, className].join(' ')
  }

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (isTextareaEvent(event)) {
      //@ts-ignore
      // this entire input need better design Textarea should be separated component
      handleChange(event)
      return
    }

    //@ts-ignore
    handleChange(event)
  }

  if (textarea) {
    return (
      <textarea
        className={generateClassName()}
        name={name}
        placeholder={placeholder}
        value={value}
        cols={30}
        rows={10}
        onChange={handleInputChange}
      />
    )
  }

  return (
    <input
      className={generateClassName()}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={handleInputChange}
    />
  )
}
