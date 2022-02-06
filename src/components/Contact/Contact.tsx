import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import { Spinner } from "../Spinner/Spinner"
import { GithubIcon } from '../../icons/GithubIcon'
import { LinkedinIcon } from '../../icons/LinkedinIcon'
import { SendIcon } from '../../icons/SendIcon'
import { validate } from '../../utils/validators'
import { sendEmail } from '../../utils/contact'
import { STATUS } from '../../constants/state'
import { SubmitStatus } from './Contact.types'
import { FormAlert } from './FormAlert/FormAlert'

import { contactContainer, contactForm, contactSocials, contactLabel, contactInput, contactTextarea, error, btn, btnSubmit, description, footer, contactInputError, hidden } from "./Contact.module.css"
import { INIT_FORM_STATE, INIT_ERROR_STATE } from './Contact.const'

export const Contact = React.forwardRef((_props, ref) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            email
            linkedin
            github
          }
        }
      }
    `
  )

  const [status, setStatus] = useState<SubmitStatus>("idle")
  const [form, setForm] = useState(INIT_FORM_STATE)
  const onFormChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
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

  return (
    <section ref={ref} id="contact" className="section contact">
      <h2 className="section__heading section__heading--contact">Contact</h2>
      <div className={contactContainer}>
        <form
          className={contactForm}
          action="https://formspree.io/mzbjzzek"
          method="POST"
          onSubmit={(e) => onSubmit(e)}
          netlify-honeypot="bot-field"
          data-netlify="true"
        >
          <p className={hidden}>
            <label htmlFor="bot-field" id="bot-field">
              Don’t fill this out if you're human: <input name="bot-field" />
            </label>
          </p>
          <p className={description}>
            Have a question or want to say hi? Feel free to contact me with your
            webmail client or with form below.
          </p>
          <div className={contactSocials}>
            <a
              href={site.siteMetadata.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Link to Verthon GitHub profile"
            >
              <GithubIcon ariaHidden={true} />
            </a>
            <a
              href={site.siteMetadata.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Krzysztof Sordyl linkedin profile"
            >
              <LinkedinIcon ariaHidden={true} />
            </a>
            <a
              href={`mailto:${site.siteMetadata.email}`}
              className={btn}
              aria-label="Link to email christopher.sordyl@gmail.com"
            >
              Quick mail
              <SendIcon
                width={20}
                height={20}
                color="black"
                aria-label="Send an email using your email client"
              />
            </a>
          </div>
          <label className={contactLabel} htmlFor="name">
            Name
          </label>
          <input
            role="textbox"
            className={
              form.error.inputName === 'name'
                ? `${contactInput} ${contactInputError}`
                : contactInput
            }
            type="text"
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={(e) => onFormChange(e)}
          />
          {form.error.inputName === 'name' ? (
            <p role="alert" className={error}>
              {form.error.message}
            </p>
          ) : null}
          <label className={contactLabel} htmlFor="email">
            Email address
          </label>
          <input
            className={
              form.error.inputName === 'email'
                ? `${contactInput} ${contactInputError}`
                : contactInput
            }
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={(e) => onFormChange(e)}
          />
          {form.error.inputName === 'email' ? (
            <p role="alert" className={error}>
              {form.error.message}
            </p>
          ) : null}
          <label className={contactLabel} htmlFor="message">
            Message
          </label>
          <textarea
            className={
              form.error.inputName === 'message'
                ? `${contactTextarea} ${contactInputError}`
          : contactTextarea
            }
          name="message"
          cols={30}
          rows={10}
          placeholder="Message"
          value={form.message}
          onChange={(e) => onFormChange(e)}
          ></textarea>
        {form.error.inputName === 'message' ? (
          <p role="alert" className={error}>
            {form.error.message}
          </p>
        ) : null}
        <FormAlert status={status} />
        <Spinner isActive={status === STATUS.loading} />
        <div className={footer}>
          <button
            role="button"
            type="submit"
            name="submit"
            className={btnSubmit}
            disabled={isDisabled}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
    </section >
  )
})
