import { Slot, component$ } from '@builder.io/qwik'

import Container from '../container/container'
import Nav from '~/common/components/nav/nav'
import Footer from '~/common/components/footer/footer'
import { RequestHandler } from '@builder.io/qwik-city'

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

export default component$(() => {
  return (
    <>
      <header>
        <Container>
          <Nav
            links={[
              { type: 'regular', slug: 'blog', name: 'blog' },
              { type: 'regular', slug: 'dev-bites', name: 'dev bites' },
              { type: 'regular', slug: 'observatory', name: 'observatory' },
            ]}
          />
        </Container>
      </header>
      <main>
        <Container>
          <Slot name="go-back" />
          <Slot />
        </Container>
      </main>
      <Footer />
    </>
  )
})
