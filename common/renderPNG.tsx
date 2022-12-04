import * as resvg from '@resvg/resvg-wasm'
// @ts-ignore
import resvgWasm from '../public/resvg_bg.wasm?module'

import renderCardSVG from './renderSVG'
import QueryType from './types/queryType'

const renderCardPNG = async (query: QueryType) => {
  const [svg] = await Promise.all([
    renderCardSVG(query),
    resvg.initWasm(resvgWasm)
  ])

  const resvgJS = new resvg.Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: 1280
    }
  })
  const pngData = resvgJS.render()
  const pngBuffer = pngData.asPng()

  return pngBuffer
}

export default renderCardPNG
