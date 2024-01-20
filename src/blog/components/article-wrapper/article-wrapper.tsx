import { Slot, component$ } from '@builder.io/qwik'

import ArticleContainer from '../article-container/article-container'

import { articleWrapper } from './article-wrapper.module.css'

export default component$(() => {
  return (
    <div class={articleWrapper}>
      <ArticleContainer>
        <Slot />
      </ArticleContainer>
    </div>
  )
})
