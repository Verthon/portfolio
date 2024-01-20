import { component$ } from '@builder.io/qwik'

import { siteMetadata } from '~/common/application/constants/site-metadata'
import GithubIcon from '../github-icon/github-icon'
import LinkedinIcon from '../linkedin-icon/linkedin-icon'

import {
  footerSocialsWrapper,
  footerSocialsLinksWrapper,
  footerSocialsLink,
} from './footer-socials.module.css'

export default component$(() => {
  return (
    <div class={footerSocialsWrapper}>
      <p>© 2024 All rights reserved.</p>
      <div class={footerSocialsLinksWrapper}>
        <a
          class={footerSocialsLink}
          href={siteMetadata.github}
          rel="noopener noreferrer"
        >
          <GithubIcon ariaLabel="Krzysztof Sordyl's GitHub profile" />
        </a>
        <a
          class={footerSocialsLink}
          href={siteMetadata.linkedin}
          rel="noopener noreferrer"
        >
          <LinkedinIcon
            ariaLabel="Krzysztof Sordyl linkedin profile"
            color={'current'}
          />
        </a>
      </div>
    </div>
  )
})
