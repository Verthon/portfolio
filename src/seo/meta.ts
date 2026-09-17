import { buildTitle, homeTitle } from './title'
import { SITE_URL } from './site'
import { createArticleJsonLd } from './article-json-ld'

type ArticleData = {
  title: string
  description: string
  date: Date
  last_updated?: Date
  og_title?: string
  og_description?: string
}

export type PageMeta = {
  title: string
  description: string
  ogTitle: string
  ogDescription: string
  ogType: 'website' | 'article'
  canonical: string
  jsonLd?: object
  publishedTime?: string
}

type PageMetaInput = {
  title: string
  description: string
  ogTitle?: string
  ogDescription?: string
  pathname: string
}

const canonicalFor = (pathname: string) => {
  const path = pathname.replace(/\/+/g, '/')
  const withSlash = path.endsWith('/') ? path : `${path}/`

  return new URL(withSlash, SITE_URL).href
}

export const pageMeta = ({
  title,
  description,
  ogTitle,
  ogDescription,
  pathname,
}: PageMetaInput): PageMeta => {
  const pageTitle = buildTitle(title)

  return {
    title: pageTitle,
    description,
    ogTitle: ogTitle ?? pageTitle,
    ogDescription: ogDescription ?? description,
    ogType: 'website' as const,
    canonical: canonicalFor(pathname),
    jsonLd: undefined,
  }
}

export const articleMeta = (post: { data: ArticleData }, pathname: string) => {
  const { title, description, date, last_updated, og_title, og_description } =
    post.data
  const pageTitle = buildTitle(title)
  const canonical = canonicalFor(pathname)

  return {
    title: pageTitle,
    description,
    ogTitle: og_title ?? pageTitle,
    ogDescription: og_description ?? description,
    ogType: 'article' as const,
    canonical,
    jsonLd: createArticleJsonLd({
      title,
      canonical,
      date,
      lastUpdated: last_updated,
    }),
    publishedTime: date.toISOString(),
  }
}

export const homeMeta = ({
  description,
  ogDescription,
}: {
  description: string
  ogDescription?: string
}): PageMeta => ({
  title: homeTitle(),
  description,
  ogTitle: homeTitle(),
  ogDescription: ogDescription ?? description,
  ogType: 'website' as const,
  canonical: canonicalFor('/'),
  jsonLd: undefined,
})
