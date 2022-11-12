import { Pattern, Theme } from './types/configType'
import {
  siGithub,
  siC,
  siCsharp,
  siCplusplus,
  siCoffeescript,
  siCss3,
  siGo,
  siApachegroovy,
  siHtml5,
  siOpenjdk,
  siJavascript,
  siJupyter,
  siPhp,
  siPython,
  siRuby,
  siRust,
  siScala,
  siSwift,
  siTypescript,
  siSvelte,
  siHaskell,
  siKotlin,
  siDocker,
  siGnubash,
  siVuedotjs,
  siNginx,
  siDart,
  siLua,
  siDm,
  siPerl,
  siOcaml,
  siClojure,
  siPowershell,
  siErlang,
  siJulia,
  siWebassembly,
  siPuppet,
  siElixir
} from 'simple-icons/icons'
import {
  signal,
  charlieBrown,
  formalInvitation,
  plus,
  circuitBoard,
  overlappingHexagons,
  brickWall,
  floatingCogs,
  diagonalStripes
} from 'hero-patterns'

const LANGUAGE_ICON_MAPPING: { [key: string]: any } = {
  GitHub: siGithub,
  C: siC,
  'C#': siCsharp,
  'C++': siCplusplus,
  CoffeeScript: siCoffeescript,
  CSS: siCss3,
  Go: siGo,
  Groovy: siApachegroovy,
  HTML: siHtml5,
  Java: siOpenjdk,
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

const getSimpleIconsImageURI = function (language: string, theme: Theme) {
  const icon = LANGUAGE_ICON_MAPPING[language]
  if (!icon) return undefined

  const iconColor = theme === Theme.light ? `#${icon.hex}` : '#fff'
  const iconSvg = icon.svg.replace('<svg ', `<svg fill="${iconColor}" `)

  return `data:image/svg+xml,${encodeURIComponent(iconSvg)}`
}

const getHeroPattern = (pattern: Pattern, theme: Theme): string => {
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

  if (!patternFunction) return themedBackgroundColor

  const darkThemeArgs = ['#eaeaea', 0.2]
  const lightThemeArgs = ['#eaeaea', 0.6]
  const patternImageUrl = patternFunction.apply(
    null,
    theme === Theme.dark ? darkThemeArgs : lightThemeArgs
  )

  return patternImageUrl
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
    } catch (e) {
      return false
    }
  })()

  return webpSupport
}

const HOST_PREFIX = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.PROJECT_URL || ''

export { getSimpleIconsImageURI, getHeroPattern, checkWebpSupport, HOST_PREFIX }
