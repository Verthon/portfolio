import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import { Nav } from '../Nav/Nav'
import { Container } from '../Container/Container'

import type { HeaderData, Props } from './Header.types'
import { wrapper, header, heroName, heroWelcome, heroHighlight, heroDescription, heroBtn } from "./Header.module.css"

export const Header = ({ scrollToComponent }: Props) => {
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
    <div className={wrapper}>
      <Container>
        <Nav links={['skills', 'contact']} scrollToComponent={scrollToComponent} />
      </Container>
      <Container>
        <header className={header} data-aos="zoom-out-down">
          <h2 className={heroWelcome}>
            Hello{' '}
            <span role="img" aria-label="waving hand">
              👋
            </span>{' '}
            Welcome to my portfolio!
          </h2>
          <h1 className={heroName}>
            I'm{' '}
            <strong className={heroHighlight}>
              {data.site.siteMetadata.author}
            </strong>
          </h1>
          <p
            className={heroDescription}
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {data.site.siteMetadata.position}
          </p>
          <p
            className={heroDescription}
            data-aos="fade-up"
            data-aos-delay="300"
          >
            {data.site.siteMetadata.location}
          </p>
          <button
            id="btn-projects"
            className={heroBtn}
            onClick={() => scrollToComponent('projects')}
          >
            Check Projects
          </button>
        </header>
      </Container>
    </div>
  )
}
