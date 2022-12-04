import { SatoriOptions } from 'satori'
import { Font } from './types/configType'
import QueryType from './types/queryType'
import { mergeConfig } from './configHelper'
import { getRepoDetails } from './github/repoQuery'
import { getIconCode, loadEmoji } from './twemoji'
import { HOST_PREFIX } from './helpers'

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

export const languageFontMap: Record<string, string | string[]> = {
  zh: 'Noto+Sans+SC',
  ja: 'Noto+Sans+JP',
  ko: 'Noto+Sans+KR',
  th: 'Noto+Sans+Thai',
  he: 'Noto+Sans+Hebrew',
  ar: 'Noto+Sans+Arabic',
  bn: 'Noto+Sans+Bengali',
  ta: 'Noto+Sans+Tamil',
  te: 'Noto+Sans+Telugu',
  ml: 'Noto+Sans+Malayalam',
  devanagari: 'Noto+Sans+Devanagari',
  kannada: 'Noto+Sans+Kannada',
  symbol: ['Noto+Sans+Symbols', 'Noto+Sans+Symbols+2'],
  math: 'Noto+Sans+Math',
  unknown: 'Noto+Sans+SC'
}

function withCache(fn: Function) {
  const cache = new Map()
  return async (...args: string[]) => {
    const key = args.join('|')
    if (cache.has(key)) return cache.get(key)
    const result = await fn(...args)
    cache.set(key, result)
    return result
  }
}

type LanguageCode = keyof typeof languageFontMap | 'emoji'

export const loadDynamicAsset = withCache(
  async (code: LanguageCode, text: string) => {
    if (code === 'emoji') {
      // It's an emoji, load the image.
      return (
        `data:image/svg+xml;base64,` +
        btoa(await loadEmoji('twemoji', getIconCode(text)))
      )
    }

    // Try to load from Google Fonts.
    let names = languageFontMap[code]
    if (!names) code = 'unknown'

    try {
      if (typeof names === 'string') {
        names = [names]
      }

      for (const name of names) {
        const res = await fetch(
          `${HOST_PREFIX}/api/font?font=${encodeURIComponent(
            name
          )}&text=${encodeURIComponent(text)}`
        )
        if (res.status === 200) {
          const font = await res.arrayBuffer()
          return {
            name: `satori_${code}_fallback_${text}`,
            data: font,
            weight: 400,
            style: 'normal'
          }
        }
      }
    } catch (e) {
      console.error('Failed to load dynamic font for', text, '. Error:', e)
    }
  }
)

export async function getCardConfig(query: QueryType) {
  const { repository } = await getRepoDetails(query._owner, query._name)

  const config = mergeConfig(repository, query)

  if (!config) throw Error('Configuration failed to generate')

  return config
}
