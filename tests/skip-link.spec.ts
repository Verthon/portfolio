import test, { expect } from '@playwright/test'

for (const path of ['/', '/blog/design-system-pitfalls/']) {
  test(`skip link is hidden until focused and moves focus into main on ${path}`, async ({
    page,
    browserName,
  }) => {
    const tab = browserName === 'webkit' ? 'Alt+Tab' : 'Tab'
    await page.goto(path)
    const skipLink = page.getByRole('link', { name: 'Skip to content' })
    const main = page.getByRole('main')

    await expect(skipLink).not.toBeInViewport()

    await page.keyboard.press(tab)
    await expect(skipLink).toBeFocused()
    await expect(skipLink).toBeInViewport()

    await page.keyboard.press('Enter')
    await expect(main).toBeFocused()
    await expect(skipLink).not.toBeInViewport()

    await page.keyboard.press(tab)
    const focusIsInMain = await main.evaluate((el) =>
      el.contains(document.activeElement)
    )
    expect(focusIsInMain).toBe(true)
  })
}
