import { component$ } from '@builder.io/qwik'

import { ol, li, title, status, preview } from './list.module.css'
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
        <Link href={item.href} key={item.title}>
          <li class={li}>
            <div class={title}>
              {item.title}
              {item.status && <span class={status}> — {item.status}</span>}
            </div>
            <p class={preview}>{item.shortPreview}</p>
          </li>
        </Link>
      ))}
    </ol>
  )
})
