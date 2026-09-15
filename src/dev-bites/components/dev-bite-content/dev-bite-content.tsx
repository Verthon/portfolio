import { h, type ComponentChildren } from 'preact'
import styles from './dev-bite-content.module.css'

type DevBiteContentProps = {
  children?: ComponentChildren
}

export default function DevBiteContent({ children }: DevBiteContentProps) {
  return h('div', { className: styles.devBiteContent }, children)
}
