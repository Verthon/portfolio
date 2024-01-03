/** @jsxImportSource react */
import * as React from 'react'

import {
  errorBox,
  errorMessage as errorMessageClass,
} from './InputError.module.css'
import type { InputErrorProps } from './InputError.types'

export const InputError = ({ error }: InputErrorProps) => {
  if (error) {
    return (
      <div role="alert" className={errorMessageClass}>
        {error}
      </div>
    )
  }

  return <div role="alert" className={errorBox}></div>
}
