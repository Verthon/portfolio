import * as React from "react"

import { Input } from "../Input/Input"
import { Label } from "../Label/Label"

import type { InputFieldProps } from "./InputField.types"

export const InputField = ({ label, value, error, onInput}: InputFieldProps) => {
  <Label label={label}>
    <Input value={value} error={error} onInput={onInput} />
  </Label>
}