import { PERSON_ID, WEBSITE_ID } from './site'

type ArticleJsonLdInput = {
  title: string
  canonical: string
  date: Date
  lastUpdated?: Date
}

const iso = (date: Date) => date.toISOString().slice(0, 10)

export const createArticleJsonLd = ({
  title,
  canonical,
  date,
  lastUpdated,
}: ArticleJsonLdInput) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: title,
  url: canonical,
  mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
  datePublished: iso(date),
  dateModified: iso(lastUpdated ?? date),
  author: { '@id': PERSON_ID },
  isPartOf: { '@id': WEBSITE_ID },
})
