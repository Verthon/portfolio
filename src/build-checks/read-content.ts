import { readFileSync } from 'node:fs'
import { glob } from 'node:fs/promises'

import { isDraftSource } from './drafts.ts'

export type ContentEntry = { path: string; draft: boolean }

const ENTRY = /^src\/content\/([^/]+)\/([^/]+)\/index\.mdx$/

export const readContent = async (): Promise<ContentEntry[]> => {
  const entries: ContentEntry[] = []

  for await (const file of glob('src/content/*/*/index.mdx')) {
    const [, section, slug] = file.match(ENTRY) ?? []
    if (!section || !slug) continue
    entries.push({
      path: `/${section}/${slug}/`,
      draft: isDraftSource(readFileSync(file, 'utf8')),
    })
  }

  return entries
}
