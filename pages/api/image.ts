import { isBot } from 'next/dist/server/web/spec-extension/user-agent'
import type { NextRequest } from 'next/server'
import pngEndpoint from './png'
import svgEndpoint from './svg'

const imageEndpoint = async (req: NextRequest) => {
  if (isBot(req.headers.get('user-agent') ?? '')) {
    return pngEndpoint(req)
  } else {
    return svgEndpoint(req)
  }
}

export const config = {
  runtime: 'experimental-edge'
}

export default imageEndpoint
