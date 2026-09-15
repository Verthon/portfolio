import { h, type ComponentChildren } from 'preact'
import DevBiteContainer from '../dev-bite-container/dev-bite-container'
import styles from './dev-bite-wrapper.module.css'

type DevBiteWrapperProps = {
  children?: ComponentChildren
}

export default function DevBiteWrapper({ children }: DevBiteWrapperProps) {
  return h(
    'div',
    { className: styles.devBiteWrapper },
    h(DevBiteContainer, null, children)
  )
}
