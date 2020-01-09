import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import NavItem from './NavItem'
import { useStaticQuery, graphql } from 'gatsby'

const Nav = ({ links, scroll }) => {

  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            linkedin
            github
          }
        }
      }
    `
  )

  const [show, handleMenuVisibility] = useState(false)
  const menuCssClass = show ? 'menu-ul-mobile' : 'menu-ul'
  return (
    <nav className='site-nav'>
      <div className='site-nav--socials'>
        <a
          href={data.site.siteMetadata.github}
          target='_blank'
          rel='noopener noreferrer'
        >
          <FontAwesomeIcon
            icon={faGithub}
            size='lg'
            aria-label='Verthon GitHub profile'
            color='black'
          />
        </a>
        <a
          href={data.site.siteMetadata.linkedin}
          target='_blank'
          rel='noopener noreferrer'
        >
          <FontAwesomeIcon
            icon={faLinkedin}
            size='lg'
            aria-label='Krzysztof Sordyl linkedin profile'
            color='black'
          />
        </a>
      </div>
      <button
        className='menu-icon'
        aria-label='menu button'
        aria-haspopup='true'
      >
        <FontAwesomeIcon
          icon={show ? faTimes : faBars}
          size='lg'
          aria-hidden='true'
          color='black'
          onClick={() => handleMenuVisibility(!show)}
        />
      </button>
      <ul id='menu-ul' className={menuCssClass}>
        {links.map(link => (
          <NavItem key={link} name={link} handleClick={scroll} />
        ))}
      </ul>
    </nav>
  )
}

Nav.propTypes = {
  links: PropTypes.array,
  scroll: PropTypes.func
}

export default Nav
