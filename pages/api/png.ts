import type { NextRequest } from 'next/server'

import renderCardPNG from '../../common/renderPNG'
import QueryType from '../../common/types/queryType'

const pngEndpoint = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const query = Object.fromEntries(searchParams) as QueryType

  try {
    return new Response(await renderCardPNG(query), {
      status: 200,
      headers: {
        'content-type': 'image/png',
        'cache-control': `public, immutable, no-transform, max-age=0, s-maxage=${
          searchParams.has('cache') ? searchParams.get('cache') : 3600
        }`,
        'Netlify-Vary': 'query',
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

export const fetchCache = 'default-cache'

export default pngEndpoint
