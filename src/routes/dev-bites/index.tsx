import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'

import DevBitesPageContent from '~/dev-bites/components/dev-bites-page-content/dev-bites-page-content'


export default component$(() => {
  return <DevBitesPageContent />
})

export const head: DocumentHead = {
  title: 'Dev-Bites • Krzysztof Sordyl',
  meta: [
    {
      name: 'description',
      content: 'All my brief takes on programming problems, packed into bite-sized reads.',
    },
    {
      name: 'author',
      content: 'Krzysztof Sordyl',
    },
    {
      property: 'og:title',
      content: 'Dev-Bites • Krzysztof Sordyl',
    },
    {
      property: 'og:description',
      content: 'All my brief takes on programming problems, packed into bite-sized reads.',
    },
    {
      property: 'og:type',
      content: 'article',
    },
    {
      property: 'og:url',
      content: 'https://sordyl.dev/dev-bites',
    },
    {
      property: 'og:site_name',
      content: 'Krzysztof Sordyl',
    },
  ],
};
