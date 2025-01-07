import { component$, Slot } from '@builder.io/qwik'

import { text } from './text.module.css'

export default component$(() => {
  return (
    <p class={text}>
      <Slot />
    </p>
  )
})
