import { h, type ComponentChildren } from 'preact'
import styles from './content.module.css'

type ContentProps = {
  children?: ComponentChildren
}

export default function Content({ children }: ContentProps) {
  return h('div', { className: styles.content }, children)
}
