export const INIT_ERROR_STATE = {
  inputName: '',
  message: '',
}

export const INIT_FORM_STATE = {
  name: '',
  email: '',
  message: '',
  hasError: false,
  error: INIT_ERROR_STATE,
}

export type ContactFormState = typeof INIT_FORM_STATE;