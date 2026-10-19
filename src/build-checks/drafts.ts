import type { DistTree } from './links.ts'

export type DraftReport = {
  violations: string[]
  draftCount: number
}

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---/
const DRAFT = /^draft:\s*true\s*(#.*)?$/m

export const isDraftSource = (source: string) =>
  DRAFT.test(source.match(FRONTMATTER)?.[1] ?? '')

export const checkDrafts = (
  tree: DistTree,
  draftPaths: string[],
  site: string
): DraftReport => {
  const violations: string[] = []

  for (const path of draftPaths) {
    const page = `${path.slice(1)}index.html`
    if (tree.has(page)) violations.push(`${page}: draft "${path}" was built`)

    const references = [`href="${path}"`, `${site}${path}`]
    for (const [file, contents] of tree) {
      if (file === page) continue
      if (references.some((ref) => contents.includes(ref))) {
        violations.push(`${file}: references draft "${path}"`)
      }
    }
  }

  return { violations, draftCount: draftPaths.length }
}
