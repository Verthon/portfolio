import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'

import { Header } from '~/components/Header/Header'
import { HomePageContent } from '~/components/HomePageContent/HomePageContent'

export default component$(() => {
  return (
    <>
      <Header />
      <main>
        <HomePageContent />
      </main>
    </>
  )
})

export const head: DocumentHead = {
  title: 'Krzysztof Sordyl Frontend developer',
  meta: [
    {
      name: 'description',
      content:
        'Proficient Front-End Developer and Problem Solver. Bringing a comprehensive skill set in transitioning legacy SPA Vue/React applications to modern React solutions, I also excel in platform team roles. My contributions include developing a React Starter Kit, designing user-friendly npm packages, and ensuring smooth micro-frontend adoption, all tailored to enhance efficiency in fast-paced development settings.',
    },
  ],
}
