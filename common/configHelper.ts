import { type RepoQueryResponse } from '@/common/github/repoQuery'
import type Configuration from '@/common/types/configType'
import type { OptionalConfigs } from '@/common/types/configType'
import {
  Font,
  OptionalConfigsKeys,
  Pattern,
  Theme,
} from '@/common/types/configType'
import type QueryType from '@/common/types/queryType'

type Key = keyof typeof OptionalConfigsKeys

const DEFAULT_CONFIG: Configuration = {
  logo: '',
  font: Font.inter,
  theme: Theme.light,
  pattern: Pattern.plus,
}

const getOptionalConfig = (repository: RepoQueryResponse['repository']) => {
  if (repository) {
    const languages = repository.languages?.nodes || []
    const language =
      languages.length > 0 ? languages[0]?.name || 'unknown' : 'unknown'
    const newConfig: OptionalConfigs = {
      owner: { state: false, value: repository.owner.login },
      name: { state: true, value: repository.name },
      description: {
        state: false,
        editable: true,
        value: repository.description || '',
      },
      language: { state: false, value: language },
      stargazers: { state: false, value: repository.stargazerCount },
      forks: { state: false, value: repository.forkCount },
      pulls: { state: false, value: repository.pullRequests.totalCount },
      issues: { state: false, value: repository.issues.totalCount },
    }
    return newConfig
  }
  return null
}

const mergeConfig = (
  repository: RepoQueryResponse['repository'],
  query: QueryType
): Configuration | null => {
  if (!repository) {
    return null
  }

  const config: Configuration = {
    logo: query.logo || DEFAULT_CONFIG.logo,
    font: query.font || DEFAULT_CONFIG.font,
    pattern: query.pattern || DEFAULT_CONFIG.pattern,
    theme: query.theme || DEFAULT_CONFIG.theme,
  }
  const optionalConfig = getOptionalConfig(repository)

  if (optionalConfig) {
    Object.assign(config, optionalConfig)
    for (const key in query) {
      if (key in OptionalConfigsKeys) {
        Object.assign(config[key as Key] ?? {}, {
          state: query[key as Key] === '1',
        })
        if (config[key as Key]?.editable) {
          const editableValue =
            query[`custom_${key}` as keyof typeof query] ||
            query[`${key}Editable` as keyof typeof query]
          if (editableValue) {
            Object.assign(config[key as Key] ?? {}, { value: editableValue })
          }
        }
      }
    }
  }

  return config
}

export { DEFAULT_CONFIG, getOptionalConfig, mergeConfig }
