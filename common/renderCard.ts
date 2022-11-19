import { SatoriOptions } from 'satori'
import { Font } from './types/configType'
import QueryType from './types/queryType'
import { mergeConfig } from './configHelper'
import { getRepoDetails } from './github/repoQuery'
import getTwemojiMap from './twemoji'

export async function getFont(
  font: Font,
  weight: SatoriOptions['fonts'][0]['weight']
): Promise<SatoriOptions['fonts'][0]> {
  const fontSlug = font.replace(/\s/g, '-').toLowerCase()
  const cdnUrl = `https://cdn.jsdelivr.net/npm/@fontsource/${fontSlug}/files/${fontSlug}-all-${weight}-normal.woff`

  return {
    name: font,
    data: await fetch(cdnUrl).then((response) => {
      if (response.ok) {
        return response.arrayBuffer()
      }
      throw new Error('Failed to fetch font')
    }),
    weight,
    style: 'normal'
  }
}

export function getFonts(font: Font) {
  return Promise.all([
    getFont(Font.jost, 400),
    getFont(font, 200),
    getFont(font, 400),
    getFont(font, 500)
  ])
}

export async function getEmojiSVG(code: string) {
  return (
    await fetch(`https://twemoji.maxcdn.com/v/13.1.0/svg/${code}.svg`)
  ).text()
}

export async function getGraphemeImages(description: string = '') {
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

export async function getCardConfig(query: QueryType) {
  const { repository } = await getRepoDetails(query._owner, query._name)

  const config = mergeConfig(repository, query)

  if (!config) throw Error('Configuration failed to generate')

  return config
}
