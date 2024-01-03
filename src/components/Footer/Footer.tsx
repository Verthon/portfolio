/** @jsxImportSource react */
import GatsbyLogo from '../../images/Gatsby_Monogram.svg'
import { HearthIcon } from '../../icons/HearthIcon'
import { CodeIcon } from '../../icons/CodeIcon'

import {
  footer,
  footerText,
  footerCode,
  footerHearth,
  footerTech,
  footerLogo,
} from './Footer.module.css'

export const Footer = () => {
  const data = {
    site: {
      siteMetadata: {
        author: 'Krzysztof Sordyl',
        linkedin: 'https://www.linkedin.com/in/krzysztof-sordyl/',
        github: 'https://github.com/Verthon',
      },
    },
  }

  return (
    <footer className={footer}>
      <p className={footerText}>
        <span className={footerCode}>
          <CodeIcon />
        </span>
        with{' '}
        <span
          className={footerHearth}
          data-aos="fade-down"
          data-aos-delay="500"
          data-aos-offset="70"
          data-aos-once="true"
        >
          <HearthIcon color="#a33241" />
        </span>
        by {data.site.siteMetadata.author}
      </p>
      <div className={footerTech}>
        <p className={footerText}>Build with </p>
        <img
          className={footerLogo}
          width={20}
          height={20}
          src={GatsbyLogo}
          alt=""
        />
      </div>
    </footer>
  )
}
