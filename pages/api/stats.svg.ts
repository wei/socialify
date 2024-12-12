import { badgen } from 'badgen'
import type { NextRequest } from 'next/server'

import statsEndpoint from '@/pages/api/stats'

const statsSvgEndpoint = async (req: NextRequest) => {
  let totalCount = 0

  try {
    const apiResponse = await (await statsEndpoint(req)).json()
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

  return new Response(svg, {
    status: 200,
    headers: {
      'content-type': 'image/svg+xml',
      'cache-control':
        'public, immutable, no-transform, max-age=60, s-maxage=86400',
      'Netlify-Vary': 'query',
    },
  })
}

export const config = {
  runtime: 'edge',
}

export default statsSvgEndpoint
