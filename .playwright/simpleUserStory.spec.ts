import { type Page, expect, test } from '@playwright/test'

// IMPORTANT: Playwright is not setup with import aliases, use relative paths.
import getClipboardText from './utils/getClipboardText'

const customTimeout = { timeout: 30000 }
const componentUpdateTimeout = 1000
const repo: string = 'wei/socialify'
const expectedConfigURL: string =
  '/wei/socialify?language=1&owner=1&name=1&stargazers=1&theme=Light'
const expectedImageURLRegExp: RegExp =
  /\/wei\/socialify\/image\?description=1&font=Source\+Code\+Pro&language=1&name=1&owner=1&theme=Light$/

test.beforeEach(async ({ page }: { page: Page }): Promise<void> => {
  await page.goto('/', customTimeout)
  await page.waitForLoadState('networkidle', customTimeout)
})

test.describe('A simple user story:', () => {
  test(`user can enter a GitHub repo ("username/repo"), click submit button, click "URL", and get the social preview image`, async ({
    page,
  }: { page: Page }): Promise<void> => {
    // Input and submit the repo following accessibility best practices.
    await page.fill('input[name="repo-input"]', repo)
    await page.waitForTimeout(componentUpdateTimeout)
    await page.click('button[type="submit"]')

    // Wait for complete navigation to the preview config page.
    await page.waitForSelector('button:has-text("URL")', customTimeout)
    await page.waitForLoadState('networkidle', customTimeout)
    await expect(page).toHaveURL(expectedConfigURL)

    await page.click('input[name="stargazers"]')
    await page.waitForTimeout(componentUpdateTimeout)
    await page.click('input[name="description"]')
    await page.waitForTimeout(componentUpdateTimeout)

    // Select the "Source Code Pro" option for max diff from default.
    await page.selectOption('select[name="font"]', { label: 'Source Code Pro' })
    await page.waitForTimeout(componentUpdateTimeout)

    // Obtain the consistent preview image URL.
    await page.click('button:has-text("URL")')
    await page.waitForTimeout(componentUpdateTimeout)

    // Compare the clipboard content to the expected image URL.
    // (Only check the end of the URL due to dynamic localhost port allocation.)
    const url: string = await getClipboardText(page)
    expect(url).toMatch(expectedImageURLRegExp)

    // Visit the image URL and snapshot the image.
    await page.goto(url, customTimeout)
    await page.waitForLoadState('networkidle', customTimeout)

    const image = await page.screenshot()
    expect(image).toMatchSnapshot()
  })
})
