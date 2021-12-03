import * as React from "react"

import { MESSAGES } from "../../../constants/messages"
import { Props } from "./FormAlert.types"

export const FormAlert = ({ status }: Props ) => {
  return (
    <>
      {(() => {
        switch (status) {
          case "complete":
            return (
              <p role="alert" className="contact__success">
                {MESSAGES.contactSuccess}
              </p>
            )
          case "error":
            return (
              <p role="alert" className="contact__error">
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