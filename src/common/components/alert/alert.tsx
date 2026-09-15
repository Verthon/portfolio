import { h, type ComponentChildren } from 'preact'
import styles from './alert.module.css'
import InfoIcon from '../info-icon/info-icon'
import DangerIcon from '../danger-icon/danger-icon'

type AlertProps = {
  variant: 'info' | 'danger'
  marginBottomInRems?: 1 | 2 | 3
  children?: ComponentChildren
}

const variantClassName = {
  info: styles.alertInfo,
  danger: styles.alertDanger,
}

const marginClassName = {
  1: styles.alertMarginBottomSmall,
  2: styles.alertMarginBottomMedium,
  3: styles.alertMarginBottomLarge,
}

const icon = {
  info: InfoIcon,
  danger: DangerIcon,
}

export default function Alert({
  variant,
  marginBottomInRems,
  children,
}: AlertProps) {
  const variantClass = variantClassName[variant]
  const marginClass = marginBottomInRems
    ? marginClassName[marginBottomInRems]
    : ''
  const CurrentIcon = icon[variant]

  return h(
    'div',
    { className: [styles.alert, variantClass, marginClass].join(' ') },
    h(
      'div',
      { className: styles.alertContainer },
      h('div', { className: styles.alertIcon }, h(CurrentIcon, null)),
      h('div', { className: styles.alertContent }, children)
    )
  )
}
