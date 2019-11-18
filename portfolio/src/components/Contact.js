import React from "react"
import PropTypes from "prop-types"

const Contact = ({ email }) => {
  return (
    <section id="contact" class="section contact">
      <h1 class="section-heading section-heading--contact">Contact</h1>
      <p class="section-description section-description--contact">
        Feel free to contact me
      </p>
      <p class="section-description section-description--contact">
        {email}
      </p>
      <a href={`mailto:${email}`}>
        <button
          class="contact-btn"
          data-aos="zoom-in"
          aria-label="Link to email christopher.sordyl@gmail.com"
        >
          email me
        </button>
      </a>
    </section>
  )
}

Contact.propTypes = {
  email: PropTypes.string
}

export default Contact
