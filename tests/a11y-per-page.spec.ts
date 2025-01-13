import test, { expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('should not have any automatically detectable accessibility issues on the home page', async ({ page }) => {
  await page.goto('/')

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze()

  expect(accessibilityScanResults.violations).toEqual([])
})

test('should not have any automatically detectable accessibility issues on the blog page', async ({ page }) => {
  await page.goto('/blog')

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze()

  expect(accessibilityScanResults.violations).toEqual([])
})

test('should not have any automatically detectable accessibility issues on the dev-bites page', async ({ page }) => {
  await page.goto('/dev-bites')

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze()

  expect(accessibilityScanResults.violations).toEqual([])
})

test('should not have any automatically detectable accessibility issues on the observatory page', async ({ page }) => {
  await page.goto('/observatory')

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze()

  expect(accessibilityScanResults.violations).toEqual([])
})
