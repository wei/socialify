import type { NextRequest } from 'next/server'

import QueryType from '../../common/types/queryType'
import renderCardPNG from '../../common/renderPNG'

const pngEndpoint = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const query = Object.fromEntries(searchParams) as QueryType

  try {
    return renderCardPNG(query)
  } catch (ex) {
    console.error(ex)

    return new Response(JSON.stringify({ error: ex }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'maxage=0, public'
      }
    })
  }
}

export const config = {
  runtime: 'experimental-edge'
}

export default pngEndpoint
