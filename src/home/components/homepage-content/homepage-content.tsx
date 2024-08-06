import { component$ } from '@builder.io/qwik'

import Hero from '../hero/hero'
import ArticlesSection from '../articles-section/articles-section'
import DevBitesSection from '../dev-bites-section/dev-bites-section'

export default component$(() => {
  return (
    <>
      <Hero />
      <ArticlesSection />
      <DevBitesSection />
    </>
  )
})
