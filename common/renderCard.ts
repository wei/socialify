import { readFileSync } from 'fs'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { flushToHTML } from 'styled-jsx/server'
import { fetchQuery } from 'react-relay'

import Card from '../src/components/preview/card'
import enviornment from './relay/environment'
import repoQuery from './relay/repoQuery'

import { repoQueryResponse } from './relay/__generated__/repoQuery.graphql'

import { Font } from './types/configType'
import QueryType from './types/queryType'

import { mergeConfig } from './configHelper'

const cwd = process.cwd()

const devIconCSS = readFileSync(`${cwd}/common/fonts/devicon.css`).toString(
  'utf-8'
)

const getGoogleFontCSS = (font: Font): string => {
  const googleFontsCSS = readFileSync(`${cwd}/.next/google-fonts.css`).toString(
    'utf-8'
  )

  return googleFontsCSS
    .replace(/([{;])\n*\s*/g, '$1')
    .split('\n')
    .filter(f => f.startsWith(`@font-face {font-family: '${font}'`))
    .join('\n')
}

const getRepoResponse = async (owner: string, name: string) => {
  return (await fetchQuery(enviornment, repoQuery, {
    owner,
    name
  })) as repoQueryResponse
}

export default async (query: QueryType) => {
  const { repository } = await getRepoResponse(query._owner, query._name)
  const config = mergeConfig(repository, query)

  if (!config) throw Error('Configuration failed to generate')

  const cardComponent = React.createElement(Card, config)
  const cardHTMLMarkup = ReactDOMServer.renderToStaticMarkup(cardComponent)
  const styleTags = flushToHTML()

  return cardHTMLMarkup.replace(
    '</foreignObject>',
    `${styleTags}</foreignObject>
    <defs><style type="text/css">
      ${devIconCSS}
      ${getGoogleFontCSS(config.font)}
    </style></defs>`
  )
}
