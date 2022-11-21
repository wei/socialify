import type { NextRequest } from 'next/server'
import { badgen } from 'badgen'
import statsEndpoint from './stats'

const statsSvgEndpoint = async (req: NextRequest) => {
  let totalCount = 0

  try {
    const apiResponse = await (await statsEndpoint(req)).json()
    if (apiResponse.total_count) {
      totalCount = apiResponse.total_count
    }
  } catch (ex) {
    console.error(ex)
  }

  const svg = totalCount
    ? badgen({
        subject: '',
        status: `${totalCount} repositories`,
        color: 'black',
        style: 'flat'
      })
    : badgen({
        subject: '',
        status: `thousands of repositories`,
        color: 'black',
        style: 'flat'
      })

  return new Response(svg, {
    status: 200,
    headers: {
      'content-type': 'image/svg+xml',
      'cache-control':
        'public, immutable, no-transform, max-age=60, s-maxage=86400'
    }
  })
}

export const config = {
  runtime: 'experimental-edge'
}

export default statsSvgEndpoint
