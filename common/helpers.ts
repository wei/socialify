import {
  brickWall,
  charlieBrown,
  circuitBoard,
  diagonalStripes,
  floatingCogs,
  formalInvitation,
  overlappingHexagons,
  plus,
  signal
} from 'hero-patterns'
import {
  type SimpleIcon,
  siApachegroovy,
  siC,
  siClojure,
  siCoffeescript,
  siCplusplus,
  siCsharp,
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
  siPowershell,
  siPuppet,
  siPython,
  siRuby,
  siRust,
  siScala,
  siSvelte,
  siSwift,
  siTypescript,
  siVuedotjs,
  siWebassembly
} from 'simple-icons'
import { Pattern, Theme } from './types/configType'

const siJava: SimpleIcon = {
  title: 'Java',
  slug: 'java',
  hex: '007396',
  source: 'https://www.oracle.com/legal/logos.html',
  guidelines: 'https://www.oracle.com/legal/logos.html',
  path: 'M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.19-7.627M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.639',
  get svg() {
    return `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Java</title><path d="${this.path}"/></svg>`
  }
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
  Elixir: siElixir
}

const getSimpleIconsImageURI = (language: string, theme: Theme) => {
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

const getHeroPattern = (pattern: Pattern, theme: Theme) => {
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
    [Pattern.solid]: null
  }
  const patternFunction = PATTERN_FUNCTIONS_MAPPING[pattern]
  const themedBackgroundColor = theme === Theme.dark ? '#000' : '#fff'

  if (!patternFunction) {
    return {
      backgroundColor: themedBackgroundColor
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
    backgroundRepeat: 'repeat'
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
  : process.env.PROJECT_URL || ''

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

export {
  getSimpleIconsImageURI,
  getHeroPattern,
  checkWebpSupport,
  HOST_PREFIX,
  autoThemeCss
}
