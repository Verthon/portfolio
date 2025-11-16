import { component$, Slot } from '@builder.io/qwik'

import { visuallyHidden } from './visually-hidden.module.css'

export default component$(() => {
  return (
    <span class={visuallyHidden}>
      <Slot />
    </span>
  )
})
