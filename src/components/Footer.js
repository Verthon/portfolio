import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faHeart } from '@fortawesome/free-solid-svg-icons'
import { useStaticQuery, graphql } from 'gatsby'
import GatsbyLogo from '../images/Gatsby_Monogram.svg'

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
        <span className="site-footer__code">
          <FontAwesomeIcon icon={faCode} size="lg" aria-hidden="true" />
        </span>
        with{' '}
        <span
          className="site-footer__heart"
          data-aos="fade-down"
          data-aos-delay="500"
          data-aos-offset="70"
          data-aos-once="true"
        >
          <FontAwesomeIcon icon={faHeart} size="lg" aria-hidden="true" />
        </span>
        by {data.site.siteMetadata.author}
      </p>
      <div className="site-footer__tech">
        <p className="site-footer__text">Build with </p>
        <img className="site-footer__logo" src={GatsbyLogo} alt="" />
      </div>
    </footer>
  )
}

export default Footer
