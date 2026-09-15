import { h, type ComponentChildren } from 'preact'
import LinkIcon from '~/common/components/link-icon/link-icon'
import styles from './heading.module.css'
import VisuallyHidden from '../visually-hidden/visually-hidden'

type HeadingProps = {
  tag: 'h1' | 'h2' | 'h3'
  id?: string
  linkLabel?: string
  children?: ComponentChildren
}

export default function Heading({
  tag,
  id,
  linkLabel,
  children,
}: HeadingProps) {
  const children_list = [children]
  if (id) {
    children_list.push(
      h(
        'a',
        { className: styles.headingLink, href: `#${id}` },
        h(LinkIcon, null),
        h(VisuallyHidden, null, h('span', null, linkLabel))
      )
    )
  }

  return h(
    tag,
    { id, className: `${styles.heading} ${styles[tag]}` },
    ...children_list
  )
}
