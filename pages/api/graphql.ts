import { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'

const API_ENDPOINT = 'https://api.github.com/graphql'

const graphQLEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed')
    return
  }
  const response = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req.body)
  })
  if (!response.ok) {
    res.status(response.status).send(await response.text())
    return
  }
  const text = await response.text()
  res.setHeader('Cache-Control', 'max-age=600, public')
  res.status(200).send(text)
}

export default graphQLEndpoint
