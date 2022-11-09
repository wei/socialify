import React from 'react'
import { useRouter } from 'next/router'
import { Spin } from 'antd'

import MainWrapper from './mainWrapper'
import {
  getRepoDetails,
  RepoQueryResponse
} from '../../common/github/repoQuery'

type Props = {
  error: Error | null
  props: RepoQueryResponse | undefined
}

const MainRenderer = () => {
  const router = useRouter()
  const path = router.asPath.split('?')[0]

  const [, owner, name] = path.split('/')

  const [{ error, props }, setProps] = React.useState<Props>({
    error: null,
    props: undefined
  })

  React.useEffect(() => {
    if (owner && owner.charAt(0) !== '[') {
      getRepoDetails(owner, name)
        .then((props) => setProps({ error: null, props }))
        .catch((error) => setProps({ error, props: undefined }))
    }
  }, [owner, name])

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
}

export default MainRenderer
