// @ts-ignore
import satori, { init as initSatori } from 'satori/wasm'
// @ts-ignore
import initYoga from 'yoga-wasm-web'
// @ts-ignore
import yogaWasm from '../public/yoga.wasm?module'

import Card from '../src/components/preview/card'
import { getCardConfig, getFonts, getGraphemeImages } from './renderCard'
import QueryType from './types/queryType'

const renderCardSVG = async (query: QueryType) => {
  const yoga = await initYoga(yogaWasm)
  initSatori(yoga)

  const config = await getCardConfig(query)

  return satori(<Card {...config} />, {
    width: 1280,
    height: 640,
    fonts: await getFonts(config.font),
    graphemeImages: await getGraphemeImages(config.description?.value)
  })
}

export default renderCardSVG
