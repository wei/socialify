import {
  type Page,
  type PageScreenshotOptions,
  expect,
  test,
} from '@playwright/test'

const customPageLoadTimeout = { timeout: 30000 }
const additionalPageLoadTimeout = 1000
const componentUpdateTimeout = 1000
// As a known CI issue, allow max 1% deviation in pixel diff.
const customDiffPixelRatio = { maxDiffPixelRatio: 0.01 }
const customScreenshotOptions: PageScreenshotOptions = {
  style: '.no-screenshot{display:none !important}',
}
const repoPreviewURL: string =
  '/wei/socialify?language=1&owner=1&name=1&stargazers=1&theme=Light'

test.describe('Socialify UI:', () => {
  test('is consistent for landing page', async ({
    page,
  }: { page: Page }): Promise<void> => {
    await page.goto('/', customPageLoadTimeout)
    await page.waitForLoadState('networkidle', customPageLoadTimeout)
    await page.waitForTimeout(additionalPageLoadTimeout)

    const image = await page.screenshot(customScreenshotOptions)
    expect(image).toMatchSnapshot(customDiffPixelRatio)
  })

  test('is consistent for error (404) page', async ({
    page,
  }: { page: Page }): Promise<void> => {
    await page.goto('/404', customPageLoadTimeout)
    await page.waitForLoadState('networkidle', customPageLoadTimeout)
    await page.waitForTimeout(additionalPageLoadTimeout)

    const image = await page.screenshot(customScreenshotOptions)
    expect(image).toMatchSnapshot(customDiffPixelRatio)
  })

  test('is consistent for preview config page', async ({
    page,
  }: { page: Page }): Promise<void> => {
    // Wait for the page to load/hydrate completely.
    await page.goto(repoPreviewURL, customPageLoadTimeout)
    await page.waitForLoadState('networkidle', customPageLoadTimeout)
    await page.waitForTimeout(additionalPageLoadTimeout)

    await page.click('input[name="stargazers"]')
    await page.waitForTimeout(componentUpdateTimeout)
    await page.click('input[name="description"]')
    await page.waitForTimeout(componentUpdateTimeout)

    const image = await page.screenshot(customScreenshotOptions)
    expect(image).toMatchSnapshot(customDiffPixelRatio)

    // Also check the toaster UI consistency, wait for transition to complete.
    await page.click('button:has-text("URL")')
    await page.waitForSelector('[role="alert"]', customPageLoadTimeout)
    await page.waitForTimeout(componentUpdateTimeout)

    const toastImage = await page.screenshot(customScreenshotOptions)
    expect(toastImage).toMatchSnapshot(customDiffPixelRatio)
  })

  test('shows error when svg data uri input length exceeds the limit', async ({
    page,
  }: { page: Page }): Promise<void> => {
    await page.goto(repoPreviewURL, customPageLoadTimeout)
    await page.waitForLoadState('networkidle', customPageLoadTimeout)

    await page.click('input[name="stargazers"]')
    await page.waitForTimeout(componentUpdateTimeout)
    await page.click('input[name="description"]')
    await page.waitForTimeout(componentUpdateTimeout)

    await page.fill(
      'input[name="logo"]',
      'data:image/svg+xml,%3Csvg%20width%3D%22800px%22%20height%3D%22800px%22%20viewBox%3D%220%200%201024%201024%22%20class%3D%22icon%22%20%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M373.2%20600.3h278.7v8H373.2z%22%20fill%3D%22%23999999%22%20%2F%3E%3Cpath%20d%3D%22M512.6%20948.3h-9.8c-58.7%200-106.7-48-106.7-106.7v-212h259v176.2c0%2078.4-64.2%20142.5-142.5%20142.5z%22%20fill%3D%22%23F9C0C0%22%20%2F%3E%3Cpath%20d%3D%22M511.7%20958.8c-40.7%200-79-15.9-108-44.9s-44.9-67.3-44.9-108V209.2h-32.2c-11.4%200-20.7-9.3-20.7-20.7v-17.6c0-11.4%209.3-20.7%2020.7-20.7h370.1c11.4%200%2020.7%209.3%2020.7%2020.7v17.6c0%2011.4-9.3%2020.7-20.7%2020.7h-32.2v596.7c0%2040.7-15.9%2079-44.9%20108-28.9%2028.9-67.2%2044.9-107.9%2044.9zM326.6%20165.1c-3.2%200-5.7%202.6-5.7%205.7v17.6c0%203.2%202.6%205.7%205.7%205.7h47.2v611.7c0%2036.7%2014.4%2071.3%2040.5%2097.4%2026.1%2026.1%2060.7%2040.5%2097.4%2040.5s71.3-14.4%2097.4-40.5c26.1-26.1%2040.5-60.7%2040.5-97.4V194.2h47.2c3.2%200%205.7-2.6%205.7-5.7v-17.6c0-3.2-2.6-5.7-5.7-5.7l-370.2-0.1z%22%20fill%3D%22%23999999%22%20%2F%3E%3Cpath%20d%3D%22M373.2%20193.8h50.7v8h-50.7zM466.8%20193.8h185.1v8H466.8z%22%20fill%3D%22%23999999%22%20%2F%3E%3Cpath%20d%3D%22M535.7%20558.5c-14.1%200-25.5-11.4-25.5-25.5s11.4-25.5%2025.5-25.5%2025.5%2011.4%2025.5%2025.5c0%2014-11.4%2025.5-25.5%2025.5z%20m0-43c-9.6%200-17.5%207.8-17.5%2017.5%200%209.6%207.8%2017.5%2017.5%2017.5s17.5-7.8%2017.5-17.5-7.9-17.5-17.5-17.5zM458.1%20417.6c-21.3%200-38.6-17.3-38.6-38.6s17.3-38.6%2038.6-38.6%2038.6%2017.3%2038.6%2038.6-17.3%2038.6-38.6%2038.6z%20m0-69.2c-16.9%200-30.6%2013.7-30.6%2030.6s13.7%2030.6%2030.6%2030.6%2030.6-13.7%2030.6-30.6-13.7-30.6-30.6-30.6zM566.7%20107.3c-11.4%200-20.7-9.3-20.7-20.7s9.3-20.7%2020.7-20.7%2020.7%209.3%2020.7%2020.7-9.2%2020.7-20.7%2020.7z%20m0-33.4c-7%200-12.7%205.7-12.7%2012.7s5.7%2012.7%2012.7%2012.7%2012.7-5.7%2012.7-12.7-5.7-12.7-12.7-12.7zM540.5%20299.5c-16.7%200-30.3-13.6-30.3-30.3s13.6-30.3%2030.3-30.3%2030.3%2013.6%2030.3%2030.3-13.6%2030.3-30.3%2030.3z%20m0-52.6c-12.3%200-22.3%2010-22.3%2022.3s10%2022.3%2022.3%2022.3%2022.3-10%2022.3-22.3-10-22.3-22.3-22.3z%22%20fill%3D%22%23CE0202%22%20%2F%3E%3C%2Fsvg%3E'
    )
    await page.waitForTimeout(componentUpdateTimeout)

    const errorMessage = await page.locator('#logo-error').textContent()
    expect(errorMessage).toBe(
      'URI is too long, please use an SVG image URL instead.'
    )

    const image = await page.screenshot(customScreenshotOptions)
    expect(image).toMatchSnapshot(customDiffPixelRatio)
  })
})
