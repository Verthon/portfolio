import { component$ } from '@builder.io/qwik'

import type { ArticleItem } from '~/blog/domain/models/article-item'
import {
  articleItemWrapper,
  articleItemTitle,
  articleItemLink,
  articleItemExcerpt,
  articleDate,
  articleMeta
} from './article-item.module.css'

export type ArticleItemProps = Omit<ArticleItem, 'description'>

export default component$(
  ({ date, excerpt, permalink, title }: ArticleItemProps) => {
    return (
      <div class={articleItemWrapper}>
        <article>
          <a class={articleItemLink} href={permalink}>
            <div>
              <div class={articleMeta}>
                <time class={articleDate} dateTime={date}>
                  {date}
                </time>
              </div>
              <h2 class={articleItemTitle}>{title}</h2>
              <p class={articleItemExcerpt}>{excerpt}</p>
            </div>
          </a>
        </article>
      </div>
    )
  }
)
