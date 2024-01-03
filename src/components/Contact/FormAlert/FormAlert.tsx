/** @jsxImportSource react */
import * as React from 'react'

import { MESSAGES } from '../../../constants/messages'
import type { FormAlertProps } from './FormAlert.types'

export const FormAlert = ({ status }: FormAlertProps) => {
  return (
    <>
      {(() => {
        switch (status) {
          case 'complete':
            return (
              <p
                role="alert"
                className="contact__success"
                data-cy="contact-success-alert"
              >
                {MESSAGES.contactSuccess}
              </p>
            )
          case 'error':
            return (
              <p
                role="alert"
                className="contact__error"
                data-cy="contact-error-alert"
              >
                {MESSAGES.contactFailure}
              </p>
            )
          default:
            return null
        }
      })()}
    </>
  )
}
