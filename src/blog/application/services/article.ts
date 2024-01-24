import { createPermalink } from '~/blog/infrastructure/permalink'
import type { ArticleItem } from '~/blog/domain/models/article-item'
import {
  fetchMdxFiles,
  getModules,
} from '~/blog/infrastructure/services/mdx-file'

type ReceivedArticeType = Awaited<
  ReturnType<typeof fetchMdxFiles>
>[number]['metadata']['article_type']

const formatArticleType = (articleType: ReceivedArticeType) => {
  const map: Record<ReceivedArticeType, ArticleItem['articleType']> = {
    featured: 'featured',
    regular: 'default',
  }

  return map[articleType]
}

export const getAllArticles = async (): Promise<ArticleItem[]> => {
  const modules = await fetchMdxFiles({ getModules })

  return modules.map(({ path, metadata }) => {
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

  const featuredModules = modules.filter(({ metadata }) => {
    return metadata.article_type === 'featured'
  })

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
