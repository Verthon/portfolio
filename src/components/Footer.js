import React from 'react'

const Footer = () => {
  return (
    <footer className='site-footer'>
      <div className='footer-socials'>
        <a
          href='https://github.com/Verthon'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='Link to Verthon GitHub profile'
        >
          <i className='fa fa-github fa-lg' aria-hidden='true' />
        </a>
        <a
          href='https://www.linkedin.com/in/krzysztof-sordyl/'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='Krzysztof Sordyl linkedin profile'
        >
          <i className='fa fa-linkedin fa-lg' aria-hidden='true' />
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
