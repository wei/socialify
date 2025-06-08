import {
  brickWall,
  charlieBrown,
  circuitBoard,
  diagonalStripes,
  floatingCogs,
  formalInvitation,
  overlappingHexagons,
  plus,
  signal,
} from 'hero-patterns'
import type { CSSProperties } from 'react'

import { Pattern, Theme } from '@/common/types/configType'
import packageJson from '@/package.json'

const getHeroPattern = (pattern: Pattern, theme: Theme): CSSProperties => {
  const PATTERN_FUNCTIONS_MAPPING: { [key: string]: any } = {
    [Pattern.signal]: signal,
    [Pattern.charlieBrown]: charlieBrown,
    [Pattern.formalInvitation]: formalInvitation,
    [Pattern.plus]: plus,
    [Pattern.circuitBoard]: circuitBoard,
    [Pattern.overlappingHexagons]: overlappingHexagons,
    [Pattern.brickWall]: brickWall,
    [Pattern.floatingCogs]: floatingCogs,
    [Pattern.diagonalStripes]: diagonalStripes,
    [Pattern.solid]: null,
    [Pattern.transparent]: null,
  }
  const patternFunction = PATTERN_FUNCTIONS_MAPPING[pattern]
  const themedBackgroundColor =
    pattern === Pattern.transparent
      ? 'transparent'
      : theme === Theme.dark
        ? '#000'
        : '#fff'

  if (!patternFunction) {
    return {
      backgroundColor: themedBackgroundColor,
    }
  }

  const darkThemeArgs = ['#eaeaea', 0.2]
  const lightThemeArgs = ['#eaeaea', 0.6]
  let patternImageUrl = patternFunction.apply(
    null,
    theme === Theme.dark ? darkThemeArgs : lightThemeArgs
  )

  const width = patternImageUrl.match(/width%3D%22(\d+)%22/)?.[1]
  const height = patternImageUrl.match(/height%3D%22(\d+)%22/)?.[1]

  // Satori has issues with quotes around data uris, therefore we are stripping the quotes
  patternImageUrl = patternImageUrl
    .replace(/^url\('/, 'url(')
    .replace(/'\)$/, ')')

  return {
    backgroundColor: themedBackgroundColor,
    backgroundImage: patternImageUrl,
    backgroundSize: `${width}px ${height}px`,
    backgroundRepeat: 'repeat',
  }
}

let webpSupport: boolean | undefined
const checkWebpSupport = (): boolean => {
  if (webpSupport !== undefined) {
    return webpSupport
  }

  webpSupport = (() => {
    try {
      const canvas = document.createElement('canvas')
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0
    } catch (_e) {
      return false
    }
  })()

  return webpSupport
}

const HOST_PREFIX = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.PROJECT_URL || process.env.URL || ''

const autoThemeCss = `
  .card-light {
    display: block;
  }
  .card-dark {
    display: none;
  }
  @media (prefers-color-scheme: dark) {
    .card-light {
      display: none;
    }
    .card-dark {
      display: block;
    }
  }
`

const getChessBoardPattern = (theme: Theme): CSSProperties => {
  const chessPatternColors = {
    light: ['#fff', '#ccc'],
    dark: ['#2f2f2f', '#000'],
  }

  const getSVGImage = (mode: 'light' | 'dark') => {
    const [color1, color2] = chessPatternColors[mode]
    return `
      <svg id="card-${mode}" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" shape-rendering="crispEdges">
        <rect width="10" height="10" fill="${color1}"/>
        <rect x="10" width="10" height="10" fill="${color2}"/>
        <rect y="10" width="10" height="10" fill="${color2}"/>
        <rect x="10" y="10" width="10" height="10" fill="${color1}"/>
      </svg>
    `
  }

  let svg: string
  if (theme === Theme.auto) {
    svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" shape-rendering="crispEdges">
        <style>${autoThemeCss}</style>
        <g class="card-light">${getSVGImage('light')}</g>
        <g class="card-dark">${getSVGImage('dark')}</g>
      </svg>
    `
  } else {
    svg = getSVGImage(theme === Theme.dark ? 'dark' : 'light')
  }
  svg = svg.replace(/\n\s*/g, '')

  return {
    backgroundImage: `url('data:image/svg+xml,${encodeURIComponent(svg.replace(/\n\s*/g, ''))}`,
    backgroundRepeat: 'repeat',
  }
}

const version = packageJson.version

export {
  getHeroPattern,
  getChessBoardPattern,
  checkWebpSupport,
  HOST_PREFIX,
  autoThemeCss,
  version,
}
