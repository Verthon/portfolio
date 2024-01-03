import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { NotFoundContent } from '~/components/NotFoundContent/NotFoundContent'

export default component$(() => {
  return <NotFoundContent />
})

export const head: DocumentHead = {
  title: 'Not Found',
  meta: [
    {
      name: 'description',
      content: 'The page you are looking for does not exist',
    },
  ],
}
