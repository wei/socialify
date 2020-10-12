import { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'
import renderCard from '../../common/renderCard'
import QueryType from '../../common/types/queryType'

const SCREENSHOT_ENDPOINT =
  process.env.SCREENSHOT_ENDPOINT || 'https://screenshotter.git.ci/screenshot'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const pathname = (req.url || '').split('?')[0]

  let filetype = 'png'
  if (pathname.includes('jpg')) {
    filetype = 'jpeg'
  }

  try {
    const url = `data:text/html;base64,${Buffer.from(
      await renderCard(req.query as QueryType)
    ).toString('base64')}`

    const screenshotConfig: { [key: string]: string } = {
      url,
      filetype,
      viewport: '2048,1024',
      dpr: '2',
      selector: '.card-wrapper'
    }

    const response = await fetch(SCREENSHOT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(screenshotConfig)
    })
    if (!response.ok) throw new Error('Request failed')
    const buffer = await response.buffer()
    res.setHeader('Content-Type', `image/${filetype}`)
    res.setHeader('Cache-Control', 'max-age=14400, public')
    res.status(200).send(buffer)
  } catch (error) {
    console.error(error)
    res.status(422).send(error.message)
  }
}
