import { component$ } from '@builder.io/qwik'

import { articleTitle } from './article-title.module.css'

type ArticleTitleProps = {
  text: string
}

export default component$(({ text }: ArticleTitleProps) => {
  return <h1 class={articleTitle}>{text}</h1>
})
