const fetch = require('node-fetch')
const queryString = require('query-string')

const SCREENSHOT_ENDPOINT =
  process.env.SCREENSHOT_ENDPOINT || 'https://screenshotter.git.ci/screenshot'
const HOST = process.env.HOST || 'github-socialify.netlify.app'

exports.handler = async (event, context) => {
  let [, owner, repo, filetype] = event.path.split('/')
  if (filetype === 'jpg') {
    filetype = 'jpeg'
  }

  const pageURl = `https://${HOST}/${owner}/${repo}?${queryString.stringify(
    event.queryStringParameters
  )}`
  const screenshotterUrl = `${SCREENSHOT_ENDPOINT}?filetype=${filetype}&viewport=2048,1024&dpr=2&selector=.card-wrapper&css=.card-wrapper%7Bborder-radius%3A0%7D&url=${encodeURIComponent(
    pageURl
  )}`

  return fetch(screenshotterUrl)
    .then(res => {
      if (!res.ok) throw new Error('Request failed')
      return res.buffer()
    })
    .then(buffer => {
      return buffer.toString('base64')
    })
    .then(base64 => {
      return {
        statusCode: 200,
        headers: {
          'content-type': `image/${filetype}`
        },
        body: base64,
        isBase64Encoded: true
      }
    })
    .catch(error => ({ statusCode: 422, body: String(error) }))
}
