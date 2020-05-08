import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faEnvelope } from '@fortawesome/free-solid-svg-icons'

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
  return (
    <section ref={ref} id="contact" className="section contact">
      <h2 className="section__heading section__heading--contact">Contact</h2>
      <div className="contact__container">
        <p className="contact__description">
          Have a question or want to say hi? Feel free to contact me directly or
          with your webmail client.
        </p>
        <p className="contact__email">
          <span className="contact__email__icon" data-aos="zoom-in">
            <FontAwesomeIcon icon={faEnvelope} aria-label="Mail icon" />
          </span>
          {data.site.siteMetadata.email}
        </p>
        <a
          href={`mailto:${data.site.siteMetadata.email}`}
          className="contact__btn"
          data-aos="zoom-in"
          aria-label="Link to email christopher.sordyl@gmail.com"
        >
          email me
          <FontAwesomeIcon
            icon={faPaperPlane}
            aria-label="Verthon GitHub profile"
          />
        </a>
      </div>
    </section>
  )
})

Contact.propTypes = {
  email: PropTypes.string,
}

export default Contact
