import { Slot, component$ } from '@builder.io/qwik'

import { navItem } from './nav-item.module.css'

export default component$(() => {
  return (
    <li class={navItem}>
      <Slot />
    </li>
  )
})
