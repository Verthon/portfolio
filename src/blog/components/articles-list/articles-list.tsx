import { component$ } from '@builder.io/qwik'

import type { ArticleItemProps } from '../article-item/article-item'
import ArticleItem from '../article-item/article-item'

import { grid, gridOrientationVertical } from './articles-list.module.css'

type ArticlesListProps = {
  list: ArticleItemProps[]
  orientation?: 'vertical' | 'horizontal'
  withBadge?: boolean
}

const gridClassName: Record<
  Exclude<ArticlesListProps['orientation'], undefined>,
  string
> = {
  horizontal: grid,
  vertical: `${grid} ${gridOrientationVertical}`,
}

export default component$(
  ({
    list,
    orientation = 'horizontal',
    withBadge = false,
  }: ArticlesListProps) => {
    const currentGridClassName = gridClassName[orientation]

    return (
      <div class={currentGridClassName}>
        {list.map((item) => (
          <ArticleItem
            key={item.title}
            date={item.date}
            title={item.title}
            permalink={item.permalink}
            excerpt={item.excerpt}
            articleType={item.articleType}
            badgeText={withBadge ? 'blog post' : undefined}
          />
        ))}
      </div>
    )
  }
)
