import { h, type ComponentChildren } from 'preact'
import LinkIcon from '~/common/components/link-icon/link-icon'
import styles from './heading.module.css'
import VisuallyHidden from '../visually-hidden/visually-hidden'

type HeadingProps = {
  tag: 'h1' | 'h2' | 'h3'
  children?: ComponentChildren
} & ({ id: string; linkLabel: string } | { id?: never; linkLabel?: never })

export default function Heading({
  tag,
  id,
  linkLabel,
  children,
}: HeadingProps) {
  const heading = h(
    tag,
    { id, className: `${styles.heading} ${styles[tag]}` },
    children
  )

  if (!id) {
    return heading
  }

  return h(
    'div',
    { className: styles.headingWrapper },
    heading,
    h(
      'a',
      { className: styles.headingLink, href: `#${id}` },
      h(LinkIcon, { ariaHidden: true }),
      h(VisuallyHidden, null, h('span', null, linkLabel))
    )
  )
}
