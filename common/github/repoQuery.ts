import { SOCIALIFY_GRAPHQL_ENDPOINT } from '@/common/constants'
import { HOST_PREFIX } from '@/common/helpers'

export const getRepoDetails = async (owner: string, name: string) => {
  const body = {
    query: `
      query repoQuery($_owner: String!, $_name: String!) {
        repository(owner: $_owner, name: $_name) {
          forkCount
          description
          createdAt
          name
          stargazerCount
          issues(states: OPEN) {
            totalCount
          }
          languages(first: 1, orderBy: { field: SIZE, direction: DESC }) {
            totalCount
            nodes {
              name
              color
            }
          }
          pullRequests(states: OPEN) {
            totalCount
          }
          releases(last: 1) {
            nodes {
              tagName
            }
          }
          owner {
            login
          }
        }
      }
    `,
    variables: {
      _owner: owner,
      _name: name,
    },
  }

  const res = await fetch(`${HOST_PREFIX}${SOCIALIFY_GRAPHQL_ENDPOINT}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    throw new Error(await res.text())
  }

  const json = await res.json()
  return json.data as RepoQueryResponse
}

export type RepoQueryResponse = {
  readonly repository: {
    readonly forkCount: number
    readonly description: string | null
    readonly createdAt: unknown
    readonly name: string
    readonly stargazerCount: number
    readonly issues: {
      readonly totalCount: number
    }
    readonly languages: {
      readonly totalCount: number
      readonly nodes: ReadonlyArray<{
        readonly name: string
        readonly color: string | null
      } | null> | null
    } | null
    readonly pullRequests: {
      readonly totalCount: number
    }
    readonly releases: {
      readonly nodes: ReadonlyArray<{
        readonly tagName: string
      } | null> | null
    }
    readonly owner: {
      readonly login: string
    }
  } | null
}
