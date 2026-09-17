import { readFileSync } from 'node:fs'
import { glob } from 'node:fs/promises'
import { resolve } from 'node:path'

import type { DistTree } from './links.ts'

export const DIST = resolve('dist')

export const readDist = async (patterns: string[]): Promise<DistTree> => {
  const tree: DistTree = new Map()

  for (const pattern of patterns) {
    for await (const file of glob(pattern, { cwd: DIST })) {
      if (tree.has(file)) continue
      try {
        tree.set(file, readFileSync(resolve(DIST, file), 'utf8'))
      } catch {
        continue
      }
    }
  }

  return tree
}
