import { component$, Slot } from '@builder.io/qwik'
import { routeLoader$, useLocation } from '@builder.io/qwik-city'
import type { RequestHandler } from '@builder.io/qwik-city'
import { generateGoBackMetadata } from '~/blog/application/services/go-back'
import GoBack from '~/common/components/go-back/go-back'

import Layout from '~/common/components/layout/layout'

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
  const location = useLocation()

  const goBackMetadata = generateGoBackMetadata({
    pathname: location.url.pathname,
  })

  return (
    <Layout>
      {goBackMetadata.shouldRender && (
        <GoBack
          q:slot="go-back"
          href={goBackMetadata.href}
          text={goBackMetadata.text}
        />
      )}
      <Slot />
    </Layout>
  )
})
