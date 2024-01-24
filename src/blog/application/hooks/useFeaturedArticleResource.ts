import { useResource$ } from '@builder.io/qwik'

import { getAllFeaturedArticles } from '../services/article'

export const useFeaturedArticleResource = () => {
  const articlesResource = useResource$(getAllFeaturedArticles)

  return articlesResource
}
