import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import test, { expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const LOC = /<loc>([^<]*)<\/loc>/g
const SITEMAP = resolve('dist/sitemap-0.xml')

const sitemapPaths = () => {
  const xml = readFileSync(SITEMAP, 'utf8')
  const paths = [...xml.matchAll(LOC)].map(([, loc]) => new URL(loc).pathname)

  if (paths.length === 0) {
    throw new Error(`${SITEMAP} contains no <loc> entries — run \`pnpm build\``)
  }

  return [...paths, '/404/'].sort()
}

const paths = sitemapPaths()

for (const scheme of ['light', 'dark'] as const) {
  test.describe(`${scheme} mode`, () => {
    test.use({ colorScheme: scheme })

    for (const path of paths) {
      test(`should not have any automatically detectable accessibility issues on ${path}`, async ({
        page,
      }) => {
        await page.goto(path)

        await expect(page.locator('html')).toHaveAttribute('data-theme', scheme)

        const accessibilityScanResults = await new AxeBuilder({
          page,
        }).analyze()

        expect(accessibilityScanResults.violations).toEqual([])
      })
    }
  })
}
