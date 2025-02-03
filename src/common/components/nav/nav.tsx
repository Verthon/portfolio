import { component$ } from '@builder.io/qwik'

import type { LinkVariant, SlugVariant } from '~/common/domain/models/nav'
import NavItem from '../nav-item/nav-item'

import ThemeToggler from '../theme-toggler/theme-toggler'
import GithubIcon from '../github-icon/github-icon'
import LinkedinIcon from '../linkedin-icon/linkedin-icon'
import { generateNavLink } from '~/common/application/services/nav'

import { siteNav, socials, menuList } from './nav.module.css'
import { Link } from '@builder.io/qwik-city'

type NavProps = {
  links: {
    slug: SlugVariant
    type: LinkVariant
    name: string
  }[]
}

const siteMetadata = {
  linkedin: 'https://www.linkedin.com/in/krzysztof-sordyl/',
  github: 'https://github.com/Verthon',
}

export default component$(({ links }: NavProps) => {
  return (
    <nav class={siteNav}>
      <div class={socials}>
        <ThemeToggler />
      </div>
      <ul class={menuList}>
        {links.map((link) => (
          <NavItem key={link.slug}>
            <Link
              href={generateNavLink({ linkType: link.type, slug: link.slug })}
            >
              {link.name}
            </Link>
          </NavItem>
        ))}
        <NavItem>
          <Link
            href={siteMetadata.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon
              width={22}
              height={22}
              ariaLabel="Verthon GitHub profile"
            />
          </Link>
        </NavItem>
        <NavItem>
          <Link
            href={siteMetadata.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedinIcon
              width={22}
              height={22}
              ariaLabel="Krzysztof Sordyl linkedin profile"
            />
          </Link>
        </NavItem>
      </ul>
    </nav>
  )
})
