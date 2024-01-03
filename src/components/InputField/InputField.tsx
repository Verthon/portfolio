/** @jsxImportSource react */
import * as React from 'react'

import { Input } from '../Input/Input'
import { Label } from '../Label/Label'
import { InputError } from '../InputError/InputError'

import type { InputFieldProps } from './InputField.types'
import { field } from './InputField.module.css'

export const InputField = ({
  label,
  value,
  error,
  handleChange,
  name,
  placeholder,
  errorMessage,
  textarea,
}: InputFieldProps) => {
  return (
    <div className={field}>
      <Label label={label}>
        <Input
          value={value}
          error={error}
          handleChange={handleChange}
          name={name}
          placeholder={placeholder}
          textarea={textarea}
        />
        <InputError error={error ? errorMessage : undefined} />
      </Label>
    </div>
  )
}
