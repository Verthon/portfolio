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
  title: 'Krzysztof Sordyl • Web Development Insights, Tools, and Tutorials',
  meta: [
    {
      name: 'author',
      content: 'Krzysztof Sordyl',
    },
    {
      name: 'description',
      content:
        'Web Development tutorials, short dev-bites for busy developers, and a curated tracker for promising web development tools.',
    },
    {
      property: 'og:title',
      content: 'Krzysztof Sordyl • Web Development Insights',
    },
    {
      property: 'og:description',
      content: 'Concise web development guides, dev-bites, and a tracker for innovative tools.',
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
