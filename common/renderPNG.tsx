import { ImageResponse } from '@vercel/og'
import Card from '../src/components/preview/card'
import { getCardConfig, getFonts } from './renderCard'
import QueryType from './types/queryType'

const renderCardPNG = async (
  query: QueryType,
  opts: { headers?: Record<string, string> } = {}
) => {
  const config = await getCardConfig(query)

  return new ImageResponse(<Card {...config} />, {
    width: 1280,
    height: 640,
    fonts: await getFonts(config.font),
    emoji: 'twemoji',
    ...opts
  })
}

export default renderCardPNG
