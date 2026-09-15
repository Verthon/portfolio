import { h, type ComponentChildren } from 'preact'
import styles from './dev-bite-header.module.css'

type DevBiteHeaderProps = {
  children?: ComponentChildren
}

export default function DevBiteHeader({ children }: DevBiteHeaderProps) {
  return h('header', { className: styles.devBiteHeader }, children)
}
