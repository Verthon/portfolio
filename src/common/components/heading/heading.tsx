import { component$, Slot } from '@builder.io/qwik'

import LinkIcon from '~/common/components/link-icon/link-icon'

import { heading, h1, h2, h3 } from './heading.module.css'

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
        <a href={`#${id}`} aria-label={linkLabel}>
          <LinkIcon />
        </a>
      )}
    </Tag>
  )
})
