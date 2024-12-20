import { type Page, expect, test } from '@playwright/test'

const customTimeout = { timeout: 30000 }
const defaultImageURL: string =
  '/wei/socialify/image?description=1&font=Raleway&language=1&name=1&owner=1&pattern=Diagonal%20Stripes&theme=Dark'
const svgImageURL: string =
  '/wei/socialify/svg?description=1&font=Raleway&language=1&name=1&owner=1&pattern=Diagonal%20Stripes&theme=Dark'
const pngImageURL: string =
  '/wei/socialify/png?description=1&font=Raleway&language=1&name=1&owner=1&pattern=Diagonal%20Stripes&theme=Dark'
// Backward compatibility route, see ./next.config.js rewrite rules.
const jpgImageURL: string =
  '/wei/socialify/jpg?description=1&font=Raleway&language=1&name=1&owner=1&pattern=Diagonal%20Stripes&theme=Dark'

test.describe('Socialify image api', () => {
  test('respond consistently for default endpoint', async ({
    page,
  }: { page: Page }): Promise<void> => {
    await page.goto(defaultImageURL, customTimeout)
    await page.waitForLoadState('networkidle', customTimeout)

    const image = await page.screenshot()
    expect(image).toMatchSnapshot()
  })

  test('respond consistently for svg endpoint', async ({
    page,
  }: { page: Page }): Promise<void> => {
    await page.goto(svgImageURL, customTimeout)
    await page.waitForLoadState('networkidle', customTimeout)

    const image = await page.screenshot()
    expect(image).toMatchSnapshot()
  })

  test('respond consistently for png endpoint', async ({
    page,
  }: { page: Page }): Promise<void> => {
    await page.goto(pngImageURL, customTimeout)
    await page.waitForLoadState('networkidle', customTimeout)

    const image = await page.screenshot()
    expect(image).toMatchSnapshot()
  })

  test('respond consistently for backwards-compatible jpg endpoint', async ({
    page,
  }: { page: Page }): Promise<void> => {
    await page.goto(jpgImageURL, customTimeout)
    await page.waitForLoadState('networkidle', customTimeout)

    const image = await page.screenshot()
    expect(image).toMatchSnapshot()
  })
})
