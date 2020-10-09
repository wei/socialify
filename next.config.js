module.exports = {
  target: process.env.NETLIFY ? 'experimental-serverless-trace' : 'server',
  async rewrites() {
    return [
      {
        source: '/:owner/:name/png',
        destination: '/api/image'
      },
      {
        source: '/:owner/:name/jpg',
        destination: '/api/image'
      },
      {
        source: '/graphql',
        destination: '/api/graphql'
      }
    ]
  }
}
