import { component$ } from '@builder.io/qwik'

import type { LinkVariant, SlugVariant } from '~/common/domain/models/nav'
import NavItem from '../nav-item/nav-item'

import ThemeToggler from '../theme-toggler/theme-toggler'
import GithubIcon from '../github-icon/github-icon'
import LinkedinIcon from '../linkedin-icon/linkedin-icon'
import { generateNavLink } from '~/common/application/services/nav'

import { siteNav, socials, menuList } from './nav.module.css'

type NavProps = {
  links: {
    slug: SlugVariant
    type: LinkVariant
    name: string
  }[]
}

const siteMetadata = {
  github: '',
  linkedin: '',
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
            <a href={generateNavLink({ linkType: link.type, slug: link.slug })}>
              {link.name}
            </a>
          </NavItem>
        ))}
        <NavItem>
          <a
            href={siteMetadata.github}
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
            href={siteMetadata.linkedin}
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
})
