import { Slot, component$ } from '@builder.io/qwik'

import Container from '../container/container'
import Nav from '~/common/components/nav/nav'
import Footer from '~/common/components/footer/footer'

export default component$(() => {
  return (
    <>
      <main>
        <Container>
          <Nav
            links={[
              { type: 'regular', slug: 'blog', name: 'blog' },
              { type: 'regular', slug: 'dev-bites', name: 'dev bites' },
              { type: 'regular', 'slug': 'observatory', name: 'observatory' }
            ]}
          />
          <Slot />
        </Container>
      </main>
      <Footer />
    </>
  )
})
