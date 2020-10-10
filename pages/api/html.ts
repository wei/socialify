import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'

import { NextApiRequest, NextApiResponse } from 'next'

import { fetchQuery } from 'react-relay'

import enviornment from '../../common/relay/environment'
import repoQuery from '../../common/relay/repoQuery'

import { repoQueryResponse } from '../../common/relay/__generated__/repoQuery.graphql'

import ConfigType, { OptionalConfigsKeys } from '../../common/types/configType'
import QueryType from '../../common/types/queryType'

import Card from '../../src/components/preview/card'
import { getOptionalConfig, defaultConfig } from '../../common/defaultConfig'

type Key = keyof typeof OptionalConfigsKeys

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // 1. Get path and qs from req
  const query = req.query as QueryType

  const response = (await fetchQuery(enviornment, repoQuery, {
    owner: query._owner,
    name: query._name
  })) as repoQueryResponse

  const { repository } = response

  if (repository) {
    const config: ConfigType = {
      name: repository.name,
      logo: query.logo || defaultConfig.logo,
      font: query.font || defaultConfig.font,
      pattern: query.pattern || defaultConfig.pattern,
      fileType: query.fileType || defaultConfig.fileType,
      theme: query.theme || defaultConfig.theme
    }
    const optionalConfig = getOptionalConfig(repository)

    if (optionalConfig) {
      Object.assign(config, optionalConfig)
      for (const key in query) {
        if (key in OptionalConfigsKeys) {
          Object.assign(config[key as Key], {
            state: query[key as Key] === '1'
          })
          if (config[key as Key]?.editable) {
            const editableValue = query[`${key}Editable` as keyof typeof query]
            if (editableValue) {
              Object.assign(config[key as Key], { value: editableValue })
            }
          }
        }
      }

      // res.json({ query, config })
      const sheet = new ServerStyleSheet()
      const cardComponent = React.createElement(Card, config)
      const cardHTMLMarkup = ReactDOMServer.renderToStaticMarkup(
        sheet.collectStyles(cardComponent)
      )
      const styleTags = sheet.getStyleTags()
      const html = `<!DOCTYPE html>
      <html>
          <meta charset="utf-8">
          <title>Generated Image</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          ${styleTags}
          <body>
            ${cardHTMLMarkup}
          </body>
      </html>`
      res.send(html)
      return
    }
    res.status(404).send('Not found')
  }

  // 4. render <Card config={config} /> into html
  // 5. return
  // 6. Add caching to graphql calls, convert relay to use get and api/graphql to use post and return cache headers
}
