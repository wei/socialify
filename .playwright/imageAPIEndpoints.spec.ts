import { expect, type Page, test } from '@playwright/test'
// Test data for comprehensive parameter coverage
import { Font, Pattern, Theme } from '../common/types/configType'

const customTimeout = { timeout: 3000 }
// As a known CI issue, allow max 1% deviation in pixel diff.
const customDiffPixelRatio = { maxDiffPixelRatio: 0.01 }

const repo: string = 'wei/socialify'
const baseImageURL = (endpoint: string, params: string) =>
  `${repo}/${endpoint}${params}`

// Extract values from the enum types
const themes = Object.values(Theme)
const fonts = Object.values(Font)
const patterns = Object.values(Pattern)
const booleanParams = [
  'owner',
  'name',
  // Hide the following from tests because they change dynamically and will break tests
  // 'stargazers',
  // 'forks',
  // 'issues',
  // 'pulls',
  'description',
  'language',
]
const customLanguages = [
  'TypeScript',
  'Python',
  'JavaScript',
  'C#',
  'C++',
  'Vue',
  'React',
  'React Vite',
]

test.describe('Socialify Image API - Comprehensive Coverage', () => {
  test.describe('Basic Endpoint Consistency', () => {
    const basicParams =
      '?description=1&font=Raleway&language=1&name=1&owner=1&pattern=Diagonal%20Stripes&theme=Dark'

    test('default endpoint responds consistently', async ({
      page,
    }: {
      page: Page
    }): Promise<void> => {
      await page.goto(baseImageURL('image', basicParams), customTimeout)
      await page.waitForLoadState('networkidle', customTimeout)

      const image = await page.screenshot()
      expect(image).toMatchSnapshot(customDiffPixelRatio)
    })

    test('svg endpoint responds consistently', async ({
      page,
    }: {
      page: Page
    }): Promise<void> => {
      await page.goto(baseImageURL('svg', basicParams), customTimeout)
      await page.waitForLoadState('networkidle', customTimeout)

      const image = await page.screenshot()
      expect(image).toMatchSnapshot(customDiffPixelRatio)
    })

    test('png endpoint responds consistently', async ({
      page,
    }: {
      page: Page
    }): Promise<void> => {
      await page.goto(baseImageURL('png', basicParams), customTimeout)
      await page.waitForLoadState('networkidle', customTimeout)

      const image = await page.screenshot()
      expect(image).toMatchSnapshot(customDiffPixelRatio)
    })

    test('backwards-compatible jpg endpoint responds consistently', async ({
      page,
    }: {
      page: Page
    }): Promise<void> => {
      await page.goto(baseImageURL('jpg', basicParams), customTimeout)
      await page.waitForLoadState('networkidle', customTimeout)

      const image = await page.screenshot()
      expect(image).toMatchSnapshot(customDiffPixelRatio)
    })
  })

  test.describe('Theme Parameter Tests', () => {
    themes.forEach((theme) => {
      test(`theme=${theme} renders correctly`, async ({
        page,
      }: {
        page: Page
      }): Promise<void> => {
        const params = `?theme=${encodeURIComponent(theme)}&owner=1&name=1`
        await page.goto(baseImageURL('image', params), customTimeout)
        await page.waitForLoadState('networkidle', customTimeout)

        const image = await page.screenshot()
        expect(image).toMatchSnapshot(customDiffPixelRatio)
      })
    })
  })

  test.describe('Font Parameter Tests', () => {
    fonts.slice(0, 4).forEach((font) => {
      // Test first 4 fonts to keep test suite manageable
      test(`font=${font} renders correctly`, async ({
        page,
      }: {
        page: Page
      }): Promise<void> => {
        const params = `?font=${encodeURIComponent(font)}&theme=Light&owner=1&name=1`
        await page.goto(baseImageURL('image', params), customTimeout)
        await page.waitForLoadState('networkidle', customTimeout)

        const image = await page.screenshot()
        expect(image).toMatchSnapshot(customDiffPixelRatio)
      })
    })
  })

  test.describe('Pattern Parameter Tests', () => {
    patterns.slice(0, 5).forEach((pattern) => {
      // Test first 5 patterns
      test(`pattern=${pattern} renders correctly`, async ({
        page,
      }: {
        page: Page
      }): Promise<void> => {
        const params = `?pattern=${encodeURIComponent(pattern)}&theme=Light&owner=1&name=1`
        await page.goto(baseImageURL('image', params), customTimeout)
        await page.waitForLoadState('networkidle', customTimeout)

        const image = await page.screenshot()
        expect(image).toMatchSnapshot(customDiffPixelRatio)
      })
    })
  })

  test.describe('Boolean Parameter Tests', () => {
    booleanParams.forEach((param) => {
      test(`${param}=1 enables parameter correctly`, async ({
        page,
      }: {
        page: Page
      }): Promise<void> => {
        const params = `?${param}=1&theme=Light&owner=1&name=1`
        await page.goto(baseImageURL('image', params), customTimeout)
        await page.waitForLoadState('networkidle', customTimeout)

        const image = await page.screenshot()
        expect(image).toMatchSnapshot(customDiffPixelRatio)
      })

      test(`${param}=0 disables parameter correctly`, async ({
        page,
      }: {
        page: Page
      }): Promise<void> => {
        const params = `?${param}=0&theme=Light&owner=1&name=1`
        await page.goto(baseImageURL('image', params), customTimeout)
        await page.waitForLoadState('networkidle', customTimeout)

        const image = await page.screenshot()
        expect(image).toMatchSnapshot(customDiffPixelRatio)
      })
    })
  })

  test.describe('Custom Language Parameter Tests', () => {
    customLanguages.slice(0, 3).forEach((language) => {
      // Test first 3 custom languages
      test(`custom_language=${language} renders correctly`, async ({
        page,
      }: {
        page: Page
      }): Promise<void> => {
        const params = `?custom_language=${encodeURIComponent(language)}&language=1&theme=Light&owner=1&name=1`
        await page.goto(baseImageURL('image', params), customTimeout)
        await page.waitForLoadState('networkidle', customTimeout)

        const image = await page.screenshot()
        expect(image).toMatchSnapshot(customDiffPixelRatio)
      })
    })

    test('custom_language with special characters (C#) renders correctly', async ({
      page,
    }: {
      page: Page
    }): Promise<void> => {
      const params = `?custom_language=${encodeURIComponent('C#')}&language=1&theme=Light&owner=1&name=1`
      await page.goto(baseImageURL('image', params), customTimeout)
      await page.waitForLoadState('networkidle', customTimeout)

      const image = await page.screenshot()
      expect(image).toMatchSnapshot(customDiffPixelRatio)
    })
  })

  test.describe('Custom Description Parameter Tests', () => {
    test('custom_description with simple text renders correctly', async ({
      page,
    }: {
      page: Page
    }): Promise<void> => {
      const customDesc = 'A custom description for testing'
      const params = `?custom_description=${encodeURIComponent(customDesc)}&description=1&theme=Light&owner=1&name=1`
      await page.goto(baseImageURL('image', params), customTimeout)
      await page.waitForLoadState('networkidle', customTimeout)

      const image = await page.screenshot()
      expect(image).toMatchSnapshot(customDiffPixelRatio)
    })

    test('custom_description with special characters renders correctly', async ({
      page,
    }: {
      page: Page
    }): Promise<void> => {
      const customDesc = 'Special chars: @#$%^&*()_+-=[]{}|;:,.<>?'
      const params = `?custom_description=${encodeURIComponent(customDesc)}&description=1&theme=Light&owner=1&name=1`
      await page.goto(baseImageURL('image', params), customTimeout)
      await page.waitForLoadState('networkidle', customTimeout)

      const image = await page.screenshot()
      expect(image).toMatchSnapshot(customDiffPixelRatio)
    })

    test('custom_description with emojis renders correctly', async ({
      page,
    }: {
      page: Page
    }): Promise<void> => {
      const customDesc = '🚀 A project with emojis 🎉 Built with ❤️ and ⚡'
      const params = `?custom_description=${encodeURIComponent(customDesc)}&description=1&theme=Light&owner=1&name=1`
      await page.goto(baseImageURL('image', params), customTimeout)
      await page.waitForLoadState('networkidle', customTimeout)

      const image = await page.screenshot()
      expect(image).toMatchSnapshot(customDiffPixelRatio)
    })
  })

  test.describe('Logo Parameter Tests', () => {
    test('custom logo URL renders correctly', async ({
      page,
    }: {
      page: Page
    }): Promise<void> => {
      const logoUrl =
        'https://cdn.jsdelivr.net/gh/wei/socialify/public/icons/web-app-manifest-512x512.png'
      const params = `?logo=${encodeURIComponent(logoUrl)}&theme=Light&owner=1&name=1`
      await page.goto(baseImageURL('image', params), customTimeout)
      await page.waitForLoadState('networkidle', customTimeout)

      const image = await page.screenshot()
      expect(image).toMatchSnapshot(customDiffPixelRatio)
    })

    test('empty logo parameter uses default GitHub logo', async ({
      page,
    }: {
      page: Page
    }): Promise<void> => {
      const params = `?logo=&theme=Light&owner=1&name=1`
      await page.goto(baseImageURL('image', params), customTimeout)
      await page.waitForLoadState('networkidle', customTimeout)

      const image = await page.screenshot()
      expect(image).toMatchSnapshot(customDiffPixelRatio)
    })
  })

  test.describe('Parameter Combination Tests', () => {
    test('all stable boolean parameters enabled renders correctly', async ({
      page,
    }: {
      page: Page
    }): Promise<void> => {
      const params = `?owner=1&name=1&description=1&language=1&theme=Light`
      await page.goto(baseImageURL('image', params), customTimeout)
      await page.waitForLoadState('networkidle', customTimeout)

      const image = await page.screenshot()
      expect(image).toMatchSnapshot(customDiffPixelRatio)
    })

    test('complex styling combination renders correctly', async ({
      page,
    }: {
      page: Page
    }): Promise<void> => {
      const params = `?theme=Dark&font=Jost&pattern=Circuit%20Board&owner=1&name=1&language=1&custom_language=TypeScript`
      await page.goto(baseImageURL('image', params), customTimeout)
      await page.waitForLoadState('networkidle', customTimeout)

      const image = await page.screenshot()
      expect(image).toMatchSnapshot(customDiffPixelRatio)
    })

    test('minimal parameters (only required) renders correctly', async ({
      page,
    }: {
      page: Page
    }): Promise<void> => {
      const params = `?theme=Light`
      await page.goto(baseImageURL('image', params), customTimeout)
      await page.waitForLoadState('networkidle', customTimeout)

      const image = await page.screenshot()
      expect(image).toMatchSnapshot(customDiffPixelRatio)
    })
  })

  test.describe('URL Encoding and Special Characters', () => {
    test('spaces in parameters are properly encoded', async ({
      page,
    }: {
      page: Page
    }): Promise<void> => {
      const params = `?custom_description=${encodeURIComponent('Description with spaces')}&description=1&theme=Light&owner=1&name=1`
      await page.goto(baseImageURL('image', params), customTimeout)
      await page.waitForLoadState('networkidle', customTimeout)

      const image = await page.screenshot()
      expect(image).toMatchSnapshot(customDiffPixelRatio)
    })

    test('special characters in custom_language are properly encoded', async ({
      page,
    }: {
      page: Page
    }): Promise<void> => {
      const params = `?custom_language=${encodeURIComponent('C++')}&language=1&theme=Light&owner=1&name=1`
      await page.goto(baseImageURL('image', params), customTimeout)
      await page.waitForLoadState('networkidle', customTimeout)

      const image = await page.screenshot()
      expect(image).toMatchSnapshot(customDiffPixelRatio)
    })

    test('URL with multiple encoded parameters renders correctly', async ({
      page,
    }: {
      page: Page
    }): Promise<void> => {
      const params = `?theme=${encodeURIComponent('Dark')}&font=${encodeURIComponent('Source Code Pro')}&pattern=${encodeURIComponent('Charlie Brown')}&custom_description=${encodeURIComponent('Test & Development')}&description=1&owner=1&name=1`
      await page.goto(baseImageURL('image', params), customTimeout)
      await page.waitForLoadState('networkidle', customTimeout)

      const image = await page.screenshot()
      expect(image).toMatchSnapshot(customDiffPixelRatio)
    })
  })

  test.describe('Edge Cases and Error Handling', () => {
    test('extremely long custom_description is handled gracefully', async ({
      page,
    }: {
      page: Page
    }): Promise<void> => {
      const longDescription = 'A'.repeat(1000) // Very long description
      const params = `?custom_description=${encodeURIComponent(longDescription)}&description=1&theme=Light&owner=1&name=1`
      await page.goto(baseImageURL('image', params), customTimeout)
      await page.waitForLoadState('networkidle', customTimeout)

      const image = await page.screenshot()
      expect(image).toMatchSnapshot(customDiffPixelRatio)
    })
  })
})
