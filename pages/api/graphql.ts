import type { NextRequest } from 'next/server'

const API_ENDPOINT = 'https://api.github.com/graphql'

const graphQLEndpoint = async (req: NextRequest) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', {
      status: 405,
      headers: {
        'Cache-Control': 'max-age=0, public'
      }
    })
  }

  const response = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: req.body
  })

  if (!response.ok) {
    return new Response(await response.text(), {
      status: response.status,
      headers: {
        'Cache-Control': 'maxage=0, public'
      }
    })
  }

  const text = await response.text()
  return new Response(text, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control':
        'public, immutable, no-transform, max-age=60, s-maxage=600'
    }
  })
}

export const config = {
  runtime: 'experimental-edge'
}

export default graphQLEndpoint
