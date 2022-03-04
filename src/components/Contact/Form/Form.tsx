import * as React from "react"

import { STATUS } from "../../../constants/state"
import { sendEmail } from "../../../utils/contact"
import { validate } from "../../../utils/validators"
import { Button } from "../../Button/Button"
import { Label } from "../../Label/Label"
import { Spinner } from "../../Spinner/Spinner"
import { FormAlert } from "../FormAlert/FormAlert"
import { InputField } from "../../InputField/InputField"

import { INIT_ERROR_STATE, INIT_FORM_STATE } from "./Form.const"
import type { SubmitStatus } from "./Form.types"
import { hidden, footer, btnSubmit, form as formClass } from "./Form.module.css"

export const Form = () => {
  const [status, setStatus] = React.useState<SubmitStatus>("idle")
  const [form, setForm] = React.useState(INIT_FORM_STATE)
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e.target.name);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
      hasError: false,
      error: INIT_ERROR_STATE,
    })
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const errorObj = validate(form)
    if (errorObj) {
      setForm({ ...form, hasError: true, error: errorObj })
      return
    }
    setStatus("loading")
    setForm({ ...form, hasError: false, error: INIT_ERROR_STATE })
    try {
      await sendEmail({ data: form })
      setForm(INIT_FORM_STATE)
      setStatus("complete")
    } catch (_) {
      setStatus("error")
    }
  }
  const isFormFilled = Object.values(form).some((x) => x !== null && x !== '')
  const isValid = !form.hasError && isFormFilled
  const isDisabled = !isValid || status === STATUS.loading || form.hasError

  return <form
    method="POST"
    onSubmit={(e) => onSubmit(e)}
    netlify-honeypot="bot-field"
    data-netlify="true"
    data-cy="contact-form"
    className={formClass}
  >
    <p className={hidden}>
      <Label id="bot-field" label="Don’t fill this out if you're human:">
        <input name="bot-field" />
      </Label>
    </p>
    <InputField
      role="textbox"
      error={form.error.inputName === 'name'}
      errorMessage={form.error.message}
      label="Name"
      type="text"
      name="name"
      placeholder="Your name"
      value={form.name}
      handleChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFormChange(e)} />

    <InputField
      error={form.error.inputName === 'email'}
      errorMessage={form.error.message}
      label="Email address"
      type="email"
      name="email"
      placeholder="Email address"
      value={form.email}
      handleChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFormChange(e)}
    />
    <InputField 
      error={form.error.inputName === 'message'}
      errorMessage={form.error.message}
      name="message"
      label="Message"
      placeholder="Message"
      value={form.message}
      textarea
      handleChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleFormChange(e)} />
    <FormAlert status={status} />
    <Spinner isActive={status === STATUS.loading} />
    <div className={footer}>
      <Button
        variant="primary"
        role="button"
        type="submit"
        name="submit"
        className={btnSubmit}
        disabled={isDisabled}
      >
        Submit
      </Button>
    </div>
  </form>
}