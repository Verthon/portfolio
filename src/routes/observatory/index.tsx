import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'

import ObservatoryPageContent from '~/observatory/components/page-content/page-content'

export default component$(() => {
  return <ObservatoryPageContent />
})

export const head: DocumentHead = {
  title: 'Observatory • Tracking Promising Web Development Tools',
  meta: [
    {
      name: 'description',
      content:
        'Tracker of web tools, libraries and frameworks. Focus on implementation trade-offs, real-world constraints and adoption risks.',
    },
    {
      name: 'author',
      content: 'Krzysztof Sordyl',
    },
    {
      property: 'og:title',
      content: 'Observatory • Tracking Promising Web Development Tools',
    },
    {
      property: 'og:description',
      content:
        'Tracker of web tools, libraries and frameworks. Focus on implementation trade-offs, real-world constraints and adoption risks.',
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      name: 'twitter:card',
      content: 'summary',
    },
    {
      name: 'twitter:title',
      content: 'Observatory • Tracking Promising Web Development Tools',
    },
    {
      name: 'twitter:description',
      content:
        'Tracker of web tools, libraries and frameworks. Focus on implementation trade-offs, real-world constraints and adoption risks.',
    },
  ],
}
