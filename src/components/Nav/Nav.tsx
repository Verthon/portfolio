/** @jsxImportSource react */

import { NavItem } from '../NavItem/NavItem'
import { ThemeToggler } from '../ThemeToggler/ThemeToggler'
import { GithubIcon } from '../../icons/GithubIcon'
import { LinkedinIcon } from '../../icons/LinkedinIcon'

import { siteNav, socials, menuList } from './Nav.module.css'

type SlugVariant = 'skills' | 'contact' | 'blog' | 'home'
type LinkVariant = 'hash' | 'regular'

type NavProps = {
  links: {
    slug: SlugVariant
    type: LinkVariant
  }[]
}

const generateNavLink = ({
  linkType,
  slug,
}: {
  linkType: LinkVariant
  slug: SlugVariant
}) => {
  if (linkType === 'hash') return `#${slug}`

  return slug
}

export const Nav = ({ links }: NavProps) => {
  const data = {
    site: {
      siteMetadata: {
        linkedin: 'https://www.linkedin.com/in/krzysztof-sordyl/',
        github: 'https://github.com/Verthon',
      },
    },
  }

  return (
    <nav className={siteNav}>
      <div className={socials}>
        <ThemeToggler />
      </div>
      <ul className={menuList}>
        {links.map((link) => (
          <NavItem key={link.slug}>
            <a href={generateNavLink({ linkType: link.type, slug: link.slug })}>
              {link.slug}
            </a>
          </NavItem>
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
