import { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'

const statsEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
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
    res.status(response.status).send(await response.text())
    return
  }
  const json = await response.json()
  res.setHeader('Cache-Control', 'max-age=600, public')
  res.status(200).send({ total_count: json.total_count })
}

export default statsEndpoint
