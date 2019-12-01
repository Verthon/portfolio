import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
  return (
    <footer className='site-footer'>
      <div className='site-footer__socials'>
        <a
          href='https://github.com/Verthon'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='Link to Verthon GitHub profile'
        >
          <FontAwesomeIcon icon={faGithub} size='lg' aria-hidden='true' />
        </a>
        <a
          href='https://www.linkedin.com/in/krzysztof-sordyl/'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='Krzysztof Sordyl linkedin profile'
        >
          <FontAwesomeIcon icon={faLinkedin} size='lg' aria-hidden='true' />
        </a>
      </div>
      <p className='site-footer__text'>
        Krzysztof Sordyl portfolio 2019 ©{' '}
        <a href='https://loading.io/' target='_blank' rel='noopener noreferrer'>
          Background by:{' '}
          <span className='site-footer__text--color'>loading.io</span>
        </a>
      </p>
    </footer>
  )
}

export default Footer
