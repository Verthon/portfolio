import { checkDrafts } from '../src/build-checks/drafts.ts'
import { FEED } from '../src/build-checks/feed.ts'
import { formatDuration } from '../src/build-checks/format.ts'
import { SITEMAP } from '../src/build-checks/links.ts'
import { readContent } from '../src/build-checks/read-content.ts'
import { readDist } from '../src/build-checks/read-dist.ts'
import { SITE_URL } from '../src/seo/site.ts'

const startedAt = performance.now()

const tree = await readDist(['**/*.html', FEED, SITEMAP])
const drafts = (await readContent())
  .filter((entry) => entry.draft)
  .map((entry) => entry.path)

const readMs = performance.now() - startedAt

const rulesStartedAt = performance.now()
const { violations, draftCount } = checkDrafts(tree, drafts, SITE_URL)
const rulesMs = performance.now() - rulesStartedAt

const timing = `  read ${tree.size} files ${formatDuration(readMs)} · rules ${formatDuration(rulesMs)} · total ${formatDuration(performance.now() - startedAt)}`

if (violations.length > 0) {
  console.error(
    `\nDraft leak failures (${violations.length}):\n${violations
      .map((v) => `  ${v}`)
      .join('\n')}\n${timing}\n`
  )
  process.exit(1)
}

console.log(`Drafts OK — ${draftCount} drafts absent from dist\n${timing}`)
