import type { DistTree } from './links.ts'

export type JsonLdReport = {
  violations: string[]
  definedCount: number
  referenceCount: number
}

const BLOCK =
  /<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g

type Node = Record<string, unknown>

const isNode = (value: unknown): value is Node =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const walk = (value: unknown, visit: (node: Node) => void): void => {
  if (Array.isArray(value)) {
    for (const item of value) walk(item, visit)
    return
  }
  if (!isNode(value)) return

  visit(value)
  for (const [key, child] of Object.entries(value)) {
    if (key === '@context') continue
    walk(child, visit)
  }
}

/**
 * A node object carrying `@id` plus other properties *defines* that node; one
 * carrying `@id` alone is a *reference* to a node defined elsewhere. Every
 * reference must resolve to exactly one definition across the whole build.
 */
const isDefinition = (node: Node): boolean =>
  Object.keys(node).some((key) => key !== '@id' && key !== '@context')

export const checkJsonLd = (tree: DistTree): JsonLdReport => {
  const violations: string[] = []
  const definedAt = new Map<string, string[]>()
  const referencedAt = new Map<string, string[]>()

  for (const [path, html] of tree) {
    if (!path.endsWith('.html')) continue

    for (const [, raw] of html.matchAll(BLOCK)) {
      let parsed: unknown
      try {
        parsed = JSON.parse(raw)
      } catch (error) {
        violations.push(
          `${path}: JSON-LD block is not valid JSON (${(error as Error).message})`
        )
        continue
      }

      walk(parsed, (node) => {
        const id = node['@id']
        if (typeof id !== 'string') return

        const bucket = isDefinition(node) ? definedAt : referencedAt
        const seen = bucket.get(id) ?? []
        if (!seen.includes(path)) seen.push(path)
        bucket.set(id, seen)
      })
    }
  }

  for (const [id, paths] of referencedAt) {
    const definitions = definedAt.get(id)

    if (definitions === undefined) {
      violations.push(
        `${id}: referenced by ${paths.length} page(s) but never defined (first: ${paths[0]})`
      )
      continue
    }

    if (definitions.length > 1) {
      violations.push(
        `${id}: defined on ${definitions.length} pages (${definitions.join(', ')}) — exactly one canonical definition expected`
      )
    }
  }

  for (const [id, paths] of definedAt) {
    if (paths.length > 1 && !referencedAt.has(id)) {
      violations.push(
        `${id}: defined on ${paths.length} pages (${paths.join(', ')}) — exactly one canonical definition expected`
      )
    }
  }

  return {
    violations,
    definedCount: definedAt.size,
    referenceCount: referencedAt.size,
  }
}
