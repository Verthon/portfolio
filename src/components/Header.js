import PropTypes from 'prop-types'
import React from 'react'
import Nav from './Nav'
import { useStaticQuery, graphql } from 'gatsby'

const Header = ({ scroll }) => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            author
            position
            location
          }
        }
      }
    `
  )

  return (
    <div className="header-wrapper">
      <div className="container">
        <Nav links={['skills', 'contact']} scroll={scroll} />
      </div>
      <div className="container site-header">
        <header className="hero">
          <h2 className="hero__welcome" data-aos="zoom-in">
            Hello 👋 Welcome to my portfolio!
          </h2>
          <h1 className="hero__name" data-aos="zoom-in">
            I'm{' '}
            <strong className="hero__highlight">
              {data.site.siteMetadata.author}
            </strong>
          </h1>
          <p className="hero__description" data-aos="zoom-in">
            {data.site.siteMetadata.position}
          </p>
          <p className="hero__description" data-aos="zoom-in">
            {data.site.siteMetadata.location}
          </p>
          <button
            id="btn-projects"
            className="hero__btn"
            onClick={() => scroll('projects')}
          >
            Check Project
          </button>
        </header>
      </div>
    </div>
  )
}

Header.propTypes = {
  scroll: PropTypes.func,
}

export default Header
