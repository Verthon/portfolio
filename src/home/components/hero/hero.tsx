import { component$ } from '@builder.io/qwik'

import {
  wrapper,
  header,
  heroName,
  heroHighlight,
  heroDescription,
} from './hero.module.css'

export default component$(() => {
  return (
    <div class={wrapper}>
      <header class={header}>
        <h1 class={heroName}>
          <strong class={heroHighlight}>Welcome, I'm Krzysztof</strong>
        </h1>
        <p class={heroDescription}>
          Frontend engineer building internal tooling for dev teams
        </p>
        <p class={heroDescription}>
           Writing about frontend architecture, developer experience, and making technical decisions, that actually serve the business.
        </p>
      </header>
    </div>
  )
})
