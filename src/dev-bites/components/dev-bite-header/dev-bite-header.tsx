import { Slot, component$ } from '@builder.io/qwik'

import { devBiteHeader } from './dev-bite-header.module.css'

export default component$(() => {
  return (
    <header class={devBiteHeader}>
      <Slot />
    </header>
  )
})
