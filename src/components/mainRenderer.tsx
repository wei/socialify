import React from 'react'
import { useRouter } from 'next/router'
import { QueryRenderer } from 'react-relay'
import { Spin } from 'antd'

import environment from '../../common/relay/environment'
import MainWrapper from './mainWrapper'

import query from '../../common/relay/repoQuery'

type Props = {
  error: Error | null
  props: any
}

const MainRenderer = () => {
  const router = useRouter()
  const path = router.asPath.split('?')[0]

  const [, owner, name] = path.split('/')

  return (
    <QueryRenderer
      environment={environment}
      query={query}
      variables={{ owner, name }}
      render={({ error, props }: Props) => {
        if (error) {
          return (
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
          )
        }
        if (!props) {
          return (
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
          )
        }
        return <MainWrapper response={props} />
      }}
    />
  )
}

export default MainRenderer
