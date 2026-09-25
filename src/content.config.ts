import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const updatedAfterPublish = <
  T extends z.ZodType<{ date: Date; last_updated?: Date }>,
>(
  schema: T
) =>
  schema.refine((d) => !d.last_updated || d.last_updated >= d.date, {
    message: 'last_updated is before date',
    path: ['last_updated'],
  })

const blog = defineCollection({
  loader: glob({
    base: './src/content/blog',
    pattern: '**/index.mdx',
    generateId: ({ entry }) => entry.replace('/index.mdx', ''),
  }),
  schema: updatedAfterPublish(
    z.object({
      title: z.string().max(70),
      description: z.string(),
      date: z.coerce.date(),
      excerpt: z.string(),
      tags: z.string(),
      article_type: z.enum(['featured', 'regular']).default('regular'),
      last_updated: z.coerce.date().optional(),
      value_proposition: z.string().optional(),
      og_title: z.string().optional(),
      og_description: z.string().optional(),
    })
  ),
})

const devBites = defineCollection({
  loader: glob({
    base: './src/content/dev-bites',
    pattern: '**/index.mdx',
    generateId: ({ entry }) => entry.replace('/index.mdx', ''),
  }),
  schema: updatedAfterPublish(
    z.object({
      title: z.string().max(70),
      description: z.string(),
      date: z.coerce.date(),
      excerpt: z.string(),
      tags: z.string(),
      dev_bite_type: z.enum(['featured', 'regular']).default('regular'),
      last_updated: z.coerce.date().optional(),
      og_title: z.string().optional(),
      og_description: z.string().optional(),
    })
  ),
})

const observatory = defineCollection({
  loader: glob({
    base: './src/content/observatory',
    pattern: '**/index.mdx',
    generateId: ({ entry }) => entry.replace('/index.mdx', ''),
  }),
  schema: updatedAfterPublish(
    z.object({
      title: z.string().max(70),
      description: z.string(),
      date: z.coerce.date(),
      excerpt: z.string(),
      tags: z.string(),
      status: z.enum([
        'Experimental',
        'Alpha',
        'Beta',
        'Superseded',
        'Technical Preview',
        'Stable',
      ]),
      short_preview: z.string().optional(),
      last_updated: z.coerce.date().optional(),
      og_title: z.string().optional(),
      og_description: z.string().optional(),
    })
  ),
})

export const collections = { blog, devBites, observatory }
