import PropTypes from 'prop-types'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import NavItem from './NavItem'

const Nav = ({ links }) => (
  <nav className='site-nav'>
    <div className='site-nav--socials'>
      <a
        href='https://github.com/Verthon'
        target='_blank'
        rel='noopener noreferrer'
      >
        <FontAwesomeIcon
          icon={faGithub}
          size='lg'
          aria-label='Verthon GitHub profile'
        />
      </a>
      <a
        href='https://www.linkedin.com/in/krzysztof-sordyl/'
        target='_blank'
        rel='noopener noreferrer'
      >
        <FontAwesomeIcon
          icon={faLinkedin}
          size='lg'
          aria-label='Krzysztof Sordyl linkedin profile'
        />
      </a>
    </div>
    <i id='menu' className='fa fa-bars fa-lg menu-icon' />
    <ul id='menu-ul' className='menu-ul'>
      {links.map(link => (
        <NavItem key={link} id={link} name={link} />
      ))}
    </ul>
  </nav>
)

Nav.propTypes = {
  siteTitle: PropTypes.string
}

Nav.defaultProps = {
  siteTitle: ''
}

export default Nav
