import { type Page, expect, test } from '@playwright/test'

// Give each expect a generous timeout of 60 seconds.
const customTimeout = { timeout: 60000 }

// Due to the dynamic rendering nature of this NextJS app,
// give each test a "generous" threshold of max 2% difference.
const customDiffPixelRatio = { maxDiffPixelRatio: 0.02 }

// Testing constants.
const repoPreviewURL: string =
  '/wei/socialify?language=1&owner=1&name=1&stargazers=1&theme=Light'

test.describe('Socialify UI:', () => {
  test('is consistent for landing page', async ({
    page,
  }: { page: Page }): Promise<void> => {
    await page.goto('/', customTimeout)
    await page.waitForSelector('button[type="submit"]', customTimeout)
    const image = await page.screenshot()
    expect(image).toMatchSnapshot(customDiffPixelRatio)
  })

  test('is consistent for error (404) page', async ({
    page,
  }: { page: Page }): Promise<void> => {
    await page.goto('/404', customTimeout)
    await page.waitForSelector('a[href="/"]', customTimeout)
    const image = await page.screenshot()
    expect(image).toMatchSnapshot(customDiffPixelRatio)
  })

  test('is consistent for preview config page', async ({
    page,
  }: { page: Page }): Promise<void> => {
    await page.goto(repoPreviewURL, customTimeout)
    await page.waitForSelector('button:has-text("URL")', customTimeout)

    // To maintain consistency, de-select the 'Stars' checkbox,
    // and selects the 'Description' checkbox.
    await page.click('input[name="stargazers"]')
    await page.click('input[name="description"]')

    const image = await page.screenshot()
    expect(image).toMatchSnapshot(customDiffPixelRatio)

    // Also check the toaster UI consistency.
    await page.click('button:has-text("URL")')
    await page.waitForSelector('[role="alert"]', customTimeout)
    const toastImage = await page.screenshot()
    expect(toastImage).toMatchSnapshot(customDiffPixelRatio)
  })
})
