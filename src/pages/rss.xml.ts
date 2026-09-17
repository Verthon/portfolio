import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import type { APIContext } from 'astro'

const SECTIONS = [
  ['blog', 'blog'],
  ['devBites', 'dev-bites'],
  ['observatory', 'observatory'],
] as const

export const GET = async (context: APIContext) => {
  const sections = await Promise.all(
    SECTIONS.map(async ([collection, segment]) => {
      const entries = await getCollection(collection)
      return entries.map((entry) => ({
        title: entry.data.title,
        description: entry.data.excerpt,
        pubDate: entry.data.date,
        link: `/${segment}/${entry.id}/`,
      }))
    })
  )

  const items = sections
    .flat()
    .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime())

  const self = new URL('/rss.xml', context.site!).href
  const lastBuildDate = items[0]?.pubDate.toUTCString()

  return rss({
    xmlns: { atom: 'http://www.w3.org/2005/Atom' },
    customData: [
      `<atom:link href="${self}" rel="self" type="application/rss+xml"/>`,
      lastBuildDate ? `<lastBuildDate>${lastBuildDate}</lastBuildDate>` : '',
    ].join(''),
    title: 'Krzysztof Sordyl',
    description:
      'Frontend architecture, developer experience, and technical decisions with business impact.',
    site: context.site!,
    trailingSlash: true,
    items,
  })
}
