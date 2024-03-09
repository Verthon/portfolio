import { Slot, component$ } from '@builder.io/qwik'

import { devBiteContainer } from './dev-bite-container.module.css'

export default component$(() => {
  return (
    <div class={devBiteContainer}>
      <Slot />
    </div>
  )
})
