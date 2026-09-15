import { h, type ComponentChildren } from 'preact'
import styles from './visually-hidden.module.css'

type VisuallyHiddenProps = {
  children?: ComponentChildren
}

export default function VisuallyHidden({ children }: VisuallyHiddenProps) {
  return h('span', { className: styles.visuallyHidden }, children)
}
