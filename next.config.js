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
          // Custom version header.
          {
            key: 'x-socialify-version',
            value: version,
          },
          // Cache control headers.
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
          // Pragma and Expires headers for legacy HTTP/1.0 support.
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
