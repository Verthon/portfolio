import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import { NavItem } from '../NavItem/NavItem'
import { ThemeToggler } from '../ThemeToggler/ThemeToggler'
import { GithubIcon } from '../../icons/GithubIcon'
import { LinkedinIcon } from '../../icons/LinkedinIcon'
import { useScrollDispatch } from '../../hooks/useScrollDispatch'

import type { Props } from './Nav.types'
import { siteNav, socials, menuList } from "./Nav.module.css";


export const Nav = ({ links }: Props) => {
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

  const { scrollToComponent } = useScrollDispatch()

  return (
    <nav className={siteNav}>
      <div className={socials}>
        <ThemeToggler />
      </div>
      <ul className={menuList}>
        {links.map((link) => (
          <NavItem key={link} onClick={() => scrollToComponent(link)}>{link}</NavItem>
        ))}
        <NavItem>
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
        </NavItem>
        <NavItem>
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
        </NavItem>
      </ul>
    </nav>
  )
}
