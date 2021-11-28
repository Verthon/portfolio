import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import NavItem from '../NavItem/NavItem'
import { ThemeToggler } from '../ThemeToggler'
import { GithubIcon } from '../../icons/GithubIcon'
import { LinkedinIcon } from '../../icons/LinkedinIcon'
import type { Props } from './Nav.types'

export const Nav = ({ links, scroll }: Props) => {
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
        <ThemeToggler />
      </div>
      <ul id="menu-ul" className="menu-ul">
        {links.map((link) => (
          <NavItem key={link} name={link} handleClick={scroll} />
        ))}
        <li className="menu-item">
          <a
            href={data.site.siteMetadata.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon
              width={22}
              height={22}
              ariaLabel="Verthon GitHub profile"
            />
          </a>
        </li>
        <li className="menu-item">
          <a
            href={data.site.siteMetadata.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedinIcon
              width={22}
              height={22}
              ariaLabel="Krzysztof Sordyl linkedin profile"
            />
          </a>
        </li>
      </ul>
    </nav>
  )
}
