import { Slot, component$ } from '@builder.io/qwik'

import { articleContent } from './article-content.module.css'

export default component$(() => {
  return (
    <div class={articleContent}>
      <Slot />
    </div>
  )
})
