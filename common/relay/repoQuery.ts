import { graphql } from 'react-relay'

const repoQuery = graphql`
  query repoQuery($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
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
`

export default repoQuery
