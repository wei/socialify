import { NextApiRequest, NextApiResponse } from 'next'

import QueryType from '../../common/types/queryType'
import renderCard from '../../common/renderCard'

const svgEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query as QueryType

  // The name configuration now is optional, but wasn't present before
  // Therefore this is for backwards compatibility and may be removed after some time
  if (query.name === undefined) {
    query.name = '1'
  }

  try {
    const svg = await renderCard(query)
    res.setHeader(
      'Cache-Control',
      `max-age=${'cache' in req.query ? req.query.cache : 3600}, public`
    )
    res.setHeader('Content-Type', 'image/svg+xml')
    res.send(svg)
  } catch (ex) {
    console.error(ex)
    res.status(404).send('Not found')
  }
}

export default svgEndpoint
