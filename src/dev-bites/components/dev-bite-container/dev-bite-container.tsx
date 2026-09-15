import { h, type ComponentChildren } from 'preact'
import styles from './dev-bite-container.module.css'

type DevBiteContainerProps = {
  children?: ComponentChildren
}

export default function DevBiteContainer({ children }: DevBiteContainerProps) {
  return h('div', { className: styles.devBiteContainer }, children)
}
