import { Slot, component$ } from '@builder.io/qwik'
import { Link } from '@builder.io/qwik-city'

import { link } from './link.module.css'

type LinkProps = {
  href: string
}

export default component$(({ href }: LinkProps) => {
  return (
    <Link href={href} class={link}>
      <Slot />
    </Link>
  )
})
