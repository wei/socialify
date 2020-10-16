import {
  Environment,
  Network,
  RecordSource,
  QueryResponseCache,
  RequestParameters,
  Store,
  Variables,
  CacheConfig
} from 'relay-runtime'

const url =
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.DOMAIN || '') + '/graphql'

const oneMinute = 60 * 1000
const cache = new QueryResponseCache({ size: 250, ttl: 10 * oneMinute })

function fetchQuery(
  operation: RequestParameters,
  variables: Variables,
  cacheConfig: CacheConfig
) {
  const queryID = operation.text
  const isQuery = operation.operationKind === 'query'
  const forceFetch = cacheConfig && cacheConfig.force

  if (queryID) {
    // Try to get data from cache on queries
    const fromCache = cache.get(queryID, variables)
    if (isQuery && fromCache !== null && !forceFetch) {
      return fromCache
    }
  }

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: operation.text,
      variables
    })
  })
    .then(response => {
      return response.json()
    })
    .then(json => {
      if (isQuery && queryID && json) {
        cache.set(queryID, variables, json)
      }
      return json
    })
}

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource())
})

export default environment
