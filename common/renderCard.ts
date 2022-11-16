import { SatoriOptions } from 'satori'
import { Font } from './types/configType'
import QueryType from './types/queryType'
import { mergeConfig } from './configHelper'
import { getRepoDetails } from './github/repoQuery'
import getTwemojiMap from './twemoji'

async function getFont(
  font: Font,
  weight: SatoriOptions['fonts'][0]['weight']
): Promise<SatoriOptions['fonts'][0]> {
  let fontURL: URL | null = null

  // Cannot assemble the URL using template literals due to function limitations
  switch (font) {
    case Font.bitter: {
      switch (weight) {
        case 200: {
          fontURL = new URL(
            `../fonts/bitter-all-200-normal.woff`,
            import.meta.url
          )
          break
        }
        case 400: {
          fontURL = new URL(
            `../fonts/bitter-all-400-normal.woff`,
            import.meta.url
          )
          break
        }
        case 500: {
          fontURL = new URL(
            `../fonts/bitter-all-500-normal.woff`,
            import.meta.url
          )
          break
        }
      }
      break
    }
    case Font.inter: {
      switch (weight) {
        case 200: {
          fontURL = new URL(
            `../fonts/inter-all-200-normal.woff`,
            import.meta.url
          )
          break
        }
        case 400: {
          fontURL = new URL(
            `../fonts/inter-all-400-normal.woff`,
            import.meta.url
          )
          break
        }
        case 500: {
          fontURL = new URL(
            `../fonts/inter-all-500-normal.woff`,
            import.meta.url
          )
          break
        }
      }
      break
    }
    case Font.jost: {
      switch (weight) {
        case 200: {
          fontURL = new URL(
            `../fonts/jost-all-200-normal.woff`,
            import.meta.url
          )
          break
        }
        case 400: {
          fontURL = new URL(
            `../fonts/jost-all-400-normal.woff`,
            import.meta.url
          )
          break
        }
        case 500: {
          fontURL = new URL(
            `../fonts/jost-all-500-normal.woff`,
            import.meta.url
          )
          break
        }
      }
      break
    }
    case Font.koHo: {
      switch (weight) {
        case 200: {
          fontURL = new URL(
            `../fonts/koho-all-200-normal.woff`,
            import.meta.url
          )
          break
        }
        case 400: {
          fontURL = new URL(
            `../fonts/koho-all-400-normal.woff`,
            import.meta.url
          )
          break
        }
        case 500: {
          fontURL = new URL(
            `../fonts/koho-all-500-normal.woff`,
            import.meta.url
          )
          break
        }
      }
      break
    }
    case Font.raleway: {
      switch (weight) {
        case 200: {
          fontURL = new URL(
            `../fonts/raleway-all-200-normal.woff`,
            import.meta.url
          )
          break
        }
        case 400: {
          fontURL = new URL(
            `../fonts/raleway-all-400-normal.woff`,
            import.meta.url
          )
          break
        }
        case 500: {
          fontURL = new URL(
            `../fonts/raleway-all-500-normal.woff`,
            import.meta.url
          )
          break
        }
      }
      break
    }
    case Font.rokkitt: {
      switch (weight) {
        case 200: {
          fontURL = new URL(
            `../fonts/rokkitt-all-200-normal.woff`,
            import.meta.url
          )
          break
        }
        case 400: {
          fontURL = new URL(
            `../fonts/rokkitt-all-400-normal.woff`,
            import.meta.url
          )
          break
        }
        case 500: {
          fontURL = new URL(
            `../fonts/rokkitt-all-500-normal.woff`,
            import.meta.url
          )
          break
        }
      }
      break
    }
    case Font.sourceCodePro: {
      switch (weight) {
        case 200: {
          fontURL = new URL(
            `../fonts/source-code-pro-all-200-normal.woff`,
            import.meta.url
          )
          break
        }
        case 400: {
          fontURL = new URL(
            `../fonts/source-code-pro-all-400-normal.woff`,
            import.meta.url
          )
          break
        }
        case 500: {
          fontURL = new URL(
            `../fonts/source-code-pro-all-500-normal.woff`,
            import.meta.url
          )
          break
        }
      }
      break
    }
  }

  return {
    name: font,
    data: await fetch(fontURL!).then((res) => res.arrayBuffer()),
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
