import { Slot, component$ } from '@builder.io/qwik'

import { articleContainer } from './article-container.module.css'

export default component$(() => {
  return (
    <div class={articleContainer}>
      <Slot />
    </div>
  )
})
