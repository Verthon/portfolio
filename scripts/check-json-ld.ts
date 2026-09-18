import { relative } from 'node:path'

import { formatDuration } from '../src/build-checks/format.ts'
import { checkJsonLd } from '../src/build-checks/json-ld.ts'
import { DIST, readDist } from '../src/build-checks/read-dist.ts'

const startedAt = performance.now()

const tree = await readDist(['**/*.html'])
const readMs = performance.now() - startedAt

const rulesStartedAt = performance.now()
const { violations, definedCount, referenceCount } = checkJsonLd(tree)
const rulesMs = performance.now() - rulesStartedAt

const timing = `  read ${tree.size} files ${formatDuration(readMs)} · rules ${formatDuration(rulesMs)} · total ${formatDuration(performance.now() - startedAt)}`

if (violations.length > 0) {
  console.error(
    `\nJSON-LD integrity failures (${violations.length}):\n${violations
      .map((v) => `  ${v}`)
      .join('\n')}\n${timing}\n`
  )
  process.exit(1)
}

console.log(
  `JSON-LD OK — ${referenceCount} reference(s) resolve across ${definedCount} node(s) (${relative('.', DIST)})\n${timing}`
)
