module.exports = {
  target: 'experimental-serverless-trace',
  eslint: {
    ignoreDuringBuilds: true
  },
  async rewrites() {
    return [
      {
        source: '/:_owner/:_name/svg',
        destination: '/api/svg'
      },
      {
        source: '/:_owner/:_name/image',
        destination: '/api/svg'
      },
      // Kept for legacy support
      {
        source: '/:_owner/:_name/png',
        destination: '/api/svg'
      },
      // Kept for legacy support
      {
        source: '/:_owner/:_name/jpg',
        destination: '/api/svg'
      },
      {
        source: '/graphql',
        destination: '/api/graphql'
      }
    ]
  }
}
