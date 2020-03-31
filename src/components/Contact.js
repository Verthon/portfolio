import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

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
    <section ref={ref} id='contact' className='section contact'>
      <h2 className='section__heading section__heading--contact'>Contact</h2>
      <p className='section-description section-description--contact'>
        Feel free to contact me
      </p>
      <p className='section-description section-description--email'>
        {data.site.siteMetadata.email}
      </p>
      <a
        href={`mailto:${data.site.siteMetadata.email}`}
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
