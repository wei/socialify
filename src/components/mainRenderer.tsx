import React from 'react'

import { graphql, QueryRenderer } from 'react-relay'
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
  const path = window.location.pathname

  const [, owner, name] = path.split('/')

  return (
    <QueryRenderer
      environment={environment}
      query={query}
      variables={{ owner, name }}
      render={({ error, props }: Props) => {
        if (error) {
          return <div className="loading-wrapper">{error.message}</div>
        }
        if (!props) {
          return (
            <div className="loading-wrapper">
              <Spin size="large" />
            </div>
          )
        }
        return <MainWrapper response={props} owner={owner}></MainWrapper>
      }}
    />
  )
}

export default MainRenderer
