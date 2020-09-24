enum Theme {
  Light = 'Light',
  Dark = 'Dark'
}

enum Pattern {
  Signal = 'Signal',
  Charlie_Brown = 'Charlie Brown',
  Formal_Invitation = 'Formal Invitation',
  Plus = 'Plus',
  Circuit_Board = 'Circuit Board',
  Diagonal_Stripes = 'Diagonal Stripes',
  Groovy = 'Groovy'
}

enum FileType {
  PNG = 'PNG',
  JPG = 'JPG'
}

enum Font {
  Inter = 'Inter',
  Alike = 'Alike',
  Source_Code_Pro = 'Source Code Pro'
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
