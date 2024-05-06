import type { NextRequest } from 'next/server'

import renderCardSVG from '../../common/renderSVG'
import QueryType from '../../common/types/queryType'

const svgEndpoint = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const query = Object.fromEntries(searchParams) as QueryType

  try {
    const svg = await renderCardSVG(query)

    return new Response(svg, {
      status: 200,
      headers: {
        'content-type': 'image/svg+xml',
        'cache-control': `public, immutable, no-transform, max-age=0, s-maxage=${
          searchParams.has('cache') ? searchParams.get('cache') : 3600
        }`,
      },
    })
  } catch (error) {
    let errorJSON
    if (error instanceof Error) {
      errorJSON = { error: error.message, stack: error.stack }
    } else {
      errorJSON = { error }
    }
    console.error(errorJSON)

    return new Response(JSON.stringify(errorJSON), {
      status: 400,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, max-age=0',
      },
    })
  }
}

export const config = {
  runtime: 'edge',
}

export default svgEndpoint
