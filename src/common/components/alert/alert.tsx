import { component$, Slot } from '@builder.io/qwik'

import {
  alert,
  alertInfo,
  alertDanger,
  alertIcon,
  alertContent,
  alertContainer,
  alertMarginBottomSmall,
  alertMarginBottomMedium,
  alertMarginBottomLarge,
} from './alert.module.css'
import InfoIcon from '../info-icon/info-icon'
import DangerIcon from '../danger-icon/danger-icon'

type AlertProps = {
  variant: 'info' | 'danger'
  marginBottomInRems?: 1 | 2 | 3
}

const variantClassName = {
  info: alertInfo,
  danger: alertDanger,
}

const marginClassName = {
  1: alertMarginBottomSmall,
  2: alertMarginBottomMedium,
  3: alertMarginBottomLarge,
}

const icon = {
  info: InfoIcon,
  danger: DangerIcon,
}

export default component$(({ variant, marginBottomInRems }: AlertProps) => {
  const variantClass = variantClassName[variant]
  const marginClass = marginBottomInRems
    ? marginClassName[marginBottomInRems]
    : ''
  const CurrentIcon = icon[variant]

  return (
    <div class={[alert, variantClass, marginClass].join(' ')}>
      <div class={alertContainer}>
        <div class={alertIcon}>
          <CurrentIcon />
        </div>
        <div class={alertContent}>
          <Slot />
        </div>
      </div>
    </div>
  )
})
