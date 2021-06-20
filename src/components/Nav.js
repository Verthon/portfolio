import PropTypes from 'prop-types'
import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import NavItem from './NavItem'
import { GithubIcon } from '../icons/GithubIcon'
import { LinkedinIcon } from '../icons/LinkedinIcon'

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

  return (
    <nav className="site-nav">
      <div className="site-nav--socials">
        <a
          href={data.site.siteMetadata.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubIcon color="black" ariaLabel="Verthon GitHub profile" />
        </a>
        <a
          href={data.site.siteMetadata.linkedin}
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedinIcon
            color="black"
            ariaLabel="Krzysztof Sordyl linkedin profile"
          />
        </a>
      </div>
      <ul id="menu-ul" className="menu-ul">
        {links.map((link) => (
          <NavItem key={link} name={link} handleClick={scroll} />
        ))}
      </ul>
    </nav>
  )
}

Nav.propTypes = {
  links: PropTypes.array,
  scroll: PropTypes.func,
}

export default Nav
