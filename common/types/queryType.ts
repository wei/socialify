import { Font, Pattern, Theme } from '@/common/types/configType'

type QueryType = {
  font: Font
  theme: Theme
  pattern: Pattern

  language: string
  stargazers: string
  forks: string
  issues: string
  pulls: string
  description: string
  custom_description: string
  owner: string
  name: string
  logo: string

  _owner: string
  _name: string
}

export default QueryType
