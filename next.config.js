/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  async rewrites() {
    return [
      {
        source: '/:_owner/:_name/image',
        destination: '/api/image'
      },
      {
        source: '/:_owner/:_name/svg',
        destination: '/api/svg'
      },
      {
        source: '/:_owner/:_name/png',
        destination: '/api/png'
      },
      // Kept for legacy support
      {
        source: '/:_owner/:_name/jpg',
        destination: '/api/png'
      },
      {
        source: '/graphql',
        destination: '/api/graphql'
      }
    ]
  }
}

module.exports = nextConfig
