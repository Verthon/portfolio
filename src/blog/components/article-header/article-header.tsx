import { Slot, component$ } from '@builder.io/qwik'

import { articleHeader } from './article-header.module.css'

export default component$(() => {
  return (
    <header class={articleHeader}>
      <Slot />
    </header>
  )
})
