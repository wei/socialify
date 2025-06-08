import 'server-only'
import type { NextRequest } from 'next/server'

import { GITHUB_GRAPHQL_ENDPOINT } from '@/common/constants'

export const runtime = 'edge'

export async function POST(req: NextRequest) {
  const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
      'content-type': 'application/json',
    },
    body: req.body,
    // @ts-expect-error: 'duplex' is not part of the RequestInit type but required by GraphQL.
    duplex: 'half',
  })

  if (!response.ok) {
    return new Response(await response.text(), {
      status: response.status,
      headers: {
        'cache-control': 'public, max-age=0',
      },
    })
  }

  const text = await response.text()
  return new Response(text, {
    status: 200,
    headers: {
      'content-type': 'application/json',
      'cache-control':
        'public, immutable, no-transform, max-age=60, s-maxage=600',
    },
  })
}
