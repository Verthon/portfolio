import { Slot, component$ } from '@builder.io/qwik'

import { container } from './container.module.css'

export default component$(() => {
  return (
    <div class={container}>
      <Slot />
    </div>
  )
})
