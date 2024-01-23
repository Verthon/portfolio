import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'

import BlogPageContent from '~/blog/components/blog-page-content/blog-page-content'

export default component$(() => {
  return <BlogPageContent />
})

export const head: DocumentHead = {
  title: 'Krzysztof Sordyl Blog',
  meta: [
    {
      name: 'description',
      content:
        'Proficient Front-End Developer and Problem Solver. Bringing a comprehensive skill set in transitioning legacy SPA Vue/React applications to modern React solutions, I also excel in platform team roles. My contributions include developing a React Starter Kit, designing user-friendly npm packages, and ensuring smooth micro-frontend adoption, all tailored to enhance efficiency in fast-paced development settings.',
    },
  ],
}
