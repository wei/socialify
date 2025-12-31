import { badgen } from 'badgen'
import { type NextRequest, NextResponse } from 'next/server'

import { GET as GETStats } from '@/app/api/stats/route'

export const runtime = 'edge'

export async function GET(req: NextRequest): Promise<NextResponse> {
  let totalCount = 0

  try {
    const apiResponse = await (await GETStats(req)).json()
    if (apiResponse.total_count) {
      totalCount = apiResponse.total_count
    }
  } catch (error) {
    console.error(error)

    if (error instanceof Error) {
      console.error(error.stack)
    }
  }

  const svg = totalCount
    ? badgen({
        subject: '',
        status: `${totalCount} repositories`,
        color: 'black',
        style: 'flat',
      })
    : badgen({
        subject: '',
        status: `thousands of repositories`,
        color: 'black',
        style: 'flat',
      })

  return new NextResponse(svg, {
    status: 200,
    headers: {
      'content-type': 'image/svg+xml',
      'cache-control':
        'public, immutable, no-transform, max-age=60, s-maxage=86400',
      'Netlify-Vary': 'query',
    },
  })
}
