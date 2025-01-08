import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'

import BlogPageContent from '~/blog/components/blog-page-content/blog-page-content'

export default component$(() => {
  return <BlogPageContent />
})

export const head: DocumentHead = {
  title: 'Blog • Krzysztof Sordyl',
  meta: [
    {
      name: 'description',
      content:
        'Technical articles on modern frontend development, testing strategies, and JavaScript ecosystem. Featuring detailed guides on testing, architecture and frontend solutions.',
    },
    {
      name: 'author',
      content: 'Krzysztof Sordyl',
    },
    {
      property: 'og:title',
      content: 'Blog • Krzysztof Sordyl',
    },
    {
      property: 'og:description',
      content: 'Insights on frontend architecture, testing strategies, and modern JavaScript development.',
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:url',
      content: 'https://sordyl.dev/blog',
    },
    {
      property: 'og:site_name',
      content: 'Krzysztof Sordyl',
    },
  ],
}
