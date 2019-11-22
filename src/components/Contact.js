import React from 'react'
import PropTypes from 'prop-types'

const Contact = React.forwardRef((props, ref) => {
  return (
    <section ref={ref} id='contact' className='section contact'>
      <h1 className='section-heading section-heading--contact'>Contact</h1>
      <p className='section-description section-description--contact'>
        Feel free to contact me
      </p>
      <p className='section-description section-description--contact'>
        {props.email}
      </p>
      <a href={`mailto:${props.email}`}>
        <button
          className='contact-btn'
          data-aos='zoom-in'
          aria-label='Link to email christopher.sordyl@gmail.com'
        >
          email me
        </button>
      </a>
    </section>
  )
})

Contact.propTypes = {
  email: PropTypes.string
}

export default Contact
