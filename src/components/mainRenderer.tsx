import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useRouter } from 'next/router'
import { useLazyLoadQuery } from 'react-relay'
import { Spin } from 'antd'

import MainWrapper from './mainWrapper'

import repoQuery from '../../common/relay/repoQuery'
import { repoQuery as RepoQuery } from '../../common/relay/__generated__/repoQuery.graphql'

const MainRenderer = () => {
  const router = useRouter()
  const path = router.asPath.split('?')[0]

  const [, owner, name] = path.split('/')

  const data = useLazyLoadQuery<RepoQuery>(repoQuery, { owner, name })

  return <MainWrapper response={data} />
}

const MainRendererWrapper = () => {
  return (
    <ErrorBoundary
      FallbackComponent={({ error }) => (
        <div className="loading-wrapper">
          <span>{error.message}</span>

          <style jsx>{`
            .loading-wrapper {
              height: 70vh;
              display: grid;
              place-content: center;
            }
          `}</style>
        </div>
      )}>
      <Suspense
        fallback={
          <div className="loading-wrapper">
            <Spin size="large" />

            <style jsx>{`
              .loading-wrapper {
                height: 70vh;
                display: grid;
                place-content: center;
              }
            `}</style>
          </div>
        }>
        <MainRenderer />
      </Suspense>
    </ErrorBoundary>
  )
}

export default MainRendererWrapper
