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
      <p className="site-footer__text">
        {data.site.siteMetadata.author} portfolio {new Date().getFullYear()} ©{' '}
      </p>
    </footer>
  )
}

export default Footer
