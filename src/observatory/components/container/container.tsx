import { h, type ComponentChildren } from 'preact'
import styles from './container.module.css'

type ContainerProps = {
  children?: ComponentChildren
}

export default function Container({ children }: ContainerProps) {
  return h('div', { className: styles.container }, children)
}
