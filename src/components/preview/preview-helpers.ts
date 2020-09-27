import { Pattern, Theme } from '../../types/configType'
import {
  signal,
  charlieBrown,
  formalInvitation,
  plus,
  circuitBoard,
  diagonalStripes
} from 'hero-patterns'

const getDevIconClassName = (language: string, theme: Theme): string => {
  const LANGUAGE_ICON_MAPPING: { [key: string]: string } = {
    C: 'c',
    'C#': 'csharp',
    'C++': 'cplusplus',
    CoffeeScript: 'coffeescript',
    CSS: 'css3',
    Go: 'go',
    Groovy: 'groovy',
    HTML: 'html5',
    Java: 'java',
    JavaScript: 'javascript',
    'Jupyter Notebook': 'python',
    PHP: 'php',
    Python: 'python',
    Ruby: 'ruby',
    Rust: 'rust',
    Scala: 'scala',
    Swift: 'swift',
    TypeScript: 'typescript',
    GitHub: 'github'
  }

  return `devicon-${LANGUAGE_ICON_MAPPING[language] || 'devicon'}-plain ${
    theme === Theme.light ? 'colored' : ''
  }`
}

const getHeroPattern = (pattern: Pattern, theme: Theme): string => {
  const PATTERN_FUNCTIONS_MAPPING: { [key: string]: any } = {
    [Pattern.signal]: signal,
    [Pattern.charlieBrown]: charlieBrown,
    [Pattern.formalInvitation]: formalInvitation,
    [Pattern.plus]: plus,
    [Pattern.circuitBoard]: circuitBoard,
    [Pattern.diagonalStripes]: diagonalStripes
  }
  const patternFunction = PATTERN_FUNCTIONS_MAPPING[pattern]

  if (!patternFunction) return theme === Theme.dark ? '#000' : '#fff'

  const darkThemeArgs = ['#eaeaea', 0.2]
  const lightThemeArgs = ['#eaeaea', 0.6]
  return patternFunction.apply(
    null,
    theme === Theme.dark ? darkThemeArgs : lightThemeArgs
  )
}

export { getDevIconClassName, getHeroPattern }
