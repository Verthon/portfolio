/** @jsxImportSource react */
import { Nav } from '../Nav/Nav'
import { Container } from '../Container/Container'

import {
  wrapper,
  header,
  heroName,
  heroWelcome,
  heroHighlight,
  heroDescription,
} from './Header.module.css'
import { qwikify$ } from '@builder.io/qwik-react'

export const HeaderComponent = () => {
  const data = {
    site: {
      siteMetadata: {
        author: 'Krzysztof Sordyl',
        position:
          'Frontend developer passionate about React.js ecosystem, focused on creating modern web apps.',
        location: 'Based in Bielsko-Biała, Poland 🏔️',
      },
    },
  }

  return (
    <div className={wrapper}>
      <Container>
        <Nav
          links={[
            { type: 'regular', slug: 'blog' },
            { type: 'hash', slug: 'skills' },
            { type: 'hash', slug: 'contact' },
          ]}
        />
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
        </header>
      </Container>
    </div>
  )
}

export const Header = qwikify$(HeaderComponent, { eagerness: 'load' })
