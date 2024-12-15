import { isBot } from 'next/dist/server/web/spec-extension/user-agent'
import type { NextRequest, NextResponse } from 'next/server'

import { GET as GETPng } from '@/app/api/png/route'
import { GET as GETSvg } from '@/app/api/svg/route'

export const runtime = 'edge'

export async function GET(req: NextRequest): Promise<NextResponse> {
  if (isBot(req.headers.get('user-agent') ?? '')) {
    return GETPng(req)
  } else {
    return GETSvg(req)
  }
}
