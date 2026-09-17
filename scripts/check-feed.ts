import { glob } from 'node:fs/promises'

import { checkFeed, FEED } from '../src/build-checks/feed.ts'
import { formatDuration } from '../src/build-checks/format.ts'
import { readDist } from '../src/build-checks/read-dist.ts'
import { SITE_URL } from '../src/seo/site.ts'

const startedAt = performance.now()

const tree = await readDist(['**/*.html', FEED])

const contentEntries: string[] = []
for await (const entry of glob('src/content/*/*/index.mdx'))
  contentEntries.push(entry)

const readMs = performance.now() - startedAt

const rulesStartedAt = performance.now()
const { violations, itemCount } = checkFeed(
  tree,
  contentEntries.length,
  SITE_URL
)
const rulesMs = performance.now() - rulesStartedAt

const timing = `  read ${tree.size} files ${formatDuration(readMs)} · rules ${formatDuration(rulesMs)} · total ${formatDuration(performance.now() - startedAt)}`

if (violations.length > 0) {
  console.error(
    `\nFeed integrity failures (${violations.length}):\n${violations
      .map((v) => `  ${v}`)
      .join('\n')}\n${timing}\n`
  )
  process.exit(1)
}

console.log(`Feed OK — ${itemCount} items in ${FEED}\n${timing}`)
