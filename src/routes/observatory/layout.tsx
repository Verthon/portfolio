import { component$, Slot } from '@builder.io/qwik'
import { routeLoader$ } from '@builder.io/qwik-city'
import type { DocumentHead, RequestHandler } from '@builder.io/qwik-city'

import Layout from '~/common/components/layout/layout'
import {
  createArticleMeta,
  createArticleJsonLd,
} from '~/common/infrastructure/services/document-head'

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  })
}

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  }
})

export default component$(() => {
  return (
    <Layout>
      <Slot />
    </Layout>
  )
})

export const head: DocumentHead = (props) => {
  return {
    meta: createArticleMeta(props),
    scripts: createArticleJsonLd(props),
  }
}
