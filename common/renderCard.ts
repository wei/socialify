import { readFileSync } from 'fs'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { createStyleRegistry, StyleRegistry } from 'styled-jsx'

import Card from '../src/components/preview/card'

import { Font } from './types/configType'
import QueryType from './types/queryType'

import { mergeConfig } from './configHelper'
import { getRepoDetails } from './github/repoQuery'

const cwd = process.cwd()

const devIconCSS = readFileSync(`${cwd}/common/fonts/devicon.css`).toString(
  'utf-8'
)

const getGoogleFontCSS = (font: Font): string => {
  const googleFontsCSS = readFileSync(
    `${cwd}/common/fonts/google-fonts.css`
  ).toString('utf-8')

  return googleFontsCSS
    .replace(/([{;])\n*\s*/g, '$1')
    .split('\n')
    .filter((f) => f.startsWith(`@font-face {font-family: '${font}'`))
    .join('\n')
}

const getBase64Image = async (imgUrl: string) => {
  const imagePromise = new Promise<string>((resolve) => {
    fetch(imgUrl)
      .then(async (response) => {
        const arrayBuffer = await response.arrayBuffer()
        const base64Url =
          'data:' +
          ((response.headers.get('content-type') || 'image/png') +
            ';base64,' +
            Buffer.from(arrayBuffer).toString('base64'))
        resolve(base64Url)
      })
      .catch(() => {
        resolve('')
      })
  })
  const timeoutPromise = new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve('')
    }, 1500)
  })
  return Promise.race([timeoutPromise, imagePromise])
}

const renderCard = async (query: QueryType) => {
  const responsePromise = getRepoDetails(query._owner, query._name)
  const promises: Promise<any>[] = [responsePromise]

  if (query.logo) {
    if (query.logo.toLowerCase().startsWith('http')) {
      const imagePromise = getBase64Image(query.logo)
      promises.push(imagePromise)
    }
  }

  const responses = await Promise.all(promises)
  const { repository } = responses[0]
  if (responses.length > 1) {
    const imageUrl = responses[1] as string
    Object.assign(query, { logo: imageUrl })
  }
  const config = mergeConfig(repository, query)

  if (!config) throw Error('Configuration failed to generate')

  const registry = createStyleRegistry()
  // eslint-disable-next-line react/no-children-prop
  const cardComponent = React.createElement(StyleRegistry, {
    registry,
    children: React.createElement(Card, config)
  })
  const cardHTMLMarkup = ReactDOMServer.renderToStaticMarkup(cardComponent)
  const styles = registry.styles() // access styles
  const stylesHTMLMarkup = ReactDOMServer.renderToStaticMarkup(
    React.createElement(React.Fragment, {}, styles)
  )

  return cardHTMLMarkup.replace(
    '</foreignObject>',
    `
    ${stylesHTMLMarkup}
    </foreignObject>
    <defs><style type="text/css">
      ${devIconCSS}
      ${getGoogleFontCSS(config.font)}
    </style></defs>`
  )
}

export default renderCard
