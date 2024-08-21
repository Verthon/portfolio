import { component$, Slot } from '@builder.io/qwik'

import LinkIcon from '~/common/components/link-icon/link-icon'

import { heading, anchor } from './heading.module.css'

interface HeadingProps {
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  id?: string
  linkLabel?: string
}

export default component$(({ tag, id, linkLabel }: HeadingProps) => {
  const Tag = tag

  return (
    <Tag id={id} class={heading}>
      <Slot />
      {id && (
        <a href={`#${id}`} aria-label={linkLabel} class={anchor}>
          <LinkIcon />
        </a>
      )}
    </Tag>
  )
})
