import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'

import Layout from '~/common/components/layout/layout'
import NotFoundContent from '~/common/components/not-found-page-content/not-found-page-content'

export default component$(() => {
  return (
    <Layout>
      <NotFoundContent />
    </Layout>
  )
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
