import { createPermalink } from '~/blog/infrastructure/permalink'
import type { ArticleItem } from '~/blog/domain/models/article-item'
import {
  fetchMdxFiles,
  getModules,
} from '~/blog/infrastructure/services/mdx-file'

type ReceivedArticleType = Awaited<
  ReturnType<typeof fetchMdxFiles>
>[number]['metadata']['article_type']

const formatArticleType = (articleType: ReceivedArticleType) => {
  const map: Record<ReceivedArticleType, ArticleItem['articleType']> = {
    featured: 'featured',
    regular: 'default',
  }

  return map[articleType]
}

const compareByDateDesc = (dateAccessorFn: (item: any) => string) => {
  return (a: unknown, b: unknown) => {
    const dateA = new Date(dateAccessorFn(a)).getTime()
    const dateB = new Date(dateAccessorFn(b)).getTime()

    return dateB - dateA
  }
}

export const getAllArticles = async (): Promise<ArticleItem[]> => {
  const modules = await fetchMdxFiles({ getModules })
  const getDate = (item: (typeof modules)[0]) => item.metadata.date

  const sortedModules = modules.sort(compareByDateDesc(getDate))

  return sortedModules.map(({ path, metadata }) => {
    return {
      title: metadata.title,
      excerpt: metadata.excerpt,
      permalink: createPermalink(path),
      date: metadata.date,
      articleType: formatArticleType(metadata.article_type),
    }
  })
}

export const getAllFeaturedArticles = async (): Promise<ArticleItem[]> => {
  const modules = await fetchMdxFiles({ getModules })
  const getDate = (item: (typeof modules)[0]) => item.metadata.date

  const featuredModules = modules
    .filter(({ metadata }) => {
      return metadata.article_type === 'featured'
    })
    .sort(compareByDateDesc(getDate))

  return featuredModules.map(({ path, metadata }) => {
    return {
      title: metadata.title,
      excerpt: metadata.excerpt,
      permalink: createPermalink(path),
      date: metadata.date,
      articleType: formatArticleType(metadata.article_type),
    }
  })
}
