import * as resvg from '@resvg/resvg-wasm'

import renderCardSVG from '@/common/renderSVG'
import type QueryType from '@/common/types/queryType'
// @ts-ignore: Not a typical module, using import alias will cause an error.
import resvgWasm from '../public/resvg_bg.wasm?module'

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
