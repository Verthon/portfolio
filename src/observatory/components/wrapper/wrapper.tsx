import { Slot, component$ } from '@builder.io/qwik'

import Container from '../container/container'

import { wrapper } from './wrapper.module.css'

export default component$(() => {
  return (
    <div class={wrapper}>
      <Container>
        <Slot />
      </Container>
    </div>
  )
})
