import fs from 'fs'
import React from 'react'
import satori, { SatoriOptions } from 'satori'

import Card from '../src/components/preview/card'

import QueryType from './types/queryType'

import { mergeConfig } from './configHelper'
import { getRepoDetails } from './github/repoQuery'
import getTwemojiMap from './twemoji'

export function getFont(
  font: string,
  weight: SatoriOptions['fonts'][0]['weight'],
  style: SatoriOptions['fonts'][0]['style']
): SatoriOptions['fonts'][0] {
  const fontKey = font.replace(/\s/g, '-').toLowerCase()

  return {
    name: font,
    data: fs.readFileSync(
      `${process.cwd()}/node_modules/@fontsource/${fontKey}/files/${fontKey}-all-${weight}-${style}.woff`
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
  // return parse(description ?? '').reduce(
  //   (
  //     graphemeImages: Record<string, string>,
  //     curr: {
  //       url: string
  //       indices: number[]
  //       text: string
  //       type: string
  //     }
  //   ) => {
  //     if (curr.type === 'emoji') {
  //       graphemeImages[curr.text] = curr.url
  //     }
  //     return graphemeImages
  //   },
  //   {}
  // )

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

  return satori(React.createElement(Card, config), {
    width: 640,
    height: 320,
    fonts: [
      getFont('Jost', 400, 'normal'),
      getFont(config.font, 200, 'normal'),
      getFont(config.font, 400, 'normal'),
      getFont(config.font, 500, 'normal')
    ],
    graphemeImages: await getGraphemeImages(config.description?.value)
  })
}

export default renderCardSVG
