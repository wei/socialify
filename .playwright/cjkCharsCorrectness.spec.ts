import Buffer from '@playwright/test'
import { type Page, expect, test } from '@playwright/test'

// IMPORTANT: Playwright is not setup with import aliases, use relative paths.
import getClipboardText from './utils/getClipboardText'

const customTimeout = { timeout: 30000 }
const componentUpdateTimeout = 1000
const repo: string = 'wei/socialify'
const expectedPageURLEnding: string =
  '?custom_description=%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87%2C%20%E7%B9%81%E9%AB%94%E4%B8%AD%E6%96%87%20(f%C3%A1n%20t%C7%90%20zh%C5%8Dng%20w%C3%A9n)%2C%20%E3%81%AB%E3%81%BB%E3%82%93%E3%81%94%20%E3%81%B2%E3%82%89%E3%81%8C%E3%81%AA%2C%20%E3%83%8B%E3%83%9B%E3%83%B3%E3%82%B4%20%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A%2C%20%E6%97%A5%E6%9C%AC%E8%AA%9E%20%E6%BC%A2%E5%AD%97%2C%20%ED%95%9C%EA%B5%AD%EC%96%B4%20%E9%9F%93%E5%9C%8B%E8%AA%9E%2C%20%EC%A1%B0%EC%84%A0%EB%A7%90%20%E6%9C%9D%E9%AE%AE%EB%A7%90&description=1&font=Jost&language=1&logo=https%3A%2F%2Fraw.githubusercontent.com%2Fwei%2Fsocialify%2F1f520b6bfe799300bcff9edcdc330828d681d382%2Fapp%2Ficon.svg&name=1&owner=1&pattern=Diagonal%20Stripes&theme=Dark'
const expectedClipboardURLEnding: string =
  '/wei/socialify/image?custom_description=%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87%2C+%E7%B9%81%E9%AB%94%E4%B8%AD%E6%96%87+%28f%C3%A1n+t%C7%90+zh%C5%8Dng+w%C3%A9n%29%2C+%E3%81%AB%E3%81%BB%E3%82%93%E3%81%94+%E3%81%B2%E3%82%89%E3%81%8C%E3%81%AA%2C+%E3%83%8B%E3%83%9B%E3%83%B3%E3%82%B4+%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A%2C+%E6%97%A5%E6%9C%AC%E8%AA%9E+%E6%BC%A2%E5%AD%97%2C+%ED%95%9C%EA%B5%AD%EC%96%B4+%E9%9F%93%E5%9C%8B%E8%AA%9E%2C+%EC%A1%B0%EC%84%A0%EB%A7%90+%E6%9C%9D%E9%AE%AE%EB%A7%90&description=1&font=Jost&language=1&logo=https%3A%2F%2Fraw.githubusercontent.com%2Fwei%2Fsocialify%2F1f520b6bfe799300bcff9edcdc330828d681d382%2Fapp%2Ficon.svg&name=1&owner=1&pattern=Diagonal+Stripes&theme=Dark'
// IMPORTANT: Due to auto encoding and generation of the URLs,
// the clipboard content is DIFFERENT from the page URL;
// thus, the expected content is separately defined and checked for each.

test.beforeEach(async ({ page }: { page: Page }): Promise<void> => {
  await page.goto('/', customTimeout)
  await page.waitForLoadState('networkidle', customTimeout)
})

test.describe('All variants of Chinese, Japanese, and Korean characters in "Description" field:', () => {
  test(`renders correctly and consistently`, async ({
    page,
  }: { page: Page }): Promise<void> => {
    // Input and submit the repo following accessibility best practices.
    await page.fill('input[name="repo-input"]', repo)
    await page.waitForTimeout(componentUpdateTimeout)
    await page.click('button[type="submit"]')

    // Wait for complete navigation to the preview config page.
    await page.waitForSelector('button:has-text("URL")', customTimeout)
    await page.waitForLoadState('networkidle', customTimeout)

    // De-select the "Stars" option (for consistent preview image),
    // and select the "Description" option for custom chat input.
    await page.click('input[name="stargazers"]')
    await page.waitForTimeout(componentUpdateTimeout)
    await page.click('input[name="description"]')
    await page.waitForTimeout(componentUpdateTimeout)

    // Use complete costom styling for the preview image, including:
    // - 'Dark' theme
    // - 'Jost' font
    // - 'Diagonal Stripes' pattern
    // - The Socialify logo for the 'SVG Logo' option
    // - Custom 'Description' field with all variants of Chinese, Japanese, and Korean characters.
    await page.selectOption('select[name="theme"]', { label: 'Dark' })
    await page.waitForTimeout(componentUpdateTimeout)
    await page.selectOption('select[name="font"]', { label: 'Jost' })
    await page.waitForTimeout(componentUpdateTimeout)
    await page.selectOption('select[name="pattern"]', {
      label: 'Diagonal Stripes',
    })
    await page.waitForTimeout(componentUpdateTimeout)
    await page.fill(
      'input[name="logo"]',
      'https://raw.githubusercontent.com/wei/socialify/1f520b6bfe799300bcff9edcdc330828d681d382/app/icon.svg'
    )
    await page.waitForTimeout(componentUpdateTimeout)
    await page.fill(
      'textarea[name="description"]',
      '简体中文, 繁體中文 (fán tǐ zhōng wén), にほんご ひらがな, ニホンゴ カタカナ, 日本語 漢字, 한국어 韓國語, 조선말 朝鮮말'
    )
    await page.waitForTimeout(componentUpdateTimeout)
    await page.waitForLoadState('networkidle', customTimeout)

    // Check page url before checking the clipboard content.
    const pageURL: string = page.url()
    expect(pageURL.endsWith(expectedPageURLEnding)).toBe(true)

    // Compare the clipboard content to the expected preview URL.
    // (Only check the end of the URL due to dynamic localhost port allocation.)
    await page.click('button:has-text("URL")')
    await page.waitForTimeout(componentUpdateTimeout)
    const clipboardURL: string = await getClipboardText(page)
    expect(clipboardURL.endsWith(expectedClipboardURLEnding)).toBe(true)

    // Visit the image URL and snapshot the image.
    await page.goto(clipboardURL, customTimeout)
    await page.waitForLoadState('networkidle', customTimeout)

    const previewImage: typeof Buffer = await page.screenshot()
    expect(previewImage).toMatchSnapshot()
  })
})
