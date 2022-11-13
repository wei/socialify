import fs from 'fs'
import path from 'path'
import React from 'react'
import satori, { SatoriOptions } from 'satori'

import Card from '../src/components/preview/card'

import QueryType from './types/queryType'

import { mergeConfig } from './configHelper'
import { getRepoDetails } from './github/repoQuery'
import getTwemojiMap from './twemoji'

export async function getFont(
  font: string,
  weight: SatoriOptions['fonts'][0]['weight'],
  style: SatoriOptions['fonts'][0]['style']
): Promise<SatoriOptions['fonts'][0]> {
  const fontKey = font.replace(/\s/g, '-').toLowerCase()

  return {
    name: font,
    data: fs.readFileSync(
      path.join(
        process.cwd(),
        'fonts',
        `${fontKey}-all-${weight}-${style}.woff`
      )
    ),
    weight,
    style
  }
}

async function getEmojiSVG(code: string) {
  return (
    await fetch(`https://twemoji.maxcdn.com/v/13.1.0/svg/${code}.svg`)
  ).text()
}

async function getGraphemeImages(description: string = '') {
  const emojiCodes = getTwemojiMap(description)
  const emojis = await Promise.all(Object.values(emojiCodes).map(getEmojiSVG))
  const graphemeImages = Object.fromEntries(
    Object.entries(emojiCodes).map(([key], index) => [
      key,
      `data:image/svg+xml;base64,` + btoa(emojis[index])
    ])
  )

  return graphemeImages
}

const renderCardSVG = async (query: QueryType) => {
  const { repository } = await getRepoDetails(query._owner, query._name)

  const config = mergeConfig(repository, query)

  if (!config) throw Error('Configuration failed to generate')

  const fonts = await Promise.all([
    getFont('Jost', 400, 'normal'),
    getFont(config.font, 200, 'normal'),
    getFont(config.font, 400, 'normal'),
    getFont(config.font, 500, 'normal')
  ])

  return satori(React.createElement(Card, config), {
    width: 1280,
    height: 640,
    fonts,
    graphemeImages: await getGraphemeImages(config.description?.value)
  })
}

export default renderCardSVG
