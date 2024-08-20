import { test, expect } from '@playwright/test'

test('should display the featured articles and featured dev-bites', async ({
  page,
}) => {
  await page.goto('/')
  const featuredArticlesList = await page
    .locator('article[data-featured-article="true"]')
    .all()
  const featuredDevBites = await page
    .locator('article[data-featured-dev-bite="true"]')
    .all()

  expect(featuredArticlesList).toHaveLength(3)
  expect(featuredDevBites).toHaveLength(2)
})

test('should navigate directly to the featured article once it is clicked', async ({
  page,
}) => {
  await page.goto('/')
  const featuredArticle = page.getByText(/read article/i).first()

  await featuredArticle.click()

  await expect(page).not.toHaveURL('/')
  await expect(page).toHaveURL(/\/blog\/.*/)
})

test('should navigate directly to the featured dev-bite once it is clicked', async ({
  page,
}) => {
  await page.goto('/')
  const featuredDevBite = page.getByText(/read more/i).first()

  await featuredDevBite.click()

  await expect(page).not.toHaveURL('/')
  await expect(page).toHaveURL(/\/dev-bites\/.*/)
})
