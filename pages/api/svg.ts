import { NextApiRequest, NextApiResponse } from 'next'

import QueryType from '../../common/types/queryType'
import renderCard from '../../common/renderCard'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query as QueryType

  try {
    const svg = await renderCard(query)
    res.setHeader(
      'Cache-Control',
      `max-age=${'cache' in req.query ? req.query.cache : 14400}, public`
    )
    res.setHeader('Content-Type', 'image/svg+xml')
    res.send(svg)
  } catch (ex) {
    console.error(ex)
    res.status(404).send('Not found')
  }
}
