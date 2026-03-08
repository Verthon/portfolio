import { component$, Slot } from '@builder.io/qwik'
import { routeLoader$ } from '@builder.io/qwik-city'
import type { DocumentHead, RequestHandler } from '@builder.io/qwik-city'

import Layout from '~/common/components/layout/layout'

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    public: true,
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 86400,
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

export const head: DocumentHead = ({ head }) => {
  const fm = head.frontmatter
  const ogTitle =
    typeof fm?.og_title === 'string' ? fm.og_title : undefined
  const ogDescription =
    typeof fm?.og_description === 'string' ? fm.og_description : undefined

  return {
    meta: [
      ...(ogTitle ? [{ property: 'og:title', content: ogTitle }] : []),
      ...(ogDescription
        ? [{ property: 'og:description', content: ogDescription }]
        : []),
      ...(ogTitle || ogDescription
        ? [{ property: 'og:type', content: 'article' }]
        : []),
    ],
  }
}
