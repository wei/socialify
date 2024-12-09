import { type Page, expect, test } from '@playwright/test'

// Give navigation expects a generous timeout of 60 seconds.
const customPageLoadTimeout = { timeout: 60000 }

// Give component transition/animation expects a generous timeout of 1 second(s).
const customTransitionTimeout = { timeout: 1000 }

// Testing constants.
const repoPreviewURL: string =
  '/wei/socialify?language=1&owner=1&name=1&stargazers=1&theme=Light'

test.describe('Socialify UI:', () => {
  test('is consistent for landing page', async ({
    page,
  }: { page: Page }): Promise<void> => {
    await page.goto('/', customPageLoadTimeout)

    // Wait for the page to load/hydrate completely.
    await page.waitForLoadState('networkidle', customPageLoadTimeout)

    const image = await page.screenshot()
    expect(image).toMatchSnapshot()
  })

  test('is consistent for error (404) page', async ({
    page,
  }: { page: Page }): Promise<void> => {
    await page.goto('/404', customPageLoadTimeout)

    // Wait for the page to load/hydrate completely.
    await page.waitForLoadState('networkidle', customPageLoadTimeout)

    const image = await page.screenshot()
    expect(image).toMatchSnapshot()
  })

  test('is consistent for preview config page', async ({
    page,
  }: { page: Page }): Promise<void> => {
    await page.goto(repoPreviewURL, customPageLoadTimeout)

    // Wait for the page to load/hydrate completely.
    await page.waitForLoadState('networkidle', customPageLoadTimeout)

    // To maintain consistency, de-select the 'Stars' checkbox,
    // and selects the 'Description' checkbox.
    await page.click('input[name="stargazers"]')
    await page.click('input[name="description"]')

    // Wait for the component transition/animation to finish completely.
    await page.waitForTimeout(customTransitionTimeout.timeout)

    const image = await page.screenshot()
    expect(image).toMatchSnapshot()

    // Also check the toaster UI consistency.
    await page.click('button:has-text("URL")')
    await page.waitForSelector('[role="alert"]', customPageLoadTimeout)

    // Wait for the component transition/animation to finish completely.
    await page.waitForTimeout(customTransitionTimeout.timeout)

    const toastImage = await page.screenshot()
    expect(toastImage).toMatchSnapshot()
  })
})
