import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

const Nav = ({ siteTitle }) => (
  <nav class='site-nav'>
    <div class='site-nav--socials'>
      <Link href='https://github.com/Verthon' target='_blank' rel='noopener'>
        <i class='fa fa-github fa-lg' aria-label='Verthon GitHub profile' />
      </Link>
      <Link
        href='https://www.linkedin.com/in/krzysztof-sordyl/'
        target='_blank'
        rel='noopener'
      >
        <i
          class='fa fa-linkedin fa-lg'
          aria-label='Krzysztof Sordyl linkedin profile'
        />
      </Link>
    </div>
    <i id='menu' class='fa fa-bars fa-lg menu-icon' />
    <ul id='menu-ul' class='menu-ul'>
      <li id='menu-skills' class='menu-item'>
        skills
      </li>
      <li id='menu-about' class='menu-item'>
        about
      </li>
      <li id='menu-projects' class='menu-item'>
        projects
      </li>
      <li id='menu-contact' class='menu-item'>
        contact
      </li>
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
