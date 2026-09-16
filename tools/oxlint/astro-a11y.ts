// oxlint has no custom-parser hook: it parses every file with its own Rust
// parser, so a `.astro` file reaches a JS plugin as an AST with no template in
// it. `jsPlugins` exposes the ESLint rule API but not `languageOptions.parser`.
// So each rule ignores the AST oxlint passes and re-parses the file itself.
//
// Tracked upstream: https://github.com/oxc-project/oxc/pull/24262
// When that lands this file collapses into an `overrides` entry pointing at
// astro-eslint-parser, and the rules can come from eslint-plugin-jsx-a11y.

import fs from 'node:fs'
import * as astroParser from 'astro-eslint-parser'

type Node = Record<string, any>

const parseOptions = {
  parser: { ts: '@typescript-eslint/parser', js: '@typescript-eslint/parser' },
}

const parseAstro = (filename: string): Node | null => {
  const raw = fs.readFileSync(filename, 'utf8')
  try {
    return astroParser.parseForESLint(raw, {
      filePath: filename,
      ...parseOptions,
    } as never).ast
  } catch {
    return null
  }
}

const walk = (node: Node | null, visit: (n: Node) => void) => {
  if (!node || typeof node.type !== 'string') return
  visit(node)
  for (const key of Object.keys(node)) {
    if (key === 'parent') continue
    const value = node[key]
    if (Array.isArray(value)) value.forEach((child) => walk(child, visit))
    else if (
      value &&
      typeof value === 'object' &&
      typeof value.type === 'string'
    )
      walk(value, visit)
  }
}

const tagName = (node: Node): string | undefined =>
  node.openingElement?.name?.name
const attributes = (node: Node): Node[] => node.openingElement?.attributes ?? []
const attribute = (node: Node, name: string) =>
  attributes(node).find(
    (attr) => attr.type === 'JSXAttribute' && attr.name?.name === name
  )

const staticValue = (attr: Node | undefined) => {
  if (!attr) return undefined
  if (attr.value == null) return ''
  if (attr.value.type === 'Literal') return String(attr.value.value)
  return undefined
}

const hasContent = (node: Node): boolean =>
  (node.children ?? []).some((child: Node) => {
    if (child.type === 'JSXText' || child.type === 'AstroRawText')
      return Boolean(child.value?.trim())
    if (child.type === 'JSXExpressionContainer')
      return child.expression?.type !== 'JSXEmptyExpression'
    if (child.type === 'JSXElement') return true
    return false
  })

const astroRule = (
  check: (node: Node, report: (message: string) => void) => void
) => ({
  create(ctx: Node) {
    return {
      'Program:exit'(program: Node) {
        if (!ctx.filename.endsWith('.astro')) return
        const ast = parseAstro(ctx.filename)
        if (!ast) return
        walk(ast, (node) => {
          if (node.type !== 'JSXElement') return
          check(node, (message) => {
            ctx.report({
              node: program,
              message: `${message} (line ${node.loc?.start?.line})`,
            })
          })
        })
      },
    }
  },
})

const plugin = {
  meta: { name: 'astro-a11y' },
  rules: {
    'alt-text': astroRule((node, report) => {
      if (tagName(node) !== 'img') return
      if (!attribute(node, 'alt'))
        report('`<img>` is missing an `alt` attribute')
    }),

    'anchor-is-valid': astroRule((node, report) => {
      if (tagName(node) !== 'a') return
      const href = attribute(node, 'href')
      if (!href) return report('`<a>` is missing an `href` attribute')
      const value = staticValue(href)
      if (value === undefined) return
      if (value === '' || value === '#' || value.startsWith('javascript:')) {
        report(`\`<a>\` has an invalid href: "${value}"`)
      }
    }),

    'anchor-has-content': astroRule((node, report) => {
      if (tagName(node) !== 'a') return
      if (hasContent(node)) return
      if (attribute(node, 'aria-label') || attribute(node, 'title')) return
      report('`<a>` has no accessible content')
    }),

    'heading-has-content': astroRule((node, report) => {
      const tag = tagName(node)
      if (!tag || !/^h[1-6]$/.test(tag)) return
      if (hasContent(node)) return
      if (attribute(node, 'aria-label')) return
      report(`\`<${tag}>\` has no content`)
    }),

    'iframe-has-title': astroRule((node, report) => {
      if (tagName(node) !== 'iframe') return
      if (!attribute(node, 'title'))
        report('`<iframe>` is missing a `title` attribute')
    }),

    'no-positive-tabindex': astroRule((node, report) => {
      const value = staticValue(attribute(node, 'tabindex'))
      if (value === undefined) return
      if (Number(value) > 0)
        report(`\`tabindex\` should not be positive (got "${value}")`)
    }),

    'no-autofocus': astroRule((node, report) => {
      if (attribute(node, 'autofocus')) report('`autofocus` should be avoided')
    }),
  },
}

export default plugin
