import React from 'react'
import { useRouter } from 'next/router'
import { QueryRenderer } from 'react-relay'
import { Spin } from 'antd'

import environment from '../../common/relay/environment'
import MainWrapper from './mainWrapper'
import styles from './mainWrapper.module.css'

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
          return <div className={styles.loadingWrapper}>{error.message}</div>
        }
        if (!props) {
          return (
            <div className={styles.loadingWrapper}>
              <Spin size="large" />
            </div>
          )
        }
        return <MainWrapper response={props}></MainWrapper>
      }}
    />
  )
}

export default MainRenderer
