import { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'

const SCREENSHOT_ENDPOINT =
  process.env.SCREENSHOT_ENDPOINT || 'https://screenshotter.git.ci/screenshot'
const DOMAIN = process.env.DOMAIN || 'https://socialify.git.ci'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const pathname = (req.url || '').split('?')[0]
  const query = (req.url || '').split('?')[1] || ''
  let [, owner, repo, filetype] = pathname.split('/')
  if (filetype === 'jpg') {
    filetype = 'jpeg'
  }

  const url = `${DOMAIN}/${owner}/${repo}/html?${query}`
  const screenshotConfig: { [key: string]: string } = {
    url,
    filetype,
    viewport: '2048,1024',
    dpr: '2',
    selector: '.card-wrapper'
  }
  const screenshotterUrl = `${SCREENSHOT_ENDPOINT}?${Object.entries(
    screenshotConfig
  )
    .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
    .join('&')}`

  try {
    const response = await fetch(screenshotterUrl)
    if (!response.ok) throw new Error('Request failed')
    const buffer = await response.buffer()
    res.setHeader('content-type', `image/${filetype}`)
    res.status(200).send(buffer)
  } catch (error) {
    res.status(422).send(error.message)
  }
}
