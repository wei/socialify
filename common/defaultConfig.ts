import { repoQueryResponse } from './relay/__generated__/repoQuery.graphql'
import Configuration, {
  FileType,
  Font,
  OptionalConfigs,
  Pattern,
  Theme
} from './types/configType'

const getOptionalConfig = (repository: repoQueryResponse['repository']) => {
  if (repository) {
    const languages = repository.languages?.nodes || []
    const language =
      languages.length > 0 ? languages[0]?.name || 'unknown' : 'unknown'
    const newConfig: OptionalConfigs = {
      owner: { state: true, value: repository.owner.login },
      description: {
        state: false,
        editable: true,
        value: repository.description || ''
      },
      language: { state: true, value: language },
      stargazers: { state: true, value: repository.stargazerCount },
      forks: { state: false, value: repository.forkCount },
      pulls: { state: false, value: repository.pullRequests.totalCount },
      issues: { state: false, value: repository.issues.totalCount }
    }
    return newConfig
  }
  return null
}

const defaultConfig: Configuration = {
  name: '',
  logo: '',
  font: Font.inter,
  theme: Theme.dark,
  pattern: Pattern.plus,
  fileType: FileType.png
}

export { defaultConfig, getOptionalConfig }
