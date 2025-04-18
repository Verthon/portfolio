import { component$ } from '@builder.io/qwik'
import { Link } from '@builder.io/qwik-city'

import type { DevBiteItem } from '~/dev-bites/domain/models/dev-bite-item'
import Badge from '~/common/components/badge/badge'

import {
  devBiteItemWrapper,
  devBiteItemTitle,
  devBiteItemLink,
  devBiteItemExcerpt,
  devBiteDate,
  devBiteMeta,
  devBiteItemReadMore,
} from './dev-bite-item.module.css'

export type DevBiteItemProps = { badgesText?: string[] } & Omit<
  DevBiteItem,
  'description'
>

export default component$(
  ({
    date,
    excerpt,
    permalink,
    title,
    badgesText,
    devByteType,
  }: DevBiteItemProps) => {
    return (
      <div class={devBiteItemWrapper}>
        <article
          data-featured-dev-bite={devByteType === 'featured' ? 'true' : 'false'}
        >
          <Link class={devBiteItemLink} href={permalink}>
            <div>
              <div class={devBiteMeta}>
                <time class={devBiteDate} dateTime={date}>
                  {date}
                </time>
                {badgesText &&
                  badgesText.map((badgeText) => (
                    <Badge key={badgeText} variant="secondary">
                      {badgeText}
                    </Badge>
                  ))}
              </div>
              <h2 class={devBiteItemTitle}>{title}</h2>
              <p class={devBiteItemExcerpt}>{excerpt}</p>
            </div>
            <span class={devBiteItemReadMore}>Read more</span>
          </Link>
        </article>
      </div>
    )
  }
)
