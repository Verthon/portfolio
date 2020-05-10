import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faPaperPlane, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import ReCAPTCHA from 'react-google-recaptcha'

const Contact = React.forwardRef((props, ref) => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            email
          }
        }
      }
    `
  )

  const initialErrorState = {
    inputName: '',
    message: '',
  }

  const errorMsg = {
    name: 'Please enter a valid name.',
    email: 'Please enter a valid email.',
    message: 'Message should have at least 10 chars.',
  }

  const validateEmail = email => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regex.test(String(email).toLowerCase())
  }

  const validate = form => {
    if (form.name.length === 0) {
      console.log('validate didnt pass', form.name)
      return { inputName: 'name', message: errorMsg.name }
    } else if (!validateEmail(form.email)) {
      console.log('validate didnt pass', form.email)
      return { inputName: 'email', message: errorMsg.email }
    } else if (form.message.length < 10) {
      console.log('validate message', form.message)
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
  const onFormChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const onCaptchaChange = value => {
    console.log('Captcha value:', value)
  }

  const onMessageSubmit = e => {
    e.preventDefault()
    const errorObj = validate(form)
    console.log('error obj afetr validation', errorObj)
    if (errorObj) {
      console.log(errorObj)
      setError(errorObj)
      return
    }
    setError(initialErrorState)
    console.log('ready to submit correct form', form)
  }

  return (
    <section ref={ref} id="contact" className="section contact">
      <h2 className="section__heading section__heading--contact">Contact</h2>
      <div className="contact__container">
        <form
          className="contact__form"
          // action="https://formspree.io/mzbjzzek"
          method="POST"
          onSubmit={onMessageSubmit}
          data-netlify-recaptcha="true"
          data-netlify="true"
        >
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
              <FontAwesomeIcon icon={faGithub} size="lg" aria-hidden="true" />
            </a>
            <a
              href={data.site.siteMetadata.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Krzysztof Sordyl linkedin profile"
            >
              <FontAwesomeIcon icon={faLinkedin} size="lg" aria-hidden="true" />
            </a>
            <a
              href={`mailto:${data.site.siteMetadata.email}`}
              className="contact__btn"
              data-aos="zoom-in"
              aria-label="Link to email christopher.sordyl@gmail.com"
            >
              Quick mail
              <FontAwesomeIcon
                icon={faPaperPlane}
                aria-label="Verthon GitHub profile"
              />
            </a>
          </div>
          <label className="contact__label" htmlFor="name">
            Name
          </label>
          <input
            className="contact__input"
            type="text"
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={e => onFormChange(e)}
          />
          {error.inputName === 'name' ? (
            <p className="contact__error">{error.message}</p>
          ) : null}
          <label className="contact__label" htmlFor="email">
            Email address
          </label>
          <input
            className="contact__input"
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={e => onFormChange(e)}
          />
          {error.inputName === 'email' ? (
            <p className="contact__error">{error.message}</p>
          ) : null}
          <label className="contact__label" htmlFor="message">
            Message
          </label>
          <textarea
            className="contact__textarea"
            name="message"
            cols="30"
            rows="10"
            placeholder="Message"
            value={form.message}
            onChange={e => onFormChange(e)}
          ></textarea>
          {error.inputName === 'message' ? (
            <p className="contact__error">{error.message}</p>
          ) : null}
          <ReCAPTCHA
            sitekey="6Le86PQUAAAAAES6Bj74SkU9XbykPFY4ST51XD4j"
            onChange={onCaptchaChange}
          />
          <div className="contact__footer">
            <button type="submit" className="contact__btn contact__btn--submit">
              Submit
            </button>
          </div>
        </form>

        {/* <p className="contact__email">
          <span className="contact__email__icon" data-aos="zoom-in">
            <FontAwesomeIcon icon={faEnvelope} aria-label="Mail icon" />
          </span>
          {data.site.siteMetadata.email}
        </p> */}
      </div>
    </section>
  )
})

Contact.propTypes = {
  email: PropTypes.string,
}

export default Contact
