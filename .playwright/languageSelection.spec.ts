import {
  expect,
  type Page,
  type PageScreenshotOptions,
  test,
} from '@playwright/test'

// IMPORTANT: Playwright is not setup with import aliases, use relative paths.
import getClipboardText from './utils/getClipboardText'

const customTimeout = { timeout: 30000 }
const componentUpdateTimeout = 1000
const additionalPageLoadTimeout = 500
// As a known CI issue, allow max 1% deviation in pixel diff.
const customDiffPixelRatio = { maxDiffPixelRatio: 0.01 }
const customScreenshotOptions: PageScreenshotOptions = {
  style: '.no-screenshot{display:none !important}',
}

const repo: string = 'wei/socialify'
const repoPreviewURL: string =
  '/wei/socialify?language=1&owner=1&name=1&stargazers=1&theme=Light'
const homePageDefaultURL: string =
  '/wei/socialify?language=1&owner=1&name=1&stargazers=1&theme=Light'

test.describe('Language Selection Functionality:', () => {
  test.describe('Language Selection Interaction Tests', () => {
    test('clicking Language checkbox enables/disables the language dropdown', async ({
      page,
    }: {
      page: Page
    }): Promise<void> => {
      // Navigate to repository page with language disabled
      await page.goto('/wei/socialify?theme=Light', customTimeout)
      await page.waitForLoadState('networkidle', customTimeout)
      await page.waitForTimeout(additionalPageLoadTimeout)

      // Verify language dropdown is not visible initially
      const languageDropdown = page.locator('select[name="language"]')
      await expect(languageDropdown).not.toBeVisible()

      // Click the Language checkbox to enable it
      const languageCheckbox = page.locator('input[name="language"]')
      await languageCheckbox.click()
      await page.waitForTimeout(componentUpdateTimeout)

      // Verify language dropdown becomes visible
      await expect(languageDropdown).toBeVisible()

      // Verify the dropdown has the correct title "Language Icon"
      const languageLabel = page.locator('span:has-text("Language Icon")')
      await expect(languageLabel).toBeVisible()

      // Click the Language checkbox again to disable it
      await languageCheckbox.click()
      await page.waitForTimeout(componentUpdateTimeout)

      // Verify language dropdown is hidden again
      await expect(languageDropdown).not.toBeVisible()
    })

    test('language dropdown appears positioned correctly under SVG Logo input', async ({
      page,
    }: {
      page: Page
    }): Promise<void> => {
      await page.goto(repoPreviewURL, customTimeout)
      await page.waitForLoadState('networkidle', customTimeout)
      await page.waitForTimeout(additionalPageLoadTimeout)

      // Get positions of SVG Logo input and Language Icon dropdown
      const logoInput = page.locator('input[name="logo"]')
      const languageDropdown = page.locator('select[name="language"]')

      const logoInputBox = await logoInput.boundingBox()
      const languageDropdownBox = await languageDropdown.boundingBox()

      expect(logoInputBox).not.toBeNull()
      expect(languageDropdownBox).not.toBeNull()

      // Verify language dropdown is positioned below the logo input
      expect(languageDropdownBox!.y).toBeGreaterThan(logoInputBox!.y)

      // Take a screenshot to verify visual positioning
      const image = await page.screenshot(customScreenshotOptions)
      expect(image).toMatchSnapshot(customDiffPixelRatio)
    })

    test('selecting different languages from Language Icon dropdown updates URL', async ({
      page,
    }: {
      page: Page
    }): Promise<void> => {
      await page.goto(repoPreviewURL, customTimeout)
      await page.waitForLoadState('networkidle', customTimeout)
      await page.waitForTimeout(additionalPageLoadTimeout)

      const languageDropdown = page.locator('select[name="language"]')

      // Select TypeScript from dropdown
      await languageDropdown.selectOption({ label: 'TypeScript' })
      await page.waitForTimeout(componentUpdateTimeout)

      // Verify URL contains custom_language parameter
      await expect(page).toHaveURL(/custom_language=TypeScript/)
      await expect(page).toHaveURL(/language=1/)

      // Select Python from dropdown
      await languageDropdown.selectOption({ label: 'Python' })
      await page.waitForTimeout(componentUpdateTimeout)

      // Verify URL updates to new language
      await expect(page).toHaveURL(/custom_language=Python/)
      await expect(page).toHaveURL(/language=1/)

      // Select C# from dropdown (test URL encoding)
      await languageDropdown.selectOption({ label: 'C#' })
      await page.waitForTimeout(componentUpdateTimeout)

      // Verify URL properly encodes C# as C%23
      await expect(page).toHaveURL(/custom_language=C%23/)
    })

    test('language dropdown shows repository languages first with separator', async ({
      page,
    }: {
      page: Page
    }): Promise<void> => {
      await page.goto(repoPreviewURL, customTimeout)
      await page.waitForLoadState('networkidle', customTimeout)
      await page.waitForTimeout(additionalPageLoadTimeout)

      const languageDropdown = page.locator('select[name="language"]')
      const options = await languageDropdown.locator('option').allTextContents()

      // Verify repository languages appear first (TypeScript, JavaScript, etc.)
      // followed by separator, then alphabetically sorted languages
      expect(options.length).toBeGreaterThan(5)

      // Check that separator exists in the options
      const separatorIndex = options.findIndex((option) =>
        option.includes('────')
      )
      expect(separatorIndex).toBeGreaterThan(0)

      // Verify separator option is disabled
      const separatorOption = languageDropdown.locator(
        'option:has-text("────")'
      )
      await expect(separatorOption).toHaveAttribute('disabled')

      // Verify repository languages come before separator
      const repoLanguagesBeforeSeparator = options.slice(0, separatorIndex)
      expect(repoLanguagesBeforeSeparator.length).toBeGreaterThan(0)

      // Verify additional languages come after separator and are alphabetically sorted
      const additionalLanguages = options.slice(separatorIndex + 1)
      const sortedAdditionalLanguages = [...additionalLanguages].sort((a, b) =>
        a
          .toLowerCase()
          .replace(/[^a-z0-9]/g, '')
          .localeCompare(b.toLowerCase().replace(/[^a-z0-9]/g, ''))
      )
      expect(additionalLanguages).toEqual(sortedAdditionalLanguages)
    })
  })

  test.describe('URL Parameter Integration Tests', () => {
    test('language selections properly update URL parameters', async ({
      page,
    }: {
      page: Page
    }): Promise<void> => {
      await page.goto(repoPreviewURL, customTimeout)
      await page.waitForLoadState('networkidle', customTimeout)
      await page.waitForTimeout(additionalPageLoadTimeout)

      // Select a custom language
      await page.selectOption('select[name="language"]', { label: 'Vue' })
      await page.waitForTimeout(componentUpdateTimeout)

      // Verify URL contains both language=1 and custom_language parameters
      const currentURL = page.url()
      expect(currentURL).toContain('language=1')
      expect(currentURL).toContain('custom_language=Vue')

      // Verify other default parameters are preserved
      expect(currentURL).toContain('owner=1')
      expect(currentURL).toContain('name=1')
      expect(currentURL).toContain('stargazers=1')
      expect(currentURL).toContain('theme=Light')
    })

    test('custom language parameters persist across page navigation', async ({
      page,
    }: {
      page: Page
    }): Promise<void> => {
      await page.goto(repoPreviewURL, customTimeout)
      await page.waitForLoadState('networkidle', customTimeout)

      // Select a custom language
      await page.selectOption('select[name="language"]', { label: 'Vue' })
      await page.waitForTimeout(componentUpdateTimeout)

      // Navigate to a different repository
      await page.fill('input[name="repository-input"]', 'facebook/react')
      await page.click('button[aria-label="Switch to repository"]')
      await page.waitForLoadState('networkidle', customTimeout)

      // Verify the new URL preserves the custom language parameter
      await expect(page).toHaveURL(/custom_language=Vue/)
      await expect(page).toHaveURL(/language=1/)
    })

    test('preview image updates when language selection changes', async ({
      page,
    }: {
      page: Page
    }): Promise<void> => {
      await page.goto(repoPreviewURL, customTimeout)
      await page.waitForLoadState('networkidle', customTimeout)
      await page.waitForTimeout(additionalPageLoadTimeout)

      // Get initial image URL
      await page.click('button:has-text("URL")')
      await page.waitForTimeout(componentUpdateTimeout)
      const initialImageURL = await getClipboardText(page)

      // Select a different language
      await page.selectOption('select[name="language"]', { label: 'Python' })
      await page.waitForTimeout(componentUpdateTimeout)

      // Get updated image URL
      await page.click('button:has-text("URL")')
      await page.waitForTimeout(componentUpdateTimeout)
      const updatedImageURL = await getClipboardText(page)

      // Verify URLs are different and contain language parameter
      expect(initialImageURL).not.toEqual(updatedImageURL)
      expect(updatedImageURL).toContain('custom_language=Python')
      expect(updatedImageURL).toContain('language=1')
    })
  })

  test.describe('Default Pre-selection Tests', () => {
    test('navigating from home page includes default parameters', async ({
      page,
    }: {
      page: Page
    }): Promise<void> => {
      // Start from home page
      await page.goto('/', customTimeout)
      await page.waitForLoadState('networkidle', customTimeout)

      // Enter repository and submit
      await page.fill('input[name="repo-input"]', repo)
      await page.waitForTimeout(componentUpdateTimeout)
      await page.click('button[type="submit"]')

      // Wait for navigation to complete
      await page.waitForSelector('button:has-text("URL")', customTimeout)
      await page.waitForLoadState('networkidle', customTimeout)

      // Verify URL contains all default parameters
      await expect(page).toHaveURL(homePageDefaultURL)

      // Verify individual parameters
      const currentURL = page.url()
      expect(currentURL).toContain('language=1')
      expect(currentURL).toContain('owner=1')
      expect(currentURL).toContain('name=1')
      expect(currentURL).toContain('stargazers=1')
      expect(currentURL).toContain('theme=Light')
    })

    test('corresponding checkboxes are checked by default', async ({
      page,
    }: {
      page: Page
    }): Promise<void> => {
      await page.goto(homePageDefaultURL, customTimeout)
      await page.waitForLoadState('networkidle', customTimeout)
      await page.waitForTimeout(additionalPageLoadTimeout)

      // Verify default checkboxes are checked
      await expect(page.locator('input[name="language"]')).toBeChecked()
      await expect(page.locator('input[name="owner"]')).toBeChecked()
      await expect(page.locator('input[name="name"]')).toBeChecked()
      await expect(page.locator('input[name="stargazers"]')).toBeChecked()

      // Verify optional checkboxes are not checked by default
      await expect(page.locator('input[name="forks"]')).not.toBeChecked()
      await expect(page.locator('input[name="issues"]')).not.toBeChecked()
      await expect(page.locator('input[name="pulls"]')).not.toBeChecked()
      await expect(page.locator('input[name="description"]')).not.toBeChecked()
    })

    test('language dropdown is visible when language=1 is in URL', async ({
      page,
    }: {
      page: Page
    }): Promise<void> => {
      await page.goto(homePageDefaultURL, customTimeout)
      await page.waitForLoadState('networkidle', customTimeout)
      await page.waitForTimeout(additionalPageLoadTimeout)

      // Verify language dropdown is visible
      const languageDropdown = page.locator('select[name="language"]')
      await expect(languageDropdown).toBeVisible()

      // Verify the dropdown has the correct title
      const languageLabel = page.locator('span:has-text("Language Icon")')
      await expect(languageLabel).toBeVisible()

      // Verify dropdown has options
      const options = await languageDropdown.locator('option').count()
      expect(options).toBeGreaterThan(5)

      // Take a screenshot to verify the complete default state
      const image = await page.screenshot(customScreenshotOptions)
      expect(image).toMatchSnapshot(customDiffPixelRatio)
    })

    test('React Vite appears as separate option from React in language dropdown', async ({
      page,
    }: {
      page: Page
    }): Promise<void> => {
      await page.goto(repoPreviewURL, customTimeout)
      await page.waitForLoadState('networkidle', customTimeout)
      await page.waitForTimeout(additionalPageLoadTimeout)

      const languageDropdown = page.locator('select[name="language"]')
      await expect(languageDropdown).toBeVisible()

      // Get all options from the dropdown
      const options = await languageDropdown.locator('option').allTextContents()

      // Verify both React and React Vite are available as separate options
      expect(options).toContain('React')
      expect(options).toContain('React Vite')

      // Verify they are distinct options
      const reactOptions = options.filter((option) => option.includes('React'))
      expect(reactOptions).toContain('React')
      expect(reactOptions).toContain('React Vite')
      expect(reactOptions.length).toBeGreaterThanOrEqual(2)

      // Test selecting React Vite option
      await languageDropdown.selectOption({ label: 'React Vite' })
      await page.waitForTimeout(componentUpdateTimeout)

      // Verify URL contains custom_language parameter for React Vite
      await expect(page).toHaveURL(/custom_language=React%20Vite/)
      await expect(page).toHaveURL(/language=1/)
    })
  })
})
