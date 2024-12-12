// @ts-ignore
import resvgWasm from '@/public/resvg_bg.wasm?module'
import * as resvg from '@resvg/resvg-wasm'

import type QueryType from '@/common/types/queryType'

import renderCardSVG from '@/common/renderSVG'

const initResvgWasm = resvg.initWasm(resvgWasm)

const renderCardPNG = async (query: QueryType) => {
  const [svg] = await Promise.all([renderCardSVG(query), initResvgWasm])

  const resvgJS = new resvg.Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: 1280,
    },
  })
  const pngData = resvgJS.render()
  const pngBuffer = pngData.asPng()

  return pngBuffer
}

export default renderCardPNG
