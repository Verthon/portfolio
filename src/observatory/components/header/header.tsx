import { h, type ComponentChildren } from 'preact'
import styles from './header.module.css'

type HeaderProps = {
  children?: ComponentChildren
}

export default function Header({ children }: HeaderProps) {
  return h('header', { className: styles.header }, children)
}
