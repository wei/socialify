import { type Page } from '@playwright/test'

export default async function getClipboardText(page: Page): Promise<string> {
  return await page.evaluate(async () => {
    return await navigator.clipboard.readText()
  })
}
