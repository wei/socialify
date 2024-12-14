enum Theme {
  light = 'Light',
  dark = 'Dark',
  auto = 'Auto',
}

enum Pattern {
  signal = 'Signal',
  charlieBrown = 'Charlie Brown',
  formalInvitation = 'Formal Invitation',
  plus = 'Plus',
  circuitBoard = 'Circuit Board',
  overlappingHexagons = 'Overlapping Hexagons',
  brickWall = 'Brick Wall',
  floatingCogs = 'Floating Cogs',
  diagonalStripes = 'Diagonal Stripes',
  solid = 'Solid',
  transparent = 'Transparent',
}

enum Font {
  inter = 'Inter',
  bitter = 'Bitter',
  raleway = 'Raleway',
  rokkitt = 'Rokkitt',
  sourceCodePro = 'Source Code Pro',
  koHo = 'KoHo',
  jost = 'Jost',
}

export type RequiredConfigs = {
  logo: string

  font: Font
  theme: Theme
  pattern: Pattern
}

const OptionalConfigKeyStrings = {
  owner: true,
  name: true,
  description: true,
  language: true,
}

const OptionalConfigKeyNumbers = {
  stargazers: true,
  forks: true,
  issues: true,
  pulls: true,
}

export const RequiredConfigsKeys = {
  logo: true,
  font: true,
  theme: true,
  pattern: true,
}

export const OptionalConfigsKeys = {
  ...OptionalConfigKeyStrings,
  ...OptionalConfigKeyNumbers,
}

type OptionalConfigStringElement = {
  [name in keyof typeof OptionalConfigKeyStrings]?: {
    state: boolean
    value: string
    editable?: boolean
  }
}
type OptionalConfigNumberElement = {
  [name in keyof typeof OptionalConfigKeyNumbers]?: {
    state: boolean
    value: number
    editable?: boolean
  }
}

export type OptionalConfigs = OptionalConfigStringElement &
  OptionalConfigNumberElement

type Configuration = RequiredConfigs & OptionalConfigs

export default Configuration

export { Theme, Pattern, Font }
