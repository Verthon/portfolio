import { Resource, component$ } from '@builder.io/qwik'

import ArticlesList from '../articles-list/articles-list'
import { useFeaturedArticleResource } from '~/blog/application/hooks/useFeaturedArticleResource'

export default component$(() => {
  const articlesResource = useFeaturedArticleResource()

  return (
    <Resource
      value={articlesResource}
      onResolved={(articles) => (
        <ArticlesList list={articles} orientation="vertical" />
      )}
    />
  )
})
