import { buildTitle, homeTitle } from './title'
import { SITE_URL } from './site'
import { createArticleJsonLd } from './article-json-ld'
import { createBreadcrumbJsonLd } from './breadcrumb-json-ld'

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

export type Section = 'blog' | 'dev-bites' | 'observatory'

const SECTIONS: Record<Section, { name: string; pathname: string }> = {
  blog: { name: 'Blog', pathname: '/blog/' },
  'dev-bites': { name: 'Dev Bites', pathname: '/dev-bites/' },
  observatory: { name: 'Observatory', pathname: '/observatory/' },
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

export const articleMeta = (
  post: { data: ArticleData },
  pathname: string,
  section: Section
) => {
  const { title, description, date, last_updated, og_title, og_description } =
    post.data
  const pageTitle = buildTitle(title)
  const canonical = canonicalFor(pathname)
  const { name: sectionName, pathname: sectionPathname } = SECTIONS[section]

  return {
    title: pageTitle,
    description,
    ogTitle: og_title ?? pageTitle,
    ogDescription: og_description ?? description,
    ogType: 'article' as const,
    canonical,
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        createArticleJsonLd({
          title,
          canonical,
          date,
          lastUpdated: last_updated,
        }),
        createBreadcrumbJsonLd([
          { name: sectionName, url: canonicalFor(sectionPathname) },
          { name: title, url: canonical },
        ]),
      ],
    },
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
