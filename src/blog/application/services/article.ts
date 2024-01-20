import { createPermalink } from '~/blog/infrastructure/permalink'
import type { ArticleItem } from '~/blog/domain/models/article-item'
import {
  fetchMdxFiles,
  getModules,
} from '~/blog/infrastructure/services/mdx-file'

export const getAllArticles = async (): Promise<ArticleItem[]> => {
  const modules = await fetchMdxFiles({ getModules })

  return modules.map(({ path, metadata }) => {
    return {
      title: metadata.title,
      excerpt: metadata.excerpt,
      permalink: createPermalink(path),
      date: metadata.date,
    }
  })
}
