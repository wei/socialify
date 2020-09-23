import React from 'react'

import { graphql, QueryRenderer } from 'react-relay'
import environment from '../relay/environment'
import RepoType from '../types/repoType'

const query = graphql`
  query configRenderQuery($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      forkCount
      description
      createdAt
      name
      stargazerCount
      issues {
        totalCount
      }
      languages(last: 10, orderBy: { field: SIZE, direction: DESC }) {
        totalCount
        nodes {
          name
          color
        }
      }
      pullRequests {
        totalCount
      }
      releases(last: 1) {
        nodes {
          tagName
        }
      }
    }
  }
`
type Props = {
  error: Error | null
  props: any
}

const ConfigRender = ({ repo }: { repo: RepoType }) => {
  return (
    <QueryRenderer
      environment={environment}
      query={query}
      variables={{ owner: repo.owner, name: repo.name }}
      render={({ error, props }: Props) => {
        if (error) {
          return <div>{error.message}</div>
        } else if (props) {
          return
        }
        return <div>Loading</div>
      }}
    />
  )
}

export default ConfigRender
