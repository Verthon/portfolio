import { component$ } from '@builder.io/qwik'

import type { ArticleItem } from '~/blog/domain/models/article-item'
import {
  articleItemWrapper,
  articleItemTitle,
  articleItemLink,
  articleItemExcerpt,
  articleDate,
  articleMeta,
  articleReadMore,
} from './article-item.module.css'
import Badge from '~/common/components/badge/badge'
import { Link } from '@builder.io/qwik-city'

export type ArticleItemProps = { badgeText?: string } & Omit<
  ArticleItem,
  'description'
>

export default component$(
  ({
    date,
    excerpt,
    permalink,
    title,
    badgeText,
    articleType,
  }: ArticleItemProps) => {
    return (
      <div class={articleItemWrapper}>
        <article data-featured-article={articleType === 'featured' ? 'true' : 'false'}>
          <Link class={articleItemLink} href={permalink}>
            <div>
              <div class={articleMeta}>
                <time class={articleDate} dateTime={date}>
                  {date}
                </time>
                {badgeText && <Badge variant="primary">{badgeText}</Badge>}
              </div>
              <h2 class={articleItemTitle}>{title}</h2>
              <p class={articleItemExcerpt}>{excerpt}</p>
            </div>
            <span class={articleReadMore}>Read article</span>
          </Link>
        </article>
      </div>
    )
  }
)
