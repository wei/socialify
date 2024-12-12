import type { SatoriOptions } from 'satori'

import { mergeConfig } from '@/common/configHelper'
import { languageFontMap } from '@/common/font'
import { getRepoDetails } from '@/common/github/repoQuery'
import { HOST_PREFIX } from '@/common/helpers'
import { getIconCode, loadEmoji } from '@/common/twemoji'
import { Font } from '@/common/types/configType'
import type QueryType from '@/common/types/queryType'

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
    style: 'normal',
  }
}

export function getFonts(font: Font) {
  return Promise.all([
    getFont(Font.jost, 400),
    getFont(font, 200),
    getFont(font, 400),
    getFont(font, 500),
  ])
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
  async (_code: LanguageCode, text: string) => {
    if (_code === 'emoji') {
      // It's an emoji, load the image.
      return (
        `data:image/svg+xml;base64,` +
        btoa(await loadEmoji('twemoji', getIconCode(text)))
      )
    }

    const codes = _code.split('|')

    // Try to load from Google Fonts.
    const names = codes
      .map((code) => languageFontMap[code as keyof typeof languageFontMap])
      .filter(Boolean)

    if (names.length === 0) return []

    const params = new URLSearchParams()
    for (const name of names.flat()) {
      params.append('fonts', name)
    }
    params.set('text', text)

    try {
      const response = await fetch(
        `${HOST_PREFIX}/api/font?${params.toString()}`
      )

      if (response.status === 200) {
        const data = await response.arrayBuffer()
        const fonts: any[] = []

        // Decode the encoded font format.
        const decodeFontInfoFromArrayBuffer = (buffer: ArrayBuffer) => {
          let offset = 0
          const bufferView = new Uint8Array(buffer)

          while (offset < bufferView.length) {
            // 1 byte for font name length.
            const languageCodeLength = bufferView[offset]
            offset += 1
            let languageCode = ''
            for (let i = 0; i < languageCodeLength; i++) {
              languageCode += String.fromCharCode(bufferView[offset + i])
            }
            offset += languageCodeLength

            // 4 bytes for font data length.
            const fontDataLength = new DataView(buffer).getUint32(offset, false)
            offset += 4
            const fontData = buffer.slice(offset, offset + fontDataLength)
            offset += fontDataLength

            fonts.push({
              name: `satori_${languageCode}_fallback_${text}`,
              data: fontData,
              weight: 400,
              style: 'normal',
              lang: languageCode === 'unknown' ? undefined : languageCode,
            })
          }
        }

        decodeFontInfoFromArrayBuffer(data)

        return fonts
      }
    } catch (e) {
      console.error('Failed to load dynamic font for', text, '. Error:', e)
    }
  }
)

export async function getCardConfig(query: QueryType) {
  const { repository } = await getRepoDetails(query._owner, query._name)

  const config = mergeConfig(repository, query)

  if (!config)
    throw Error(`[${query._owner}/${query._name}] Failed to generate config.`)

  return config
}
