import { VALIDATIONS } from "../constants/messages"

export const FIELDS = {
  name: "name",
  email: "email",
  message: "message",
}

export const validateEmail = (email) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(String(email).toLowerCase())
}

export const validate = (form) => {
  if (form.name.length === 0) {
    return { inputName: FIELDS.name, message: VALIDATIONS.name }
  } else if (!validateEmail(form.email)) {
    return { inputName: FIELDS.email, message: VALIDATIONS.email }
  } else if (form.message.length < 10) {
    return { inputName: FIELDS.message, message: VALIDATIONS.message }
  }

  return false
}