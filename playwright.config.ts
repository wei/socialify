import { defineConfig, devices } from '@playwright/test'

// Insta-fail the test run in CI if GITHUB_TOKEN is not set.
// This is because `next start` auto-loads dev-side .env files,
// which are not present in GitHub Action CI run.
if (process.env.CI && !process.env.GITHUB_TOKEN) {
  console.error('Please set GITHUB_TOKEN before running the tests')
  process.exit(1)
}

// See https://playwright.dev/docs/test-configuration.
export default defineConfig({
  testDir: './.playwright',
  testMatch: '**/*.spec.ts',

  // Run tests in files in parallel.
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,

  // Retry on CI only.
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI.
  workers: process.env.CI ? 1 : undefined,

  // Reporter to use.
  // See https://playwright.dev/docs/test-reporters for more.
  reporter: [
    [
      'html',
      {
        outputFolder: './.playwright/test-report',
      },
    ],
  ],

  // Folder for test artifacts such as screenshots and trace files.
  outputDir: './.playwright/test-results',

  // Shared settings for all the projects below.
  // See https://playwright.dev/docs/api/class-testoptions.
  use: {
    // Base URL to use in actions such as `await page.goto("/")`.
    baseURL: 'http://127.0.0.1:3000',

    // Collect trace when retrying the failed test.
    // See https://playwright.dev/docs/trace-viewer for more.
    trace: 'on-first-retry',
  },

  // Configure projects for major browsers.
  projects: [
    /* Test against desktop viewports. */
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        permissions: ['clipboard-read'],
      },
    },

    // Firefox supports clipboard permission by default.
    // (In fact, clipboard permission is not defined for Firefox. DO NOT ADD IT.)
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // Playwright's clipboard permission is bugged on Safari.
    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] }
    // },

    /* Test against mobile viewports. */
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Pixel 5'],
        permissions: ['clipboard-read'],
      },
    },

    // Playwrights's clipboard permission is bugged on Mobile Safari, too.
    // {
    //   name: "Mobile Safari",
    //   use: { ...devices["iPhone 12"] }
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     ...devices['Desktop Edge'],
    //     channel: 'msedge',
    //     permissions: ['clipboard-read'],
    //   },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: {
    //     ...devices['Desktop Chrome'],
    //     channel: 'chrome',
    //     permissions: ['clipboard-read'],
    //   },
    // },
  ],

  // Init a new production build and start a local server before running the e2e tests.
  webServer: {
    command: 'pnpm build && pnpm start',
    url: 'http://127.0.0.1:3000',
    timeout: 120 * 1000, // Extend the timeout to 2 minutes due to the build time.
    reuseExistingServer: !process.env.CI,
  },
})
