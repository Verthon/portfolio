import { Slot, component$ } from '@builder.io/qwik'

import { devBiteContent } from './dev-bite-content.module.css'

export default component$(() => {
  return (
    <div class={devBiteContent}>
      <Slot />
    </div>
  )
})
