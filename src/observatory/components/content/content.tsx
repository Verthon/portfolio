import { Slot, component$ } from '@builder.io/qwik'

import { content } from './content.module.css'

export default component$(() => {
  return (
    <div class={content}>
      <Slot />
    </div>
  )
})
