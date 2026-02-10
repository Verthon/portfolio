import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'

import Layout from '~/common/components/layout/layout'
import HomePageContent from '~/home/components/homepage-content/homepage-content'

export default component$(() => {
  return (
    <Layout>
      <HomePageContent />
    </Layout>
  )
})

export const head: DocumentHead = {
  title: 'Krzysztof Sordyl • Architecture & DX at Scale',
  meta: [
    {
      name: 'author',
      content: 'Krzysztof Sordyl',
    },
    {
      name: 'description',
      content:
        'Writing about frontend architecture, developer experience, and scaling tooling across teams in large organizations.',
    },
    {
      property: 'og:title',
      content: 'Krzysztof Sordyl • Architecture & DX at Scale',
    },
    {
      property: 'og:description',
      content:
        'Frontend architecture, developer experience, and scaling tooling across teams in large organizations.',
    },
    {
      property: 'og:url',
      content: 'https://sordyl.dev/',
    },
    {
      property: 'og:type',
      content: 'website',
    },
  ],
}
