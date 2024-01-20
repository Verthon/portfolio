import { Resource, component$ } from '@builder.io/qwik'

import { useAllArticlesResource } from '~/blog/application/hooks/useArticleResource'
import ArticlesList from '../articles-list/articles-list'
import Container from '../container/container'

export default component$(() => {
  const articlesResource = useAllArticlesResource()

  return (
    <Container>
      <h1>Latest posts</h1>
      <Resource
        value={articlesResource}
        onResolved={(articles) => <ArticlesList list={articles} />}
      />
    </Container>
  )
})
