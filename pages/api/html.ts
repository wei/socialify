import { NextApiRequest, NextApiResponse } from 'next'

import QueryType from '../../common/types/queryType'
import renderCard from '../../common/renderCard'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query as QueryType

  try {
    const html = await renderCard(query)
    res.setHeader('Cache-Control', 'max-age=14400, public')
    res.send(html)
  } catch (ex) {
    console.error(ex)
    res.status(404).send('Not found')
  }
}
