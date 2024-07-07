import { expect, describe, it } from 'vitest'
import { getAllArticles, getAllFeaturedArticles } from './article'

describe('article services', async () => {
  it('should fetch articles from the mdx and sort them by creation date descending', async () => {
    const articles = await getAllArticles()

    const dates = articles.map((article) => new Date(article.date).getTime())

    expect(dates).toEqual([...dates].sort((a, b) => b - a))
  })

  it('should return only featured articles sorted by date in descending order', async () => {
    const articles = await getAllFeaturedArticles()
    const dates = articles.map((article) => new Date(article.date).getTime())

    expect(dates).toEqual([...dates].sort((a, b) => b - a))
  })
})
