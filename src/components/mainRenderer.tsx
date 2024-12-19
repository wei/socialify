import { JSX, useEffect, useState } from 'react'
import { MdErrorOutline } from 'react-icons/md'

import type { RepoQueryResponse } from '@/common/github/repoQuery'
import { getRepoDetails } from '@/common/github/repoQuery'
import MainWrapper from '@/src/components/mainWrapper'
import {
  type RouteResources,
  useRouteResources,
} from '@/src/hooks/useRouteResources'

interface MainRendererStates {
  error: Error | null
  props: RepoQueryResponse | undefined
}

export default function MainRenderer(): JSX.Element {
  const { repoOwner, repoName }: RouteResources = useRouteResources()
  const [{ error, props }, setProps] = useState<MainRendererStates>({
    error: null,
    props: undefined,
  })

  useEffect(() => {
    if (repoOwner && repoOwner.charAt(0) !== '[') {
      getRepoDetails(repoOwner, repoName)
        .then((props) => setProps({ error: null, props }))
        .catch((error) => setProps({ error, props: undefined }))
    }
  }, [repoOwner, repoName])

  // Short-circuit to render an error message if an error occurred.
  if (error) {
    return (
      <main className="hero">
        <div className="hero-content">
          <div className="alert alert-error shadow-lg">
            <div>
              <MdErrorOutline className="w-6 h-6" />
              <span>{error.message}</span>
            </div>
          </div>
        </div>
      </main>
    )
  }

  // Short-circuit to render a loading spinner if props are undefined.
  if (!props) {
    return (
      <main className="hero">
        <div className="hero-content">
          <progress className="progress progress-primary w-56"></progress>
        </div>
      </main>
    )
  }

  return (
    <main className="hero">
      {props && (
        <div className="hero-content p-0 w-full max-w-full">
          <MainWrapper response={props} />
        </div>
      )}
    </main>
  )
}
