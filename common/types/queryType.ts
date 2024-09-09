import { Font, Pattern, Theme } from './configType'

type QueryType = {
  font: Font
  theme: Theme
  pattern: Pattern

  language: string
  stargazers: string
  downloads: string
  forks: string
  issues: string
  pulls: string
  description: string
  descriptionEditable: string
  owner: string
  name: string
  logo: string

  _owner: string
  _name: string
}

export default QueryType
