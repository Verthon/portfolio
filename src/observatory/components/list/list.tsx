import { component$ } from '@builder.io/qwik'

import { ol, li, title, status, preview, link } from './list.module.css'
import { Link } from '@builder.io/qwik-city'

type ObservatoryItem = {
  title: string
  status?: 'Experimental' | 'Beta'
  shortPreview: string
  href: string
}

type ObservatoryListProps = {
  items: ObservatoryItem[]
}

export default component$(({ items }: ObservatoryListProps) => {
  return (
    <ol class={ol}>
      {items.map((item) => (
        <li key={item.title} class={li}>
          <Link href={item.href} class={link}>
            <div class={title}>
              {item.title}
              {item.status && <span class={status}> — {item.status}</span>}
            </div>
            <p class={preview}>{item.shortPreview}</p>
          </Link>
        </li>
      ))}
    </ol>
  )
})
