const CustomRewrites = require('./custom-rewrites')

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      ...CustomRewrites,
      {
        source: '/:_owner/:_name/image',
        destination: '/api/image',
      },
      {
        source: '/:_owner/:_name/svg',
        destination: '/api/svg',
      },
      {
        source: '/:_owner/:_name/png',
        destination: '/api/png',
      },
      // Kept for legacy support
      {
        source: '/:_owner/:_name/jpg',
        destination: '/api/png',
      },
      {
        source: '/graphql',
        destination: '/api/graphql',
      },
    ]
  },
  // Disable NextJS dev server icon for Playwright screenshot consistency.
  devIndicators: {
    appIsrStatus: false,
  },
}

module.exports = nextConfig
