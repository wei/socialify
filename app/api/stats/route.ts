import 'server-only'
import { GITHUB_API_ENDPOINT } from '@/common/constants'
import { type NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET(_req: NextRequest): Promise<NextResponse> {
  const response = await fetch(
    `${GITHUB_API_ENDPOINT}/search/code?per_page=1&q=${encodeURIComponent(
      'socialify.git.ci'
    )}`,
    {
      method: 'GET',
      headers: {
        accept: 'application/vnd.github.v3+json',
        authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'content-type': 'application/json',
      },
    }
  )

  if (!response.ok) {
    return new NextResponse(await response.text(), {
      status: response.status,
      headers: {
        'cache-control': 'public, max-age=0',
      },
    })
  }

  const json = await response.json()
  return new NextResponse(JSON.stringify({ total_count: json.total_count }), {
    status: 200,
    headers: {
      'content-type': 'application/json',
      'cache-control':
        'public, immutable, no-transform, max-age=60, s-maxage=86400',
      'Netlify-Vary': 'query',
    },
  })
}
