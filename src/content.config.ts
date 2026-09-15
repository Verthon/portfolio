import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const blog = defineCollection({
  loader: glob({
    base: './src/content/blog',
    pattern: '**/index.mdx',
    generateId: ({ entry }) => entry.replace('/index.mdx', ''),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    excerpt: z.string(),
    tags: z.string(),
    published: z.boolean().default(false),
    article_type: z.enum(['featured', 'regular']).default('regular'),
    value_proposition: z.string().optional(),
    og_title: z.string().optional(),
    og_description: z.string().optional(),
  }),
})

const devBites = defineCollection({
  loader: glob({
    base: './src/content/dev-bites',
    pattern: '**/index.mdx',
    generateId: ({ entry }) => entry.replace('/index.mdx', ''),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    excerpt: z.string(),
    tags: z.string(),
    published: z.boolean().default(false),
    dev_bite_type: z.enum(['featured', 'regular']).default('regular'),
    last_updated: z.coerce.date().optional(),
    og_title: z.string().optional(),
    og_description: z.string().optional(),
  }),
})

const observatory = defineCollection({
  loader: glob({
    base: './src/content/observatory',
    pattern: '**/index.mdx',
    generateId: ({ entry }) => entry.replace('/index.mdx', ''),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    excerpt: z.string(),
    tags: z.string(),
    published: z.boolean().default(false),
    status: z
      .enum([
        'Experimental',
        'Beta',
        'Superseded',
        'Technical Preview',
        'Stable',
      ])
      .optional(),
    short_preview: z.string().optional(),
    last_updated: z.coerce.date().optional(),
    recommendation: z.string().optional(),
    og_title: z.string().optional(),
    og_description: z.string().optional(),
  }),
})

export const collections = { blog, devBites, observatory }
