const { version } = require('./package.json')

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
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
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'x-socialify-version',
            value: version,
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
