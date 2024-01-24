import { Slot, component$ } from '@builder.io/qwik'

import Container from '../container/container'
import Nav from '~/common/components/nav/nav'
import Footer from '~/common/components/footer/footer'

export default component$(() => {
  return (
    <main>
      <Container>
        <Nav
          links={[
            { type: 'regular', slug: 'home' },
            { type: 'regular', slug: 'blog' },
          ]}
        />
        <Slot />
      </Container>
      <Footer />
    </main>
  )
})
