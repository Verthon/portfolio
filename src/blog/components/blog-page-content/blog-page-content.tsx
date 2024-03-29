import { Resource, component$ } from '@builder.io/qwik'

import { useAllArticlesResource } from '~/blog/application/hooks/useArticleResource'
import ArticlesList from '../articles-list/articles-list'
import Container from '../../../common/components/container/container'

export default component$(() => {
  const articlesResource = useAllArticlesResource()

  return (
    <Container>
      <h1>Latest posts</h1>
      <p>
        All of my long-form thoughts on programming
      </p>
      <Resource
        value={articlesResource}
        onResolved={(articles) => <ArticlesList list={articles} />}
      />
    </Container>
  )
})
