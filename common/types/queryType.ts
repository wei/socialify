import { FileType, Font, Pattern, Theme } from './configType'

type QueryType = {
  font: Font
  theme: Theme
  pattern: Pattern
  fileType: FileType

  language: string
  stargazers: string
  forks: string
  issues: string
  pulls: string
  description: string
  descriptionEditable: string
  owner: string
  logo: string

  _owner: string
  _name: string
}

export default QueryType
