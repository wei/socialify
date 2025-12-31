import { type NextRequest, NextResponse } from 'next/server'

import { createErrorResponse } from '@/common/apiErrorHandler'
import renderCardPNG from '@/common/renderPNG'
import type QueryType from '@/common/types/queryType'

export const runtime = 'edge'

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url)
  const query = Object.fromEntries(searchParams) as QueryType

  try {
    const pngArray = await renderCardPNG(query)
    return new NextResponse(pngArray.buffer as ArrayBuffer, {
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
    return createErrorResponse(error)
  }
}
