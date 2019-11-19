import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'

const Footer = props => {
  return (
    <footer class='site-footer'>
      <div class='footer-socials'>
        <Link
          to='https://github.com/Verthon'
          target='_blank'
          rel='noopener'
          aria-label='Link to Verthon GitHub profile'
        >
          <i class='fa fa-github fa-lg' aria-hidden='true' />
        </Link>
        <Link
          to='https://www.linkedin.com/in/krzysztof-sordyl/'
          target='_blank'
          rel='noopener'
          aria-label='Krzysztof Sordyl linkedin profile'
        >
          <i class='fa fa-linkedin fa-lg' aria-hidden='true' />
        </Link>
      </div>
      <p class='site-footer__text'>
        Krzysztof Sordyl portfolio 2019 ©{' '}
        <a
          href='https://loading.io/'
          target='_blank'
          rel='noopener noreferrer'
        >
          Background by:{' '}
          <span class='site-footer__text--color'>loading.io</span>
        </a>
      </p>
    </footer>
  )
}

Footer.propTypes = {
  email: PropTypes.string
}

export default Footer
