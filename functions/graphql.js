const fetch = require('node-fetch')

const API_ENDPOINT = 'https://api.github.com/graphql'

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed'
    }
  }

  return fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: event.body
  })
    .then(res =>
      res.text().then(data => ({ statusCode: res.status, body: data }))
    )
    .catch(error => ({ statusCode: 422, body: String(error) }))
}
