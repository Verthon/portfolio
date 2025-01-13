import { component$ } from '@builder.io/qwik'
import { Link } from '@builder.io/qwik-city'

import ChevronLeftIcon from '~/common/components/icon-chevron-left/icon-chevron-left'

import { goBackLink } from './go-back.module.css'

type GoBackProps = {
  text?: string
  href?: string
}

export default component$(({ href = '/', text = 'Go back' }: GoBackProps) => {
  return (
    <div>
      <Link href={href} class={goBackLink}>
        <ChevronLeftIcon />
        {text}
      </Link>
    </div>
  )
})
