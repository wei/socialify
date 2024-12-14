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
import {
  type SimpleIcon,
  siApachegroovy,
  siC,
  siClojure,
  siCoffeescript,
  siCplusplus,
  siCss3,
  siDart,
  siDm,
  siDocker,
  siElixir,
  siErlang,
  siGithub,
  siGnubash,
  siGo,
  siHaskell,
  siHtml5,
  siJavascript,
  siJulia,
  siJupyter,
  siKotlin,
  siLua,
  siNginx,
  siOcaml,
  siPerl,
  siPhp,
  siPuppet,
  siPython,
  siRuby,
  siRust,
  siScala,
  siSvelte,
  siSwift,
  siTypescript,
  siVuedotjs,
  siWebassembly,
} from 'simple-icons'

import { Pattern, Theme } from '@/common/types/configType'
import packageJson from '@/package.json'

const siCsharp: SimpleIcon = {
  title: 'C#',
  slug: 'csharp',
  hex: '512BD4',
  source: '',
  guidelines: '',
  path: 'M1.194 7.543v8.913c0 1.103.588 2.122 1.544 2.674l7.718 4.456a3.086 3.086 0 0 0 3.088 0l7.718-4.456a3.087 3.087 0 0 0 1.544-2.674V7.543a3.084 3.084 0 0 0-1.544-2.673L13.544.414a3.086 3.086 0 0 0-3.088 0L2.738 4.87a3.085 3.085 0 0 0-1.544 2.673Zm5.403 2.914v3.087a.77.77 0 0 0 .772.772.773.773 0 0 0 .772-.772.773.773 0 0 1 1.317-.546.775.775 0 0 1 .226.546 2.314 2.314 0 1 1-4.631 0v-3.087c0-.615.244-1.203.679-1.637a2.312 2.312 0 0 1 3.274 0c.434.434.678 1.023.678 1.637a.769.769 0 0 1-.226.545.767.767 0 0 1-1.091 0 .77.77 0 0 1-.226-.545.77.77 0 0 0-.772-.772.771.771 0 0 0-.772.772Zm12.35 3.087a.77.77 0 0 1-.772.772h-.772v.772a.773.773 0 0 1-1.544 0v-.772h-1.544v.772a.773.773 0 0 1-1.317.546.775.775 0 0 1-.226-.546v-.772H12a.771.771 0 1 1 0-1.544h.772v-1.543H12a.77.77 0 1 1 0-1.544h.772v-.772a.773.773 0 0 1 1.317-.546.775.775 0 0 1 .226.546v.772h1.544v-.772a.773.773 0 0 1 1.544 0v.772h.772a.772.772 0 0 1 0 1.544h-.772v1.543h.772a.776.776 0 0 1 .772.772Zm-3.088-2.315h-1.544v1.543h1.544v-1.543Z',
  get svg() {
    return `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>${this.title}</title><path d="${this.path}"/></svg>`
  },
}
const siPowershell: SimpleIcon = {
  title: 'PowerShell',
  slug: 'powershell',
  hex: '5391FE',
  source: '',
  guidelines: '',
  path: 'M23.181 2.974c.568 0 .923.463.792 1.035l-3.659 15.982c-.13.572-.697 1.035-1.265 1.035H.819c-.568 0-.923-.463-.792-1.035L3.686 4.009c.13-.572.697-1.035 1.265-1.035zm-8.375 9.346c.251-.394.227-.905-.09-1.243L9.122 5.125c-.38-.404-1.037-.407-1.466-.003-.429.402-.468 1.056-.088 1.46l4.662 4.96v.11l-7.42 5.374c-.45.327-.533.977-.187 1.453.346.476.991.597 1.44.27l8.229-5.91c.28-.196.438-.365.514-.52zm-2.796 4.399a.928.928 0 00-.934.923c0 .51.418.923.934.923h4.433a.928.928 0 00.934-.923.928.928 0 00-.934-.923z',
  get svg() {
    return `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>${this.title}</title><path d="${this.path}"/></svg>`
  },
}
const siJava: SimpleIcon = {
  title: 'Java',
  slug: 'java',
  hex: '007396',
  source: '',
  guidelines: '',
  path: 'M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.19-7.627M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.639',
  get svg() {
    return `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>${this.title}</title><path d="${this.path}"/></svg>`
  },
}
const LANGUAGE_ICON_MAPPING: { [key: string]: SimpleIcon } = {
  GitHub: siGithub,
  C: siC,
  'C#': siCsharp,
  'C++': siCplusplus,
  CoffeeScript: siCoffeescript,
  CSS: siCss3,
  Go: siGo,
  Groovy: siApachegroovy,
  HTML: siHtml5,
  Java: siJava,
  JavaScript: siJavascript,
  'Jupyter Notebook': siJupyter,
  PHP: siPhp,
  Python: siPython,
  Ruby: siRuby,
  Rust: siRust,
  Scala: siScala,
  Swift: siSwift,
  TypeScript: siTypescript,
  Svelte: siSvelte,
  Haskell: siHaskell,
  Kotlin: siKotlin,
  Dockerfile: siDocker,
  Shell: siGnubash,
  Vue: siVuedotjs,
  Nginx: siNginx,
  Dart: siDart,
  Lua: siLua,
  DM: siDm,
  Perl: siPerl,
  OCaml: siOcaml,
  Clojure: siClojure,
  PowerShell: siPowershell,
  Erlang: siErlang,
  Julia: siJulia,
  WebAssembly: siWebassembly,
  Puppet: siPuppet,
  Elixir: siElixir,
}

const getSimpleIconsImageURI = function (language: string, theme: Theme) {
  const icon = LANGUAGE_ICON_MAPPING[language]
  if (!icon) return undefined

  let iconColor = theme === Theme.light ? `#${icon.hex}` : '#ffffff'
  if (theme === Theme.light && iconColor.match(/#f{3,6}/i)) {
    iconColor = '#000000'
  } else if (theme === Theme.dark && iconColor.match(/#0{3,6}/)) {
    iconColor = '#ffffff'
  }
  const iconSvg = icon.svg.replace('<svg ', `<svg fill="${iconColor}" `)

  return `data:image/svg+xml,${encodeURIComponent(iconSvg)}`
}

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
  getSimpleIconsImageURI,
  getHeroPattern,
  getChessBoardPattern,
  checkWebpSupport,
  HOST_PREFIX,
  autoThemeCss,
  version,
}
