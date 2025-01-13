import { Resource, component$ } from '@builder.io/qwik'

import { useAllArticlesResource } from '~/blog/application/hooks/useArticleResource'
import ArticlesList from '../articles-list/articles-list'
import Container from '../../../common/components/container/container'
import Heading from '~/common/components/heading/heading'
import Text from '~/common/components/text/text'

export default component$(() => {
  const articlesResource = useAllArticlesResource()

  return (
    <Container>
      <Heading tag='h1'>Latest posts</Heading>
      <Text>
        All of my long-form thoughts on programming
      </Text>
      <Resource
        value={articlesResource}
        onResolved={(articles) => <ArticlesList list={articles} />}
      />
    </Container>
  )
})
