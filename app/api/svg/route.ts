import { type NextRequest, NextResponse } from 'next/server'

import { createErrorResponse } from '@/common/apiErrorHandler'
import renderCardSVG from '@/common/renderSVG'
import type QueryType from '@/common/types/queryType'

export const runtime = 'edge'

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url)
  const query = Object.fromEntries(searchParams) as QueryType

  try {
    const svg = await renderCardSVG(query)

    return new NextResponse(svg, {
      status: 200,
      headers: {
        'content-type': 'image/svg+xml',
        'cache-control': `public, immutable, no-transform, max-age=0, s-maxage=${
          searchParams.has('cache') ? searchParams.get('cache') : 3600
        }`,
        'Netlify-Vary': 'query',
      },
    })
  } catch (error) {
    return createErrorResponse(error)
  }
}
