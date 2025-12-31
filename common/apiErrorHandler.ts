import { NextResponse } from 'next/server'

/**
 * Creates a standardized error response for API routes.
 * Only includes stack traces in development for security.
 */
export function createErrorResponse(error: unknown): NextResponse {
  const isDev = process.env.NODE_ENV !== 'production'

  let errorJSON: { error: string; stack?: string }
  if (error instanceof Error) {
    errorJSON = {
      error: error.message,
      ...(isDev && { stack: error.stack }),
    }
  } else {
    errorJSON = { error: String(error) }
  }

  console.error('API Error:', error)

  return new NextResponse(JSON.stringify(errorJSON), {
    status: 400,
    headers: {
      'content-type': 'application/json',
      'cache-control': 'no-store',
    },
  })
}
