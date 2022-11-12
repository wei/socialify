import { NextApiRequest, NextApiResponse } from 'next'

import QueryType from '../../common/types/queryType'
import renderCardSVG from '../../common/renderCard'

const svgEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query as QueryType

  try {
    const svg = await renderCardSVG(query)
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
