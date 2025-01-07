import { Slot, component$ } from '@builder.io/qwik'

import { header } from './header.module.css'

export default component$(() => {
  return (
    <header class={header}>
      <Slot />
    </header>
  )
})
