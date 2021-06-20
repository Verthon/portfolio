import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import { GithubIcon } from '../icons/GithubIcon'
import { LinkedinIcon } from '../icons/LinkedinIcon'
import { SendIcon } from '../icons/SendIcon'

const Contact = React.forwardRef((_props, ref) => {
  const data = useStaticQuery(
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

  const sendEmail = async (
    url = 'https://formspree.io/mzbjzzek',
    data = { form }
  ) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return response.json()
  }

  const successMessage = 'Thank you. Your message has been sent.'

  const initialErrorState = {
    inputName: '',
    message: '',
  }

  const initialFormState = {
    name: '',
    email: '',
    message: '',
  }

  const errorMsg = {
    name: 'Please enter a valid name.',
    email: 'Please enter a valid email.',
    message: 'Message should have at least 10 chars.',
  }

  const validateEmail = (email) => {
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regex.test(String(email).toLowerCase())
  }

  const validate = (form) => {
    if (form.name.length === 0) {
      return { inputName: 'name', message: errorMsg.name }
    } else if (!validateEmail(form.email)) {
      return { inputName: 'email', message: errorMsg.email }
    } else if (form.message.length < 10) {
      return { inputName: 'message', message: errorMsg.message }
    }

    return false
  }

  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [error, setError] = useState(initialErrorState)
  const [success, setSuccess] = useState('')
  const onFormChange = (e) => {
    setError(initialErrorState)
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const onMessageSubmit = (e) => {
    e.preventDefault()
    const errorObj = validate(form)
    if (errorObj) {
      setError(errorObj)
      return
    }
    setError(initialErrorState)
    sendEmail('https://formspree.io/mzbjzzek', form)
      .then(() => {
        setForm(initialFormState)
        setSuccess(successMessage)
      })
      .catch((error) => console.log('error with email', error))
  }

  return (
    <section ref={ref} id="contact" className="section contact">
      <h2 className="section__heading section__heading--contact">Contact</h2>
      <div className="contact__container">
        <form
          className="contact__form"
          action="https://formspree.io/mzbjzzek"
          method="POST"
          onSubmit={onMessageSubmit}
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
              href={data.site.siteMetadata.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Link to Verthon GitHub profile"
            >
              <GithubIcon color="black" ariaHidden="true" />
            </a>
            <a
              href={data.site.siteMetadata.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Krzysztof Sordyl linkedin profile"
            >
              <LinkedinIcon color="black" ariaHidden={true} />
            </a>
            <a
              href={`mailto:${data.site.siteMetadata.email}`}
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
            className={
              error.inputName === 'name'
                ? 'contact__input contact__input--error'
                : 'contact__input'
            }
            type="text"
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={(e) => onFormChange(e)}
          />
          {error.inputName === 'name' ? (
            <p className="contact__error">{error.message}</p>
          ) : null}
          <label className="contact__label" htmlFor="email" name="email">
            Email address
          </label>
          <input
            className={
              error.inputName === 'email'
                ? 'contact__input contact__input--error'
                : 'contact__input'
            }
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={(e) => onFormChange(e)}
          />
          {error.inputName === 'email' ? (
            <p className="contact__error">{error.message}</p>
          ) : null}
          <label className="contact__label" htmlFor="message" name="message">
            Message
          </label>
          <textarea
            className={
              error.inputName === 'message'
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
          {error.inputName === 'message' ? (
            <p className="contact__error">{error.message}</p>
          ) : null}
          {success ? <p className="contact__success">{success}</p> : null}
          <div className="contact__footer">
            <button type="submit" className="contact__btn contact__btn--submit">
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

export default Contact
