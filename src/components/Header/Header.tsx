import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import { Nav } from '../Nav/Nav'
import type { HeaderData, Props } from './Header.types'

export const Header = ({ scroll }: Props) => {
  const data = useStaticQuery<HeaderData>(
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
        <header className="hero" data-aos="zoom-out-down">
          <h2 className="hero__welcome">
            Hello{' '}
            <span role="img" aria-label="waving hand">
              👋
            </span>{' '}
            Welcome to my portfolio!
          </h2>
          <h1 className="hero__name">
            I'm{' '}
            <strong className="hero__highlight">
              {data.site.siteMetadata.author}
            </strong>
          </h1>
          <p
            className="hero__description"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {data.site.siteMetadata.position}
          </p>
          <p
            className="hero__description"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            {data.site.siteMetadata.location}
          </p>
          <button
            id="btn-projects"
            className="hero__btn"
            onClick={() => scroll('projects')}
          >
            Check Projects
          </button>
        </header>
      </div>
    </div>
  )
}
