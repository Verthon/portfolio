import test, { expect } from '@playwright/test'

test('should have system theme as default and select another theme', async ({
  page,
}) => {
  await page.goto('/blog')
  const html = page.locator('html')
  const themeSelector = page.getByLabel(/select theme/i)
  await expect(themeSelector).toHaveValue('system')

  await themeSelector.selectOption('Dark mode')

  await expect(html).toHaveAttribute('data-theme', 'dark')
})
