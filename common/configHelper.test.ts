import { mergeConfig } from '@/common/configHelper'
import type { RepoQueryResponse } from '@/common/github/repoQuery'
import type QueryType from '@/common/types/queryType'

const repository = {
  owner: { login: 'wei' },
  name: 'socialify',
  description: 'Socialify your project',
  stargazerCount: 5,
  forkCount: 1,
  pullRequests: { totalCount: 2 },
  issues: { totalCount: 3 },
  languages: { nodes: [{ name: 'TypeScript' }] },
} as unknown as RepoQueryResponse['repository']

const query = (q: Partial<QueryType>) => q as QueryType

describe('mergeConfig', () => {
  test('stat query params use "0" to enable', () => {
    const config = mergeConfig(
      repository,
      query({ stargazers: '0', forks: '0' })
    )
    expect(config?.stargazers?.state).toBe(true)
    expect(config?.forks?.state).toBe(true)
  })

  test('stat query params use "1" to disable', () => {
    const config = mergeConfig(repository, query({ stargazers: '1' }))
    expect(config?.stargazers?.state).toBe(false)
  })

  test('custom_description overrides the repository description', () => {
    const config = mergeConfig(
      repository,
      query({ description: '0', custom_description: 'Hello' })
    )
    expect(config?.description?.state).toBe(true)
    expect(config?.description?.value).toBe('Hello')
  })
})
