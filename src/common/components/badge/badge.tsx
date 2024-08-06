import { component$, Slot } from '@builder.io/qwik'

import { badge, badgePrimary, badgeSecondary } from './badge.module.css'

type BadgeProps = {
  variant: 'primary' | 'secondary'
}

const variantClassName = {
  primary: badgePrimary,
  secondary: badgeSecondary,
}

export default component$(({ variant }: BadgeProps) => {
  const variantClass = variantClassName[variant]

  return (
    <span class={[badge, variantClass].join(' ')}>
      <Slot />
    </span>
  )
})
