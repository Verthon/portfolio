import type { DocumentHeadProps, DocumentMeta } from '@builder.io/qwik-city'

type OpenGraphType = 'article' | 'website'

const readString = (value: unknown) =>
  typeof value === 'string' && value.trim() !== '' ? value : undefined

export const createArticleMeta = (
  { head, url }: DocumentHeadProps,
  type: OpenGraphType = 'article'
): DocumentMeta[] => {
  const fm = head.frontmatter
  const title = readString(fm.og_title) ?? readString(fm.title) ?? head.title
  const description =
    readString(fm.og_description) ??
    readString(fm.description) ??
    readString(head.meta.find((m) => m.name === 'description')?.content)

  return [
    { property: 'og:type', content: type },
    { property: 'og:url', content: url.href },
    ...(title ? [{ property: 'og:title', content: title }] : []),
    ...(description
      ? [{ property: 'og:description', content: description }]
      : []),
    { name: 'twitter:card', content: 'summary' },
    ...(title ? [{ name: 'twitter:title', content: title }] : []),
    ...(description
      ? [{ name: 'twitter:description', content: description }]
      : []),
  ]
}

export const createArticleJsonLd = ({ head, url }: DocumentHeadProps) => {
  const fm = head.frontmatter
  const title = readString(fm.title) ?? head.title
  const published = readString(fm.date)

  if (!title || !published) return []

  const person = {
    '@type': 'Person',
    '@id': 'https://sordyl.dev/#person',
    name: 'Krzysztof Sordyl',
  }

  return [
    {
      key: 'article-jsonld',
      props: { type: 'application/ld+json' },
      script: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: title,
        url: url.href,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url.href },
        datePublished: published,
        dateModified: readString(fm.last_updated) ?? published,
        author: person,
        publisher: person,
      }),
    },
  ]
}
