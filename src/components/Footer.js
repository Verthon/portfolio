import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { useStaticQuery, graphql } from 'gatsby'

const Footer = () => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            author
            linkedin
            github
          }
        }
      }
    `
  )

  return (
    <footer className="site-footer">
      <div className="site-footer__socials">
        <a
          href={data.site.siteMetadata.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Link to Verthon GitHub profile"
        >
          <FontAwesomeIcon icon={faGithub} size="lg" aria-hidden="true" />
        </a>
        <a
          href={data.site.siteMetadata.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Krzysztof Sordyl linkedin profile"
        >
          <FontAwesomeIcon icon={faLinkedin} size="lg" aria-hidden="true" />
        </a>
      </div>
      <p className="site-footer__text">
        {data.site.siteMetadata.author} portfolio 2019 ©{' '}
        <a href="https://loading.io/" target="_blank" rel="noopener noreferrer">
          Background by:{' '}
          <span className="site-footer__text--color">loading.io</span>
        </a>
      </p>
    </footer>
  )
}

export default Footer
