import { component$ } from '@builder.io/qwik'
import type { ArticleItemProps } from '../article-item/article-item'
import ArticleItem from '../article-item/article-item'

import { grid } from './articles-list.module.css'

type ArticlesListProps = {
  list: ArticleItemProps[]
}

export default component$(({ list }: ArticlesListProps) => {
  return (
    <div class={grid}>
      {list.map((item) => (
        <ArticleItem
          key={item.title}
          date={item.date}
          title={item.title}
          permalink={item.permalink}
          excerpt={item.excerpt}
        />
      ))}
    </div>
  )
})
