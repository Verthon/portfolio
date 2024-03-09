import { component$ } from '@builder.io/qwik'

import {
  devBiteItemWrapper,
  devBiteItemTitle,
  devBiteItemLink,
  devBiteItemExcerpt,
  devBiteDate,
  devBiteMeta,
  devBiteItemReadMore,
} from './dev-bite-item.module.css'
import type { DevBiteItem } from '~/dev-bites/domain/models/dev-bite-item'

export type DevBiteItemProps = Omit<DevBiteItem, 'description'>

export default component$(
  ({ date, excerpt, permalink, title }: DevBiteItemProps) => {
    return (
      <div class={devBiteItemWrapper}>
        <article>
          <a class={devBiteItemLink} href={permalink}>
            <div>
              <div class={devBiteMeta}>
                <time class={devBiteDate} dateTime={date}>
                  {date}
                </time>
              </div>
              <h2 class={devBiteItemTitle}>{title}</h2>
              <p class={devBiteItemExcerpt}>{excerpt}</p>
            </div>
            <span class={devBiteItemReadMore}>Read more</span>
          </a>
        </article>
      </div>
    )
  }
)
