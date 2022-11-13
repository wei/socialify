import type { NextRequest } from 'next/server'

const statsEndpoint = async (req: NextRequest) => {
  const response = await fetch(
    `https://api.github.com/search/code?per_page=1&q=${encodeURIComponent(
      'socialify.git.ci'
    )}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json'
      }
    }
  )

  if (!response.ok) {
    return new Response(await response.text(), {
      status: response.status,
      headers: {
        'Cache-Control': 'maxage=0, public'
      }
    })
  }

  const json = await response.json()
  return new Response(JSON.stringify({ total_count: json.total_count }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control':
        'public, immutable, no-transform, max-age=60, s-maxage=86400'
    }
  })
}

export const config = {
  runtime: 'experimental-edge'
}

export default statsEndpoint
