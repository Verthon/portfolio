import { component$, Slot } from '@builder.io/qwik'

import LinkIcon from '~/common/components/link-icon/link-icon'

import { heading, headingLink, h1, h2, h3 } from './heading.module.css'
import { Link } from '@builder.io/qwik-city'

interface HeadingProps {
  tag: 'h1' | 'h2' | 'h3'
  id?: string
  linkLabel?: string
}

const tagClass = {
  h1,
  h2,
  h3,
}

export default component$(({ tag, id, linkLabel }: HeadingProps) => {
  const Tag = tag

  return (
    <Tag id={id} class={`${heading} ${tagClass[tag]}`}>
      <Slot />
      {id && (
        <Link class={headingLink} href={`#${id}`} aria-label={linkLabel}>
          <LinkIcon />
        </Link>
      )}
    </Tag>
  )
})
