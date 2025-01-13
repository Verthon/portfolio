import { component$ } from '@builder.io/qwik'
import { Link } from '@builder.io/qwik-city'

import { siteMetadata } from '~/common/application/constants/site-metadata'
import GithubIcon from '../github-icon/github-icon'
import LinkedinIcon from '../linkedin-icon/linkedin-icon'

import {
  footerSocialsWrapper,
  footerSocialsLinksWrapper,
  footerSocialsLink,
} from './footer-socials.module.css'

const currentYear = new Date().getFullYear()

export default component$(() => {
  return (
    <div class={footerSocialsWrapper}>
      <p>© {currentYear} All rights reserved.</p>
      <div class={footerSocialsLinksWrapper}>
        <Link
          class={footerSocialsLink}
          href={siteMetadata.github}
          rel="noopener noreferrer"
        >
          <GithubIcon ariaLabel="Krzysztof Sordyl's GitHub profile" />
        </Link>
        <Link
          class={footerSocialsLink}
          href={siteMetadata.linkedin}
          rel="noopener noreferrer"
        >
          <LinkedinIcon
            ariaLabel="Krzysztof Sordyl linkedin profile"
            color={'current'}
          />
        </Link>
      </div>
    </div>
  )
})
