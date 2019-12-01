import React from 'react'
import PropTypes from 'prop-types'

const Contact = React.forwardRef((props, ref) => {
  return (
    <section ref={ref} id='contact' className='section contact'>
      <h2 className='section__heading section__heading--contact'>Contact</h2>
      <p className='section-description section-description--contact'>
        Feel free to contact me
      </p>
      <p className='section-description section-description--contact'>
        {props.email}
      </p>
      <a
        href={`mailto:${props.email}`}
        className='contact-btn'
        data-aos='zoom-in'
        aria-label='Link to email christopher.sordyl@gmail.com'
      >
        email me
      </a>
    </section>
  )
})

Contact.propTypes = {
  email: PropTypes.string
}

export default Contact
