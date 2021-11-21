import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import { Spinner } from "../components/Spinner"
import { GithubIcon } from '../icons/GithubIcon'
import { LinkedinIcon } from '../icons/LinkedinIcon'
import { SendIcon } from '../icons/SendIcon'
import { validate } from '../utils/validators'
import { sendEmail } from '../utils/contact'
import { MESSAGES } from '../constants/messages'
import { STATUS } from '../constants/state'

export const FormSubmitAlert = ({ status }) => {
  return (
    <>
      {(() => {
        switch (status) {
          case STATUS.complete:
            return (
              <p role="alert" className="contact__success">
                {MESSAGES.contactSuccess}
              </p>
            )
          case STATUS.errored:
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

  const INIT_ERROR_STATE = {
    inputName: '',
    message: '',
  }

  const INIT_FORM_STATE = {
    name: '',
    email: '',
    message: '',
  }

  const [status, setStatus] = useState(STATUS.idle)
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
    hasError: false,
    error: INIT_ERROR_STATE,
  })
  const onFormChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
      hasError: false,
      error: INIT_ERROR_STATE,
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const errorObj = validate(form)
    if (errorObj) {
      setForm({ ...form, hasError: true, error: errorObj })
      return
    }
    setStatus(STATUS.loading)
    setForm({ ...form, hasError: false, error: INIT_ERROR_STATE })
    try {
      await sendEmail({ data: form })
      setForm(INIT_FORM_STATE)
      setStatus(STATUS.complete)
    } catch (_) {
      setStatus(STATUS.errored)
    }
  }
  const isFormFilled = Object.values(form).some((x) => x !== null && x !== '')
  const isValid = !form.hasError && isFormFilled
  const isDisabled = !isValid || status === STATUS.loading || form.hasError

  return (
    <section ref={ref} id="contact" className="section contact">
      <h2 className="section__heading section__heading--contact">Contact</h2>
      <div className="contact__container">
        <form
          className="contact__form"
          action="https://formspree.io/mzbjzzek"
          method="POST"
          onSubmit={onSubmit}
          netlify-honeypot="bot-field"
          data-netlify="true"
        >
          <p className="hidden">
            <label htmlFor="bot-field" name="bot-field">
              Don’t fill this out if you're human: <input name="bot-field" />
            </label>
          </p>
          <p className="contact__description">
            Have a question or want to say hi? Feel free to contact me with your
            webmail client or with form below.
          </p>
          <div className="contact__socials">
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
              className="contact__btn"
              aria-label="Link to email christopher.sordyl@gmail.com"
            >
              Quick mail
              <SendIcon
                width="20"
                height="20"
                color="black"
                aria-label="Send an email using your email client"
              />
            </a>
          </div>
          <label className="contact__label" htmlFor="name" name="name">
            Name
          </label>
          <input
            role="textbox"
            className={
              form.error.inputName === 'name'
                ? 'contact__input contact__input--error'
                : 'contact__input'
            }
            type="text"
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={(e) => onFormChange(e)}
          />
          {form.error.inputName === 'name' ? (
            <p role="alert" className="contact__error">
              {form.error.message}
            </p>
          ) : null}
          <label className="contact__label" htmlFor="email" name="email">
            Email address
          </label>
          <input
            className={
              form.error.inputName === 'email'
                ? 'contact__input contact__input--error'
                : 'contact__input'
            }
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={(e) => onFormChange(e)}
          />
          {form.error.inputName === 'email' ? (
            <p role="alert" className="contact__error">
              {form.error.message}
            </p>
          ) : null}
          <label className="contact__label" htmlFor="message" name="message">
            Message
          </label>
          <textarea
            className={
              form.error.inputName === 'message'
                ? 'contact__textarea contact__input--error'
                : 'contact__textarea'
            }
            name="message"
            cols="30"
            rows="10"
            placeholder="Message"
            value={form.message}
            onChange={(e) => onFormChange(e)}
          ></textarea>
          {form.error.inputName === 'message' ? (
            <p role="alert" className="contact__error">
              {form.error.message}
            </p>
          ) : null}
          <FormSubmitAlert status={status}/>
          <Spinner isActive={status === STATUS.loading} />
          <div className="contact__footer">
            <button
              role="button"
              type="submit"
              name="submit"
              className="contact__btn contact__btn--submit"
              disabled={isDisabled}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  )
})

Contact.propTypes = {
  email: PropTypes.string,
}
