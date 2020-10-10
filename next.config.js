module.exports = {
  target: process.env.NETLIFY ? 'experimental-serverless-trace' : 'server',
  async rewrites() {
    return [
      {
        source: '/:_owner/:_name/png',
        destination: '/api/image'
      },
      {
        source: '/:_owner/:_name/jpg',
        destination: '/api/image'
      },
      {
        source: '/:_owner/:_name/html',
        destination: '/api/html'
      },
      {
        source: '/graphql',
        destination: '/api/graphql'
      }
    ]
  }
}
