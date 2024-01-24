import { component$ } from '@builder.io/qwik'

import {
  wrapper,
  header,
  heroName,
  heroWelcome,
  heroHighlight,
  heroDescription,
} from './hero.module.css'

export default component$(() => {
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
    <div class={wrapper}>
      <header class={header} data-aos="zoom-out-down">
        <h2 class={heroWelcome}>
          Hello{' '}
          <span role="img" aria-label="waving hand">
            👋
          </span>{' '}
          Welcome to my portfolio!
        </h2>
        <h1 class={heroName}>
          I'm{' '}
          <strong class={heroHighlight}>{data.site.siteMetadata.author}</strong>
        </h1>
        <p class={heroDescription} data-aos="fade-up" data-aos-delay="200">
          {data.site.siteMetadata.position}
        </p>
        <p class={heroDescription} data-aos="fade-up" data-aos-delay="300">
          {data.site.siteMetadata.location}
        </p>
      </header>
    </div>
  )
})
