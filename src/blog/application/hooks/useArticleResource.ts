import { useResource$ } from '@builder.io/qwik'

import { getAllArticles } from '../services/article'

export const useAllArticlesResource = () => {
  const articlesResource = useResource$(getAllArticles)

  return articlesResource
}
