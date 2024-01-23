import { component$ } from '@builder.io/qwik'

import { textWrapper } from './text.module.css'

type TextProps = {
  text: string
}

export default component$(({ text }: TextProps) => {
  return <p class={textWrapper}>{text}</p>
})
