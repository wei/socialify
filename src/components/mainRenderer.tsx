import React, { useContext } from 'react'

import { graphql, QueryRenderer } from 'react-relay'
import RepoContext from '../contexts/RepoContext'
import environment from '../relay/environment'
import MainWrapper from './mainWrapper'

import { Spin } from 'antd'

const query = graphql`
  query mainRendererQuery($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      forkCount
      description
      createdAt
      name
      stargazerCount
      issues {
        totalCount
      }
      languages(first: 1, orderBy: { field: SIZE, direction: DESC }) {
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

const MainRenderer = () => {
  const { repo } = useContext(RepoContext)


  if (repo) {
    return (
      <QueryRenderer
        environment={environment}
        query={query}
        variables={{ owner: repo.owner, name: repo.name }}
        render={({ error, props }: Props) => {
          if (error) {
            return <div>{error.message}</div>
          }
          return (
            <Spin spinning={!props}>
              <MainWrapper response={props}></MainWrapper>
            </Spin>
          )
        }}
      />
    )
  } else {
    return <div>Error invalid repository</div>
  }
}

export default MainRenderer
