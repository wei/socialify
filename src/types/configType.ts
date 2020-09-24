/* eslint-disable no-unused-vars */
enum Theme {
  light = 'Light',
  dark = 'Dark'
}

enum Pattern {
  signal = 'Signal',
  charlieBrown = 'Charlie Brown',
  formalInvitation = 'Formal Invitation',
  plus = 'Plus',
  circuitBoard = 'Circuit Board',
  diagonalStripes = 'Diagonal Stripes'
}

enum FileType {
  png = 'PNG',
  jpg = 'JPG'
}

enum Font {
  inter = 'Inter',
  alike = 'Alike',
  sourceCodePro = 'Source Code Pro'
}

type Configuration = {
  name: string
  owner?: string
  logo?: string
  description?: string
  font: Font
  language?: string
  stargazers?: number
  forks?: number
  issues?: number
  pulls?: number
  theme: Theme
  pattern: Pattern
  fileType: FileType
}

export default Configuration

export { Theme, Pattern, Font, FileType }
