import { Slot, component$ } from '@builder.io/qwik'

import Container from '../container/container'
import Nav from '~/common/components/nav/nav'
import Footer from '~/common/components/footer/footer'

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
