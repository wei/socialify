import React from 'react'
import { useRouter } from 'next/router'
import { MdErrorOutline } from 'react-icons/md'

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

  return (
    <main className="hero">
      {error ? (
        <div className="hero-content">
          <div className="alert alert-error shadow-lg">
            <div>
              <MdErrorOutline className="w-6 h-6" />
              <span>{error.message}</span>
            </div>
          </div>
        </div>
      ) : !props ? (
        <div className="hero-content">
          <progress className="progress progress-primary w-56"></progress>
        </div>
      ) : (
        <div className="hero-content p-0 w-full max-w-full">
          <MainWrapper response={props} />
        </div>
      )}
    </main>
  )
}

export default MainRenderer
