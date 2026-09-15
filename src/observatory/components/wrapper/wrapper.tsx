import { h, type ComponentChildren } from 'preact'
import Container from '../container/container'
import styles from './wrapper.module.css'

type WrapperProps = {
  children?: ComponentChildren
}

export default function Wrapper({ children }: WrapperProps) {
  return h('div', { className: styles.wrapper }, h(Container, null, children))
}
